import mongoose from "mongoose"

const addressObject = {
    address_title: String,
    firstname: String,
    lastname: String,
    address: String,
    apt_suite: String,
    city: String,
    country: String,
    phone_prefix: String,
    phone_number: String,
}
const OrderSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    email: String,
    order_status: {
        type: String,
        enum: ['pending', 'shipped', 'readytoship', 'returned', 'delivered'],
        default: 'pending',
    },
    order_items: [
        {
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            variant_id: mongoose.Schema.ObjectId,
            variant: String,
            size: String,
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            weight: String
        }
    ],
    gift_cards: [],
    shipping_address: addressObject,
    billing_address: addressObject,
    price_details: {
        paid_at: Date,
        currency: String,
        total_price: {
            type: Number,
            required: true,
            default: 0,
        },
        shipping_fees: {
            type: Number,
            required: true,
            default: 0,
        }
    }
}, { strict: false, timestamps: true })
export default mongoose.models.OrderSession || mongoose.model("OrderSession", OrderSessionSchema)