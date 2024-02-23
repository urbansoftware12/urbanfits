import { useState } from 'react'
import BounceLoader from './loaders/bounceLoader';
import Button from './buttons/simple_btn';
import toaster from '@/utils/toast_function';
import axios from 'axios';

const giftCardBgs = {
    "100": "bronze_metal_bg",
    "200": "silver_metal_bg",
    "300": "gold_metal_bg",
    "400": "platinum_metal_bg",
    "500": "diamond_metal_bg",
}

export const getCouponDiscount = (Coupon, couponCode, items, cartTotal, user) => {
    if (couponCode && Coupon && Coupon.coupon_value > 0) {
        if (typeof Coupon.coupon_config.coupon_usage_limit === "number" && Coupon.coupon_config.coupon_usage_limit < 1) return 0
        const config = Coupon.coupon_config

        if (config.allowed_emails.length && !config.allowed_emails.includes(user.email)) return 0
        if ((config.minimum_spend && cartTotal < config.minimum_spend) || (config.maximum_spend && cartTotal > config.maximum_spend)) return 0

        let eligibleProducts = structuredClone(items)
        if (config.allowed_products.length) eligibleProducts = items.filter(p => config.allowed_products.includes(p.product_id))
        if (config.allowed_categories?.length) eligibleProducts = eligibleProducts.filter(p => p.categories.some(categ => config.allowed_categories.includes(categ)))

        if (config.exclude_sales) eligibleProducts = items.filter(p => !p.sale_price)

        if (config.exclude_products?.length) eligibleProducts = eligibleProducts.filter(p => !config.exclude_products.includes(p.product_id))
        if (config.exclude_categories?.length) eligibleProducts = eligibleProducts.filter(p => !p.categories.some(categ => config.exclude_categories.includes(categ)))

        const eligibleProductsPrice = eligibleProducts.reduce((acc, p) => acc + p.price, 0)
        if (eligibleProductsPrice >= Coupon.coupon_value) return Coupon.coupon_value
        else return eligibleProductsPrice

    } else return 0
}

