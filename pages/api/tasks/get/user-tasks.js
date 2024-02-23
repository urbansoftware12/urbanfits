import ConnectDB from "@/utils/connect_db"
import UfTasks from "@/models/uf-tasks";
import StandardApi from "@/middlewares/standard_api";

const getUserTasks = async (req, res) => StandardApi(req, res, {}, async () => {
    await ConnectDB()
    const user_id = req.user._id;
    const tasks = await UfTasks.findOne({ user_id }).populate("user_id")
    res.status(200).json({
        success: true,
        msg: '',
        tasks
    })
})
export default getUserTasks