import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import GuestUser from "@/models/guest_user";
import StandardApi from "@/middlewares/standard_api";

const getManyUsers = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB()
    const usersCount1 = await User.countDocuments({ is_active: true })
    const usersCount2 = await GuestUser.countDocuments()

    res.status(200).json({
        success: true,
        online_users: usersCount1 + usersCount2
    })
})
export default getManyUsers