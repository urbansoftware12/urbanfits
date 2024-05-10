import mongoose from "mongoose";
import Product from "@/models/product";
import Order from "@/models/orders";
import User from "@/models/user";
import Giftcard from "@/models/giftcard";
import { shippingRates } from "@/uf.config";
import GiftCardTemplate from "@/email templates/gift_card";
import OrderConfirmed from "@/email templates/order_confirm";
import sendEmail from "./sendEmail";
import { DeductPoints } from "./uf-points";
import generatePassword, { HashValue } from "./cyphers";
import { sendNotification, sendAdminNotification } from "@/utils/send_notification";
import axios from "axios";

const CreateOrder = async (orderPayload) => {

    if (orderPayload.gift_cards?.length) {
        const orderData = (await Order.create({
            ...orderPayload,
            order_status: {
                status: "DELIVERED",
                group: "delivered"
            }
        })).toObject();
        for (let giftItem of orderData.gift_cards) {
            const { buy_for } = giftItem;

            let giftCodes = [];
            for (let i = 0; i < giftItem.quantity; i++) {
                const giftCode = generatePassword(10);
                giftCodes.push(giftCode);
            }

            for (const code of giftCodes) {
                await Giftcard.create({
                    ...giftItem,
                    gift_code: HashValue(code)
                });

                if (buy_for === "self") {
                    console.log("This is gift card bought for Self: ", giftItem);
                    let giftTemplate = GiftCardTemplate(giftItem, giftCodes, true);
                    sendEmail({ to: orderData.email, subject: "Claim your Giftcard" }, giftTemplate);

                    if (orderData.user_id) sendNotification(orderData.user_id, {
                        category: "order",
                        heading: "Order Placed",
                        mini_msg: "You order have been placed successfully. Thanks for your purchase!",
                        type: "order",
                        message: "You order have been placed and successfully have been delivered to you as a gift. A confirmation email is also have been sent to you. Thanks for you purchase!",
                    })

                } else if (buy_for === "friend") {
                    console.log("This is gift card bought for a Friend: ", giftItem);
                    const receiver = await User.findOne({ email: giftItem.receiver.email })

                    let giftTemplate = GiftCardTemplate(giftItem, giftCodes);
                    sendEmail({ to: receiver.email, subject: "Congratulation, You've got a gift!" }, giftTemplate)
                    const occassion = giftItem.cover.includes("birthday") ? "Happy Birthday" : "Happy Christmas";
                    sendNotification(receiver._id, {
                        category: "primary",
                        heading: "Gift for " + occassion + "!",
                        mini_msg: "Congratulations, you've received a gift from your friend!",
                        type: "order",
                        message: `Congratultions, you have received an E-Giftcard from your friend ${giftItem.sender.name}. They wish you ${occassion} by this gift. You can do ${giftItem.quantity * giftItem.price} AED worth of shopping on Urban Fits for free. Please refer to you email "${receiver.email}" inbox for Gift Code. Thanks!`,
                    })
                    if (orderData.user_id) sendNotification(orderData.user_id, {
                        category: "order",
                        heading: "Order Placed",
                        mini_msg: "Your order have been placed successfully. Thanks for your purchase!",
                        type: "order",
                        message: "You order have been placed and successfully have been delivered to your friend as a gift. A confirmation email is also have been sent to you. Thanks for you purchase!",
                    })
                }
            }
        }

        if (orderData.user_id) {
            const updatedUser = await User.findByIdAndUpdate(orderData.user_id, { $inc: { purchases: 1 } }, { new: true, lean: true });
            if (orderPayload.points_used > 0) await DeductPoints(updatedUser._id, updatedUser.uf_wallet.card_number, updatedUser.timezone, orderPayload.points_used);
        }

        let orderTemplate = OrderConfirmed(orderData, true)
        sendEmail({ to: orderData.email, subject: "Your order has been placed." }, orderTemplate);
        // Sending notification to admin panel
        sendAdminNotification({
            category: "order",
            data: {
                title: "New Order",
                msg: "A new order just received !",
                type: "success"
            }
        })
        return orderData;
    }
    else {
        const orderData = (await Order.create(orderPayload)).toObject();
        const { shipping_address, payment_method } = orderData;
        const swiftOrderData = {
            reference: orderData._id.toString(),
            brandName: "Urban Fits",
            retailerLocationIdentifier: parseFloat(process.env.NEXT_PUBLIC_SWFT_PICKUP_LOCATION_ID),

            customerInfo: {
                name: shipping_address.firstname + ' ' + shipping_address.lastname || '',
                phone: shipping_address.phone_prefix + ' ' + shipping_address.phone_number,
                email: orderData.email,
                country: "United Arab Emirates",
                city: shipping_address.city,
                countryCode: "ae",
                addressLine1: shipping_address.address,
                ...(shipping_address.apt_suite && {
                    addressLine2: shipping_address.apt_suite,
                    landMark: shipping_address.apt_suite
                })
            },

            paymentAmount: payment_method === "cash_on_delivery" ? orderData.price_details.total : 0,
            paymentMode: payment_method === "cash_on_delivery" ? "PAYMENT_ON_DELIVERY" : "PRE_PAID",
            profileName: shippingRates[orderData.shippping_method].swft_profile,
            requireCustomerProofSignature: true,

            items: orderData.order_items.map(item => ({
                ...item,
                weight: parseFloat(item.weight),
                variantId: item.variant_id,
                skuNumber: item.sku,
                weightUnit: "grams"
            }))
        }

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SWFT_BASE_ENDPOINT}/api/direct-integration/orders`,
            swiftOrderData,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_SWFT_KEY
                }
            });
        const swiftRes = data.data[0];

        const finalOrder = await Order.findByIdAndUpdate(orderData._id.toString(), {
            "order_status.status": swiftRes.status,
            stage: swiftRes.stage,
            shipping_label_url: swiftRes.shippingLabelUrl,
            tracking_number: swiftRes.swftboxTracking,
            tracking_url: swiftRes.trackingUrl,
        }, { lean: true, new: true });
        // Subtracting the bought quantity from each of the ordered product
        const orderedItems = finalOrder.order_items;
        for (const orderedItem of orderedItems) {
            Product.updateOne(
                {
                    _id: mongoose.Types.ObjectId(orderedItem.product_id)
                },
                {
                    $inc: {
                        "variants.$[v].sizes.$[s].quantity": -orderedItem.quantity,
                        sales: +orderedItem.quantity
                    },
                },
                {
                    arrayFilters: [
                        { "v._id": mongoose.Types.ObjectId(orderedItem.variant_id) },
                        { "s.size": orderedItem.size.toUpperCase() }
                    ]
                }
            )
        }

        // Sending confirmation email to customer
        let template = OrderConfirmed(finalOrder)
        sendEmail({ to: orderPayload.email, subject: "Your order has been placed." }, template)

        // Sending notifications
        sendAdminNotification({
            category: "order",
            data: {
                title: "New Order",
                msg: `A new order just received !`,
                type: "success"
            }
        })
        if (orderData.user_id) {
            const updatedUser = await User.findByIdAndUpdate(orderData.user_id, { $inc: { purchases: 1 } }, { new: true, lean: true });
            if (orderData.points_used > 0) await DeductPoints(updatedUser._id, updatedUser.uf_wallet.card_number, updatedUser.timezone, orderData.points_used);
            sendNotification(orderData.user_id, {
                category: "order",
                heading: "Order Placed",
                mini_msg: "You order have been placed successfully. Thanks for your purchase!",
                type: "order",
                message: `You order have been placed successfully and currently is in PROCESSING status. Here's your Tracking Number: "${finalOrder.tracking_number}". Further details have been sent on your email. Thanks for you purchase!`,
            })
        }

        return finalOrder
    }
}

export default CreateOrder