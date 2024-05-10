import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import OrderSession from '@/models/order_session';
import CreateOrder from '@/utils/create-order';
import { sendNotification, sendAdminNotification } from '@/utils/send_notification';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export const config = {
    api: {
        bodyParser: false,
    }
};

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req, res) => {
    try {
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

                    const orderSession = await OrderSession.findById(orderSessionId).lean();
                    await CreateOrder(orderSession);
                    OrderSession.findByIdAndDelete(orderSessionId);
                    break;
                }
                case 'payment_intent.payment_failed': {
                    const paymentIntent = event.data.object;
                    // const orderSession = await OrderSession.findById(paymentIntent.metadata.order_session_id)
                    console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
                    sendNotification(orderData.user_id, {
                        category: "order",
                        heading: "Order Placement Failed",
                        mini_msg: "Your order couldn't be placed.",
                        type: "order",
                        message: `Sorry your payment couldn't approve due some unknown reasone and you order coulnd't be placed. If you payment was still deducted from your account, you will be refunded. Or you can consult with Urban Fits team. Thanks!`,
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
    } catch (error) {
        console.log(error);
        sendAdminNotification({
            category: "system",
            data: {
                title: "System Error",
                msg: `A system error occurred in stripe webhook "${req.url}" .`,
                description: `Error Message: ${error.message}\n Stack trace: ${error.stack}`,
                type: "error"
            }
        })
    }
};

export default cors(webhookHandler);