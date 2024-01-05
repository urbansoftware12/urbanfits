import ConnectDB from "@/utils/connect_db"
import Notification from "@/models/notification";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const getUserNotifications = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id } = req.query
            if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({ success: false, msg: "A valid user id required. Query parameters: user_id" })
            await ConnectDB()

            const userNotifications = await Notification.findOne({ user_id: mongoose.Types.ObjectId(user_id) })
            return res.status(200).json({
                success: true,
                notification_data: userNotifications || []
            })
        }
        else return res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default getUserNotifications