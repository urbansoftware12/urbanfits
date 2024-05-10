import ConnectDB from "@/utils/connect_db";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import Order, { getOrderStatus } from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";

const ShipmentWebhookHandler = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { order: {
        reference,
        status,
        state,
        shippingLabelUrl
    } } = req.body;
    await ConnectDB()

    const order = await Order.findByIdAndUpdate(reference, {
        order_status: getOrderStatus(status),
        state,
        shippingLabelUrl
    }, { new: true, lean: true });

    await sendAdminNotification({
        category: "order",
        data: {
            title: "Order Status updated",
            msg: `An order's status just got updated by Swft Box.`,
            href: `/orders/${order._id}`,
            type: "info"
        }
    })
    if (order?.user_id) await sendNotification(order.user_id, {
        category: "order",
        heading: "Order Updated",
        mini_msg: `You order's status just updated to "${status}"!`,
        type: "order",
        message: `You order's status just updated by our shipping partners to "${status}" of group "${order.order_status.group}"!`,
    })
    res.status(200).send("OK")
})

export default ShipmentWebhookHandler