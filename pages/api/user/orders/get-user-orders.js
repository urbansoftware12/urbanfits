import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const orderStatuses = ['pending', 'readytoship', 'shipped', 'delivered', 'returned']
const GetUserOrders = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id, status } = req.query
            if (!mongoose.Types.ObjectId(user_id)) return res.status(403).json({ success: false, msg: "A valid user id is required. Query parameters: user_id, status (optional, if not provided then will return all orders)." })
            if (status && !orderStatuses.includes(status.toLowerCase())) return res.status(400).json({ success: false, msg: "Invalid order status to query. Available statuses: " + orderStatuses })
            await ConnectDB()

            const orders = await Order.find({ user_id, ...(status && { order_status: status }) }).sort({ createdAt: -1 })
            res.status(200).json({
                success: true,
                msg: '',
                orders
            })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default GetUserOrders