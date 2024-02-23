import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import OTP from "@/models/otp";
import sendEmail from "@/utils/sendEmail";
import resetPassTemplate from "@/email templates/resetpass_template"
import { generateRandomInt, EncryptOrDecryptData } from "@/utils/cyphers.js"
import StandardApi from "@/middlewares/standard_api";

const forgotPassword = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { email, new_password } = req.body
    if (!email || !new_password) return res.status(400).json({ success: false, msg: "All valid parameters are required. Body Parameters: email, new_password" })
    await ConnectDB()

    let user = await User.findOne().or([{ email }, { username: email }])
    if (!user) return res.status(404).json({ success: false, msg: "You don't have an account with this Email or Username" })
    if (user.register_provider != "urbanfits") return res.status(404).json({ success: false, msg: "This email is linked with Google." })
    const currentPassword = EncryptOrDecryptData(user.password)
    if (currentPassword === new_password) return res.status(400).json({ success: false, msg: "New password can't be the old password, please choose a strong password." })

    let dbOtp = await OTP.findOne({ email: user.email })
    if (dbOtp) return res.status(401).json({ success: false, msg: "You already have 'reset password' session, try after 5 minutes." })

    let otp = generateRandomInt(10001, 999999);
    dbOtp = await OTP.create({
        user_id: user._id,
        email: user.email,
        new_password,
        otp,
        expireAt: Date.now()
    })
    let template = resetPassTemplate(user.firstname, otp)
    await sendEmail({ to: user.email, subject: "Reset Password" }, template)
    res.json({
        success: true,
        msg: "We just sent you an OTP, please check your Mail Box",
        otp_id: dbOtp._id
    })
})
export default forgotPassword