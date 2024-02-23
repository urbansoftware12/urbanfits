import ConnectDB from "@/utils/connect_db"
import { OAuth2Client } from 'google-auth-library';
import User from "@/models/user";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification"
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";
import StandardApi from "@/middlewares/standard_api"
import UAParser from "ua-parser-js";

const LoginWithGoogle = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { token } = req.body;
    if (!token || token.length < 20) return res.status(400).json({ success: false, msg: "A valid google token as `credential` is required." })

    const googleClient = new OAuth2Client(process.env.CLIENT_ID);
    let ticket;
    try {
        ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        });
    } catch (e) { return res.status(401).json({ success: false, msg: "Invalid token, user unauthorized. Please try logging in again with valid google account." }) }
    const { name, email, picture } = ticket.getPayload();

    await ConnectDB();
    const currentUserAgent = req.headers['user-agent']
    const parser = new UAParser(currentUserAgent)
    let user = await User.findOneAndUpdate({ email }, { image: picture, user_agent: SignJwt(currentUserAgent) }, { new: true, lean: true });
    if (!user) return res.status(404).json({ success: false, msg: "User not found, please signup for a new account." });
    else if (user.two_fa_activation_date && user.two_fa_enabled) return res.json({
        success: true,
        msg: "",
        redirect_url: `/auth/confirm-2fa-totp?user_id=${user._id}`,
    })
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
    });

    res.status(200).json({
        success: true,
        msg: "You are Resgistered successfully !",
        payload: SignJwt(user)
    })
    const date = new Date()
    sendNotification(user._id, {
        category: "account",
        heading: "Login",
        type: "login",
        mini_msg: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
        message: `You logged in to your Urban Fits account through ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name} at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`
    }, { notify: true })
    sendAdminNotification({
        category: "user",
        data: {
            title: "User login",
            msg: `A user ${user.username} just logged in with google through ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name}.`,
            href: "/user/userlist"
        }
    })
})
export default LoginWithGoogle