const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import OrderSession from "@/models/order_session";
import Giftcard from "@/models/giftcard";
import { shippingRates } from "@/uf.config";
import User from "@/models/user";
import GuestUser from "@/models/guest_user";
import mongoose from "mongoose";
import { HashValue } from "@/utils/cyphers.js";
import { currencies, shippingMethods, giftCardPrices } from "@/uf.config";
import axios from "axios";
import StandardApi from "@/middlewares/standard_api";

const countries = ["pk", "sa", "ae"]
const handler = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    // const decryptedData = JSON.parse(CryptoJS.AES.decrypt(req.body.payload, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8))
    const { user_id, is_guest, shipping_info, order_items } = req.body.payload
    if (!user_id || !shipping_info || !order_items || !order_items.length) return res.status(400).json({ success: false, msg: "All valid shipping information and ordered items are required. Body parameters: shipping_info (object), order_items (array), user_id" })
    else if (!countries.includes(shipping_info.country)) return res.status(400).json({ success: false, msg: "We only ship in the following countries: " + countries })
    else if (!currencies.includes(shipping_info.currency)) return res.status(400).json({ success: false, msg: "Invalid Currency, Available currencies: " + currencies })
    else if (!shippingMethods.includes(shipping_info.delivery_option)) return res.status(400).json({ success: false, msg: "Invalid shipping method, Available method args: " + shippingMethods })
    if (shipping_info.points_to_use && shipping_info.points_to_use !== 0 && !shipping_info.card_number) return res.status(400).json({ success: false, msg: "user uf card number is required with " })
    if (shipping_info.gift_code && (shipping_info.gift_code.length < 8 || shipping_info.gift_code.length > 10)) return res.status(400).json({ success: false, msg: "Invalid Gift Code format." })
    await ConnectDB()
    // initializing discounts by UF-points and Giftcodes if exists
    let discountByPoints = 0;
    let discountByGiftcode = 0;
    let appliedGiftCard = null;
    if (shipping_info.points_to_use && shipping_info.points_to_use !== 0 && shipping_info.card_number) {
        const user = await User.findOne({ _id: user_id, "uf_wallet.card_number": shipping_info.card_number })
        if (!user) return res.status(400).json({ success: false, msg: "Invalid user id or uf-card number" })
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-balance?user_id=${user_id}&card_number=${shipping_info.card_number}`)
        if (shipping_info.points_to_use > data.balance) return res.status(400).json({ success: false, msg: "You can't use more uf-points than your balance." })
        discountByPoints = shipping_info.points_to_use * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE)
    }
    if (shipping_info.gift_code?.length && shipping_info.gift_code.length > 8) {
        const hashedGiftcode = HashValue(shipping_info.gift_code)
        const giftCard = await Giftcard.findOne({ gift_code: hashedGiftcode })
        if (!giftCard) return res.status(400).json({ success: false, msg: "Either Gift code expired or doesn't exists." })
        else {
            discountByGiftcode = giftCard.price
            appliedGiftCard = JSON.parse(JSON.stringify(giftCard))
            console.log(appliedGiftCard)
        }
    }
    // Calculating overall discount
    const overallDiscount = discountByPoints + discountByGiftcode


    // getting exchnge rates
    let rate = 1;
    if (shipping_info.currency !== process.env.NEXT_PUBLIC_BASE_CURRENCY) {
        const { data } = await axios.get(`https://api.fastforex.io/fetch-one?api_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&from=${process.env.NEXT_PUBLIC_BASE_CURRENCY}&to=${shipping_info.currency}`)
        rate = data.result[shipping_info.currency];
    }

    const orderItemsToProcess = order_items.filter(item => !item.id.startsWith("giftcard_"))
    const giftCardItems = order_items.filter(item => item.id.startsWith("giftcard_"))
    // console.log(orderItemsToProcess, giftCardItems)

    let finalOrderItems = []
    for (const orderItem of orderItemsToProcess) {
        const dbProduct = await Product.findById(orderItem.product_id)
        if (!dbProduct) return res.status(400).json({ success: false, msg: "Either specified product IDs does not exist or the product IDs were tempered." })
        const respectedVariant = dbProduct.variants.find(variant => variant._id.toString() === orderItem?.variant_id || '')
        if (!respectedVariant) return res.status(400).json({ success: false, msg: "Each order item must have a vaild existing `variant_id`." })
        const respectedSize = respectedVariant.sizes.find(sizeObj => sizeObj.size.toLowerCase() === orderItem.size.toLowerCase())
        if (!respectedSize || respectedSize.quantity < orderItem.quantity) return res.status(400).json({ success: false, msg: `Selected size of ${dbProduct.name}'s ${respectedVariant.color_name} variant is currently unavailable.` })

        const finalProduct = {
            product_id: dbProduct._id,
            variant_id: orderItem.variant_id,
            name: dbProduct.name,
            price: dbProduct.price,
            image: respectedVariant.images[0],
            variant: orderItem?.color || '',
            uf_points: orderItem?.uf_points || 0,
            size: orderItem.size,
            quantity: orderItem.quantity,
            weight: dbProduct.shipping_details.weight
        }
        finalOrderItems.push(finalProduct)
    }

    let totalPrice = giftCardItems.length ? giftCardItems.reduce((accum, item) => accum + giftCardPrices[item.id], 0) : 0;
    // console.log(totalPrice)
    for (const item of finalOrderItems) {
        const itemPrice = item.price * item.quantity
        totalPrice += itemPrice
    }

    const isEligibleForFreeShipping = () => {
        const { free_shipping } = shippingRates;
        if (shipping_info.country === "ae" && totalPrice >= free_shipping.uae_order_rate) return true;
        else if (shipping_info.country === "sa" && totalPrice >= free_shipping.ksa_order_rate) return true;
        else if (shipping_info.country === "pk" && totalPrice >= free_shipping.pk_order_rate) return true;
        else return false
    }

    const getTotalShippingFee = () => {
        if (shipping_info.delivery_option === "free_shipping") return 0
        const weighingItem = finalOrderItems.find((item) => item.weight && item.weight !== undefined)
        if (!weighingItem) return 0
        const shippingData = shippingRates[shipping_info.delivery_option];
        const totalWeight = finalOrderItems.reduce((accValue, item) => { return accValue + (item.weight * item.quantity) }, 0);
        let countryShipRate = 1;
        let additionalKgRate = 1;
        if (shipping_info.country === "ae") {
            countryShipRate = shippingData.uae_rate;
            additionalKgRate = shippingData.additional_kg_charge.uae;
        }
        else if (shipping_info.country === "sa") {
            countryShipRate = shippingData.ksa_rate;
            additionalKgRate = shippingData.additional_kg_charge.ksa;
        }
        else if (shipping_info.country === "pk") {
            countryShipRate = shippingData.pk_rate;
            additionalKgRate = shippingData.additional_kg_charge.pk;
        }
        if (totalWeight <= 5100) return countryShipRate
        const additionalWeight = totalWeight - 5100
        const additionalCharges = (additionalWeight / 1000) * (additionalKgRate || 1)
        return additionalCharges + countryShipRate
    }

    let finalShippingFees = 0;
    if (shipping_info.delivery_option === "free_shipping" && isEligibleForFreeShipping()) finalShippingFees = 0;
    else finalShippingFees = getTotalShippingFee()

    if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({ success: false, msg: "user_id is not a valid." })
    let user = await User.findById(user_id)
    if (!user) user = await GuestUser.findById(user_id)
    if (!user) return res.status(404).json({ success: false, msg: "User does not exist with corresponding user_id." })

    const orderSession = await OrderSession.create({
        user_id: user._id,
        is_guest,
        name: shipping_info.name,
        email: shipping_info.email,
        order_items: finalOrderItems,
        ...(giftCardItems.length ? { gift_cards: giftCardItems } : {}),
        shipping_address: shipping_info.shipping_address,
        billing_address: shipping_info.billing_address,
        ...(appliedGiftCard && { gift_card_id: appliedGiftCard._id }),
        price_details: {
            total_price: totalPrice,
            shipping_fees: finalShippingFees,
            currency: shipping_info.currency,
            points_to_use: shipping_info?.points_to_use || 0,
            ...(appliedGiftCard && { gift_card_discount: appliedGiftCard.price })
        }
    })

    let finalPayableAmount = totalPrice - overallDiscount
    if (finalPayableAmount < 0) finalPayableAmount = 0

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: Math.floor(finalShippingFees * rate * 100),
                        currency: shipping_info?.currency?.toLowerCase() || "aed",
                    },
                    display_name: shipping_info.delivery_option,
                    // delivery_estimate: {
                    //     minimum: {
                    //         unit: 'business_day',
                    //         value: 1,
                    //     },
                    //     maximum: {
                    //         unit: 'business_day',
                    //         value: 1,
                    //     },
                    // },
                }
            }
        ],
        // line_items: finalOrderItems.map((product, index) => {
        //     let unitAmount = 0;
        //     if (product.price > discountByPoints) {
        //         unitAmount = Math.floor(product.price * 100) - Math.floor(discountByPoints * 100)
        //         discountByPoints = product.price - ((unitAmount / 100) - discountByPoints)
        //         console.log(discountByPoints)
        //     }
        //     else discountByPoints = discountByPoints - product.price
        //     return {
        //         price_data: {
        //             currency: shipping_info?.currency?.toLowerCase() || "aed",
        //             product_data: {
        //                 name: product.name,
        //                 images: [product.image]
        //             },
        //             unit_amount: unitAmount * rate,
        //         },
        //         quantity: product.quantity
        //     }
        // }),
        line_items: [
            {
                price_data: {
                    currency: shipping_info?.currency?.toLowerCase() || "aed",
                    unit_amount: Math.floor(finalPayableAmount * rate * 100),
                    product_data: { name: "Payable Amount" }
                },
                quantity: 1,
            },
        ],
        payment_intent_data: {
            receipt_email: shipping_info.email,
            metadata: { order_session_id: orderSession._id.toString() }
        },
        customer_email: shipping_info.email,
        client_reference_id: shipping_info.name,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/thanks?o_session_id=${orderSession._id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/step1?payment=false`
    });
    const { url } = session
    res.json({
        success: true,
        url
    })
})
export default handler