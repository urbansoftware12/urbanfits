import ConnectDB from "@/utils/connect_db";
import Order from "@/models/orders";
import { orderStatuses } from "@/uf.config";

const TestApiHandler = async (req, res) => {
    await ConnectDB();

    const newOrder = (await Order.create({
        "user_id": "6639f43fabc5ffb1773a0415",
        "name": "Faizan Sohail",
        "email": "faizandevp@gmail.com",
        "order_status": {
            "status": "DELIVERED",
            "group": "delivered"
        },
        "order_items": [
            {
                "product_id": "656a38adbaca845e1806ea5e",
                "variant_id": "656a38b2baca845e1806ea6f",
                "variant": "Mink",
                "name": "Zipper Detailed Long Cardigan",
                "price": 709,
                "size": "M",
                "sku": "UF1017-#767387-MM",
                "quantity": 1,
                "image": "/product-images/656a38adbaca845e1806ea5e/656a38adbaca845e1806ea62/0.webp",
                "weight": "520"
            }
        ],
        "gift_cards": [],
        "shipping_address": {
            "address_title": "Home",
            "firstname": "Faizan",
            "lastname": "Sohail",
            "address": "street 123, Dubai, UAE",
            "apt_suite": "",
            "city": "Dubai",
            "country": "ae",
            "phone_prefix": "+971",
            "phone_number": "31643454837"
        },
        "earned_points": 350,
        "points_used": 0,
        "shippping_method": "standard_shipping",
        "payment_method": "online_payment",
        "discounts": {
            "points": 0,
            "coupon": 0,
            "gift_card": 0,
            "payment": -18.174999999999997
        },
        "price_details": {
            "total": 708.825,
            "sub_total": 709,
            "shipping_fees": 18,
            "total_discount": 0
        },
        "month": "may",
        "year": 2024
    })).toObject();

    res.status(200).json({
        success: true,
        msg: "Yoo the work's done",
        newOrder
    })
}
export default TestApiHandler