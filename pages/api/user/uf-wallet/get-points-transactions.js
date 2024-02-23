import ConnectDB from "@/utils/connect_db";
import UFpoints from "@/models/ufpoints"
import StandardApi from "@/middlewares/standard_api";

const GetUFPointsHistory = async (req, res) => StandardApi(req, res, {}, async () => {
    const { card_number, limit = 150 } = req.query;
    const user_id = req.user._id;
    if (card_number.length < 18) return res.status(403).json({ success: false, msg: "A valid user card number is required. Query parameters: card_number" })
    await ConnectDB()

    const historyDocs = await UFpoints.find({
        user_id,
        card_number
    }).sort({ _id: -1 }).limit(limit)

    res.status(200).json({
        success: true,
        msg: '',
        history: historyDocs
    })
})
export default GetUFPointsHistory