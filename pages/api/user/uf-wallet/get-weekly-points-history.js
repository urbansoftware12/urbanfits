import ConnectDB from "@/utils/connect_db";
import WeeklyCheckinPointsHistory from "@/models/weekly_checkin_history"
import StandardApi from "@/middlewares/standard_api";
import { getDateOfTimezone } from "@/utils/cyphers";

const GetUFPointsHistory = async (req, res) => StandardApi(req, res, {}, async () => {
    const { card_number } = req.query;
    const { _id, timezone } = req.user;
    if (card_number.length < 18) return res.status(403).json({ success: false, msg: "A valid user card number is required. Query parameters: card_number" })
    await ConnectDB()

    const today = getDateOfTimezone(timezone)
    const currentWeekStart = getDateOfTimezone(timezone);
    currentWeekStart.setDate(today.getDate() - (today.getDay() + 7) % 8);

    const historyDocs = await WeeklyCheckinPointsHistory.find({
        user_id: _id,
        card_number,
        createdAt: {
            $gte: new Date(currentWeekStart)
        }
    }).sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        msg: '',
        history: historyDocs
    })
})
export default GetUFPointsHistory