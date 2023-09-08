import ConnectDB from "@/utils/connect_db"
import speakeasy from 'speakeasy';
import User from "@/models/user";
import jwt from 'jsonwebtoken';

const VerfiyTotp = async (req, res) => {
    try {
        if (req.method === 'GET') {
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
                delete user.two_fa_secret
                delete user.password
                const payload = jwt.sign({ ...user }, process.env.SECRET_KEY, { algorithm: 'HS256' })
                return res.status(200).json({
                    success: true,
                    msg: "You are signed in successfully!",
                    payload
                })
            }
            else return res.status(500).json({
                success: false,
                msg: "The code is either wrong or expired. Please try again."
            })
        }
        else res.status(405).json({ success: false, msg: "bad request, you are using wrong request method!" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default VerfiyTotp