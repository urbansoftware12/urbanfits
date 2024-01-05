import mongoose from "mongoose"

const GiftcardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    customer_email: {
        type: String,
        required: true
    },
    reserved: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
    },
    gift_code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.models.Giftcard || mongoose.model("Giftcard", GiftcardSchema)