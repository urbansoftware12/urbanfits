import ConnectDB from "@/utils/connect_db";
import speakeasy from 'speakeasy';
import User from "@/models/user";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";
import { jwtExpiries } from "@/uf.config";
import StandardApi from "@/middlewares/standard_api";

const VerfiyTotp = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { user_id, totp_code } = req.query
    if (!user_id || !totp_code) return res.status(401).json({ success: false, msg: "All valid parameters required. Query Parameters: user_id, totp_code" })

    await ConnectDB()
    let user = await User.findById(user_id).select('+two_fa_secret')
    if (!user) return res.status(404).json({ success: false, msg: "User does not exist." })
    if (!user.two_fa_secret || !user.two_fa_enabled) return res.status(400).json({ success: false, msg: "This user does not have 2FA enabled." })

    const verified = speakeasy.totp.verify({
        secret: user.two_fa_secret,
        encoding: 'base32',
        token: totp_code,
    });

    if (verified) {
        const parser = new UAParser(req.headers['user-agent']);
        delete user.two_fa_secret
        delete user.password
        SetSessionCookie(req, res, {
            _id: user._id,
            username: user.username,
            email: user.email,
            register_provider: user.register_provider,
            user_agent: user.user_agent,
            uf_wallet: user.uf_wallet,
            two_fa_enabled: user.two_fa_enabled,
            last_checkin: user.last_checkin,
            createdAt: user.createdAt,
            ...(user.role && { role: user.role }),
            ...(user.two_fa_activation_date && { two_fa_activation_date: user.two_fa_activation_date })
        }, (remember_me && remember_me === true) ? jwtExpiries.extended : jwtExpiries.default);

        res.status(200).json({
            success: true,
            msg: "You are signed in successfully!",
            payload: SignJwt(user)
        })
        const date = new Date()
        sendNotification(user._id, {
            category: "account",
            heading: "Login",
            type: "login",
            mini_msg: `You logged in to your Urban Fits account at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`,
            message: `You logged in to your Urban Fits account through ${parser.getOS()} - ${parser.getBrowser()} at ${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} ${date.getHours() + ":" + date.getMinutes()}`
        }, { notify: true, notifySilently: true })
        sendAdminNotification({
            category: "user",
            data: {
                title: "User login",
                msg: `A user ${user.username} just logged in with urbanfits provider through ${parser.getOS().name}${parser.getOS().version} - ${parser.getBrowser().name}.`,
                href: "/user/userlist"
            }
        })
    }
    else return res.status(500).json({
        success: false,
        msg: "The code is either wrong or expired. Please try again."
    })
})
export default VerfiyTotp