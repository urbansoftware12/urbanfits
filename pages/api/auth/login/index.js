import ConnectDB from "@/utils/connect_db";
import User from "@/models/user";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";
import { EncryptOrDecryptData } from "@/utils/cyphers";
import { jwtExpiries } from "@/uf.config";
import StandardApi from "@/middlewares/standard_api";
import UAParser from "ua-parser-js";

const Login = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { email, password, remember_me } = req.body;
    if (!email || !password || !password.length > 7) return res.status(400).json({ success: false, msg: 'You email or password is invalid.' })

    await ConnectDB()
    const currentUserAgent = req.headers['user-agent'];
    const parser = new UAParser(currentUserAgent);
    let user = await User.findOneAndUpdate({ $or: [{ email }, { username: email }] }, { user_agent: SignJwt(currentUserAgent) }, { new: true, lean: true }).select("+password")
    if (!user) return res.status(404).json({ success: false, msg: "User not found, please create an account" })
    if (user.register_provider !== req.body.register_provider) return res.status(409).json({ success: false, msg: `This account is associated with ${user.register_provider}` })
    const originalPassword = EncryptOrDecryptData(user.password, false)
    if (password !== originalPassword) return res.status(401).json({ success: false, msg: "Your password is incorrect" })
    if (user.two_fa_activation_date && user.two_fa_enabled) {
        return res.json({
            success: true,
            msg: "",
            redirect_url: `/auth/confirm-2fa-totp?user_id=${user._id}`,
        })
    }
    else if (!user.two_fa_enabled) {
        SetSessionCookie(req, res, {
            _id: user._id,
            username: user.username,
            email: user.email,
            register_provider: user.register_provider,
            user_agent: user.user_agent,
            timezone: user.timezone,
            two_fa_enabled: user.two_fa_enabled,
            uf_wallet: user.uf_wallet,
            last_checkin: user.last_checkin,
            createdAt: user.createdAt,
            ...(user.two_fa_activation_date && { two_fa_activation_date: user.two_fa_activation_date }),
            ...(user.role && { role: user.role })
        }, (remember_me && remember_me === true) ? jwtExpiries.extended : jwtExpiries.default);
        delete user.two_fa_secret;
        delete user.password;

        res.status(200).json({
            success: true,
            msg: "You are Logged in successfully !",
            payload: SignJwt(user)
        })
        const date = new Date()
        sendNotification(user._id, {
            category: "account",
            heading: "Login",
            type: "login",
            mini_msg: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
            message: `You logged in to your Urban Fits account through ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name} at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`
        }, { notify: true, notifySilently: true })
        sendAdminNotification({
            category: "user",
            data: {
                title: "User login",
                msg: `A user ${user.username} just logged in with urbanfits provider through ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name}.`,
                href: "/user/userlist"
            }
        })
    }
})
export default Login