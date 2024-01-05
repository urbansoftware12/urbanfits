import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const getManyUsers = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const admin_id = verifyAdminToken(req, res)
            const { user_to_get } = req.query
            if (!mongoose.Types.ObjectId(user_to_get)) return res.status(400).json({ success: false, msg: "A valid user id required. Query parameters: user_to_get" })

            await ConnectDB()
            let admin = await User.findById(admin_id)
            if (!admin || admin.role !== "administrator") return res.status(400).json({ success: false, msg: "The user with corresponding id must exist and should be administrator to access this data." })

            const userToGet = await User.findById(user_to_get)
            if (!userToGet) return res.status(404).json({ success: false, msg: "The user with corresponding id does not exist." })
            delete userToGet.password

            res.status(200).json({
                success: true,
                user: userToGet
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