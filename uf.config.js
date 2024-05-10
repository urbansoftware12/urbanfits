export const isProdEnv = process.env.NEXT_PUBLIC_DEV_ENV === "PRODUCTION";

export const locales = ["en", "ar"];

// export const DefaultTasks = [
//     {
//         name: "sign_up",
//         title: { en: "Sign Up Bonus", ar: "مكافأة التسجيل" },
//         description: { en: "Sign up and win 500 points.", ar: "سجل الدخول واحصل على 500 نقطة." },
//         reward: 500,
//         completed: true,
//         link: "/auth/signup"
//     },
//     {
//         name: "place_order",
//         title: { en: "Place an Order", ar: "قم بطلب" },
//         description: { en: "Win upto 350 points.", ar: "اربح حتى 350 نقطة." },
//         link: "/"
//     },
//     {
//         name: "review_product",
//         title: { en: "Review a Product", ar: "مراجعة منتج" },
//         description: { en: "Review and win upto 350 points.", ar: "قم بالمراجعة واربح حتى 350 نقطة." },
//         reward: 350,
//         disabled: true,
//         link: "/"
//     },
//     {
//         name: "follow_facebook",
//         type: "social",
//         title: { en: "Follow & like us on Facebook", ar: "تابعنا وأعجب بنا على فيسبوك" },
//         description: { en: "Follow and win 100 points.", ar: "تابع واربح 100 نقطة." },
//         reward: 100,
//         need_image: true,
//         image_submitted: false,
//         link: "https://www.facebook.com"
//     },
//     {
//         name: "follow_instagram",
//         type: "social",
//         title: { en: "Follow & like us on Instagram", ar: "تابعنا وأعجب بنا على انستغرام" },
//         description: { en: "Follow and win 100 points.", ar: "تابع واربح 100 نقطة." },
//         reward: 100,
//         need_image: true,
//         image_submitted: false,
//         link: "https://www.instagram.com"
//     },
//     {
//         name: "follow_tiktok",
//         type: "social",
//         title: { en: "Follow & like us on Tiktok", ar: "تابعنا وأعجب بنا على تيك توك" },
//         description: { en: "Follow and win 100 points.", ar: "تابع واربح 100 نقطة." },
//         reward: 100,
//         need_image: true,
//         image_submitted: false,
//         link: "https://www.tiktok.com/"
//     },
//     {
//         name: "share_on_social",
//         title: { en: "Share on Social Media", ar: "مشاركة على وسائل التواصل الاجتماعي" },
//         description: { en: "Follow and win 100 points.", ar: "تابع واربح 100 نقطة." },
//         reward: 100,
//         need_image: true,
//         image_submitted: false,
//         link: "/"
//     },
//     {
//         name: "spin_wheel",
//         title: { en: "Spin the wheel", ar: "دور العجلة" },
//         description: { en: "Win upto 500 points.", ar: "اربح حتى 500 نقطة." },
//         link: "#prize_wheel"
//     },
//     {
//         name: "download_app",
//         title: { en: "Download mobile app", ar: "تنزيل التطبيق المحمول" },
//         reward: 500,
//         description: { en: "Get 500 points.", ar: "احصل على 500 نقطة." },
//     }
// ]

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

export const signsTypes = ["visit", "signup"];

export const shippingRates = {
    "standard_shipping": {
        "name": "Standard",
        "swft_profile": "nextday",
        "rate": 18,
        "time_limit": null,
        "additional_kg_charge": 2,
        "timespan": "1 - 2 days"
    },
    "express_shipping": {
        "name": "Express",
        "swft_profile": "sameday",
        "rate": 30,
        "time_limit": new Date().setHours(16, 0, 0, 0),
        "additional_kg_charge": 2,
        "timespan": "Today"
    },
    "express_4h_shipping": {
        "name": "Express 4h",
        "swft_profile": "express4h",
        "rate": 40,
        "time_limit": new Date().setHours(16, 0, 0, 0),
        "additional_kg_charge": 2,
        "timespan": "Today (withing 4 hours)"
    }
}
export const monthNames = [
    'january', 'february', 'march', 'april',
    'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'
];

export const UAEStates = {
    "ae-du": "Dubai",
    "ae-sh": "Sharjah",
    "ae-az": "Abu Dhabi",
    "ae-rk": "Ras Al Khaimah",
    "ae-aj": "Ajman",
    "ae-uq": "Umm Al-Quwain",
    "ae-fu": "Fujairah",
};

export const paymentOptions = {
    "cash_on_delivery": {
        "rate": 3.3,
        "discount": 0
    },
    "online_payment": {
        "rate": 0,
        "discount": 2.5
    }
}

export const orderStatuses = {
    'REQUESTED': { group: "processing", bg: "#64748b", text: "#ffff" },
    'ASSIGNED': { group: "processing", bg: "#64748b", text: "#ffff" },
    'PICKED UP': { group: "shipped", bg: "#facc15", text: "#808080" },
    'AT DEPOT': { group: "shipped", bg: "#facc15", text: "#808080" },
    'DELIVERING': { group: "delivering", bg: "#f97316", text: "#ffff" },
    "DELIVERED": { group: "delivered", bg: "#4ade80", text: "#ffff" },
    "ATTEMPTED": { group: "attempted", bg: "#fef08a", text: "#808080" },
    "CANCELLED": { group: "cancelled", bg: "#dc2626", text: "#ffff" },
    "RTO INITIATED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTO ASSIGNED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTO PICKED UP": { group: "cancelled", bg: "#14b8a6", text: "#ffff" },
    "RTO COMPLETE": { group: "cancelled", bg: "#06b6d4", text: "#ffff" },
    "RTN REQUESTED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTN ASSIGNED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTN PICKED UP": { group: "cancelled", bg: "#14b8a6", text: "#ffff" },
    "RTN COMPLETE": { group: "cancelled", bg: "#06b6d4", text: "#ffff" }
};

export const currencies = ["AED", "SAR", "PKR"];
export const jwtExpiries = {
    default: 7, // 7 days
    extended: 30 // 30 days
}

export const newsletterInterests = ['bags', 'sneakers', 'jackets', 'dresses', 'fashion shows'];

export const giftCardPrices = [50, 100, 200, 300, 400, 500];
export const giftCardMethods = {
    self: {
        title: "Buy for self"
    },
    friend: {
        title: "Gift a friend"
    }
}
export const giftCardCovers = {
    birthday_covers: [
        "/giftcard-covers/birthday1.webp",
        "/giftcard-covers/birthday2.webp",
        "/giftcard-covers/birthday3.webp",
        "/giftcard-covers/birthday4.webp"
    ],
    christmas_covers: [
        "/giftcard-covers/christmas1.webp",
        "/giftcard-covers/christmas2.webp",
        "/giftcard-covers/christmas3.webp",
        "/giftcard-covers/christmas4.webp"
    ]
}
export const adminRoles = ['administrator', 'editor', 'author']