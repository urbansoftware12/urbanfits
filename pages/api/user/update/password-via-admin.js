import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const UpdateUserPasswordViaAdmin = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            const { user_id, admin_password, new_password, confirm_password } = req.body
            if ( !user_id || !admin_password || !new_password || !confirm_password) return res.status(403).json({ success: false, msg: "All valid body parameters are required. Query parameters: user_id, admin_password, new_password, confirm_password" })
            else if (new_password !== confirm_password) return res.status(400).json({ success: false, msg: "new_password and confirm_password parameters must be same." })

            await ConnectDB()
            let admin = await User.findById(admin_id)
            if (!admin || admin.role !== "administrator") return res.status(403).json({ success: false, msg: "Only admin users can access and perform operations on this data." })
            const originalAdminPassword = CryptoJS.AES.decrypt(admin.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8)
            if (admin_password !== originalAdminPassword) return res.status(403).json({ success: false, msg: "Your password is incorrect." })

            let user = await User.findById(user_id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            if (user.register_provider !== "urbanfits") return res.status(404).json({ success: false, msg: "This user signed up with google therefore the password cannot be assigned." })
            const newUserPassword = CryptoJS.AES.encrypt(confirm_password, process.env.NEXT_PUBLIC_SECRET_KEY).toString()
            await User.findByIdAndUpdate(user_id, {
                password: newUserPassword
            })

            res.status(200).json({
                success: true,
                msg: `${user.username}'s password updated successfully.`
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default UpdateUserPasswordViaAdmin