import ConnectDB from "@/utils/connect_db"
import AdminNotific from "@/models/admin_notifications"
import StandardApi from "@/middlewares/standard_api"

const TestApiHandler = (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB();
    const notifications = await AdminNotific.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        msg: "",
        count: notifications.length,
        notifications
    })
})
export default TestApiHandler