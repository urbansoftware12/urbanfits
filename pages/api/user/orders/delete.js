import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const DeleteOrders = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { orders } = req.body
    if (!orders.length) return res.status(403).json({ success: false, msg: "A valid array of order IDs required." })

    await ConnectDB()
    if (!orders || orders.length === 0) return res.status(400).json({ success: false, msg: "Order array is required with atleast one valid id." })
    else {
        await Order.deleteMany({ _id: { $in: orders } })
        res.status(200).json({
            success: true,
            msg: `${orders.length} orders deleted successfully`
        })
    }
})
export default DeleteOrders