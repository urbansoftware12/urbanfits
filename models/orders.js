import mongoose from "mongoose"
import { shippingRates, paymentOptions, orderStatuses } from "@/uf.config";
import { getDateOfTimezone } from "@/utils/cyphers";

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    email: String,
    order_status: {
        status: {
            type: String,
            enum: Object.keys(orderStatuses)
        },
        group: {
            type: String,
            enum: Object.values(orderStatuses).map(status => status.group)
        }
    },
    stage: String,
    tracking_number: String,
    tracking_url: String,
    shipping_labe_url: String,
    shipping_label_url: String,
    order_items: [
        {
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            variant_id: mongoose.Schema.ObjectId,
            variant: String,
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            size: String,
            sku: String,
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            weight: String
        },
    ],
    gift_cards: [],
    shipping_address: {
        address_title: String,
        firstname: String,
        lastname: String,
        address: String,
        apt_suite: String,
        city: String,
        country: String,
        phone_prefix: String,
        phone_number: String,
    },
    coupon: Object,
    earned_points: Number,
    gift_card: Object,
    points_used: Number,
    shippping_method: {
        type: String,
        required: true,
        enum: Object.keys(shippingRates)
    },
    payment_method: {
        type: String,
        required: true,
        enum: Object.keys(paymentOptions)
    },
    discounts: {
        points: { type: Number, default: 0 },
        coupon: { type: Number, default: 0 },
        gift_card: { type: Number, default: 0 },
        payment: { type: Number, default: 0 }
    },
    price_details: {
        paid_at: Date,
        total: {
            type: Number,
            required: true
        },
        sub_total: {
            type: Number,
            required: true
        },
        shipping_fees: {
            type: Number,
            required: true,
            default: 0
        },
        total_discount: {
            type: Number,
            default: 0
        }
    },
    month: {
        type: String,
        required: true,
        default: months[getDateOfTimezone().getMonth()]
    },
    year: {
        type: Number,
        required: true,
        default: getDateOfTimezone().getFullYear()
    }
}, { timestamps: true });

export const getOrderStatus = (status) => ({ status, group: orderStatuses[status.toUpperCase()].group });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);