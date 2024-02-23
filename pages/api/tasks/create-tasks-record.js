import ConnectDB from "@/utils/connect_db"
import mongoose from "mongoose"
import UfTasks from "@/models/uf-tasks"
import { DefaultTasks } from "@/uf.config"
import StandardApi from "@/middlewares/standard_api"

const CreateTasksRecord = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { user_id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(401).json({
        success: false,
        msg: "A valid user_id is required."
    })
    await ConnectDB()
    await UfTasks.create({
        user_id,
        tasks: DefaultTasks
    })
    res.status(200).end()
})
export default CreateTasksRecord