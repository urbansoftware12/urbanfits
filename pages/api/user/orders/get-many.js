import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";

const getManyOrders = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
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
})
export default getManyOrders