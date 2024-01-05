import ConnectDB from "@/utils/connect_db";
import UfPoints from "@/models/ufpoints"
import UFpointsHistory from "@/models/ufpoints_history"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const GetUFWheelHistory = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id, card_number } = req.query
            if (!mongoose.Types.ObjectId(user_id) || card_number.length < 18) return res.status(403).json({ success: false, msg: "Valid user id and card number are required. Query parameters: user_id, card_number" })
            await ConnectDB()

            let historyDocs = await UfPoints.find({
                user_id,
                card_number,
                source: "prize_wheel"
            }).sort({ createdAt: -1 }).limit(5).lean()

            // const balanceHistory = await UFpointsHistory.find({
            //     updatedAt: {
            //         $in: historyDocs.map(hDoc => hDoc.updatedAt)
            //     }
            // }).sort({ updatedAt: -1 })
            // console.log("here is the b-history", balanceHistory)

            const newHistoryDocs = []
            for (let doc of historyDocs) {
                const docDate = new Date(doc.updatedAt)
                const respectedHistory = await UFpointsHistory.findOne({
                    updatedAt: {
                        $gt: new Date(docDate.setHours(0, 0, 0, 0)),
                        $lt: new Date(docDate.setHours(23, 59, 59, 999))
                    }
                }).sort({ updatedAt: -1 }).lean()
                // doc.balance = balanceHistory.find(history => history.updatedAt == doc.updatedAt)
                // doc.balance = respectedHistory?.balance || 0
                newHistoryDocs.push({
                    ...doc,
                    balance: respectedHistory?.balance || 0
                })
            }
            console.log(historyDocs)

            res.status(200).json({
                success: true,
                msg: '',
                history: newHistoryDocs
            })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default GetUFWheelHistory