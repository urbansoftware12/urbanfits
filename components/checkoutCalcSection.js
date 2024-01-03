import React from 'react'
import { useCart } from "react-use-cart";
import useWallet from '@/hooks/useWallet';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import BounceLoader from './loaders/bounceLoader';
import Button from './buttons/simple_btn';
import toaster from '@/utils/toast_function';
import axios from 'axios';

export default function CheckoutCalcSection(props) {
    const { user } = useUser()
    const { totalUniqueItems, items, cartTotal } = useCart()
    const { points, formatPrice } = useWallet()
    const { shippingRates, calculateTotalShippingFee, selectedShippingOption } = props
    const totalUfPoints = items.reduce((total, item) => total + (item?.uf_points || 0), 0)
    const [giftCard, setGiftCard] = React.useState(null)
    const [giftCode, setGiftCode] = React.useState(null)
    const [giftLoading, setGiftLoading] = React.useState(false)
    const TotalOrderPrice = cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, selectedShippingOption) //in AED

    const checkGiftCard = async (gift_code) => {
        setGiftLoading(true)
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/verify-giftcode?gift_code=${gift_code}`)
            setGiftCard(data.gift_card)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        setGiftLoading(false)
    }

    const getTotalAmount = (returnDiscount = false) => {
        const pointsDiscount = parseFloat(props.values.points_to_use) * process.env.NEXT_PUBLIC_UF_POINT_RATE || 0 //in AED
        const giftcardDiscount = parseFloat(props.values.gift_code && giftCard ? giftCard?.price : 0)
        const finalTotalAmount = TotalOrderPrice - (pointsDiscount + giftcardDiscount)
        if (returnDiscount) return (100 - (finalTotalAmount / TotalOrderPrice * 100)).toFixed(2)
        if (TotalOrderPrice !== finalTotalAmount) return <span className='flex gap-x-2'><p className="line-through text-gray-400 text-10px xl:text-sm">{formatPrice(TotalOrderPrice)}</p>&nbsp;{formatPrice(finalTotalAmount)}</span>
        else return formatPrice(finalTotalAmount)
    }

    const giftCardBgs = {
        "100": "bronze_metal_bg",
        "200": "silver_metal_bg",
        "300": "gold_metal_bg",
        "400": "platinum_metal_bg",
        "500": "diamond_metal_bg",
    }

    return (
        <div className="bg-white w-full p-4 md:p-5 lg:p-7 space-y-3 rounded-xl">
            <h3 className="text-xl md:text-2xl font_urbanist_bold text-center mb-3">Order Summary ({totalUniqueItems})</h3>
            <div className="flex relative mb-3 w-full flex-col justify-between items-center rounded-lg md:rounded-2xl">
                {items.map((item, i) => {
                    if (item.id.startsWith("giftcard_")) return <section className="w-full mb-4 md:mb-6 p-4 border rounded-lg">
                        <h3 key={-i - 1} className="mb-2 self-start font_urbanist_medium text-sm md:text-base text-left capitalize">{item?.name}</h3>
                        <div key={i} className="w-full mb-2 flex justify-between xl:items-center">
                            <div className={`${item.bg} w-24 h-20 flex justify-center items-center rounded-md md:rounded-lg text-xs text-white font_montserrat_bold tracking-1 uppercase overflow-hidden`}>{item.d_name}</div>
                            <aside className="flex-1 flex lg:flex-col xl:flex-row items-start justify-between md:justify-start lg:justify-between ml-4 mid:ml-6 lg:ml-3 gap-x-2 md:gap-x-10 lg:gap-y-2.5 xl:gap-x-4 text-10px md:text-[13px]">
                                <div className="w-full lg:my-0 flex flex-col gap-y-2.5">
                                    <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Price:</span> <span>{formatPrice(item.price)}</span></div>
                                </div>
                            </aside>
                        </div>
                    </section>
                    return <>
                        <section className="w-full mb-4 md:mb-6 p-4 border rounded-lg">
                            <h3 key={-i - 1} className="mb-2 self-start font_urbanist_medium text-sm md:text-base text-left capitalize">{item?.name}</h3>
                            <div key={i} className="w-full mb-2 flex justify-between xl:items-center">
                                <div className="w-20 h-20 rounded-md md:rounded-lg overflow-hidden">
                                    <Image width={640} height={640} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.images[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                                </div>
                                <aside className="flex-1 flex lg:flex-col xl:flex-row items-start justify-between md:justify-start lg:justify-between ml-4 mid:ml-6 lg:ml-3 gap-x-2 md:gap-x-10 lg:gap-y-2.5 xl:gap-x-4 text-10px md:text-[13px]">
                                    <div className="lg:w-full xl:w-1/2 lg:my-0 flex flex-col gap-y-2.5">
                                        <div key={1} className="w-full mx-auto flex justify-between font_urbanist_bold capitalize"><span className='font_urbanist_medium text-gray-400'>Color:</span> <span className='truncate'>{item.color}</span></div>
                                        <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Size:</span> <span>{item.size}</span></div>
                                        <div key={3} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Quantity:</span> <span>{item.quantity}</span></div>
                                    </div>
                                    <div className="lg:w-full xl:w-1/2 lg:my-0 flex flex-col gap-y-2.5">
                                        {item.uf_points ? <div key={1} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-red-500'>UF Points:</span> <span>{item.uf_points}</span></div> : null}
                                        <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Price:</span> <span>{formatPrice(item.price)}</span></div>
                                        <div key={3} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Sale Price:</span> <span>{formatPrice(item.price * item.quantity)}</span></div>
                                    </div>
                                </aside>
                            </div>
                        </section>
                    </>
                })}
                <div className="w-full h-auto flex flex-col my-5 md:my-3 font_urbanist_bold text-sm md:text-base gap-y-3 md:gap-y-4">
                    {user && <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Card Number</span> <span>xxx-xxxxxxxxxxxxx-{user.uf_wallet.card_number.slice(-4)}</span></div>}
                    {user && <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-red-500'>Earned UF-Points</span> <span>{totalUfPoints}</span></div>}
                    <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Subtotal</span> <span>{formatPrice(cartTotal)}</span></div>
                    <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Discount</span> <span>{getTotalAmount(true)}%</span></div>
                    <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Shipping</span> <span>{formatPrice(calculateTotalShippingFee(shippingRates?.price || 0, selectedShippingOption)) || "We don't ship here"}</span></div>
                </div>
                {props.values.points_to_use ? parseFloat(props.values.points_to_use) > 0 && <div className="w-full py-2 flex justify-between font_urbanist_bold text-base">
                    <h4>Saved</h4>
                    <h4>{formatPrice(cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, selectedShippingOption) - ((cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, selectedShippingOption)) - parseFloat(props.values.points_to_use) * process.env.NEXT_PUBLIC_UF_POINT_RATE))}</h4>
                </div> : null}
                <div className="w-full py-2 flex justify-between font_urbanist_bold text-lg border-t border-t-gray-">
                    <h4>Total</h4>
                    <h4>{getTotalAmount()}</h4>
                </div>
                {user && <div className="w-full mt-4 p-2 border rounded-lg">
                    <h4 className="mb-3 font_urbanist_bold text-lg">Apply UF-Points</h4>
                    <span className="w-full flex justify-between items-center">
                        Your UF Balance: <p>{props.values.points_to_use && parseFloat(props.values.points_to_use) > 0 ? <span>{points} - {props.values.points_to_use} = {points - props.values.points_to_use}</span> : points} pts</p>
                    </span>
                    <div className="w-full relative flex flex-col">
                        <input name='points_to_use' id='points_to_use' type='number' onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            value > points ? props.setFieldError("points_to_use", "You can't apply more points than your actual balance.") : props.setFieldValue("points_to_use", value)
                        }} onBlur={props.handleChange} value={props.values.points_to_use} placeholder='Points to use' className={`w-full mt-3 h-11 px-4 py-2.5 border border-gray-300 focus:border-pink-500 hover:border-pink-400 transition rounded-lg outline-none`} />
                        <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-10px'>{props.errors && props.errors.point_to_use}</p>
                    </div>
                </div>}
                <div className="w-full mt-4 p-2 border rounded-lg">
                    <h4 className="mb-3 font_urbanist_bold text-lg">Apply Gift Code</h4>
                    {giftLoading && <div className="w-full col-span-full flex justify-center items-center"><BounceLoader /></div>}
                    {giftCard ? <span className="w-full flex flex-col justify-between items-center gap-y-4">
                        <span className={`px-6 py-4 rounded-lg font_montserrat_bold text-xs lg:text-sm text-white tracking-1 uppercase ${giftCardBgs[`${giftCard?.price}`]}`}>{giftCard.name}</span>
                        <p>You have <span className="font_urbanist_bold text-red-500">{formatPrice(giftCard.price)}</span> of discount.</p>
                    </span> : null}
                    <div className="w-full relative flex justify-between items-center">
                        <input name='gift_code' id='gift_code' onChange={(e) => setGiftCode(e.target.value)} onBlur={props.handleChange} value={giftCode} className={`w-full mt-3 h-11 px-4 py-2.5 border border-gray-300 focus:border-pink-500 hover:border-pink-400 border-r-0 transition rounded-l-lg outline-none`} />
                        <button onClick={() => checkGiftCard(giftCode)} disabled={giftLoading} className="bg-[#FF4A60] h-11 mt-3 px-2 py-1 text-white text-xs lg:text-sm rounded-r-lg">Check</button>
                        <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-10px'>{props.errors && props.errors.point_to_use}</p>
                    </div>
                    {!props.values?.gift_code ? <Button disabled={giftCard?._id ? (!giftCode || giftCode.length < 8 || giftCode.length > 10) : true} onClick={() => props.setFieldValue("gift_code", giftCode)} my="mt-2" classes="w-full">Apply</Button> :
                        <Button onClick={() => props.setFieldValue("gift_code", null)} my="mt-2" bg="bg-gray-100" text="black" classes="w-full">Retract</Button>}
                </div>
            </div>
        </div>
    )
}
