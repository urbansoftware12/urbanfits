import axios from "axios"
import CorsMiddleware from "@/utils/cors-config"
const GeoLocation = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            try {
                const userIPAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                console.log(userIPAddress)
                const { data } = await axios.get(`https://ipinfo.io/${userIPAddress}?token=${process.env.NEXT_PUBLIC_IPINFO_ACCESS_TOKEN}`)
                return res.status(200).json({
                    success: true,
                    geo_meta: data,
                    userIPAddress
                })
            } catch (error) {
                console.log(error)
                return res.status(400).json({
                    success: false,
                    geo_meta: error
                })
            }
        }
        else {
            res.status(405).json({ success: false, msg: "you are using wrong request method. Allowed Methods: `GET`" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default GeoLocation