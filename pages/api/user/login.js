import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
import sendNotification from "@/utils/send_notification"
import { pusherServer } from "@/utils/pusher"
import CorsMiddleware from "@/utils/cors-config"

const Login = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const { email, password } = req.body
            await ConnectDB()
            if (!email) return res.status(400).json({ success: false, msg: 'All valid parameters are required. Body parameters: email' })
            if (req.query.auth === 'google') {
                let user = await User.findOne({ email })
                if (!user) return res.status(404).json({ success: false, msg: "User not found, please Sign up" })
                if (user.register_provider !== req.body.register_provider) return res.status(404).json({ success: false, msg: `This account is associated with ${user.register_provider}` })
                if (user.two_fa_activation_date && user.two_fa_enabled) {
                    return res.status(200).json({
                        success: true,
                        msg: "",
                        redirect_url: `/auth/confirm-2fa-totp?user_id=${user._id}`
                    })
                }
                if (!user.two_fa_enabled) {
                    const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY)
                    const date = new Date()
                    await sendNotification(user._id, {
                        category: "account",
                        heading: "Login",
                        type: "login",
                        mini_msg: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
                        message: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`
                    }, { notify: true, notifySilently: true })
                    res.status(200).json({
                        success: true,
                        msg: "You are Logged in successfully !",
                        payload
                    })
                    pusherServer.trigger("admin-channel", "login", {
                        msg: `A user ${user.username} just logged in.`,
                        user_id: user._id
                    })
                }
            }
            else {
                if (!email || !password) return res.status(400).json({ success: false, msg: 'All valid parameters are required. Body parameters: email, password' })
                let user = await User.findOne().or([{ email }, { username: email }])
                if (!user) return res.status(404).json({ success: false, msg: "User not found, please create an account" })
                if (user.register_provider !== req.body.register_provider) return res.status(404).json({ success: false, msg: `This account is associated with ${user.register_provider}` })
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
                if (password !== originalPassword) return res.status(403).json({ success: false, msg: "Your password is incorrect" })
                if (user.two_fa_activation_date && user.two_fa_enabled) {
                    return res.json({
                        success: true,
                        msg: "",
                        redirect_url: `/auth/confirm-2fa-totp?user_id=${user._id}`,
                    })
                }
                else if (!user.two_fa_enabled) {
                    const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY)
                    const date = new Date()
                    await sendNotification(user._id, {
                        category: "account",
                        heading: "Login",
                        type: "login",
                        mini_msg: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
                        message: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`
                    }, { notify: true, notifySilently: true })
                    res.status(200).json({
                        success: true,
                        msg: "You are Logged in successfully !",
                        payload
                    })
                    pusherServer.trigger("admin-channel", "login", {
                        msg: `A user ${user.username} just logged in.`,
                        user_id: user._id
                    })
                }
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