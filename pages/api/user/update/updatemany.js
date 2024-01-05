import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import CorsMiddleware from "@/utils/cors-config"

const UpdateUser = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            await ConnectDB()
            // updating the user profile
            const data = await User.updateMany({}, req.body)
            res.status(200).json({
                success: true,
                data,
                msg: `Users data has been updated successfully`,
            })
        }
        else {
            res.status(403).json({ success: false, msg: "Method no allowed, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default UpdateUser