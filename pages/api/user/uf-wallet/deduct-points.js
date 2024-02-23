import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import { DeductPoints } from "@/utils/uf-points";
import StandardApi from "@/middlewares/standard_api";

const AddUFpoints = async (req, res) => StandardApi(req, res, { method: "PUT", verify_user: false }, async () => {
    const { card_number, user_id, timezone, points_to_deduct } = req.body
    if (!card_number || !mongoose.Types.ObjectId.isValid(user_id) || !isValidTimeZone(timezone) || !points_to_deduct) return res.status(403).json({ success: false, msg: "Invalid or incomplete arguments. Required Body parameters: card_number, user_id, timezone, points_to_deduct" })
    await ConnectDB()
    await DeductPoints(user_id, card_number, timezone, points_to_deduct);

    res.status(200).json({
        success: true,
        msg: "Points deducted successfully.",
        deductedPoints: points_to_deduct
    })
})
export default AddUFpoints