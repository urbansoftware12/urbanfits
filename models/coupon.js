import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coupon_code: {
        type: String,
        required: true,
        select: false
    },
    description: String,
    coupon_value: {
        type: Number,
        required: true
    },
    coupon_config: {
        minimum_spend: Number,
        maximum_spend: Number,
        free_shipping: Boolean,
        individual_use: Boolean,
        exclude_sales: Boolean,
        allowed_products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        exclude_products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],

        allowed_categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
        exclude_categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
        allowed_emails: [String],
        coupon_usage_limit: Number,
        user_usage_limit: Number
    },
    expiration_date: Date

}, { timestamps: true })

CouponSchema.index({ expiration_date: 1 }, { expireAfterSeconds: 0 });
export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema)