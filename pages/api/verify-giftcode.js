import ConnectDB from "@/utils/connect_db"
import Giftcard from "@/models/giftcard"
import { HashValue } from "@/utils/generatePassword"

const VerifyGiftcode = async (req, res) => {
    try {
        if (req.method === 'GET') {
            await ConnectDB()
            const { gift_code } = req.query
            if (!gift_code || gift_code.length < 8 || gift_code.length > 10) return res.status(400).json({ success: false, msg: "Invalid Giftcode. Query parameters: gift_code (must be of length 9 - 10)" })
            const hashedGiftcode = HashValue(gift_code)
            const giftCard = await Giftcard.findOne({ gift_code: hashedGiftcode })
            if (!giftCard) return res.status(404).json({ success: false, msg: "Invalid gift code." })
            const gift_card = JSON.parse(JSON.stringify(giftCard))
            delete gift_card.gift_code
            res.status(200).json({
                success: true,
                gift_card
            })
        }
        else res.status(405).json({ success: false, msg: "bad request, you are using wrong request method!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default VerifyGiftcode