import mongoose from "mongoose";

const UFpointsHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    earned: Number,
    spent: Number,
    balance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.UFpoints_history || mongoose.model('UFpoints_history', UFpointsHistorySchema);