import mongoose from "mongoose"

const ShoppingListSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]

}, { timestamps: true })

export default mongoose.models.Shoppinglist || mongoose.model("Shoppinglist", ShoppingListSchema)