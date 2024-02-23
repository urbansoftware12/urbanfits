import mongoose from "mongoose"

const AdminNotificationsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["user", "order", "product", "system"]
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    },
    seen_by: {
        admin_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    },
    data: {
        title: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["success", "info", "error"],
            default: "info"
        },
        description: String,
        href: String
    }
}, { timestamps: true })

export default mongoose.models["admin-notifications"] || mongoose.model("admin-notifications", AdminNotificationsSchema)