import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import Error403 from '@/pages/403';
import OrderItem from '@/components/orderItem';
import BounceLoader from '@/components/loaders/bounceLoader';
import Link from 'next/link'
import toaster from '@/utils/toast_function';
import User from '..';
import axios from 'axios';
import Image from 'next/image';
const EmtpyOrderImg = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/empty-order.png"

const Option = (props) => {
    const router = useRouter()
    const route = router.pathname
    return <Link className='h-full group flex flex-col justify-between items-center font_urbanist_medium transition-all' href={props.href}>{props.children}<span className={`bg-gold-land h-1 mt-1 rounded-lg group-hover:w-full ${route === props.href ? 'w-full' : 'w-0'} transition-all duration-300`}></span></Link>
}

export const MblOption = (props) => {
    const router = useRouter()
    return <Link href={props.href} className={`${router.pathname === props.href ? "border-b border-b-black text-black font_urbanist_bold" : props.unseen ? "font_urbanist_bold text-black fa-bounce" : "font_urbanist_medium text-gray-500"} ${props.unseen ? "font_urbanist_bold text-black fa-bounce" : null} pb-3 text-base items-center transition-all`}>{props.children}</Link>
}

const NoOrderSection = () => {
    return <section className="w-full flex flex-col items-center gap-y-4 pt-[40%] md:pt-[30%] lg:pt-[16%]">
        <Image src={EmtpyOrderImg} width={150} height={150} alt='empty orders' />
        <span className="font_urbanist_bold text-[17px]">No orders to display</span>
        <span className="font_urbanist text-sm">You can track and review your orders <Link href="/trackorder" className='font_urbanist_medium underline text-black'>here</Link></span>
        <Link href="/products/category/all-categories" className='font_urbanist text-sm px-4 py-2 rounded-full bg-gray-100'>Go Shopping</Link>
    </section>
}

export default function OrdersPage(props) {
    const { user } = useUser()
    const [orders, setOrders] = useState([])
    const [orderLoading, setOrderLoading] = useState(false)

    const getOrders = async (status = null) => {
        if (!user) return
        setOrderLoading(true)
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/orders/get-user-orders?user_id=${user._id}${status ? `&status=${status}` : ''}`)
            setOrders(data.orders)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        setOrderLoading(false)
    }

    useEffect(() => {
        getOrders(props.status)
        return () => setOrders([])
    }, [props.status])

    if (!user) return <Error403 />
    if (window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>Orders</title></Head>
        <main className='w-screen min-h-screen bg-white flex flex-col transition-all duration-500'>
            <section className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
                <Link href="/user" className='fa-solid fa-chevron-left text-xl'></Link>
                <h1 className="font_urbanist_medium text-lg">Order</h1>
                <i className='w-0 h-0' />
            </section>
            <section className="bg-white sticky top-0 left-0 right-0 w-full px-4 pt-3 flex justify-between items-end">
                <MblOption href="/user/orders/orders">All Orders</MblOption>
                <MblOption href="/user/orders/pending">In Progress</MblOption>
                <MblOption href="/user/orders/shipped">Shipped</MblOption>
                <MblOption href="/user/orders/returns">Returns</MblOption>
            </section>
            {props.noOrders ? <NoOrderSection /> : <section className="w-full h-full p-4">
                {orderLoading ? <div className="w-full flex justify-center"><BounceLoader /></div> :
                    orders.map((order, index) => {
                        return <OrderItem marginClass={orders.length == index + 1 && "mb-16 mt-3"} key={index} order={order} />
                    })}
            </section>}
        </main>
    </>
    return <>
        <Head><title>Orders</title></Head>
        <User profileNull >
            <h1 className='my-5 text-xl lg:text-2xl font_urbanist_bold'>My Orders</h1>
            <div className="w-full text-sm md:text-base overflow-x-scroll hide_scrollbar">
                <div className="w-[150%] md:w-full h-full flex justify-between border-b border-b-gray-300 ">
                    <Option href='/user/orders/orders'>Orders</Option>
                    <Option href='/user/orders/pending'>In Progress</Option>
                    <Option href='/user/orders/shipped'>Shipped</Option>
                    <Option href='/user/orders/returns'>Returns</Option>
                </div>
            </div>
            <section className="w-full my-5 font_urbanist">
                {props.noOrders ? <NoOrderSection /> : <section className="w-full h-full p-4">
                    {orderLoading ? <div className="w-full flex justify-center"><BounceLoader /></div> :
                        orders.map((order, index) => {
                            return <OrderItem key={index} order={order} />
                        })}
                </section>}
            </section>
        </User>
    </>
}