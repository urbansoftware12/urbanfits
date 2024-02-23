import ConnectDB from "@/utils/connect_db"
import OrderSession from "@/models/order_session"
import mongoose from "mongoose";
import StandardApi from "@/middlewares/standard_api";

const GetOrderSession = async (req, res) => StandardApi(req, res, {}, async () => {
    const { order_session_id } = req.query
    if (!mongoose.Types.ObjectId.isValid(order_session_id)) return res.status(403).json({ success: false, msg: "A valid order session id is required. Query parameters order_session_id" })

    await ConnectDB()
    const order_session = await OrderSession.findById(order_session_id)
    res.status(200).json({
        success: true,
        msg: 'Your payment was successful!',
        order_session
    })
})
export default GetOrderSession