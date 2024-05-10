const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import Giftcard from "@/models/giftcard";
import CreateOrder from "@/utils/create-order";
import OrderSession from "@/models/order_session";
import Coupon from "@/models/coupon";
import User from "@/models/user";
import { verify } from "jsonwebtoken"
import { parse } from "cookie";
import { isValidObjectId } from "mongoose";
import { GetUFBalance } from "@/utils/uf-points";
import { HashValue, getDateOfTimezone } from "@/utils/cyphers.js";
import { shippingRates, paymentOptions, giftCardPrices, giftCardMethods } from "@/uf.config";
import StandardApi from "@/middlewares/standard_api";

const shippingMethods = Object.keys(shippingRates);
const handler = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {

    let currentUser;
    const { "session-token": sessionToken } = parse(req.headers.cookie || '');
    if (!sessionToken) currentUser = null;
    else try {
        currentUser = verify(sessionToken, process.env.NEXT_PUBLIC_SECRET_KEY);
        if (!isValidObjectId(currentUser?._id)) return res.status(401).json({ success: false, msg: "Your session is either invalid or expired, please sign in." })
    } catch (e) { currentUser = null }

    const { shipping_info, order_items } = req.body.payload;
    if (!shipping_info || !order_items || !order_items.length) return res.status(400).json({ success: false, msg: "All valid shipping information and ordered items are required. Body parameters: shipping_info (object), order_items (array)" })
    else if (!shippingMethods.includes(shipping_info.delivery_option)) return res.status(400).json({ success: false, msg: "Invalid shipping method, Available method args: " + shippingMethods })
    if (shipping_info.gift_code && (shipping_info.gift_code.length < 8 || shipping_info.gift_code.length > 10)) return res.status(400).json({ success: false, msg: "Invalid Gift Code format." })
    if (shipping_info.coupon_code && shipping_info.coupon_code.length < 4) return res.status(400).json({ success: false, msg: "Invalid Coupon Code format." })
    // if (shipping_info.points_to_use && !shipping_info.card_number) return res.status(400).json({ success: false, msg: "user uf card number is required." })

    await ConnectDB()
    if (currentUser) {
        let foundUser = await User.findById(currentUser._id).lean();
        if (!foundUser) return res.status(404).json({ success: false, msg: "User does not exist with corresponding identifier." })
    }

    // initializing discounts by UF-points and Giftcodes if exists
    let discountByPoints = 0;
    let discountByGiftcode = 0;
    let discountByCoupon = 0;
    let earnedPoints = 0;
    let appliedGiftCard = null;
    let appliedCoupon = null;
    if (shipping_info.points_to_use && shipping_info.card_number) {
        const user = await User.findById(currentUser._id).lean();
        if (!user) return res.status(400).json({ success: false, msg: "Invalid user id or uf-card number" });
        const ufBalance = await GetUFBalance(user._id, user.uf_wallet.card_number, user.timezone);
        if (shipping_info.points_to_use > ufBalance) return res.status(400).json({ success: false, msg: "You can't use more uf-points than your balance." })
        discountByPoints = shipping_info.points_to_use * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE)
    }
    if (shipping_info.gift_code?.length && shipping_info.gift_code.length > 8) {
        const hashedGiftcode = HashValue(shipping_info.gift_code);
        const giftCard = await Giftcard.findOne({ gift_code: hashedGiftcode }).lean();
        if (!giftCard) return res.status(400).json({ success: false, msg: "Gift code either expired or doesn't exists." })
        else {
            discountByGiftcode = giftCard.price;
            appliedGiftCard = structuredClone(giftCard);
            console.log(appliedGiftCard);
        }
    }

    // const rate = 1; // Currency rate i.e. 1 AED
    const orderItemsToProcess = order_items.filter(item => !item.is_giftcard);
    const giftCardItems = order_items.filter(item => item.is_giftcard);

    for (const giftItem of giftCardItems) {
        const giftMethod = giftItem.buy_for.toLowerCase();
        if (!Object.keys(giftCardMethods).includes(giftMethod)) return res.status(400).json({ success: false, msg: "Invalid Giftcard method." })
        else if (giftMethod === "self" && !currentUser) return res.status(404).json({ success: false, msg: "User with this email not found to buy the Giftcard for." })
        else if (giftMethod === "friend") {
            const receiver = await User.findOne({ email: giftItem.receiver?.email }).lean();
            if (!receiver?._id) return res.status(404).json({ success: false, msg: "The receiver is not registered on Urban Fits." })
        }
    }

    let finalOrderItems = []
    if (!giftCardItems.length) for (const orderItem of orderItemsToProcess) {
        const dbProduct = await Product.findById(orderItem.product_id).lean();
        if (!dbProduct) return res.status(400).json({ success: false, msg: "Either one of the specified product IDs does not exist or the product IDs were tempered." });
        const respectedVariant = dbProduct.variants.find(variant => variant._id.toString() === orderItem?.variant_id || '');
        if (!respectedVariant) return res.status(400).json({ success: false, msg: "Each order item must have a vaild existing `variant_id`." });
        const respectedSize = respectedVariant.sizes.find(sizeObj => sizeObj.size.toLowerCase() === orderItem.size.toLowerCase());
        if (!respectedSize || respectedSize.quantity < orderItem.quantity) return res.status(400).json({ success: false, msg: `Selected size of ${dbProduct.name}'s ${respectedVariant.color_name} variant is currently unavailable.` })

        const finalProduct = {
            product_id: dbProduct._id,
            variant_id: orderItem.variant_id,
            name: dbProduct.name,
            price: dbProduct.sale_price || dbProduct.price,
            image: respectedVariant.images[0],
            sku: respectedVariant.sku + "-" + orderItem.size + orderItem.size,
            variant: orderItem?.color || '',
            uf_points: orderItem?.uf_points || 0,
            size: orderItem.size,
            quantity: orderItem.quantity,
            weight: dbProduct.shipping_details.weight
        }
        earnedPoints += orderItem.quantity * dbProduct.uf_points || 0;
        finalOrderItems.push(finalProduct)
    }

    let totalPrice = giftCardItems.length ? giftCardItems.reduce((accum, item) => accum + item.price * item.quantity, 0) : 0;
    for (const item of finalOrderItems) totalPrice += item.price * item.quantity;

    let finalShippingFees = (() => {
        if (giftCardItems.length) return 0;
        const weighingItem = finalOrderItems.find((item) => item.weight && item.weight !== undefined)
        if (!weighingItem) return 0
        const shippingData = shippingRates[shipping_info.delivery_option];
        if (shippingData.time_limit) {
            const userTimezone = currentUser ? currentUser.timezone : "Asia/Dubai";
            const currentTimeStamp = getDateOfTimezone(userTimezone).getTime();
            if (currentTimeStamp > shippingData.time_limit) return res.status(400).json({ success: false, msg: `You can't use ${shippingData.name} shipping method after ${new Date(shippingData.time_limit).getHours() % 12} : ${new Date(shippingData.time_limit).getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}` })
        }

        const totalWeight = finalOrderItems.reduce((accValue, item) => (accValue + item.weight * item.quantity), 0);
        if (totalWeight <= 5100) return shippingData.rate;
        const additionalWeight = totalWeight - 5100;
        const additionalCharges = (additionalWeight / 1000) * (shippingData.additional_kg_charge);
        return additionalCharges + shippingData.rate;
    })()

    // Calculating the coupon discount
    if (shipping_info.coupon_code) {
        const hashedCouponCode = HashValue(shipping_info.coupon_code);
        const coupon = await Coupon.findOne({ coupon_code: hashedCouponCode }).lean();
        if (!coupon) return res.status(400).json({ success: false, msg: "Coupon code is either invalid or expired." })

        if (coupon.coupon_config.coupon_usage_limit && typeof coupon.coupon_config.coupon_usage_limit === "number" && coupon.coupon_config.coupon_usage_limit < 1) discountByCoupon = 0;
        const config = coupon.coupon_config;

        if (config.allowed_emails.length && !config.allowed_emails.includes(currentUser?.email)) discountByCoupon = 0;
        if ((config.minimum_spend && totalPrice < config.minimum_spend) || (config.maximum_spend && totalPrice > config.maximum_spend)) discountByCoupon = 0;

        let eligibleProducts = structuredClone(finalOrderItems)
        if (config.allowed_products.length) eligibleProducts = finalOrderItems.filter(p => config.allowed_products.includes(p.product_id))
        if (config.allowed_categories?.length) eligibleProducts = eligibleProducts.filter(p => p.categories.some(categ => config.allowed_categories.includes(categ)))

        if (config.exclude_sales) eligibleProducts = finalOrderItems.filter(p => !p.sale_price)

        if (config.exclude_products?.length) eligibleProducts = eligibleProducts.filter(p => !config.exclude_products.includes(p.product_id))
        if (config.exclude_categories?.length) eligibleProducts = eligibleProducts.filter(p => !p.categories.some(categ => config.exclude_categories.includes(categ)))

        const eligibleProductsPrice = eligibleProducts.reduce((acc, p) => acc + p.price, 0);
        if (eligibleProductsPrice >= coupon.coupon_value) discountByCoupon = coupon.coupon_value;
        else discountByCoupon = eligibleProductsPrice;
        appliedCoupon = coupon;
    }

    const overallDiscount = discountByPoints + discountByGiftcode + discountByCoupon;
    const amountAfterDiscounts = Math.abs(totalPrice + finalShippingFees - overallDiscount);

    // Calculating the payment method charges
    const selectedPaymentMethod = giftCardItems.length ? "online_payment" : shipping_info.payment_option;
    const paymentMethodObj = paymentOptions[selectedPaymentMethod];
    console.log(selectedPaymentMethod, paymentOptions.online_payment)
    let paymentDiscount = 0;
    if (paymentMethodObj.rate) paymentDiscount = amountAfterDiscounts / 100 * paymentMethodObj.rate;
    else if (paymentMethodObj.discount) paymentDiscount = -amountAfterDiscounts / 100 * paymentMethodObj.discount;

    const FinalPayableAmount = amountAfterDiscounts + paymentDiscount;

    // Creating order session data
    const orderSession = (await OrderSession.create({
        ...(currentUser ? { user_id: currentUser._id } : { is_guest: true }),
        ...(currentUser && { earned_points: earnedPoints }),
        name: shipping_info.name,
        email: shipping_info.email,
        order_items: finalOrderItems,
        shipping_address: shipping_info.shipping_address,
        points_used: shipping_info?.points_to_use || 0,
        ...(giftCardItems.length && { gift_cards: giftCardItems }),
        ...(appliedGiftCard && { gift_card: appliedGiftCard._id }),
        ...(appliedCoupon && { coupon: appliedCoupon }),
        shippping_method: shipping_info.delivery_option,
        payment_method: shipping_info.payment_option,
        discounts: {
            points: discountByPoints,
            coupon: discountByCoupon,
            gift_card: discountByGiftcode,
            payment: paymentDiscount > 0 ? 0 : paymentDiscount
        },
        price_details: {
            sub_total: totalPrice,
            total: FinalPayableAmount,
            shipping_fees: finalShippingFees,
            total_discount: discountByPoints + discountByGiftcode + discountByCoupon
        }
    })).toObject();

    if (selectedPaymentMethod === "cash_on_delivery") {
        const order_data = await CreateOrder(orderSession);
        res.status(201).json({
            success: true,
            order_data,
            msg: "Checkout successful. Thanks for you purchase!"
        })
    }
    else if (selectedPaymentMethod === "online_payment") {
        // Create Checkout Sessions from body params.
        const stripSession = await stripe.checkout.sessions.create({
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: Math.floor(finalShippingFees * 100),
                            currency: "aed",
                        },
                        display_name: shipping_info.delivery_option
                    }
                }
            ],
            line_items: [
                {
                    price_data: {
                        currency: shipping_info?.currency?.toLowerCase() || "aed",
                        unit_amount: Math.floor(FinalPayableAmount * 100),
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
            success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/thanks`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`
        });

        res.status(201).json({
            success: true,
            payment_url: stripSession.url,
            order_data: orderSession,
            msg: ""
        })
    }
    else return res.status(400).json({ success: false, msg: "This payment method is not supported." })
})
export default handler