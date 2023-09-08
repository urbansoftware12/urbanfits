import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import sendEmail from "@/utils/sendEmail"
import OrderConfirmed from '@/email templates/order_confirm';
import OrderSession from '@/models/order_session';
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

        let template = OrderConfirmed(orderSession.name)
        await sendEmail({ to: orderSession.email || "binarshadsaad6@gmail.com", subject: "Your order has been placed." }, template)
        pusherServer.trigger('payments', 'payment-succeeded', {
          event,
          success: true,
          msg: "Your payment was successfull!"
        })
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
        break;
      }
      case 'charge.succeeded': {
        const charge = event.data.object;
        console.log(`Charge id: ${charge.id}`);
        break;
      }
      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler);