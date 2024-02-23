import { pusherServer } from "@/utils/pusher";
import StandardApi from "@/middlewares/standard_api";

const AuthPusherPresence = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { email, socket_id, channel_name } = req.body;

    console.log("auth request came to pusher endpoint")
    const user_id = req.body?.user_id || Date.now()
    const userData = {
        user_id,
        user_info: {
            user_id,
            email
        },
    };

    const auth = pusherServer.authorizeChannel(socket_id, channel_name, userData);
    console.log(auth)
    res.send(auth);
})
export default AuthPusherPresence