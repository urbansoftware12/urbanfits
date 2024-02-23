import ConnectDB from "@/utils/connect_db"
import GuestUser from "@/models/guest_user"
import StandardApi from "@/middlewares/standard_api"

const RemoveGuestSesison = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { user_id } = req.query
    if (!user_id) return res.status(400).json({ success: false, msg: "User id is required. Query parameters: user_id" })
    await ConnectDB()
    await GuestUser.findByIdAndDelete(user_id)
    res.send("Session removed.")
})
export default RemoveGuestSesison