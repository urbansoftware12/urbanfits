import ConnectDB from "@/utils/connect_db";
import WeeklyCheckinPointsHistory from "@/models/weekly_checkin_history"
import StandardApi from "@/middlewares/standard_api";

const GetUFPointsHistory = async (req, res) => StandardApi(req, res, {}, async () => {
    const { card_number } = req.query;
    const user_id = req.user._id;
    if (card_number.length < 18) return res.status(403).json({ success: false, msg: "A valid user card number is required. Query parameters: card_number" })
    await ConnectDB()

    const historyDocs = await WeeklyCheckinPointsHistory.find({
        user_id,
        card_number
    }).sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        msg: '',
        history: historyDocs
    })
})
export default GetUFPointsHistory