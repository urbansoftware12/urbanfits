import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const jwt = require("jsonwebtoken")
import mongoose from "mongoose"
import { sendNotification } from "@/utils/send_notification"
import StandardApi from "@/middlewares/standard_api"

const UpdateUser = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { user_id } = req.query
    if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(403).json({ success: false, msg: "A valid user id is required. Query parameters: user_id" })

    await ConnectDB()
    let user = await User.findById(user_id)
    if (!user) return res.status(404).json({ success: false, msg: "User not found" })
    if (req.body.email && req.body.email.includes("@")) {
        user = await User.findOne({ email: req.body.email })
        if (user) delete req.body.email
    } else delete req.body.email

    delete req.body.username
    delete req.body.password
    delete req.body.two_fa_secret
    user = await User.findByIdAndUpdate(user_id, req.body, { new: true })
    delete req.body.password
    res.status(200).json({
        success: true,
        msg: `${user.username}'s data has been updated successfully`,
        user
    })
    const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY)
    await sendNotification(user._id, {
        category: "account",
        heading: "User Data Updated",
        type: "user-data",
        mini_msg: `Your profile data was updated by Urban Fits team.`,
        message: `Your profile data was updated by Urban Fits team.`
    }, { userData: payload })
})
export default UpdateUser