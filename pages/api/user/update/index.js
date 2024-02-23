import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import { SignJwt, SetSessionCookie } from "@/utils/cyphers"
import { sendNotification } from "@/utils/send_notification"
import StandardApi from "@/middlewares/standard_api"

const UpdateUser = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const id = req.user._id;
    await ConnectDB()
    let user = await User.findByIdAndUpdate(id, req.body, { new: true, lean: true });

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
    }, req.user.exp);

    res.status(200).json({
        success: true,
        msg: `Your data has been updated successfully`,
        payload: SignJwt(user)
    })
    sendNotification(user._id, {
        category: "account",
        heading: "User Data Updated",
        type: "user-data",
        mini_msg: `You updated your profile data.`,
        message: `You updated your profile data.`,
    }, { notify: true, notifySilently: true })
})
export default UpdateUser