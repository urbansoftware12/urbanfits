import OTP from "@/models/otp";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import sendEmail from "@/utils/sendEmail";
import changeEmail from "@/email templates/change_email";
import { generateRandomInt, EncryptOrDecryptData, RemoveSessionCookie } from "@/utils/cyphers.js";
import StandardApi from "@/middlewares/standard_api";

const AuthEmailByOtp = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { new_email, password } = req.body;
    const old_email = req.user.email;
    if (!new_email || !password) return res.status(400).json({ success: false, msg: "All valid parameters required. Body Parameters: new_email, password" })
    await ConnectDB()

    let user = await User.findOne({ email: new_email })
    if (user) return res.status(409).json({ success: false, msg: "The new email is already registered." })
    user = await User.findOne({ email: old_email })
    if (!user) {
        RemoveSessionCookie(res)
        return res.status(401).json({ success: false, msg: "User not found, the email you want to change is not registered." })
    }

    const originalPassword = EncryptOrDecryptData(user.password, false);
    if (password !== originalPassword) return res.status(401).json({ success: false, msg: "Your password is incorrect" })

    // Creating an opt and sending to new email
    let dbOtp = await OTP.findOne({ user_id: user._id })
    if (dbOtp) return res.status(401).json({ success: false, msg: "You already have 'change email' session, try after 5 minutes." })
    else if (!dbOtp) {
        let otp = generateRandomInt(10001, 999999)
        dbOtp = await OTP.create({
            user_id: user._id,
            otp,
            new_email,
            expireAt: Date.now()
        })

        const template = changeEmail(`${user.firstname} ${user.lastname}`, otp)
        await sendEmail({ to: new_email, subject: "Confirm your OTP to change your Email" }, template)
        res.status(200).json({
            success: true,
            otp_id: dbOtp._id,
            msg: "We just sent an otp to your new email, please check and submit the code."
        })
    }
})
export default AuthEmailByOtp