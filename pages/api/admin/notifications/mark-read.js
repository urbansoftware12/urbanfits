import ConnectDB from "@/utils/connect_db"
import AdminNotific from "@/models/admin_notifications"
import StandardApi from "@/middlewares/standard_api"

const TestApiHandler = (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { notifications } = req.body;
    if (!notifications.length) return res.status(400).json({ success: false, msg: "A valid 'notification' arrya of notificaion IDs query parameter is required." })
    await ConnectDB();
    const notification = await AdminNotific.updateMany(
        { _id: { $in: notifications }, seen: false },
        {
            $set: {
                seen: true,
                seen_by: {
                    admin_id: req.user._id,
                    name: req.user.username
                }
            }
        });
    res.status(200).json({
        success: true,
        msg: "Notification marked read.",
        notification
    })
})
export default TestApiHandler