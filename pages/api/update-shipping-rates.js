import Shipping_rates from "@/models/shipping_rates"
import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import mongoose from "mongoose"
import CorsMiddleware from "@/utils/cors-config"

const UpdateShippingRates = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { admin_id } = req.query
            if (!mongoose.Types.ObjectId.isValid(admin_id)) return res.status(403).json({ success: false, msg: "A valid admin id required. Query Parameters: admin_id" })
            await ConnectDB()
            const admin = await User.findById(admin_id)
            if (!admin) return res.status(401).json({ success: false, msg: "Only admin can manipulate this data." })

            const shippingRatesDoc = await Shipping_rates.findByIdAndUpdate(
                "652a79afd889b69c655d903b",
                req.body,
                { upsert: true, new: true }
            )

            res.status(200).json({
                success: true,
                shippingRatesDoc
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methdos: PUT" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default UpdateShippingRates