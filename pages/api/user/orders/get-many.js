import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";
import { orderStatuses } from "@/uf.config";

const getManyOrders = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    const { status, limit } = req.query;
    if (status && !Object.keys(orderStatuses).includes(status.toUpperCase())) return res.status(400).json({ success: false, msg: "Invalid order status." })
    await ConnectDB();

    const queryObj = status ? { "order_status.status": status.toUpperCase() } : {};

    const LIMIT = +limit || 50;
    let totalOrders = await Order.countDocuments(queryObj);

    const totalPages = Math.ceil(totalOrders / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipOrders = (page - 1) * LIMIT;
    let orders = await Order.find(queryObj)
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