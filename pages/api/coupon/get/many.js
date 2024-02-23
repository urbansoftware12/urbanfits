import ConnectDB from "@/utils/connect_db"
import Coupon from "@/models/coupon"
import StandardApi from "@/middlewares/standard_api";

const getCoupon = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB()
    const coupons = await Coupon.find().sort({ createdAt: -1 }).select('-coupon_code')
    res.status(200).json({
        success: true,
        msg: "",
        length: coupons.length,
        coupons
    })
})
export default getCoupon