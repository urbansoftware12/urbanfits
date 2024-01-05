import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import AlertPage from '@/components/alertPage';
import Loader from '@/components/loaders/loader';
import LinkBtn from '@/components/buttons/link_btn';
import toaster from '@/utils/toast_function';
import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';
import { useCart } from 'react-use-cart';
import Image from 'next/image';
import mongoose from 'mongoose';
import { pusherClient } from '@/utils/pusher';

const giftCardPrices = {
    "giftcard_bronze": "bronze_metal_bg",
    "giftcard_silver": "silver_metal_bg",
    "giftcard_gold": "gold_metal_bg",
    "giftcard_platinum": "platinum_metal_bg",
    "giftcard_diamond": "diamond_metal_bg",
}
export default function Thanks() {
    const router = useRouter()
    const { user, guestUser } = useUser()
    const { getUfBalance, formatPrice } = useWallet()
    const { emptyCart } = useCart()
    const [negativeState, setNegativeState] = useState(<Loader />)
    const [orderData, setOrderData] = useState(null)

    useEffect(() => {
        emptyCart()
        const paymentChannel = pusherClient.subscribe(`payments-user_${user?._id || guestUser?._id}`)
        paymentChannel.bind('payment-succeeded', (data) => {
            console.log(data)
            toaster(data.type, data.msg)
            setOrderData(data.order_session)
        })
        paymentChannel.bind('checkout-session-completed', (data) => {
            console.log(data)
            toaster(data.type, data.msg)
        })
        const timeOutId = setTimeout(() => {
            setNegativeState(<AlertPage type="error" heading="Oh Snap! Order Not Found" message="Either your order session expired or request timed out. Please check your Account Dashboard or your email inbox to see your order updates." />)
        }, 60000);
        if (user) getUfBalance()

        return () => {
            clearTimeout(timeOutId)
            paymentChannel.unbind('payment-succeeded')
            pusherClient.unsubscribe('payments')
        }
    }, [])

    const date = new Date()
    if (!router.query.o_session_id || !mongoose.Types.ObjectId.isValid(router.query.o_session_id)) return <AlertPage type="error" heading="Oh Snap! Order Not Found" message="Either your order session expired or your order is not confirmed. You can't confirm your order until you checkout and make a payment." />
    if (orderData) return <>
        <Head>
            <title>Thanks - Urban Fits</title>
            <meta name="description" content="Customer Order" />
        </Head>
        <main className="bg-white w-full pb-20 pt-7 flex justify-center">
            <section className='w-full lg:w-90pr h-full p-5 md:px-[7%] lg:pt-9 gap-y-7 font_urbanist text-left pt-5' >
                <h1 className="text-2xl font_urbanist_bold">Thanks</h1>
                <span className="font_urbanist_light">Thank you for doing business with us. We have emailed you the purchases <br /> receipt for the transaction.</span>
                <h4 className='mt-5 font_urbanist_medium'>By Admin</h4>
                <span className="w-4/5 font_urbanist_light">Payment to be made upon delivery. <br /> Order status changed from Pending payment to processing. {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} {date.getHours() + ":" + date.getMinutes()}</span>
                <div className="w-full py-8 my-7 text-sm border-y border-y-gray-400 flex flex-col justify-start">
                    <h3 className="text-xl font_urbanist_bold mb-4">Shipping Details</h3>
                    <span>{orderData.name}</span>
                    <span>{orderData.shipping_address.address}</span>
                    <span>{orderData.shipping_address?.apt_suite}</span>
                    <span>{orderData.shipping_address.phone_prefix}&nbsp;{orderData.shipping_address.phone_number}</span>
                </div>
                <div>
                    <h4 className="text-base md:text-xl font_urbanist_bold mb-5">Itmes(s) On This Order</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-x-7 lg:gap-x-10 justify-items-stretch">
                        {orderData.order_items?.map((item) => {
                            return <div className="w-full my-5 flex justify-between items-center">
                                <div className="w-1/4 md:w-1/4 aspect-square">
                                    <Image width={560} height={590} src={item.image} alt={item.name} className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" />
                                </div>
                                <span className="flex flex-col items-end">
                                    <h1 className="text-base lg:text-xl font_urbanist_medium">{item.name}</h1>
                                    <h2 className="text-sm md:text-base font_urbanist_medium capitalize">{item.color}</h2>
                                    <span className="font_gotam_light space-x-5"> <small>Qty:{item.quantity}</small> <small>{formatPrice(item.price)}</small> </span>
                                </span>
                            </div>
                        })}
                        {orderData.gift_cards?.map((item) => {
                            return <div className="w-full my-5 flex justify-between items-center">
                                <div className={`w-1/4 md:w-1/4 uppercase font_montserrat_bold text-white text-xs tracking-1 flex justify-center items-center rounded-xl aspect-video ${giftCardPrices[item.id]}`}>{item.d_name}</div>
                                <span className="flex flex-col items-end">
                                    <h1 className="text-base lg:text-xl font_urbanist_medium">{item.name}</h1>
                                    <small>{formatPrice(item.price)}</small>
                                </span>
                            </div>
                        })}
                    </div>
                    <h4 className="text-base md:text-xl font_urbanist_bold my-5">Price Details</h4>
                    <div className="w-full h-auto my-5 md:my-3">
                        <span key={1} className="w-full mx-auto flex justify-between"><small>Price</small> <small>{formatPrice(orderData.price_details.total_price)}</small></span>
                        <span key={2} className="w-full mx-auto flex justify-between"><small>Discount</small> <small>0%</small></span>
                        <span key={3} className="w-full mx-auto flex justify-between"><small>Shipping Fee</small> <small>{formatPrice(orderData.price_details.shipping_fees)}</small></span>
                        <span key={5} className="w-full mx-auto flex justify-between"><small>Total Amount</small> <small>{formatPrice(orderData.price_details.total_price + orderData.price_details.shipping_fees)}</small></span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end border-t border-t-gray-400">
                        <div className="relative w-full pt-2 flex flex-col">
                            <h4 className="text-xl font_urbanist_bold my-4">Tracking Details</h4>
                            <span><small className=''>Order No:</small> #656755832</span>
                            <span><small className=''>Tracking No:</small> #6332253454234266</span>
                        </div>
                        <LinkBtn href="/trackorder" my="my-6 md:my-0" font="font_urbanist_medium" fontSize="text-xs md:text-sm" classes="px-5 w-full md:w-80" >Track You Order</LinkBtn>
                    </div>
                </div>
            </section>
        </main>
    </>
    else return <div className="w-full h-screen">{negativeState}</div>
}
