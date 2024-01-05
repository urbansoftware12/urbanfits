import { pusherServer } from "@/utils/pusher";
import CorsMiddleware from "@/utils/cors-config"

export default async function handler(req, res) {
    await CorsMiddleware(req, res)
    const { user_id, email, socket_id, channel_name } = req.body;

    const user = {
        user_id,
        user_info: {
            user_id,
            email
        },
    };

    try {
        const auth = pusherServer.authenticate(socket_id, channel_name, user);
        console.log(auth)
        res.send(auth);
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}