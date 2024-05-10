import ConnectDB from "@/utils/connect_db";
import Signs from "@/models/signs";
import StandardApi from "@/middlewares/standard_api";

const Last60minActivity = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    await ConnectDB();

    const currentDate = new Date();
    let past_60_min_activity = [];
    const timestamps = [10, 20, 30, 40, 50, 60];

    for (let mins of timestamps) {
        const activity_count = await Signs.countDocuments({
            createdAt: { $gte: new Date(currentDate.setMinutes(currentDate.getMinutes() - mins)) }
        })
        past_60_min_activity.push({
            mins,
            activity_count
        })
    }
    res.status(201).json({ success: true, msg: '', past_60_min_activity })
})
export default Last60minActivity;