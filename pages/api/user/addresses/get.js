import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"
import { SignJwt } from "@/utils/cyphers"
import StandardApi from "@/middlewares/standard_api"

const GetAddress = async (req, res) => StandardApi(req, res, {}, async () => {
    await ConnectDB();
    let addresses = await Addresses.findOne({ user_id: req.user._id }).lean();
    if (!addresses) return res.status(404).json({ success: false, msg: "No address record found for this user." })
    res.status(200).json({
        success: true,
        payload: SignJwt(addresses)
    })
})
export default GetAddress