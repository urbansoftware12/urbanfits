import ConnectDB from "@/utils/connect_db"
import OrderSession from "@/models/order_session"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const GetOrderSession = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { order_session_id } = req.query
            if (!mongoose.Types.ObjectId.isValid(order_session_id)) return res.status(403).json({ success: false, msg: "A valid order session id is required. Query parameters order_session_id" })

            await ConnectDB()
            const order_session = await OrderSession.findById(order_session_id)
            res.status(200).json({
                success: true,
                msg: 'Your payment was successful!',
                order_session
            })
        } else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry." })
    }
}
export default GetOrderSession