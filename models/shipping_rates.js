import mongoose from "mongoose"

const ShippingRatesSchema = new mongoose.Schema({
    standard_shipping: {
        uae_rate: { type: Number, required: true },
        ksa_rate: { type: Number, required: true },
        pk_rate: { type: Number, required: true },
        additional_kg_charge: {
            uae: { type: Number, required: true },
            ksa: { type: Number, required: true },
            pk: { type: Number, required: true }
        },
        shipping_timespan: {
            uae_shipping: { type: String, required: true },
            ksa_shipping: { type: String, required: true },
            pk_shipping: { type: String, required: true }
        }
    },
    express_shipping: {
        ksa_rate: { type: Number, required: true },
        pk_rate: { type: Number, required: true },
        additional_kg_charge: {
            ksa: { type: Number, required: true },
            pk: { type: Number, required: true }
        },
        shipping_timespan: {
            ksa_shipping: { type: String, required: true },
            pk_shipping: { type: String, required: true }
        }
    },
    free_shipping: {
        uae_order_rate: { type: Number, required: true },
        ksa_order_rate: { type: Number, required: true },
        pk_order_rate: { type: Number, required: true },
        shipping_timespan: {
            uae_shipping: { type: String, required: true },
            ksa_shipping: { type: String, required: true },
            pk_shipping: { type: String, required: true }
        }
    }

}, { timestamps: true })
module.exports = mongoose.models.Shipping_rates || mongoose.model("Shipping_rates", ShippingRatesSchema)