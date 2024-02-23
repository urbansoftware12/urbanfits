import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import OTP from "@/models/otp"
import verifyEmail from "@/email templates/verify_email"
import sendEmail from "@/utils/sendEmail"
import { generateRandomInt, isValidTimeZone } from "@/utils/cyphers.js";
import StandardApi from "@/middlewares/standard_api"

const Signup = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { username, email, phone_prefix, phone_number, password, timezone } = req.body;
    if (!username || !email || !phone_prefix || !phone_number || !password || !isValidTimeZone(timezone)) return res.status(400).json({ success: false, msg: "All valid parameters required. Body Parameters: username, email, phone_prefix, phone_number, password, accept_policies, timezone ." })
    await ConnectDB()
    let user = await User.findOne().or([{ email }, { username }])
    if (user) return res.status(409).json({ success: false, msg: "This Email or Username already in use." })
    if (!req.body.accept_policies) return res.status(403).json({ success: false, msg: "A user can't register without accepting our policies and terms of use." })

    let dbOtp = await OTP.findOne({ email })
    if (dbOtp) return res.status(401).json({ success: false, msg: "You already have 'registration' session, try after 5 minutes." })
    if (!dbOtp) {
        let otp = generateRandomInt(10001, 999999)
        dbOtp = await OTP.create({
            email,
            new_user: req.body,
            otp,
            expireAt: Date.now()
        })
        const template = verifyEmail(otp)
        await sendEmail({ to: req.body.email, subject: "Verify your email for registration on Urban Fits" }, template)
        res.status(200).json({
            success: true,
            otp_id: dbOtp._id,
            msg: `Verification Email sent to ${email}`,
            redirect_url: `/auth/signup/verify-otp?otp_id=${dbOtp._id}`
        })
    }
})
export default Signup