import ConnectDB from "@/utils/connect_db";
import UFpoints from "@/models/ufpoints"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const GetUFBalance = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id, card_number } = req.query
            if (!mongoose.Types.ObjectId(user_id) || card_number.length < 18) return res.status(403).json({ success: false, msg: "Valid user id and card number are required. Query parameters: user_id, card_number" })
            await ConnectDB()

            const pointsDocs = await UFpoints.find({ user_id, card_number })
            const totalPoints = pointsDocs.reduce((prevTotal, currentObj) => { return prevTotal + currentObj.points }, 0)

            res.status(200).json({
                success: true,
                msg: '',
                balance: totalPoints,
                worth: totalPoints * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE)
            })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default GetUFBalance