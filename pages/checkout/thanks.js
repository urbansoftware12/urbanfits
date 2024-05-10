import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import AlertPage from '@/components/alertPage';
import LinkBtn from '@/components/buttons/link_btn';
import useWallet from '@/hooks/useWallet';
import { useCart } from 'react-use-cart';
import Image from 'next/image';

export default function Thanks() {
    // const router = useRouter()
    const { getUfBalance, formatPrice } = useWallet();
    const { emptyCart } = useCart();
    const [orderData, setOrderData] = useState(null);
    const includesGiftCard = orderData ? orderData.gift_cards?.some(item => item.is_giftcard) : [];

    console.log(orderData)
    useEffect(() => {
        emptyCart()
        setOrderData(JSON.parse(sessionStorage.getItem("bought_order_data")));
        getUfBalance()

        // return () => { sessionStorage.clear() }
    }, [])

    const date = new Date()
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
                <div className={`w-4/5 font_urbanist_light ${includesGiftCard && "mb-5 pb-4 border-b border-gotham-black"}`}>{orderData.payment_method === "online_payment" ? "Payment is processing further." : "Payment to be made upon delivery."} <br /> {includesGiftCard ? "Your Giftcard details will be delivered after the final payment approval." : "Order status changed from Pending payment to processing."} {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()} {date.getHours() + ":" + date.getMinutes()}</div>
                {!includesGiftCard && <div className="w-full py-8 my-7 text-sm border-y border-y-gray-400 flex flex-col justify-start">
                    <h3 className="text-xl font_urbanist_bold mb-4">Shipping Details</h3>
                    <span>{orderData?.name}</span>
                    <span>{orderData?.shipping_address?.address}</span>
                    <span>{orderData?.shipping_address?.apt_suite}</span>
                    <span>{orderData?.shipping_address?.phone_prefix}&nbsp;{orderData?.shipping_address?.phone_number}</span>
                </div>}
                <div>
                    <h4 className="text-base md:text-xl font_urbanist_bold mb-5">Itmes(s) On This Order</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-x-7 lg:gap-x-10 justify-items-stretch">
                        {orderData?.order_items?.map((item) => {
                            return <div className="w-full my-5 flex justify-between items-center">
                                <div className="w-1/4 md:w-1/4 aspect-square">
                                    <Image width={560} height={590} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.image} alt={item.name} className="w-full h-full rounded-lg md:rounded-xl object-cover object-top" />
                                </div>
                                <span className="flex flex-col items-end">
                                    <h1 className="text-base lg:text-xl font_urbanist_medium">{item.name}</h1>
                                    <h2 className="text-sm md:text-base font_urbanist_medium capitalize">{item.color}</h2>
                                    <span className="font_gotam_light space-x-5"> <small>Qty:{item.quantity}</small> <small>{formatPrice(item.price)}</small> </span>
                                </span>
                            </div>
                        })}
                        {orderData?.gift_cards?.map((item) => {
                            return <div className="w-full my-5 flex justify-between items-center">
                                <div className={`w-1/4 md:w-1/4 uppercase text-white flex flex-col justify-center items-center rounded-xl aspect-video bg-pinky text-[10px] lg:text-xs font-semibold`}>
                                    <span className="font_copper text-xs">UF E-Giftcard</span>
                                    AED {item.price}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-base lg:text-lg">UF E-Giftcard</span>
                                    <span className="text-xs lg:text-sm">For {item.buy_for == "self" ? "Self" : "Friend"}</span>
                                    <span className="text-xs lg:text-sm">{formatPrice(item.price)}</span>
                                </div>
                            </div>
                        })}
                    </div>
                    <h4 className="text-base md:text-xl font_urbanist_bold my-5">Price Details</h4>
                    <div className="w-full h-auto my-5 md:my-3">
                        <span key={1} className="w-full mx-auto flex justify-between"><small>Subtotal</small> <small>{formatPrice(orderData?.price_details?.sub_total)}</small></span>
                        <span key={2} className="w-full mx-auto flex justify-between"><small>Discount</small> <small>{formatPrice(orderData?.price_details?.total_discount)}</small></span>
                        <span key={3} className="w-full mx-auto flex justify-between"><small>Shipping Fee</small> <small>{formatPrice(orderData?.price_details?.shipping_fees)}</small></span>
                        <span key={5} className="w-full mx-auto flex justify-between"><small>Total Amount</small> <small>{formatPrice(orderData?.price_details?.total)}</small></span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end border-t border-t-gray-400">
                        <div className="relative w-full pt-2 flex flex-col">
                            <h4 className="text-xl font-semibold my-4">Tracking Details</h4>
                            {orderData?.tracking_number ? <>
                                <span className='text-xs lg:text-sm'>Order ID: <span className="text-xs text-[#FF4A60] lg:text-sm font-bold">{orderData?._id}</span></span>
                                <span className='text-xs lg:text-sm'>Tracking No: <span className="text-xs text-[#FF4A60] lg:text-sm font-bold">{orderData?.tracking_number}</span></span>
                            </> : "The order tracking details have been sent to your Email"}
                        </div>
                        <LinkBtn href={`/trackorder?order_id=${orderData._id}`} my="my-6 md:my-0" font="font_urbanist_medium" fontSize="text-xs md:text-sm" classes="px-5 w-full md:w-80" >Track You Order</LinkBtn>
                    </div>
                </div>
            </section>
        </main>
    </>
    else return <AlertPage type="error" heading="Oh Snap! Order Not Found" message="Either your order session expired or your order is not confirmed. You can't confirm your order until you checkout and make a payment." />
}
