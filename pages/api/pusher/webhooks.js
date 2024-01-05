import axios from "axios";

export default async function PusherWebhooks(req, res) {
    try {
        if (req.method === 'POST') {
            const { events } = req.body;
            axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/pusher/handle-presence-events`, { events })

            res.status(200).json({ success: true, message: 'Webhook received successfully' });
        } else res.status(405).json({ message: 'Method not allowed, Allowed Methods: POST' });
    } catch (error) {
        console.error('Pusher Webhook Error:', error);
        res.status(500).json({ message: 'Webhook processing error' });
    }
}