import mongoose from "mongoose";

const UserAssociateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    used_coupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    }],
    orders_counts: Number

}, { timestamps: true })

export default mongoose.models.UserAssociates || mongoose.models('UserAssociates', UserAssociateSchema)