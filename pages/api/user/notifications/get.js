import ConnectDB from "@/utils/connect_db"
import Notification from "@/models/notification";
import StandardApi from "@/middlewares/standard_api";

const getUserNotifications = async (req, res) => StandardApi(req, res, {}, async () => {
    await ConnectDB()
    const userNotifications = await Notification.findOne({ user_id: req.user._id });
    return res.status(200).json({
        success: true,
        notification_data: userNotifications || []
    })
})
export default getUserNotifications