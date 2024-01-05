import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import sendNotification from "@/utils/send_notification"
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const RsetUser2fa = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            // const { admin_id, user_id } = req.query
            // if (!admin_id || !user_id) return res.status(403).json({ success: false, msg: "User and Admin id is required. Query parameters: user_id, admin_id" })
            await ConnectDB()
            let admin = await User.findById(admin_id)
            if (!admin || admin.role !== "administrator") return res.status(403).json({ success: false, msg: "Only admin users can access and perform operations." })

            let user = await User.findById(user_id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })

            user.two_fa_activation_date = undefined
            user.two_fa_secret = undefined
            user.two_fa_enabled = false
            await user.save()
            res.status(200).json({
                success: true,
                msg: `${user.username}'s 2FA has been reset.`,
                user
            })
            await sendNotification(user_id, {
                category: "account",
                heading: "2FA Reset",
                mini_msg: "Your 2FA was reset by Urban Fits team.",
                type: "2fa",
                message: "Your 2FA has been reset by Urban Fits team. Please register again to enable 2FA.",
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default RsetUser2fa