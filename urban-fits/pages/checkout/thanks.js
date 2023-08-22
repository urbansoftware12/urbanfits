import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import AlertPage from '@/components/alertPage';
import LinkBtn from '@/components/buttons/link_btn';
import toaster from '@/utils/toast_function';
import { useCart } from 'react-use-cart';
// imports for images
import Image from 'next/image';

export default function Thanks() {
    const router = useRouter()
    const { emptyCart } = useCart()
    const [orderAvailable, setOrderAvailable] = useState(true)
    const [orderData, setOrderData] = useState(null)

    const get3dpNumber = (num) => {
        return num.toFixed(3)
    }

    useEffect(() => {
        const { payment } = router.query
        if (payment) {
            emptyCart()
            return toaster("success", "Payment successful")
        }
    }, [router.query.payment])

    useEffect(() => {
        const orderSession = sessionStorage.getItem("this_order_data")
        if (orderSession) setOrderAvailable(true)

        const parsedOrder = JSON.parse(orderSession)
        if (parsedOrder) setOrderData(parsedOrder)
    }, [])

    if (!orderAvailable || !orderData) return <AlertPage type="error" heading="Oh Snap! Order Not Found" message="Either your order session expired or your order is not confirmed. You can't confirm your order until you checkout and make a payment." />
    if (orderData.used) return <AlertPage type="error" heading="Oh Snap! Order Not Found" message="Either your order session expired or your order is not confirmed. You can't confirm your order until you checkout and make a payment." />
    sessionStorage.setItem("this_order_data", JSON.stringify({ ...orderData, used: true }))
    const date = new Date()
    return <>
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
                    <span>{orderData.shipping_info.name}</span>
                    <span>{orderData.shipping_info.shipping_address.address}</span>
                    <span>{orderData.shipping_info.shipping_address?.apt_suite}</span>
                    <span>{orderData.shipping_info.shipping_address.phone_prefix}&nbsp;{orderData.shipping_info.shipping_address.phone_number}</span>
                </div>
                <div>
                    <h4 className="text-base md:text-xl font_urbanist_bold mb-5">Itmes(s) On This Order</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-x-7 lg:gap-x-10 justify-items-stretch">
                        {orderData.items?.map((item) => {
                            return <div className="w-full my-5 flex justify-between items-center">
                                <div className="w-1/4 md:w-1/4 aspect-square">
                                    <Image width={560} height={590} src={item.images[0]} alt={item.name} className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" />
                                </div>
                                <span className="flex flex-col items-end">
                                    <h1 className="text-base lg:text-xl font_urbanist_medium">{item.name}</h1>
                                    <h2 className="text-sm md:text-base font_urbanist_medium capitalize">{item.color}</h2>
                                    <span className="font_gotam_light space-x-5"> <small>Qty:{item.quantity}</small> <small>${item.price}</small> </span>
                                </span>
                            </div>
                        })}
                    </div>
                    <h4 className="text-base md:text-xl font_urbanist_bold my-5">Price Details</h4>
                    <div className="w-full h-auto my-5 md:my-3">
                        <span key={1} className="w-full mx-auto flex justify-between"><small>Price</small> <small>{get3dpNumber(orderData.cartTotal)}</small></span>
                        <span key={2} className="w-full mx-auto flex justify-between"><small>Discount</small> <small>0%</small></span>
                        <span key={3} className="w-full mx-auto flex justify-between"><small>Shipping Fee</small> <small>${15}</small></span>
                        <span key={5} className="w-full mx-auto flex justify-between"><small>Total Amount</small> <small>${get3dpNumber(orderData.cartTotal + 15)}</small></span>
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
}
