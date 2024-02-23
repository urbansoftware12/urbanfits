import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import User from "@/models/user";
import UFpoints from "@/models/ufpoints"
import UfTasks from "@/models/uf-tasks";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import { AddPoints } from "@/utils/uf-points";
import StandardApi from "@/middlewares/standard_api";
import axios from "axios";

const ApproveUfTask = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { user_id, task_name, timezone } = req.body;
    const admin = req.user;
    if (!mongoose.Types.ObjectId.isValid(user_id) || !task_name) return res.status(405).json({ success: false, msg: "All valid body parameters: user_id and task_name are required." })
    await ConnectDB()

    const tasksDoc = await UfTasks.findOneAndUpdate(
        { user_id, tasks: { $elemMatch: { name: task_name, completed: false } } },
        {
            "tasks.$.image_submitted": true,
            "tasks.$.completed": true
        },
        { new: true }
    ).populate("user_id")

    const respectedTask = tasksDoc.tasks.find(task => task.name === task_name);
    const objDeletion = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/S3/delete-object?object_url=${respectedTask.image}`)
    console.log(objDeletion);
    const { uf_wallet, username } = tasksDoc.user_id;
    const approvedTask = tasksDoc.tasks.find(task => task.name === task_name)
    await AddPoints(user_id, uf_wallet.card_number, timezone, { earned: approvedTask.reward, source: "uf_task" });

    sendNotification(user_id, {
        category: "reward",
        heading: `Congratulations! You won ${approvedTask.reward} points.`,
        type: "reward",
        mini_msg: `Congratulations! your submitted image got approved, you claimed ${approvedTask.reward} UF points`,
        message: `Congratulations! your submitted image got approved and you have won ${approvedTask.reward} UF points. The points are permanently deposited to your UF wallet. Enjoy!`,
    }, { notify: true })
    const date = new Date();
    sendAdminNotification({
        category: "user",
        data: {
            title: `@${admin.username} approved ${username}'s task request.`,
            msg: `@${admin.username} approved ${username}'s task request at ${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}. They claimed ${approvedTask.reward} UF points.`,
            href: `https://admin.urbanfits.ae/user/tasks/${user_id}`,
            type: "success"
        }
    })

    res.status(200).json({
        success: true,
        mag: "Task approved successfully.",
        tasks: tasksDoc
    })
})
export default ApproveUfTask