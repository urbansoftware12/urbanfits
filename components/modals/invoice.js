import { useEffect, useState } from 'react'
import Button from '../buttons/simple_btn'
import useWallet from '@/hooks/useWallet';
import Image from 'next/image'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Loader from '../loaders/loader';

const OrderItem = ({ item, index }) => {
    const { formatPrice } = useWallet()
    const isGfitCard = item.is_giftcard;
    return <div style={{ display: "grid", gridTemplateColumns: "0.3fr 0.8fr 2.5fr 0.5fr 0.5fr 0.4fr 0.5fr 0.5fr" }} className={`items-center w-full py-3 border-b text-[10px] md:text-sm ${index % 2 ? 'bg-white' : 'bg-gray-50'}`}>
        <span className=" ml-2">{index}</span>
        {isGfitCard ? <div className="w-14 aspect-square bg-pinky rounded-lg flex justify-center items-center text-[7px] lg:text-[8px] text-white font_copper">E-GIFTCARD</div> : <Image width={100} height={100} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.image} className='w-14 aspect-square rounded-lg object-cover object-top' alt={item.name} />}
        <span>{isGfitCard ? (item.buy_for == "self" ? "UF E-Giftcard (For Self)" : "UF E-Giftcard (For Friend)") : item.name}</span>
        <span>{isGfitCard ? "--" : item.variant}</span>
        <span>{isGfitCard ? "--" : item.size}</span>
        <span>{item.quantity}</span>
        <span>{formatPrice(item.price)}</span>
        <span>{formatPrice(item.price * item.quantity)}</span>
    </div>
}

export default function Invoice({ order, show, setInvoice }, props) {
    const { formatPrice } = useWallet();
    const [loading, setLoading] = useState(false);

    const downloadInvoice = async (name) => {
        setLoading(true)
        const invoice = document.getElementById('invoice');
        const canvas = await html2canvas(invoice, { scale: 5 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('landscape', 'pt', 'letter');
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.width, 0, null, 'FAST');
        pdf.save(`${name}.pdf`);
        setLoading(false)
    }

    const orderItems = order.gift_cards?.some(item => item.is_giftcard) ? order.gift_cards : order.order_items;
    console.log("the items here ", order)

    const shareInvoice = () => {
        const element = document.getElementById('invoice');
        html2canvas(element).then((canvas) => {
            canvas.toBlob(function (blob) {
                const filesArray = [new File([blob], 'invoice.png', { type: 'image/png' })];
                const shareData = {
                    files: filesArray,
                };
                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => console.log('Shared successfully'))
                        .catch((error) => console.log('Error sharing:', error));
                } else {
                    alert('Share API not supported');
                }
            });
        });
    }

    useEffect(() => {
        if (show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [show])

    if (show) return <main key={props.key} className={`w-full h-screen overflow-y-scroll py-5 px-3 md:px-[5%] fixed left-0 top-0 z-50 bg-gray-200/40 backdrop-blur transition-all duration-500 scrollbar_x ${props.show ? "opacity-0 pointer-events-none" : ''}`}>
        {loading && <Loader />}
        <div className="w-full h-full">
            <section className="w-full my-5 flex flex-row justify-between items-center">
                <h1 className="font_urbanist_medium text-lg md:text-3xl self-start tracking-expand">Invoice</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={() => setInvoice(false)} classes='w-48pr md:w-auto' my='mb-2' bg='bg-white' text='black border' fontSize='text-[10px] md:text-xs' font='font_urbanist tracking-widest'><i className="fa-solid fa-chevron-left mr-2" />BACK</Button>
                    <Button onClick={() => { downloadInvoice(`invoice#${order._id}`) }} classes='w-48pr md:w-auto' my='mb-2' bg='bg-gold' fontSize='text-[10px] md:text-xs' font='font_urbanist tracking-widest'><i className="fa-solid fa-download text-white mr-2" />DOWNLOAD</Button>
                    <Button onClick={() => { window.print() }} classes='w-48pr md:w-auto' my='mb-2' bg='bg-gold' fontSize='text-[10px] md:text-xs' font='font_urbanist tracking-widest'><i className="fa-solid fa-print text-white mr-2" />PRINT</Button>
                    <Button onClick={shareInvoice} classes='w-48pr md:w-auto' my='mb-2' bg='bg-gold' fontSize='text-[10px] md:text-xs' font='font_urbanist tracking-widest'><i className="fa-solid fa-share-nodes text-white mr-2" />SHARE</Button>
                </div>
            </section>

            <section className="w-full pb-10 rounded-3xl overflow-x-scroll scrollbar_x">
                <section id='invoice' className="w-full p-7 lg:px-[3.5%] py-7 bg-white rounded-3xl">
                    <h2 className="mb-4 font_urbanist_medium text-base md:text-lg tracking-widiest">Invoie # <span className="text-xs"></span>{order._id}</h2>
                    <div className="flex items-start gap-x-20 lg:gap-x-40">
                        <div className="flex flex-col items-start justify-start font_urbanist_light text-xs gap-y-2">
                            <h3 className="font_urbanist text-xs md:text-sm">To</h3>
                            <span className='capitalize'>{order.shipping_address.firstname} {order.shipping_address.lastname}</span>
                            <span>{order.shipping_address.address},</span>
                            <p className="font_urbanist">Email: <span className="font_urbanist_light">{order.email}</span></p>
                            <p className="font_urbanist">Phone: <span className="font_urbanist_light">{order.shipping_address.phone_prefix} {order.shipping_address.phone_number}</span></p>
                        </div>
                    </div>

                    <div className="w-full py-3 px-1 overflow-y-scroll mt-5">
                        <div style={{ display: "grid", gridTemplateColumns: "0.3fr 0.8fr 2.5fr 0.5fr 0.5fr 0.4fr 0.5fr 0.5fr" }} className="w-full py-2 mb-3 border-b text-gray-400 text-xs">
                            <span className='ml-2'>#</span>
                            <span>Image</span>
                            <span>Item</span>
                            <span>Variant</span>
                            <span>Size</span>
                            <span>Units</span>
                            <span>Unit-Cost</span>
                            <span>Total</span>
                        </div>
                        {orderItems.map((item, index) => <OrderItem key={index} index={index + 1} item={item} />)}
                    </div>

                    <section className="w-full pt-10 flex flex-col items-end">
                        <div className="w-1/4 h-full px-4 py-3 border rounded-2xl text-xs">
                            <div className="w-full mb-6 grid grid-cols-2 gap-y-3">
                                <span>Subtotal</span>
                                <span className='justify-self-end'>{formatPrice(order.price_details.sub_total)}</span>
                                <span>Shipping Fees</span>
                                <span className='justify-self-end'>{formatPrice(order.price_details.shipping_fees)}</span>
                                <span>Total</span>
                                <span className='justify-self-end'>{formatPrice(order.price_details.total)}</span>
                            </div>
                            <Button onClick={() => { downloadInvoice('invoice#36') }} my="0" fontSize='text-xs' classes='w-full' font='font_urbanist tracking-widest'>DOWNLOAD</Button>
                        </div>
                    </section>
                </section>
            </section>

        </div>
    </main >
}