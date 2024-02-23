import ConnectDB from "@/utils/connect_db"
import Giftcard from "@/models/giftcard"
import { HashValue } from "@/utils/cyphers.js"
import StandardApi from "@/middlewares/standard_api"

const VerifyGiftcode = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    await ConnectDB()
    const { gift_code } = req.body;
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
})
export default VerifyGiftcode