import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String
    },
    path: {
        type: String,
        unique: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    description: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.models.Category || mongoose.model("Category", CategorySchema)