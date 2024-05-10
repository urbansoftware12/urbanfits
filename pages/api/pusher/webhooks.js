import ConnectDB from "@/utils/connect_db";
import { isValidObjectId } from "mongoose";
import User from "@/models/user";
import SaveSignsMetrics from "@/utils/signs-metrics";

export default async function PusherWebhooks(req, res) {
    try {
        if (req.method === 'POST') {
            const { events } = req.body;
            for (const { name, user_id } of events) {
                if (name === 'member_added') {
                    console.log("A member just joined with id: " + user_id)
                    if (isValidObjectId(user_id)) {
                        await ConnectDB()
                        await User.findByIdAndUpdate(user_id, { is_active: true }, { new: true, lean: true })
                        SaveSignsMetrics("visit", user_id)
                        console.log("user_joined handled successfully.")
                    } else return
                }
                else if (name === 'member_removed') {
                    console.log("A member just left server with id: " + user_id)
                    await ConnectDB()
                    if (isValidObjectId(user_id)) await User.findByIdAndUpdate(user_id, { is_active: false })
                    console.log("user_left handled successfully.")
                }
            }

            res.status(200).json({ success: true, message: 'Webhook received successfully' });
        } else res.status(405).json({ message: 'Method not allowed, Allowed Methods: POST' });
    } catch (error) {
        console.error('Pusher Webhook Error:', error);
        res.status(500).json({ message: 'Webhook processing error' });
    }
}