import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import { sendNotification } from "@/utils/send_notification"
import StandardApi from "@/middlewares/standard_api";

const RsetUser2fa = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    await ConnectDB()
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
})

export default RsetUser2fa