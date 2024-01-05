import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    shipping_address: {
        type: Object,
        default: null,
        properties: {
            address_title: { type: String, required: true },
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            address: { type: String, required: true },
            apt_suite: { type: String },
            city: { type: String, required: true },
            country: { type: String, required: true },
            phone_prefix: { type: String, required: true },
            phone_number: { type: String, required: true }
        }
    },
    billing_address: {
        type: Object,
        default: null,
        properties: {
            address_title: { type: String, required: true },
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            address: { type: String, required: true },
            apt_suite: { type: String },
            city: { type: String, required: true },
            country: { type: String, required: true },
            phone_prefix: { type: String, required: true },
            phone_number: { type: String, required: true }
        }
    }
}, { timestamps: true })

module.exports = mongoose.models.Addresses || mongoose.model("Addresses", AddressSchema)