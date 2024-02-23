import ConnectDB from "@/utils/connect_db"
import Coupon from "@/models/coupon"
import { HashValue } from "@/utils/cyphers.js";
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const CreateCoupon = async (req, res) => StandardApi(req, res, { method: "POST", verify_admin: true }, async () => {
    if (!req.body.name || !req.body.coupon_code || !req.body.coupon_value) return res.status(403).json({ success: false, msg: "name, coupon_code and coupon_value are required fields" })
    await ConnectDB()
    const hashedCouponCode = HashValue(req.body.coupon_code)

    let coupon = await Coupon.findOne().or([{ name: req.body.name }, { coupon_code: hashedCouponCode }])
    if (coupon) return res.status(400).json({ success: false, msg: "Coupon already exists with this name or code. Both should be unique." })

    coupon = await Coupon.create({ ...req.body, coupon_code: hashedCouponCode })
    res.status(200).json({
        success: true,
        msg: `Coupon created with id ${coupon._id} successfully.`
    })
})
export default CreateCoupon