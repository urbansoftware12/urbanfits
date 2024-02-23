import ConnectDB from "@/utils/connect_db"
import UfTasks from "@/models/uf-tasks";
import StandardApi from "@/middlewares/standard_api";

const getUserTasksViaAdmin = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    const { user_id } = req.query;
    if (!user_id) return res.status(403).json({ success: false, msg: "A valid user id is required." })
    await ConnectDB()
    const tasks = await UfTasks.findOne({ user_id }).populate("user_id")
    res.status(200).json({
        success: true,
        msg: '',
        tasks
    })
})
export default getUserTasksViaAdmin