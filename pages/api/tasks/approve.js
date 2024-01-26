import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import User from "@/models/user";
import UFpoints from "@/models/ufpoints"
import UfTasks from "@/models/uf-tasks";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import SavePointsHistory from "@/utils/save_points_history";
import StandardApi from "@/middlewares/standard_api";

const ApproveUfTask = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { user_id, task_name } = req.body;
    const { admin } = req;
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

    const { uf_wallet, username } = tasksDoc.user_id;
    const approvedTask = tasksDoc.tasks.find(task => task.name === task_name)
    await UFpoints.create({
        user_id,
        card_number: uf_wallet.card_number,
        points: approvedTask.reward,
        source: "additional_reward"
    })
    await SavePointsHistory(user_id, uf_wallet.card_number, { earned: approvedTask.reward })

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