import ConnectDB from "@/utils/connect_db"
import Order, { getOrderStatus } from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";
import { orderStatuses } from "@/uf.config";
import axios from "axios";

const ChangeOrderStatus = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    const { order_id, order_status } = req.query;
    if (!order_id || order_id.length < 18) return res.status(400).json({ success: false, msg: "Invalid Order Identifier" })
    if (!order_status || !Object.keys(orderStatuses).includes(order_status)) return res.status(400).json({ success: false, msg: "Invalid Order Status" })
    await ConnectDB()

    let order = await Order.findByIdAndUpdate(order_id, {
        order_status: getOrderStatus(order_status)
    }, { new: true, lean: true })
    if (order_status === "CANCELLED" && order.tracking_number) {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SWFT_BASE_ENDPOINT}/api/direct-integration/orders/${order.tracking_number}/cancel`, {}, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_SWFT_KEY
                }
            })
        } catch (e) { console.log("Error in order cancellation SWFT", e) }
    }

    res.status(200).json({
        success: true,
        order,
        msg: "Order status updated successfully"
    })
})
export default ChangeOrderStatus