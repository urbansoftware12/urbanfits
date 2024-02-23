import ConnectDB from "@/utils/connect_db"
import Notification from "@/models/notification";
import StandardApi from "@/middlewares/standard_api";

const updateNotificationStatus = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { category } = req.query;
    const user_id = req.user._id;
    if (!category || !category.length > 2) return res.status(400).json({ success: false, msg: "A valid category (of which notifications are to be updated) is required. Query parameters: category" })
    await ConnectDB()
    await Notification.updateMany(
        {
            user_id,
            "notifications.category": category,
        },
        {
            $set: {
                "notifications.$[element].seen": true,
            }
        },
        {
            arrayFilters: [{ "element.category": category }],
        }
    )

    return res.status(200).json({
        success: true,
        msg: `Notifications of ${category} categroy status updated to ${req.query.status == undefined ? true : req.query.status}`
    })
})
export default updateNotificationStatus