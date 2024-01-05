import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import UFpoints from "@/models/ufpoints"
import createUFcard from "@/utils/create-ufcard"
import OTP from "@/models/otp"
import Newsletter from "@/models/newsletter"
import sendNotification from "@/utils/send_notification"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
import { pusherServer } from "@/utils/pusher"
import CorsMiddleware from "@/utils/cors-config"

const SignupCallback = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const { otp_id, otp } = req.body
            if (!otp_id || otp_id.length < 18) return res.status(401).json({
                success: false,
                msg: "All valid parameters are required. Body Parameter: otp_id, otp"
            })
            await ConnectDB()

            const dbOtp = await OTP.findById(otp_id)
            if (!dbOtp) return res.status(401).json({ success: false, msg: "The OTP has expired, please try again." })
            if (dbOtp.otp !== otp) return res.status(401).json({ success: false, msg: "The OTP is incorrect." })

            let credentials = dbOtp.new_user
            if (dbOtp) {
                let user = await User.findOne().or([{ email: credentials.email }, { username: credentials.username }])
                if (user) return res.status(400).json({ success: false, msg: "This Email or Username already in use." })
                const ufCardData = await createUFcard()
                user = await User.create({
                    ...credentials,
                    password: CryptoJS.AES.encrypt(credentials.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(),
                    uf_wallet: ufCardData
                })
                await UFpoints.create({
                    user_id: user._id,
                    card_number: user.uf_wallet.card_number,
                    points: 500,
                    source: "signup"
                })
                const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY)
                await sendNotification(user._id, {
                    category: "reward",
                    heading: "Signup Bonus",
                    type: "signup",
                    mini_msg: `Congratulations, You won 500 UF Points as a signup bonus!`,
                    message: `Congratulations ! You're a part of Urban Fits now. You got 500 UF Points as a signup bonus, Happy Shopping!`
                }, { notify: true })
                res.status(200).json({
                    success: true,
                    msg: "You're Resgistered successfully !",
                    user_id: user._id,
                    payload
                })
                pusherServer.trigger("admin-channel", "new-signup", {
                    msg: `A new user ${user.username} just signed up.`,
                    user_id: user._id
                })
                const userLetter = await Newsletter.findOne({ email: credentials.email, user: "guest" })
                if (userLetter) return userLetter.update({ active: true, user: user._id })
            }
        }
        else return res.status(400).json({ success: false, msg: "Method not allowed, Allowed Methods: POST" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default SignupCallback