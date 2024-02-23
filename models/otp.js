import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    new_email: {
        type: String,
    },
    new_password: {
        type: String,
    },
    email: {
        type: String,
    },
    new_user: {
        username: String,
        firstname: String,
        lastname: String,
        gender: String,
        phone_prefix: String,
        phone_number: String,
        email: String,
        password: String,
    },
    expireAt: {
        type: Date,
        expires: 300,
        default: Date.now()
    }
}, {strict: false})
export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema)