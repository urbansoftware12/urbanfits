import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import OTP from "@/models/otp";
import { generateRandomInt } from "@/utils/generatePassword"
const CryptoJS = require("crypto-js")
import sendEmail from "@/utils/sendEmail"
import resetPassTemplate from "@/email templates/resetpass_template"
import CorsMiddleware from "@/utils/cors-config"

const forgotPassword = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        const { email, new_password } = req.body
        if (!email || !new_password) return res.status(400).json({ success: false, msg: "All valid parameters are required. Body Parameters: email, new_password" })
        if (req.method === 'POST') {
            await ConnectDB()
            let user = await User.findOne().or([{ email }, { username: email }])
            if (!user) return res.status(404).json({ success: false, msg: "You don't have an account with this Email or Username!" })
            if (user.register_provider != "urbanfits") return res.status(404).json({ success: false, msg: "This email is linked with Google." })
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
            const currentPassword = bytes.toString(CryptoJS.enc.Utf8)
            if (currentPassword === new_password) return res.status(400).json({ success: false, msg: "New password can't be the old password, please choose a strong password." })
            // const token = jwt.sign({ email: user.email }, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '5m' })

            let dbOtp = await OTP.findOne({ email: user.email })
            if (dbOtp) return res.status(401).json({ success: false, msg: "You already have 'reset password' session, try after 5 minutes." })

            let otp = generateRandomInt(10001, 999999)
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
        }
        else res.status(400).json({ success: false, msg: "Method not allowed, Allowed Methods: POST" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default forgotPassword