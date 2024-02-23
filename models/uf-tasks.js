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
                required: true,
                immutable: true
            },
            title: {
                type: String,
                required: true,
                immutable: true
            },
            description: String,
            type: {
                type: String,
                default: 'in_app',
                enum: ['in_app', 'social'],
                immutable: true
            },
            reward: {
                type: Number,
                immutable: true
            },
            image: String,
            image_submitted: Boolean,
            need_image: {
                type: Boolean,
                default: false,
                immutable: true
            },
            link: {
                type: String,
                immutable: true
            },
            completed: {
                type: Boolean,
                default: false,
                required: true
            }
        }
    ]
}, { timestamps: true })

export default mongoose.models.UfTasks || mongoose.model("UfTasks", UfTasksSchema)