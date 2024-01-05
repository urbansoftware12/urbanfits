import ConnectDB from "@/utils/connect_db"
import speakeasy from 'speakeasy';
import User from "@/models/user";
import jwt from 'jsonwebtoken'
import CorsMiddleware from "@/utils/cors-config"

const CreateUser2FA = async (req, res) => {
    await CorsMiddleware(req, res)
    try {
        if (req.method === 'POST') {
            const { user_id, qr_secret, totp_code } = req.body
            if (!user_id) return res.status(401).json({ success: false, msg: "All valid parameters required. Body Parameters: user_id, qr_secret, totp_code" })

            await ConnectDB()
            const verified = speakeasy.totp.verify({
                secret: qr_secret,
                encoding: 'base32',
                token: totp_code,
            });

            if (verified) {
                const updatedUser = await User.findByIdAndUpdate(user_id, {
                    two_fa_secret: qr_secret,
                    two_fa_enabled: true,
                    two_fa_activation_date: new Date()
                }, { new: true });
                const payload = jwt.sign({ ...updatedUser }, process.env.NEXT_PUBLIC_SECRET_KEY)
                return res.status(200).json({
                    success: true,
                    msg: "2 Factor Authentication is Enabled",
                    payload
                })
            }
            else return res.status(500).json({
                success: false,
                msg: "Your code is either wrong or expired. Please try again."
            })
        }
        else res.status(405).json({ success: false, msg: "bad request, you are using wrong request method!" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default CreateUser2FA