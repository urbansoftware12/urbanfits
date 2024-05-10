import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import StandardApi from "@/middlewares/standard_api";

const getManyUsers = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB()
    const online_users = await User.countDocuments({ is_active: true })

    res.status(200).json({
        success: true,
        online_users
    })
})
export default getManyUsers