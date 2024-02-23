import ConnectDB from "@/utils/connect_db"
import Newsletter from "@/models/newsletter"
import { SignJwt } from "@/utils/cyphers"
import StandardApi from "@/middlewares/standard_api"

const UpdateNewsletter = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const id = req.user._id;
    await ConnectDB()
    const letter = await Newsletter.findOneAndUpdate({ user: id }, req.body, { new: true, lean: true });
    if (!letter) return res.status(404).json({ success: false, msg: "No registration found with the corresponding user" })
    res.status(200).json({
        success: true,
        msg: `Newsletter subscription updated successfully`,
        payload: SignJwt(letter)
    })
})
export default UpdateNewsletter