import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders"
import StandardApi from "@/middlewares/standard_api";
import { orderStatuses } from "@/uf.config";

const GetUserOrders = async (req, res) => StandardApi(req, res, {}, async () => {
    const { group } = req.query;
    const user_id = req.user._id;

    if (!group || !Object.values(orderStatuses).some(item => item.group === group)) return res.status(400).json({ success: false, msg: "Invalid order status-group to query." })
    await ConnectDB()
    const orders = await Order.find({ user_id, ...(group && { "order_status.group": group }) }).sort({ createdAt: -1 }).lean();
    res.status(200).json({
        success: true,
        msg: '',
        orders
    })
})
export default GetUserOrders