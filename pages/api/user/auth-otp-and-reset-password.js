import OTP from "@/models/otp";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import CryptoJS from "crypto-js"
import StandardApi from "@/middlewares/standard_api";

const AuthOtpAndChangeEmail = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { otp_id, otp, } = req.body;
    if (!otp_id || !otp) return res.status(400).json({ success: false, msg: "All valid parameters required. Body Parameters: otp_id, otp" })
    await ConnectDB()
    const dbOtp = await OTP.findById(otp_id)
    if (!dbOtp) return res.status(401).json({ success: false, msg: "OTP has expired." })
    if (otp !== dbOtp.otp) return res.status(401).json({ success: false, msg: "Incorrect OTP" })
    const newPassword = CryptoJS.AES.encrypt(dbOtp.new_password, process.env.NEXT_PUBLIC_SECRET_KEY).toString()
    await User.findByIdAndUpdate(dbOtp.user_id, {
        password: newPassword
    }, { new: true })

    res.status(200).json({
        success: true,
        msg: "Your password has been updated!"
    })
})
export default AuthOtpAndChangeEmail