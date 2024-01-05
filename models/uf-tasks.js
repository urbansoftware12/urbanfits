import mongoose from "mongoose";

const UfTasksSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tasks: [
        {
            name: {
                type: String,
                required: true
            },
            description: String,
            completed: {
                type: Boolean,
                default: false,
                required: true
            },
            reward: Number,
            image: String,
            need_image: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true })

export default mongoose.models.UfTasks || mongoose.model("UfTasks", UfTasksSchema)