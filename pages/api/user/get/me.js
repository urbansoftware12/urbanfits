import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import StandardApi from "@/middlewares/standard_api";
import { SignJwt } from "@/utils/cyphers";

const getMyData = async (req, res) => StandardApi(req, res, {}, async () => {
    await ConnectDB()
    const user = await User.findById(req.user._id).lean()
    res.status(200).json({ success: true, payload: SignJwt(user) })
})
export default getMyData