import ConnectDB from "@/utils/connect_db"
import speakeasy from 'speakeasy';
import User from "@/models/user";
import { sendNotification } from "@/utils/send_notification";
import { SignJwt, EncryptOrDecryptData, SetSessionCookie } from "@/utils/cyphers";
import StandardApi from "@/middlewares/standard_api";

const Update2FA = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { totp_code, two_fa_enabled, password } = req.body;
    const user_id = req.user._id;
    if (!totp_code || two_fa_enabled === undefined || !password) return res.status(400).json({ success: false, msg: "All valid parameters required. Query Parameters: user_id, totp_code, two_fa_enabled (boolean to be set)" })

    await ConnectDB()
    let user = await User.findById(user_id).select('+two_fa_secret')
    if (!user) { res.clearCookie('session-token'); res.clearCookie('is_logged_in'); return res.status(404).json({ success: false, msg: "User with provided user_id does not exist." }) }
    if (!user.two_fa_secret || !user.two_fa_activation_date) return res.status(400).json({ success: false, msg: "This user does not have registered the 2FA." })

    const verified = speakeasy.totp.verify({
        secret: user.two_fa_secret,
        encoding: 'base32',
        token: totp_code,
    });

    const originalPassword = EncryptOrDecryptData(user.password, false)
    if (originalPassword !== password) return res.status(401).json({ success: false, msg: "Your password is incorrect." })

    if (verified && originalPassword === password) {
        const updatedUser = await User.findByIdAndUpdate(user_id, { two_fa_enabled: !res.user.two_fa_enabled }, { new: true, _immutability: "disable", lean: true })

        SetSessionCookie(req, res, {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            register_provider: updatedUser.register_provider,
            user_agent: updatedUser.user_agent,
            timezone: user.timezone,
            two_fa_enabled: updatedUser.two_fa_enabled,
            two_fa_activation_date: updatedUser.two_fa_activation_date,
            uf_wallet: updatedUser.uf_wallet,
            last_checkin: updatedUser.last_checkin,
            createdAt: updatedUser.createdAt,
            ...(updatedUser.role && { role: updatedUser.role })
        }, res.user.exp);
        delete user.two_fa_secret;
        delete user.password;

        res.status(200).json({
            success: true,
            msg: `Your 2FA has been ${updatedUser.two_fa_enabled ? "enabled" : "disabled"} successfully.`,
            payload: SignJwt(updatedUser)
        })
        sendNotification(updatedUser._id, {
            category: "account",
            heading: updatedUser.two_fa_enabled ? "2FA Enabled" : "2FA Disabled",
            type: "2fa",
            mini_msg: `Your 2 Factor Authentication was ${updatedUser.two_fa_enabled ? "enabled" : "disabled"} successfully.`,
            message: `Your 2 Factor Authentication was ${updatedUser.two_fa_enabled ? "enabled" : "disabled"} successfully.`,
        }, { notify: true, notifySilently: true })
    }
    else return res.status(401).json({
        success: false,
        msg: "The code is either wrong or expired. Please try again."
    })
})
export default Update2FA