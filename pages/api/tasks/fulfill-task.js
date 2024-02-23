import ConnectDB from "@/utils/connect_db"
import mongoose from "mongoose"
import UfTasks from "@/models/uf-tasks"
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import StandardApi from "@/middlewares/standard_api";

const FulfillUfTask = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { task_name, image_url } = req.body;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(user_id) || !task_name || !image_url) return res.status(405).json({ success: false, msg: "All valid body parameters: user_id, task_name and image_url are required." })
    await ConnectDB()

    const tasks = await UfTasks.findOneAndUpdate(
        { user_id, tasks: { $elemMatch: { name: task_name } } },
        {
            "tasks.$.image": image_url,
            "tasks.$.image_submitted": true
        },
        { new: true }
    )

    sendNotification(user_id, {
        category: "primary",
        heading: "Waiting for approval",
        type: "reward",
        mini_msg: "Your image was sent for approval. You'll be rewarded after the approval.",
        message: "Your screen shot was uploaded successfully. Please wait for the admin approval, you will get you reward points after UF Admin reviews and approves you request.",
    }, { notify: true, notifySilently: true })
    sendAdminNotification({
        category: "user",
        data: {
            title: "New Task Submitted",
            msg: "A user has submitted a new task request. Review their request for approval.",
            href: "https://admin.urbanfits.ae/user/tasks",
            type: "success"
        }
    })

    res.status(200).json({
        success: true,
        mag: "Image sent for approval. You'll be rewarded after the approval.",
        tasks
    })
})
export default FulfillUfTask