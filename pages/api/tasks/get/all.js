import ConnectDB from "@/utils/connect_db"
import UfTasks from "@/models/uf-tasks";
import StandardApi from "@/middlewares/standard_api";

const getAllUsersTasks = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB()
    const LIMIT = 50;
    let totalTasks = await UfTasks.countDocuments();

    const totalPages = Math.ceil(totalTasks / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipTasks = (page - 1) * LIMIT;
    const tasks = await UfTasks.find()
        .sort({ createdAt: -1 })
        .skip(skipTasks)
        .limit(LIMIT)
        .populate("user_id")

    res.status(200).json({
        length: tasks.length,
        totalTasks,
        totalPages,
        currentPage: page,
        tasks
    })
})
export default getAllUsersTasks