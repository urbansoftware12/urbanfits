import mongoose from "mongoose";

const WeeklyCheckinPointsHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true,
        default: new Date(new Date(new Date().setDate(new Date().getDate() + (8 - new Date().getDay()))).setHours(0, 0, 0))
    },
}, { timestamps: true });

WeeklyCheckinPointsHistorySchema.index({ expiration_date: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.WeeklyCheckinPointsHistory || mongoose.model('WeeklyCheckinPointsHistory', WeeklyCheckinPointsHistorySchema);