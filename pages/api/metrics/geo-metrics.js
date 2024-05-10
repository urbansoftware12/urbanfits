import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders";
import StandardApi from "@/middlewares/standard_api";
import { UAEStates } from "@/uf.config";

const GeoMetris = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB();
    let geo_metrics = {};
    for (const state of Object.keys(UAEStates)) {
        const stateMetrics = await Order.countDocuments({ "shipping_address.state": state }).sort({ updatedAt: -1 });
        geo_metrics[state] = stateMetrics;
    }
    res.status(201).json({ success: true, msg: '', geo_metrics })
})
export default GeoMetris;