export default function DiscountBox({ formatPrice, giftCard, setGiftCard, coupon, setCoupon, values, setFieldValue, errors }) {
    const [checkedSection, setCheckedSection] = useState(1)
    const [expand, setExpand] = useState(false)
    const setGiftState = (key, value) => setGiftCard(prevState => ({ ...prevState, [key]: value }))
    const setCoupontState = (key, value) => setCoupon(prevState => ({ ...prevState, [key]: value }))

    const checkGiftCard = async (gift_code) => {
        setGiftState('loading', true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/verify-giftcode`, { gift_code })
            setGiftState('card', data.gift_card)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        setGiftState('loading', false)
    }

    const checkCoupon = async (coupon_code) => {
        setCoupontState('loading', true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/coupon/get/one`, { coupon_code })
            setCoupontState('coupon', data.coupon)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        setCoupontState('loading', false)
    }


    return <>
        <div className="flex items-center text-xs md:text-sm lg:text-base font-semibold">
            <i className="fa-solid fa-circle-info" />&nbsp;
            <span>Have a Coupon / Gift Card? &nbsp;</span>
            <button onClick={() => setExpand(prev => !prev)} className="text-gray-500">Click here to enter code</button>
        </div>
        <section className={`w-full ${expand ? "max-h-[22rem] mt-2 p-4 border" : "max-h-0"} border-gray-200 rounded-xl transition-all duration-700 overflow-hidden`} tabIndex={2}>
            <div className="w-full flex justify-center items-center text-sm gap-x-4">
                <button className={`${checkedSection == 1 && "font-semibold"} px-2 flex flex-col justify-between items-center`} onClick={() => { setCheckedSection(1); setCoupon({ card: null, code: '', loading: false }) }}>
                    Coupon Code
                    <span className={`${checkedSection == 1 ? "w-full" : 'w-0'} h-0.5 lg:h-1 mt-0.5 lg:mt-1 bg-gold-land rounded-md transition-all duration-300`} />
                </button>
                <button className={`${checkedSection == 2 && "font-semibold"} px-2 flex flex-col justify-between items-center`} onClick={() => { setCheckedSection(2); setGiftCard({ coupon: null, code: '', loading: false }) }}>
                    Gift Code
                    <span className={`${checkedSection == 2 ? "w-full" : 'w-0'} h-0.5 lg:h-1 mt-0.5 lg:mt-1 bg-gold-land rounded-md transition-all duration-300`} />
                </button>
            </div>
            {(coupon.loading || giftCard.loading) && <div className="w-full col-span-full flex justify-center items-center"><BounceLoader /></div>}
            {checkedSection === 1 ? <>
                {coupon.coupon ? <span className="w-full flex flex-col justify-between items-center gap-y-4">
                    <span className={`px-6 py-4 rounded-lg font-bold text-sm lg:text-base`}>{coupon.coupon.name}</span>
                    <p>You have <span className="font-bold text-red-500">{formatPrice(coupon.coupon.coupon_value)}</span> of discount.</p>
                </span> : null}
                <div className="w-full relative flex justify-between items-center">
                    <input onChange={(e) => setCoupontState('code', e.target.value)} value={coupon.code} className={`w-full mt-3 h-10 px-4 py-2 border border-gray-300 focus:border-pink-500 hover:border-pink-400 border-r-0 transition rounded-l-lg outline-none`} />
                    <button type='button' onClick={() => checkCoupon(coupon.code)} disabled={coupon.loading} className="bg-[#FF4A60] h-10 mt-3 px-2 py-1 text-white text-xs lg:text-sm rounded-r-lg">Check</button>
                    <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-10px'>{errors && errors.point_to_use}</p>
                </div>
                {values?.coupon_code ?
                    <Button type="button" onClick={() => setFieldValue("coupon_code", '')} my="mt-2" bg="bg-gray-100" text="black" classes="w-full">Retract</Button> :
                    <Button type="button" disabled={coupon.coupon?.coupon_value ? (!coupon.code || coupon.code.length < 8) : true} onClick={() => { if (coupon.code.length > 7) setFieldValue("coupon_code", coupon.code) }} my="mt-2" classes="w-full">Apply</Button>}
            </> : <>

                {giftCard.card ? <span className="w-full flex flex-col justify-between items-center gap-y-4">
                    <span className={`px-6 py-4 rounded-lg font-bold text-sm lg:text-base text-white tracking-1 uppercase ${giftCardBgs[`${giftCard.card?.price}`]}`}>{giftCard.card.name}</span>
                    <p>You have <span className="font_urbanist_bold text-red-500">{formatPrice(giftCard.card.price)}</span> of discount.</p>
                </span> : null}
                <div className="w-full relative flex justify-between items-center">
                    <input onChange={(e) => setGiftState('code', e.target.value)} value={giftCard.code} className={`w-full mt-3 h-10 px-4 py-2 border border-gray-300 focus:border-pink-500 hover:border-pink-400 border-r-0 transition rounded-l-lg outline-none`} />
                    <button type='button' onClick={() => checkGiftCard(giftCard.code)} disabled={giftCard.loading} className="bg-[#FF4A60] h-10 mt-3 px-2 py-1 text-white text-xs lg:text-sm rounded-r-lg">Check</button>
                    <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-10px'>{errors && errors.point_to_use}</p>
                </div>
                {values?.gift_code ?
                    <Button type="button" onClick={() => setFieldValue("gift_code", '')} my="mt-2" bg="bg-gray-100" text="black" classes="w-full">Retract</Button> :
                    <Button type="button" disabled={giftCard.card?._id ? (!giftCard.code || giftCard.code.length < 8 || giftCard.code.length > 10) : true} onClick={() => { if (giftCard.code.length > 8 && giftCard.code.length < 11) { setFieldValue("gift_code", giftCard.code) } }} my="mt-2" classes="w-full">Apply</Button>}
            </>}
        </section>
    </>
}
