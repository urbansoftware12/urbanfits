import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import StandardApi from "@/middlewares/standard_api";

const getManyUsers = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    const { limit } = req.query;
    await ConnectDB()
    const LIMIT = +limit || 50;
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
})
export default getManyUsers