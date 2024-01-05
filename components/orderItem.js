import React, { useState } from 'react'
import useWallet from '@/hooks/useWallet';
import Invoice from '@/components/modals/invoice'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image'

export default function OrderCard(props) {
    const [invoice, setInvoice] = useState(false)
    const { formatPrice } = useWallet()
    const { order } = props
    const date = new Date(order.createdAt)

    const toggleInvoice = () => setInvoice(!invoice)
    const downloadInvoice = async (name) => {
        const invoice = document.getElementById('invoice');
        const canvas = await html2canvas(invoice, { scale: 6 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('landscape', 'pt', 'letter');
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.width, 0, null, 'FAST');
        pdf.save(`${name}.pdf`);
    }
    console.log("baby here is the order: ", order)

    return <>
        <Invoice key={`invoice-${props.key}`} order={order} setInvoice={setInvoice} show={invoice} />
        <div key={props.key} className={`w-full h-48 md:h-52 ${props.marginClass || "my-3"} flex flex-col items-start rounded-xl overflow-clip`}>
            <div className="bg-gray-50 w-full h-[30%] px-2 md:px-5 py-2 font_urbanist_light text-[10px] md:text-xs flex justify-between">
                <div className="w-2/5 h-full flex justify-between">
                    <span className='flex flex-col justify-between h-full space-y-2' >
                        <p className='font_urbanist_medium'>Order Placed</p><p className='font_gotam_light'>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</p>
                    </span>
                    <span className='flex flex-col justify-between h-full space-y-2' >
                        <p className='font_urbanist_medium'>Total Price</p><p className='font_gotam_light' >{formatPrice(order.price_details.total_price + order.price_details.shipping_fees)}</p>
                    </span>
                </div>
                <div className='w-auto h-full flex flex-col justify-between items-end space-y-2 font_urbanist'>
                    <h6>Order ID: # <code className='font_urbanist_light' >{order._id}</code></h6>
                    <div className="w-full flex justify-end">
                        {/* <button className="hidden underline cursor-pointer">View Order Details</button> */}
                        <button onClick={window.matchMedia('(max-width: 1024px)').matches ? () => { downloadInvoice('invoice') } : toggleInvoice} className="underline cursor-pointer whitespace-nowrap">{window.matchMedia('(max-width: 1024px)').matches ? "Download Invoice" : "View Invoice"}</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-between items-center text-xs md:text-sm">
                <div className="w-full md:w-3/4 h-full flex items-center">
                    {order.order_items[0] ? <span className='w-24 md:w-28 aspect-square rounded-xl overflow-hidden mr-10'>
                        <Image width={250} height={250} alt={order._id} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + order.order_items[0]?.image} className="w-full h-full object-top object-cover" />
                    </span> : <span className={`${order.gift_cards[0]?.bg} w-24 md:w-28 aspect-video rounded-xl flex justify-center items-center font_montserrat_bold text-white text-xs tracking-1 uppercase overflow-hidden mr-10`}>{order.gift_cards[0]?.d_name}</span>}
                    <div className="flex flex-col space-y-2">
                        <h3 className="font_urbanist_bold text-sm md:text-base">{order.order_items[0]?.name || order.gift_cards[0]?.name}</h3>
                        <p className="font_urbanist text-[10px] md:text-xs">Return Window Closed on June 23</p>
                    </div>
                </div>
                <span className='hidden md:flex justify-self-end text-[10px] md:text-xs' >
                    <p className="font_urbanist_light">Powered By:&nbsp;</p><h6>Urban Fits</h6>
                </span>
            </div>
        </div>
    </>
}