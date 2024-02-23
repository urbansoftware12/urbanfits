export const DefaultTasks = [
    {
        name: "sign_up",
        title: "Sign Up Bonus",
        description: "Sign up and win 500 points.",
        reward: 500,
        completed: true,
        link: "/auth/signup"
    },
    {
        name: "place_order",
        title: "Place an Order",
        description: "Win upto 350 points.",
        link: "/"
    },
    {
        name: "review_product",
        title: "Review a Product",
        description: "Review and win upto 350 points.",
        reward: 350,
        disabled: true,
        link: "/"
    },
    {
        name: "follow_facebook",
        type: "social",
        title: "Follow & like us on Facebook",
        description: "Follow and win 100 points.",
        reward: 100,
        need_image: true,
        image_submitted: false,
        link: "https://www.facebook.com"
    },
    {
        name: "follow_instagram",
        type: "social",
        title: "Follow & like us on Instagram",
        description: "Follow and win 100 points.",
        reward: 100,
        need_image: true,
        image_submitted: false,
        link: "https://www.instagram.com"
    },
    {
        name: "follow_tiktok",
        type: "social",
        title: "Follow & like us on Tiktok",
        description: "Follow and win 100 points.",
        reward: 100,
        need_image: true,
        image_submitted: false,
        link: "https://www.tiktok.com/"
    },
    {
        name: "share_on_social",
        title: "Share on Social Media",
        description: "Follow and win 100 points.",
        reward: 100,
        need_image: true,
        image_submitted: false,
        link: "/"
    },
    {
        name: "spin_wheel",
        title: "Spin the wheel",
        description: "Win upto 500 points.",
        link: "#prize_wheel"
    },
    {
        name: "download_app",
        title: "Download mobile app",
        reward: 500,
        description: "Get 500 points."
    }
]

export const shippingRates = {
    "standard_shipping": {
        "uae_rate": 16,
        "ksa_rate": 65,
        "pk_rate": 40,
        "additional_kg_charge": {
            "uae": 2,
            "ksa": 10,
            "pk": 8
        },
        "shipping_timespan": {
            "uae_shipping": "1 - 2 days",
            "ksa_shipping": "5 - 7 days",
            "pk_shipping": "5 - 7 days"
        }
    },
    "express_shipping": {
        "ksa_rate": 95,
        "pk_rate": 70,
        "additional_kg_charge": {
            "ksa": 10,
            "pk": 8
        },
        "shipping_timespan": {
            "ksa_shipping": "2 - 4 days",
            "pk_shipping": "2 - 4 days"
        }
    },
    "free_shipping": {
        "uae_order_rate": 300,
        "ksa_order_rate": 500,
        "pk_order_rate": 500,
        "shipping_timespan": {
            "uae_shipping": "1 - 2 days",
            "ksa_shipping": "5 - 7 days",
            "pk_shipping": "5 - 7 days"
        }
    }
}

export const currencies = ["AED", "SAR", "PKR"];
export const jwtExpiries = {
    default: 7, // 7 days
    extended: 30 // 30 days
}
export const shippingMethods = ["standard_shipping", "express_shipping", "free_shipping"]
export const giftCardPrices = {
    giftcard_bronze: 100,
    giftcard_silver: 200,
    giftcard_gold: 300,
    giftcard_platinum: 400,
    giftcard_diamond: 500
}
export const adminRoles = ['administrator', 'editor', 'author']