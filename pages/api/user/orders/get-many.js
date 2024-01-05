import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import CorsMiddleware from "@/utils/cors-config"

const getManyOrders = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            await ConnectDB()
            const LIMIT = 50;
            let totalOrders = await Order.countDocuments();

            const totalPages = Math.ceil(totalOrders / LIMIT);
            const page = parseInt(req.query.page) || 1;
            const skipOrders = (page - 1) * LIMIT;
            let orders = await Order.find()
                .sort({ createdAt: -1 })
                .skip(skipOrders)
                .limit(LIMIT);

            res.status(200).json({
                length: orders.length,
                totalOrders,
                totalPages,
                currentPage: page,
                orders
            })
        } else res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}
export default getManyOrders