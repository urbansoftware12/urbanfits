import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import { SignJwt } from "@/utils/cyphers"
import { isValidObjectId } from "mongoose"
import { sendNotification } from "@/utils/send_notification"
import StandardApi from "@/middlewares/standard_api"

const UpdateUser = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { user_id } = req.query;
    if (!isValidObjectId(user_id)) return res.status(403).json({ success: false, msg: "A valid user id is required. Body parameters: user_id" })

    await ConnectDB()
    let user = await User.findById(user_id).lean()
    if (!user) return res.status(404).json({ success: false, msg: "User not found" })
    if (user.register_provider !== "urbanfits" && req.body.role && req.body.role !== "customer") return res.status(409).json({ success: false, msg: "This user signed up with google and cannot be assigned this role other than `customer`" })
    if (req.body.email && req.body.email.includes("@")) {
        user = await User.findOne({ email: req.body.email })
        if (user) delete req.body.email
    } else delete req.body.email
    if (req.body.username?.length > 4) {
        user = await User.findOne({ username: req.body.username })
        if (user) delete req.body.username
    } else delete req.body.username
    delete req.body.uf_wallet;

    user = await User.findByIdAndUpdate(user_id, req.body, { new: true, lean: true, _immutability: "disable" })
    res.status(200).json({
        success: true,
        msg: `${user.username}'s data has been updated successfully`,
        user
    })
    sendNotification(user._id, {
        category: "account",
        heading: "User Data Updated",
        type: "user-data",
        mini_msg: `Your profile data was updated by Urban Fits team.`,
        message: `Your profile data was updated by Urban Fits team.`
    }, { userData: SignJwt(user) })
})
export default UpdateUser