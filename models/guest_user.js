import mongoose from "mongoose"

const GuestUserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    }
}, { timestamps: true, strict: false })

module.exports = mongoose.models.GuestUser || mongoose.model("GuestUser", GuestUserSchema)