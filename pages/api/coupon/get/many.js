import ConnectDB from "@/utils/connect_db"
import Coupon from "@/models/coupon"
import User from "@/models/user"
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const getCoupon = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const admin_id = verifyAdminToken(req, res)

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

            const coupons = await Coupon.find().sort({ createdAt: -1 }).select('-coupon_code')

            res.status(200).json({
                success: true,
                msg: "",
                length: coupons.length,
                coupons
            })
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry" })
    }
}
export default getCoupon