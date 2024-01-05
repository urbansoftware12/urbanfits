import { pusherServer } from "@/utils/pusher";

export default (req, res) => {
    const { user_id, username } = req.query
    try {
        pusherServer.trigger(`user_${user_id}`, 'user-login', {
            pusher_msg: `A user ${username || ''} just logged in to the Urban Fits!`,
        });
        console.log("yes event triggered and api resolved")
        res.status(200).end('Event triggered!');
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
};