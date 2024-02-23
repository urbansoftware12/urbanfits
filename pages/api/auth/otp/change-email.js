import OTP from "@/models/otp";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import StandardApi from "@/middlewares/standard_api";
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";
import user from "@/models/user";

const AuthOtpAndChangeEmail = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { otp_id, otp, } = req.body;
    if (!otp_id || !otp) return res.status(400).json({ success: false, msg: "All valid parameters required. Body Parameters: otp_id, otp" })
    await ConnectDB()
    const dbOtp = await OTP.findById(otp_id)
    if (!dbOtp) return res.status(401).json({ success: false, msg: "OTP has expired." })
    if (otp !== dbOtp.otp) return res.status(401).json({ success: false, msg: "Incorrect OTP" })
    const updatedUser = await User.findByIdAndUpdate(dbOtp.user_id, {
        email: dbOtp.new_email
    }, { new: true, _immutability: "disable", lean: true })

    SetSessionCookie(req, res, {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        register_provider: updatedUser.register_provider,
        user_agent: updatedUser.user_agent,
        timezone: user.timezone,
        two_fa_enabled: updatedUser.two_fa_enabled,
        uf_wallet: updatedUser.uf_wallet,
        last_checkin: updatedUser.last_checkin,
        createdAt: updatedUser.createdAt,
        ...(updatedUser.two_fa_activation_date && { two_fa_activation_date: updatedUser.two_fa_activation_date }),
        ...(updatedUser.role && { role: updatedUser.role })
    }, req.user.exp);

    res.status(200).json({
        success: true,
        msg: "Your email has been updated!",
        payload: SignJwt(user)
    })
})
export default AuthOtpAndChangeEmail