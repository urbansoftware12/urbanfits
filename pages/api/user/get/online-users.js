import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import GuestUser from "@/models/guest_user";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const getManyUsers = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const admin_id = verifyAdminToken(req, res)
            // const { user_id } = req.query
            // if (!user_id || !mongoose.Types.ObjectId(user_id)) return res.status(400).json({ success: false, msg: "A valid user id required. Query parameters: user_id" })
            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(400).json({ success: false, msg: "The user with corresponding id must exist and should be administrator to access this data." })

            const usersCount1 = await User.countDocuments({ is_active: true })
            const usersCount2 = await GuestUser.countDocuments()

            res.status(200).json({
                success: true,
                online_users: usersCount1 + usersCount2
            })
        }
        else return res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default getManyUsers