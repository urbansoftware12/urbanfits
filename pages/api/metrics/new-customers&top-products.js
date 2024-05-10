import ConnectDB from "@/utils/connect_db";
import User from "@/models/user";
import Product from "@/models/product";
import StandardApi from "@/middlewares/standard_api";

const OrderStatusMetrics = async (req, res) => StandardApi(req, res, { method: "GET", verify_admin: true }, async () => {
    await ConnectDB();
    const new_customers = await User.find({ purchases: { $gt: 0 } }).sort({ updatedAt: -1 }).limit(8).lean();
    const top_products = await Product.find().sort({ sales: -1 }).limit(8).lean();
    res.status(201).json({ success: true, msg: '', new_customers, top_products })
})
export default OrderStatusMetrics;