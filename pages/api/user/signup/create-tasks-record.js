import ConnectDB from "@/utils/connect_db"
import mongoose from "mongoose"
import UfTasks from "@/models/uf-tasks"
import { DefaultTasks } from "@/uf.config"

const CreateTasksRecord = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { user_id } = req.query
            if (mongoose.Types.ObjectId.isValid(user_id)) return res.status(401).json({
                success: false,
                msg: "A valid user_id is required."
            })
            await ConnectDB()

            await UfTasks.create({
                user_id,
                tasks: DefaultTasks
            })
            res.status(200).end()

        } else return res.status(400).json({ success: false, msg: "Method not allowed, Allowed Methods: POST" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default CreateTasksRecord