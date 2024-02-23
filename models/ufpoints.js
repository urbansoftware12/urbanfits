import mongoose from "mongoose";

const UFpointsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    card_number: {
        type: String,
        required: true,
        immutable: true
    },
    actual_points: {
        type: Number,
        required: true,
        immutalbe: true,
        default: 0
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    worth: Number,
    total_balance: {
        type: Number,
        required: true
    },
    spent: {
        type: Number,
        default: 0
    },
    source: {
        type: String,
        required: true,
        enum: ["daily_checkin", "prize_wheel", "signup", "place_order", "uf_task", "additional_reward", "deduction"]
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    expiration_date: Date,
}, { timestamps: true });

UFpointsSchema.pre('save', function (next) {
    this.worth = this.points * process.env.UF_POINT_RATE;
    next();
});

export default mongoose.models.UFpoints || mongoose.model('UFpoints', UFpointsSchema);