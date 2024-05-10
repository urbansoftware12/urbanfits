import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import Addresses from "@/models/addresses";
import UFpoints from "@/models/ufpoints";
import Newsletter from "@/models/newsletter";
import Notification from "@/models/notification";
import Shoppinglist from "@/models/shoppinglist";
import Order from "@/models/orders";
import UfTasks from "@/models/uf-tasks";
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const DeleteUsers = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { users } = req.body
    if (!users?.length) return res.status(403).json({ success: false, msg: "A valid array of user IDs required with at least one user id." })
    await ConnectDB()

    if (!users || users.length === 0) return res.status(400).json({ success: false, msg: "Products array is required with atleast one valid id." })
    else {
        await User.deleteMany({ _id: { $in: users } });
        await Addresses.deleteMany({ user_id: { $in: users } });
        await Newsletter.deleteMany({ user: { $in: users } });
        await Notification.deleteMany({ user_id: { $in: users } });
        await Shoppinglist.deleteMany({ user_id: { $in: users } });
        await UFpoints.deleteMany({ user_id: { $in: users } });
        await UfTasks.deleteMany({ user_id: { $in: users } });
        await Order.updateMany({ user_id: { $in: users } }, { user_id: undefined });
        res.status(200).json({
            success: true,
            msg: `${users.length} users deleted successfully`
        })
    }
})
export default DeleteUsers