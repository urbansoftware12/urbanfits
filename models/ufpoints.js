import mongoose from "mongoose";

const UFpointsSchema = new mongoose.Schema({
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
    worth: Number,
    source: {
        type: String,
        required: true,
        enum: ["daily_checkin", "prize_wheel", "signup", "place_order", "additional_reward"]
    },
    expiration_date: Date,
}, { timestamps: true });

UFpointsSchema.pre('save', function (next) {
    if (this.points !== null && this.points !== undefined) {
        this.worth = this.points * process.env.UF_POINT_RATE;
    }
    next();
});

UFpointsSchema.index({ expiration_date: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.UFpoints || mongoose.model('UFpoints', UFpointsSchema);