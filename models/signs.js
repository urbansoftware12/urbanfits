import mongoose from "mongoose";
import { signsTypes } from "@/uf.config";

const SignsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: signsTypes,
        default: signsTypes[0]
    },
    registered_users: Number,
    month: String,
    date: String,
    year: String
}, { timestamps: true })

export default mongoose.models.Signs || mongoose.model("Signs", SignsSchema)