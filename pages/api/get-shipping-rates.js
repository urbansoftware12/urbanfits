import Shipping_rates from "@/models/shipping_rates"
import ConnectDB from "@/utils/connect_db"
import CorsMiddleware from "@/utils/cors-config"

const GetShippingRates = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            await ConnectDB()

            const shippingRatesDoc = await Shipping_rates.findById("652a79afd889b69c655d903b")

            res.status(200).json({
                success: true,
                shipping_rates: shippingRatesDoc
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methdos: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default GetShippingRates