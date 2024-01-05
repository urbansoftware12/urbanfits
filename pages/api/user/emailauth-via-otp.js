import OTP from "@/models/otp";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import sendEmail from "@/utils/sendEmail";
import changeEmail from "@/email templates/change_email";
const CryptoJS = require("crypto-js")
import { generateRandomInt } from "@/utils/generatePassword";
import CorsMiddleware from "@/utils/cors-config"

const AuthEmailByOtp = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { new_email, old_email, password } = req.body;
            if (!new_email || !old_email || !password) return res.status(400).json({ success: false, msg: "All valid parameters required. Body Parameters: new_email, old_email, password" })
            await ConnectDB()

            let user = await User.findOne({ email: new_email })
            if (user) return res.status(401).json({ success: false, msg: "The new email is already registered." })
            user = await User.findOne({ email: old_email })
            if (!user) return res.status(404).json({ success: false, msg: "User not found, the email you want to change is not registered." })

            const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
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
        }
        else {
            res.status(400).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default AuthEmailByOtp