import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import StandardApi from "@/middlewares/standard_api"

const UpdateUser = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    await ConnectDB()
    const data = await User.updateMany({}, req.body)
    res.status(200).json({
        success: true,
        data,
        msg: `Users data has been updated successfully`,
    })
})
export default UpdateUser