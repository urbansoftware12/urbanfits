import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import Order from "@/models/orders";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

// Only accessable by Admin 
const DeleteOrders = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            const { orders } = req.body
            if (!orders.length) return res.status(403).json({ success: false, msg: "A valid array of order IDs required." })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator." })

            if (!orders || orders.length === 0) return res.status(400).json({ success: false, msg: "Order array is required with atleast one valid id." })
            else {
                await Order.deleteMany({ _id: { $in: orders } })
                res.status(200).json({
                    success: true,
                    msg: `${orders.length} orders deleted successfully`
                })
            }
        } else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry." })
    }
}
export default DeleteOrders