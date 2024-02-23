import { useEffect, useState } from 'react'
import Button from '../buttons/simple_btn'
import useWallet from '@/hooks/useWallet';
import Image from 'next/image'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Loader from '../loaders/loader';
// import { saveAs } from 'file-saver';

const OrderItem = ({ item, index }) => {
    const { formatPrice } = useWallet()

    return (
        <div className={`w-full flex items-center py-3 px-1 border-b font_urbanist text-[10px] md:text-xs ${index % 2 ? 'bg-white' : 'bg-gray-50'}`}>
            <span className="w-[10%] pl-2">{index}</span>
            <span className="w-[15%]">
                <Image width={100} height={100} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.image} className='w-11 h-11 rounded-lg object-cover object-top' alt={item.name} />
            </span>
            <span className="w-[20%]">{item.name}</span>
            <span className="w-[29%]">Leather Shoe high sole, 12 days replacement warrenty</span>
            <span className="w-[7.66%] pl-2">{item.quantity}</span>
            <span className="w-[9.66%]">{formatPrice(item.price)}</span>
            <span className="w-[8.66%]">{formatPrice(item.price * item.quantity)}</span>
        </div>
    )
}

export default function Invoice({ order, show, setInvoice }, props) {
    const { formatPrice } = useWallet()
    const [loading, setLoading] = useState(false)
    // const downloadInvoice = () => {
    //     const element = document.getElementById('invoice');
    //     html2canvas(element, {
    //         scale: 6,
    //         useCORS: true
    //     }).then((canvas) => {
    //         canvas.toBlob(function (blob) {
    //             saveAs(blob, 'invoice#36.png');
    //         });
    //     });
    // }

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
                <section id='invoice' className="w-full min-w-[1350px] p-7 lg:px-[3.5%] py-7 bg-white rounded-3xl">
                    <h2 className="mb-4 font_urbanist_medium text-base md:text-lg tracking-widiest">Invoie # <span className="text-xs"></span>{order._id}</h2>
                    <div className="flex items-start gap-x-20 lg:gap-x-40">
                        <div className="flex flex-col items-start justify-start font_urbanist_light text-xs gap-y-2">
                            <h3 className="font_urbanist text-xs md:text-sm">To</h3>
                            <span className='capitalize'>{order.shipping_address.firstname} {order.shipping_address.lastname}</span>
                            <span>{order.shipping_address.address},</span>
                            <p className="font_urbanist">Email: <span className="font_urbanist_light">{order.email}</span></p>
                            <p className="font_urbanist">Phone: <span className="font_urbanist_light">{order.shipping_address.phone_prefix} {order.shipping_address.phone_number}</span></p>
                        </div>

                        <div className="flex justify-between items-start">
                            <div className="flex flex-col items-start justify-start font_urbanist_light text-xs gap-y-2">
                                <h3 className="font_urbanist text-xs md:text-sm">Detials</h3>
                                <span className='capitalize'>{order.billing_address.firstname} {order.billing_address.lastname}</span>
                                <span>{order.billing_address.address},</span>
                                <p className="font_urbanist">Email: <span className="font_urbanist_light">{order.email}</span></p>
                                <p className="font_urbanist">Phone: <span className="font_urbanist_light">{order.billing_address.phone_prefix} {order.billing_address.phone_number}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full overflow-y-scroll mt-5">
                        <div className="w-full flex items-center py-3 px-1 border-b font_urbanist text-xs">
                            <span className="w-[10%] pl-2 text-gray-400">#</span>
                            <span className="w-[15%] text-gray-400">Image</span>
                            <span className="w-[20%] text-gray-400">Item</span>
                            <span className="w-[29%] text-gray-400">Description</span>
                            <span className="w-[7.66%] text-gray-400">Units</span>
                            <span className="w-[9.66%] text-gray-400">Unit-Cost</span>
                            <span className="w-[8.66%] text-gray-400">Total</span>
                        </div>
                        {order.order_items.map((item, index) => {
                            return <OrderItem key={index} index={index + 1} item={item} />
                        })}
                        {order.gift_cards.map((item, index) => {
                            return <div className={`w-full flex items-center py-3 px-1 border-b font_urbanist text-[10px] md:text-xs ${index % 2 ? 'bg-white' : 'bg-gray-50'}`}>
                                <span className="w-[10%] pl-2">{index + 1}</span>
                                <div className="w-[15%]">
                                    <span className={`${item.bg} w-3/5 mx-auto aspect-video flex justify-center items-center text-xs text-white font_montserrat_bold tracking-1 uppercase rounded-xl overflow-hidden`}>
                                        {item.d_name}
                                    </span>
                                </div>
                                <span className="w-[20%]">{item.name}</span>
                                <span className="w-[29%]"></span>
                                <span className="w-[7.66%] pl-2"></span>
                                <span className="w-[9.66%]"></span>
                                <span className="w-[8.66%]">{formatPrice(item.price)}</span>
                            </div>
                        })}
                    </div>

                    <div className="w-full pt-10 flex flex-col items-end">
                        <div className="w-1/5 flex justify-between font_urbanist text-xs gap-y-3">
                            <div className="flex flex-col gap-y-3">
                                <span>Subtotal</span>
                                <span>Shipping Fees</span>
                                <span>Total</span>
                            </div>

                            <div className="flex flex-col gap-y-3">
                                <span>{formatPrice(order.price_details.total_price)}</span>
                                <span>{formatPrice(order.price_details.shipping_fees)}</span>
                                <span>{formatPrice(order.price_details.total_price + order.price_details.shipping_fees)}</span>
                            </div>
                        </div>
                        <Button onClick={() => { downloadInvoice('invoice#36') }} fontSize='text-xs' classes='w-1/5' font='font_urbanist tracking-widest'>DOWNLOAD</Button>
                    </div>
                </section>
            </section>

        </div>
    </main>
}