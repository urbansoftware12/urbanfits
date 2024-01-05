import ConnectDB from "@/utils/connect_db";
import sendEmail from "@/utils/sendEmail"
import User from "@/models/user"
import Order from "@/models/orders"
import OrderSession from '@/models/order_session';
import OrderConfirmed from '@/email templates/order_confirm';
import Product from "@/models/product"
import GiftcardEmail from "@/email templates/giftcard_email";
import Giftcard from "@/models/giftcard"
import { generateGiftCode } from "@/utils/generatePassword";
import mongoose from "mongoose";
import axios from "axios";
import { pusherServer } from '@/utils/pusher';
import { HashValue } from "@/utils/generatePassword";

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
const giftCardPrices = {
    "giftcard_bronze": 100,
    "giftcard_silver": 200,
    "giftcard_gold": 300,
    "giftcard_platinum": 400,
    "giftcard_diamond": 500,
}
const CreateOrder = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { order_session_id } = req.query
            if (!mongoose.Types.ObjectId(order_session_id)) return res.status(403).json({ success: false, msg: "A valid order session id is required. Query parameters: order_session_id" })
            await ConnectDB()

            const orderSessionData = await OrderSession.findById(order_session_id)
            const orderSession = JSON.parse(JSON.stringify(orderSessionData))
            const date = new Date()

            // Deducting used uf-points by user
            const user = await User.findById(orderSession.user_id)
            if (user && orderSession.price_details.points_to_use) {
                await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/deduct-points`, {
                    user_id: user._id,
                    card_number: user.uf_wallet.card_number,
                    points_to_deduct: orderSession.price_details.points_to_use
                })
            }
            // Saving Order Data
            delete orderSession._id
            const newOrder = await Order.create({
                ...orderSession,
                year: date.getFullYear(),
                month: months[date.getMonth()]
            })
            // Generating bught Gift Cards codes and saving to DB
            if (orderSession?.gift_cards?.length && orderSession.gift_cards[0].id.startsWith("giftcard_")) {
                let dbGiftCards = []
                for (const giftCard of orderSession.gift_cards) {
                    const generatedGiftCode = await generateGiftCode(10)
                    const dbGiftcard = await Giftcard.create({
                        name: giftCard.name,
                        order_id: newOrder._id,
                        customer_email: newOrder.email,
                        type: giftCard.id,
                        gift_code: HashValue(generatedGiftCode),
                        price: giftCardPrices[giftCard.id]
                    })
                    dbGiftCards.push(dbGiftcard)
                }
                // Sending confidential Gift code email to respected user customer email
                const giftCardTemplate = GiftcardEmail(orderSession.name, dbGiftCards)
                sendEmail({ to: orderSession.email, subject: "Claim your UF-Giftcard" }, giftCardTemplate)
            }
            // Sending confirmation email to customer
            let template = OrderConfirmed(orderSession.name)
            await sendEmail({ to: orderSession.email, subject: "Your order has been placed." }, template)
            // Dispatching customer specific notifications and saving in DB
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
            // Deducting the quantity of purchased variant of the specific product
            const orderedItems = orderSessionData.order_items
            for (const orderedItem of orderedItems) {
                await Product.updateOne(
                    {
                        _id: mongoose.Types.ObjectId(orderedItem.product_id)
                    },
                    {
                        $inc: {
                            "variants.$[v].sizes.$[s].quantity": -orderedItem.quantity
                        }
                    },
                    {
                        arrayFilters: [
                            { "v._id": mongoose.Types.ObjectId(orderedItem.variant_id) },
                            { "s.size": orderedItem.size.toUpperCase() }
                        ]
                    }
                )
            }
            // Finally deleting the respected order sessoin from DB
            await OrderSession.findByIdAndDelete(order_session_id)
            res.status(200).json({ success: true, msg: "New order creation completed successfully." })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: POST" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default CreateOrder