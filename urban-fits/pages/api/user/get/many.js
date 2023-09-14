import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import mongoose from "mongoose";

const getManyUsers = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { user_id } = req.query
            if (!user_id || !mongoose.Types.ObjectId(user_id)) return res.status(400).json({ success: false, msg: "A valid user id required. Query parameters: user_id, page (optional, default: 1)" })
            await ConnectDB()
            let user = await User.findById(user_id)
            if (!user || user.role !== "administrator") return res.status(400).json({ success: false, msg: "The user with corresponding id must exist and should be administrator to access this data." })

            const LIMIT = 50;
            let totalUsers = await User.countDocuments();

            const totalPages = Math.ceil(totalUsers / LIMIT);
            const page = parseInt(req.query.page) || 1;
            const skipUsers = (page - 1) * LIMIT;
            const users = await User.find()
                .sort({ createdAt: -1 })
                .skip(skipUsers)
                .limit(LIMIT)

            res.status(200).json({
                length: users.length,
                totalUsers,
                totalPages,
                currentPage: page,
                users
            })
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: GET" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: err, msg: "Internal Server Error occurred. Please retry later." })
    }
}
export default getManyUsers