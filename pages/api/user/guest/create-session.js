import ConnectDB from "@/utils/connect_db"
import GuestUser from "@/models/guest_user"
import CorsMiddleware from "@/utils/cors-config"

const RemoveGuestSesison = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            await ConnectDB()
            const user = await GuestUser.create({})
            console.log(user)
            res.status(200).json({
                success: true,
                msg: "Guest created successfully",
                user
            })
        } else res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default RemoveGuestSesison