import ConnectDB from "@/utils/connect_db"
import Newsletter from "@/models/newsletter"
import { SignJwt } from "@/utils/cyphers"
import StandardApi from "@/middlewares/standard_api"
import mongoose from "mongoose"

const UpdateNewsletter = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    await ConnectDB()
    const letter = await Newsletter.findOneAndUpdate({ user: mongoose.Types.ObjectId(req.user._id) }, req.body, { new: true, lean: true });
    if (!letter) return res.status(404).json({ success: false, msg: "No registration found for newsletter." })
    res.status(200).json({
        success: true,
        msg: `Newsletter subscription updated successfully`,
        payload: SignJwt(letter)
    })
})
export default UpdateNewsletter