import ConnectDB from "@/utils/connect_db"
import GuestUser from "@/models/guest_user"
import StandardApi from "@/middlewares/standard_api"

const RemoveGuestSesison = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    await ConnectDB()
    const user = await GuestUser.create({})
    res.status(200).json({
        success: true,
        msg: "Guest created successfully",
        user
    })
})
export default RemoveGuestSesison