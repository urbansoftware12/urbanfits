import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import sendEmail from "@/utils/sendEmail"
import OrderConfirmed from '@/email templates/order_confirm';
import OrderSession from '@/models/order_session';
import Order from "@/models/order"
import { pusherServer } from '@/utils/pusher';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

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

                const orderSession = await OrderSession.findById(paymentIntent.metadata.order_session_id)
                const copyOrderSession = JSON.parse(JSON.stringify(orderSession))
                const date = new Date()
                const newOrder = await Order.create({
                    ...copyOrderSession,
                    year: date.getFullYear(),
                    month: months[date.getMonth()]
                })
                try {
                    let template = OrderConfirmed(orderSession.name)
                    await sendEmail({ to: orderSession.email, subject: "Your order has been placed." }, template)
                    pusherServer.trigger(`payments-user_${orderSession.user_id}`, 'payment-succeeded', {
                        order_session: orderSession,
                        success: true,
                        type: 'success',
                        msg: "Your payment was successfull!"
                    })
                    pusherServer.trigger('admin-channel', 'new-order-received', {
                        success: true,
                        msg: "A new order has been received!",
                        order_data: newOrder
                    })
                } catch (error) { console.log(error) }
                await OrderSession.findByIdAndDelete(paymentIntent.metadata.order_session_id)
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