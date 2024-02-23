import { useEffect } from 'react'
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
const EmptyInboxImg = process.env.NEXT_PUBLIC_BASE_IMG_URL + "/website-copyrights/empty-inbox.webp"

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
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="11" viewBox="0 0 5 11" fill="none">
            <path d="M0.0809833 10.2834C0.131883 10.3634 0.215502 10.4252 0.306394 10.4543C0.520898 10.5234 0.666323 10.4434 1.01898 10.0471C1.18258 9.86533 1.39345 9.64356 1.48798 9.55267C1.5825 9.46178 2.06241 8.93825 2.54959 8.38926C3.0404 7.84028 3.7639 7.02953 4.16018 6.58963C4.95276 5.70617 5.0509 5.5571 4.98183 5.32806C4.93822 5.19353 4.29833 4.4446 3.69118 3.82653C3.57122 3.70656 3.0913 3.18303 2.6223 2.66314C2.1533 2.14324 1.68067 1.62696 1.56433 1.51789C1.45162 1.40881 1.21894 1.1616 1.04443 0.968922C0.669958 0.554458 0.524533 0.470815 0.306394 0.54353C0.0409911 0.630815 -0.078985 0.939815 0.055534 1.19796C0.110069 1.30339 1.42254 2.77221 1.48434 2.79764C1.49889 2.80492 1.69885 3.01214 1.92425 3.26299C2.1533 3.51385 2.42234 3.80106 2.52414 3.89924C2.73864 4.11374 3.89479 5.39349 3.93115 5.45531C3.95293 5.49892 2.21511 7.45127 1.52797 8.15295C0.986258 8.7092 0.11734 9.67992 0.055534 9.79989C-0.0244503 9.95986 -0.0171789 10.138 0.0809833 10.2834Z" fill="black" />
        </svg>
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

export const updateNotificationStatus = async (category) => {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/notifications/update-status?category=${category}`)
    } catch (error) { console.log(error) }
}

export default function NotificationInbox(props) {
    const router = useRouter()
    const { user, isLoggedIn, notifications, getNotifications } = useUser();

    useEffect(() => {
        if (!notifications.length) getNotifications()
    }, [])

    if (!user && !isLoggedIn()) return <Error403 />
    if (user && window.matchMedia('(min-width: 760px)').matches) return <>
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
    else if (user) return <>
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