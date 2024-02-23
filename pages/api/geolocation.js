import axios from "axios"
import StandardApi from "@/middlewares/standard_api";

const GeoLocation = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
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
})
export default GeoLocation