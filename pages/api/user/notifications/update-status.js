import ConnectDB from "@/utils/connect_db"
import Notification from "@/models/notification";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const updateNotificationStatus = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { user_id, category } = req.query
            console.log(user_id, category)
            if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({ success: false, msg: "A valid user id and category (of which notifications are to be updated) are required. Query parameters: user_id, category, status (if not provided then will be assumed 'true')" })
            await ConnectDB()

            await Notification.updateMany(
                {
                    user_id,
                    "notifications.category": category,
                },
                {
                    $set: {
                        "notifications.$[element].seen": true,
                    },
                },
                {
                    arrayFilters: [{ "element.category": category }],
                }
            )

            return res.status(200).json({
                success: true,
                msg: `Notifications of ${category} categroy status updated to ${req.query.status == undefined ? true : req.query.status}`
            })
        }
        else return res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default updateNotificationStatus