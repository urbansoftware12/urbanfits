import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import Error403 from '@/pages/403'
import timeAgo from '@/utils/timestamp_duration'
import axios from 'axios'
import { MblOption } from '../orders'
import {
    PrimaryNotifyIcon,
    AccountNotifyIcon,
    RewardNotifyIcon,
    BellNotifyIcon,
    HeartNotifyIcon
} from '@/public/accountIcons'
import Image from 'next/image'
const EmptyInboxImg = "https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/empty-inbox.png"

const NoNotificationSection = () => {
    return <section className="w-full h-full flex flex-col mid:items-center mid:justify-center items-center gap-y-4 pt-[40%] mid:pt-0">
        <Image src={EmptyInboxImg} width={150} height={150} alt='empty orders' />
        <span className="font_urbanist_medium text-gray-400 text-sm lg:text-base">It's empty</span>
    </section>
}

const Option = (props) => {
    const router = useRouter()
    const route = router.pathname
    if (window.matchMedia('(min-width: 1024px)').matches) return <Link href={props.href} className={`relative w-full py-5 px-4 flex justify-between items-center ${props.unseen ? "border border-black rounded-lg" : "border-b border-[#F5F5F5]"} ${route === props.href ? 'bg-gray-100' : 'bg-white'} transition-all overflow-hidden`}>
        {props.unseen ? <span className="absolute top-[23%] right-[18%] text-[8px] text-white fa-bounce font_urbanist_light px-2 py-px bg-black rounded-full">new</span> : null}
        <span className={`${route === props.href ? 'opacity-100' : 'opacity-70'} flex items-center gap-x-3`}>
            {props.icon}
            {props.children}
        </span>
        <i className="arrow material-symbols-outlined text-lg text-gray-600 transition-all">chevron_right</i>
    </Link>
    else return <Link href={props.href} className={`${route === props.href ? 'active_bg text-white lg:text-black active' : 'bg-white text-black'} ${props.unseen ? "border border-black fa-bounce" : null} shadow-md flex justify-center lg:justify-between items-center px-4 py-1 mx-2 lg:m-0 lg:py-5 whitespace-nowrap lg:border-b lg:border-[#F5F5F5] rounded-full lg:rounded text-sm lg:text-base`}>
        {props.children}
    </Link>
}

export const NotificationItem = ({ notific, key, marginClass }) => {
    return <div key={key} className={`w-full ${marginClass} flex flex-col border-b py-4`}>
        <h3 className="mb-3 md:mb-4 font_urbanist_bold text-base lg:text-lg">{notific.heading}</h3>
        <p className="mb-2 font_urbanist text-sm">{notific.message}</p>
        <div className='w-full flex justify-between items-center font_urbanist_light text-10px md:text-xs'>
            <span>{notific.timestamp}</span>
            {timeAgo(notific.timestamp)}
        </div>
    </div>
}

export const updateNotificationStatus = async (user_id, category) => {
    try {
        const { data } = await axios.put(`${process.env.HOST}/api/user/notifications/update-status?user_id=${user_id}&category=${category}`)
        console.log(data)
    } catch (error) { console.log(error) }
}

export default function NotificationInbox(props) {
    const router = useRouter()
    const { user, notifications, getNotifications } = useUser()

    React.useEffect(() => {
        if (!notifications.length) getNotifications()
    }, [])

    if (!user) return <Error403 />
    if (window.matchMedia('(min-width: 760px)').matches) return <>
        <Head><title>Notificatoins Inbox - Urban Fits</title></Head>
        <main className="bg-gray-50 w-full min-h-layout_height md:px-7 lg:px-14 xl:px-20 py-16 font_urbanist">
            <div className="flex flex-col lg:flex-row justify-between">
                <section className="w-full lg:w-1/4 hidden mid:block">
                    <div className="flex lg:flex-col lg:sticky left-0 top-20 items-center w-full pb-7 pt-3 px-4 lg:p-0 lg:w-[95%] 2xl:w-[90%] rounded-lg list-none font_urbanist overflow-hidden">
                        <h1 href={props.href} className="hidden lg:flex w-full p-4 items-center border-b border-[#F5F5F5] bg-white text-lg transition-all overflow-hidden">Inbox</h1>
                        <Option unseen={notifications.some(notific => !notific.seen && notific.category === "primary")} icon={<PrimaryNotifyIcon />} href='/user/inbox/primary'>Primary</Option>
                        <Option unseen={notifications.some(notific => !notific.seen && notific.category === "order")} icon={<BellNotifyIcon />} href='/user/inbox/orders'>Orders</Option>
                        <Option unseen={notifications.some(notific => !notific.seen && notific.category === "reward")} icon={<RewardNotifyIcon />} href='/user/inbox/rewards'>Rewards</Option>
                        <Option unseen={notifications.some(notific => !notific.seen && notific.category === "account")} icon={<AccountNotifyIcon />} href='/user/inbox/account'>Account</Option>
                        <Option icon={<HeartNotifyIcon />} href='/products/category/wishlist'>Wishlist</Option>
                    </div>
                </section>
                <section className='relative bg-white w-full mid:min-h-[50vh] lg:min-h-0 lg:w-[70%] 2xl:w-[73%] px-12 py-10 rounded-lg font_urbanist text-left overflow-hidden'>
                    {props.noNotifications ? <NoNotificationSection /> :
                        props.filteredNotifics?.map((notific, index) => {
                            return <NotificationItem key={index} notific={notific} />
                        })}
                </section>
            </div>
        </main >
    </>
    else return <>
        <Head><title>Notificatoins Inbox - Urban Fits</title></Head>
        <section className={`w-full p-4 ${router.pathname === "/user/inbox" ? null : "border-b border-gray-50"} flex justify-between items-center`}>
            <button onClick={() => router.back()} className='fa-solid fa-chevron-left text-xl'></button>
            <h1 className="font_urbanist_medium text-lg">Inbox</h1>
            <i className='w-0 h-0' />
        </section>
        <main className='w-screen min-h-screen bg-white flex flex-col transition-all duration-500'>
            <section className="bg-white sticky z-20 top-0 left-0 right-0 w-full px-4 pt-3 flex justify-between items-end">
                <MblOption unseen={notifications.some(notific => !notific.seen && notific.category === "primary")} href="/user/inbox/primary">Primary</MblOption>
                <MblOption unseen={notifications.some(notific => !notific.seen && notific.category === "account")} href="/user/inbox/account">Account</MblOption>
                <MblOption unseen={notifications.some(notific => !notific.seen && notific.category === "order")} href="/user/inbox/orders">Orders</MblOption>
                <MblOption unseen={notifications.some(notific => !notific.seen && notific.category === "reward")} href="/user/inbox/rewards">Rewards</MblOption>
            </section>
            {props.noNotifications ? <NoNotificationSection /> : <section className="w-full p-4">
                {props.filteredNotifics?.map((notific, index) => {
                    return <NotificationItem marginClass={props.filteredNotifics.length == index + 1 && "mb-16"} key={index} notific={notific} />
                })}
            </section>}
        </main>
    </>
}