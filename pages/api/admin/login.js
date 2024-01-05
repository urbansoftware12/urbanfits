import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import Notification from "@/models/notification"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
import { pusherServer } from "@/utils/pusher"
import CorsMiddleware from "@/utils/cors-config"

const Login = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const { email, password } = req.body
            if (!email || !password) return res.status(400).json({ success: false, msg: 'All valid parameters are required. Body parameters: email, password' })
            await ConnectDB()
            let user = await User.findOne().or([{ email }, { username: email }])
            if (!user) return res.status(404).json({ success: false, msg: "User not found, please create an account" })
            if (user.role !== "administrator") return res.status(403).json({ success: false, msg: `Access not allowed. Only for admins` })
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
            if (password !== originalPassword) return res.status(403).json({ success: false, msg: "Your password is incorrect" })

            if (user.two_fa_activation_date && user.two_fa_enabled) {
                return res.json({
                    success: true,
                    msg: "",
                    redirect_url: `/auth/confirm-2fa-totp?user_id=${user._id}`
                })
            }
            if (!user.two_fa_enabled) {
                const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '1w' })
                pusherServer.trigger("admin-channel", "login", {
                    msg: `An admin ${user.username} just logged in.`,
                    user_id: user._id
                })
                res.status(200).json({
                    success: true,
                    msg: "You are Logged in successfully !",
                    payload
                })
                const date = new Date()
                const userNotification = await Notification.findOneAndUpdate(
                    { user_id: user._id },
                    {
                        $push: {
                            notifications: {
                                $each: [{
                                    category: "account",
                                    heading: "Login",
                                    type: "login",
                                    message: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
                                    timestamp: new Date()
                                }],
                                $position: 0,
                                $slice: 20,
                            }
                        }
                    },
                    { upsert: true, new: true }
                ); console.log(userNotification)
            }
        }
        else return res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: POST" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default Login