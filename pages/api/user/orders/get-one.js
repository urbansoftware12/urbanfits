import ConnectDB from "@/utils/connect_db"
import Order from "@/models/orders";
import { isValidObjectId } from "mongoose";
import StandardApi from "@/middlewares/standard_api";

const GetOneOrder = async (req, res) => StandardApi(req, res, {}, async () => {
    const { order_id } = req.query;
    if (!isValidObjectId(order_id)) return res.status(400).json({ success: false, msg: "A valid order id is required." })

    await ConnectDB()
    const order = await Order.findById(order_id).lean();
    res.status(200).json({
        success: true,
        msg: '',
        order
    })
})
export default GetOneOrder