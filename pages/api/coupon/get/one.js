import ConnectDB from "@/utils/connect_db"
import Coupon from "@/models/coupon"
import { HashValue } from "@/utils/cyphers.js"
import StandardApi from "@/middlewares/standard_api"

const getCoupon = async (req, res) => StandardApi(req, res, { method: "POST", verify_admin: false, verify_user: false }, async () => {
    const { coupon_code } = req.body
    if (!coupon_code || coupon_code.length < 8) return res.status(500).json({ success: false, msg: "Invalid coupon code." })
    await ConnectDB()

    const hashedCouponCode = HashValue(coupon_code)
    let coupon = await Coupon.findOne({ coupon_code: hashedCouponCode })
    if (!coupon?._id) return res.status(400).json({ success: false, msg: "Invalid coupon code." })

    delete coupon._id
    delete coupon.coupon_code
    res.status(200).json({
        success: true,
        msg: "",
        coupon
    })
})
export default getCoupon