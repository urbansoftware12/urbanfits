import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const GetOneOrder = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { order_id } = req.query
            if (!mongoose.Types.ObjectId.isValid(order_id)) return res.status(403).json({ success: false, msg: "A valid order id is required." })

            await ConnectDB()
            const order = await Order.findById(order_id)
            res.status(200).json({
                success: true,
                msg: '',
                order
            })
        } else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry." })
    }
}
export default GetOneOrder