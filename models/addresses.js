import mongoose from "mongoose";
import { immutableCondition } from "@/utils/connect_db";
import { UAEStates } from "@/uf.config";

const addressProps = {
    address_title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    apt_suite: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true, enum: Object.keys(UAEStates), default: Object.keys(UAEStates)[0] },
    phone_prefix: { type: String, required: true },
    phone_number: { type: String, required: true }
}

const AddressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        immubtable: immutableCondition
    },
    address1: addressProps,
    address2: addressProps
}, { timestamps: true })

module.exports = mongoose.models.Addresses || mongoose.model("Addresses", AddressSchema)