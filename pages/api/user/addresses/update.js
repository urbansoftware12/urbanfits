import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"
import { SignJwt } from "@/utils/cyphers"
import StandardApi from "@/middlewares/standard_api"

const UpdateAddress = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const user_id = req.user._id;
    await ConnectDB();
    const updatedAddress = await Addresses.findOneAndUpdate({ user_id }, req.body, { new: true, upsert: true, lean: true })
    return res.status(200).json({
        success: true,
        msg: "Your Address updated successfully",
        payload: SignJwt(updatedAddress)
    })
})
export default UpdateAddress