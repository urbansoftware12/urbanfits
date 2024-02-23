import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders"
import StandardApi from "@/middlewares/standard_api";

const orderStatuses = ['pending', 'readytoship', 'shipped', 'delivered', 'returned']
const GetUserOrders = async (req, res) => StandardApi(req, res, {}, async () => {
    const { status } = req.query;
    const user_id = req.user._id;
    if (status && !orderStatuses.includes(status.toLowerCase())) return res.status(400).json({ success: false, msg: "Invalid order status to query. Available statuses: " + orderStatuses })
    await ConnectDB()
    const orders = await Order.find({ user_id, ...(status && { order_status: status }) }).sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        msg: '',
        orders
    })

})
export default GetUserOrders