import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";
import { orderStatuses } from "@/uf.config";

const OrderStatusMetrics = async (req, res) => StandardApi(req, res, { method: "GET", verify_admin: true }, async () => {
    await ConnectDB();

    const order_status_metrics = [];
    for (const status of Object.keys(orderStatuses)) {
        const count = await Order.countDocuments({ "order_status.status": status });
        order_status_metrics.push({
            status,
            count
        })
    }
    res.status(201).json({ success: true, msg: '', order_status_metrics })
})
export default OrderStatusMetrics;