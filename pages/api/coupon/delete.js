import ConnectDB from "@/utils/connect_db"
import Coupon from "@/models/coupon"
import mongoose from "mongoose"
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const DeleteCoupon = async (req, res) => StandardApi(req, res, { method: "DELETE", verify_admin: true }, async () => {
    const { coupon_id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(coupon_id)) return res.status(403).json({ success: false, msg: "coupon_id are required fields" })

    await ConnectDB()
    await Coupon.findByIdAndDelete(coupon_id)
    res.status(200).json({
        success: true,
        msg: `Coupon with id ${coupon_id} deleted successfully.`
    })
})
export default DeleteCoupon