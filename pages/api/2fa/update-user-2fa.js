import ConnectDB from "@/utils/connect_db"
import speakeasy from 'speakeasy';
import User from "@/models/user";
import jwt from 'jsonwebtoken';
const CryptoJS = require("crypto-js")
import sendNotification from "@/utils/send_notification";
import CorsMiddleware from "@/utils/cors-config"

const Update2FA = async (req, res) => {
    await CorsMiddleware(req, res)
    try {
        if (req.method === 'PUT') {
            const { user_id, totp_code, two_fa_enabled, password } = req.body
            if (!user_id || !totp_code || two_fa_enabled === undefined || !password) return res.status(400).json({ success: false, msg: "All valid parameters required. Query Parameters: user_id, totp_code, two_fa_enabled (boolean to be set)" })

            await ConnectDB()
            let user = await User.findById(user_id).select('+two_fa_secret')
            if (!user) return res.status(404).json({ success: false, msg: "User with provided user_id does not exist." })
            if (!user.two_fa_secret || !user.two_fa_activation_date) return res.status(400).json({ success: false, msg: "This user does not have registered 2FA." })

            const verified = speakeasy.totp.verify({
                secret: user.two_fa_secret,
                encoding: 'base32',
                token: totp_code,
            });

            const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
            if (originalPassword !== password) return res.status(401).json({ success: false, msg: "Your password is incorrect." })

            if (verified && originalPassword === password) {
                delete user.two_fa_secret
                delete user.password
                const updatedUser = await User.findByIdAndUpdate(user_id, { two_fa_enabled }, { new: true })
                const payload = jwt.sign({ ...updatedUser }, process.env.NEXT_PUBLIC_SECRET_KEY)
                res.status(200).json({
                    success: true,
                    msg: `Your 2FA has been ${updatedUser.two_fa_enabled ? "enabled" : "disabled"} successfully.`,
                    payload
                })
                await sendNotification(updatedUser._id, {
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
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default Update2FA