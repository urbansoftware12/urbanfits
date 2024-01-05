import ConnectDB from "@/utils/connect_db";
import WeeklyCheckinPointsHistory from "@/models/weekly_checkin_history"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const GetUFPointsHistory = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id, card_number } = req.query
            if (!mongoose.Types.ObjectId(user_id) || card_number.length < 18) return res.status(403).json({ success: false, msg: "Valid user id and card number are required. Query parameters: user_id, card_number" })
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

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default GetUFPointsHistory