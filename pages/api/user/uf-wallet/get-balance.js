import ConnectDB from "@/utils/connect_db";
import StandardApi from "@/middlewares/standard_api";
import { GetUFBalance } from "@/utils/uf-points";

const UFBalance = async (req, res) => StandardApi(req, res, {}, async () => {
    const { card_number } = req.query;
    if (card_number.length < 18) return res.status(403).json({ success: false, msg: "A valid user card number is required. Query parameters: card_number" })
    await ConnectDB()

    const balance = await GetUFBalance(req.user._id, card_number, req.user.timezone);
    res.status(200).json({
        success: true,
        msg: '',
        balance,
        worth: balance * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE)
    })
})
export default UFBalance