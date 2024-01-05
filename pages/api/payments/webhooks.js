import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import OrderSession from '@/models/order_session';
import { pusherServer } from '@/utils/pusher';
import axios from 'axios';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req, res) => {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const signature = req.headers['stripe-signature'];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                buf.toString(),
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`❌ Error message: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Successfully constructed event.
        console.log('The event of checkout construction was successfull ✅ Success:', event.id);

        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent status: ${paymentIntent.status}`);
                const orderSessionId = paymentIntent.metadata.order_session_id;
                axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/payments/create-order?order_session_id=${orderSessionId}`)
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                const orderSession = await OrderSession.findById(paymentIntent.metadata.order_session_id)

                console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
                pusherServer.trigger(`payments-user_${orderSession.user_id.toString()}`, 'payment-succeeded', {
                    success: false,
                    type: "error",
                    msg: "Your payment was failed!"
                })
                break;
            }
            case 'charge.succeeded': {
                const charge = event.data.object;
                console.log(`Charge id: ${charge.id}`);
                break;
            }
            case 'checkout.session.completed': {
                const charge = event.data.object;
                console.log(`Charge id: ${charge.id}`);
                break;
            }
            default: {
                console.warn(`Unhandled event type: ${event.type}`);
                break;
            }
        }
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export default cors(webhookHandler);