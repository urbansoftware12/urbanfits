import ConnectDB from "@/utils/connect_db"
import speakeasy from 'speakeasy';
import User from "@/models/user";
import StandardApi from "@/middlewares/standard_api";
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";

const CreateUser2FA = async (req, res) => StandardApi(req, res, { method: "POST" }, async () => {
    const { qr_secret, totp_code } = req.body;
    const user_id = req.user._id;
    if (!user_id) return res.status(401).json({ success: false, msg: "All valid parameters required. Body Parameters: user_id, qr_secret, totp_code" })

    await ConnectDB()
    const verified = speakeasy.totp.verify({
        secret: qr_secret,
        encoding: 'base32',
        token: totp_code,
    });

    if (verified) {
        const user = await User.findByIdAndUpdate(user_id, {
            two_fa_secret: qr_secret,
            two_fa_enabled: true,
            two_fa_activation_date: new Date()
        }, { new: true, _immutability: "disable", lean: true });

        SetSessionCookie(req, res, {
            _id: user._id,
            username: user.username,
            email: user.email,
            register_provider: user.register_provider,
            user_agent: user.user_agent,
            timezone: user.timezone,
            two_fa_enabled: user.two_fa_enabled,
            two_fa_activation_date: user.two_fa_activation_date,
            uf_wallet: user.uf_wallet,
            last_checkin: user.last_checkin,
            createdAt: user.createdAt,
            ...(user.role && { role: user.role })
        }, res.user.exp);
        delete user.two_fa_secret;
        delete user.password;

        return res.status(201).json({
            success: true,
            msg: "2 Factor Authentication is Enabled",
            payload: SignJwt(user)
        })
    }
    else return res.status(401).json({
        success: false,
        msg: "Your code is either wrong or expired. Please try again."
    })
})
export default CreateUser2FA