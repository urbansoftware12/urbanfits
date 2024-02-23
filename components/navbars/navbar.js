import { useEffect, useState } from 'react';
import { useCart } from "react-use-cart";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useUser from '@/hooks/useUser';
import useWallet from "@/hooks/useWallet"
import Link from 'next/link'
import ToTopBtn from '../buttons/toTopBtn';
import Image from 'next/image';
import bag from '@/public/bag.svg'
const LanguageModal = dynamic(() => import('../modals/languagemodal'));;
const Logout = dynamic(() => import('@/components/modals/logout'));
const Cart = dynamic(() => import('../cart'));
const Search = dynamic(() => import('../search'));
const MobileNavbar = dynamic(() => import('./mobileNavbar'));
import {
    LogoutIcon,
    LocationIcon,
    UserIcon,
    DropDownIcon
} from "@/public/accountIcons"

const ListItem = (props) => {
    const router = useRouter()
    if (props.categories) return <Link {...props} className="group flex flex-col">
        <div className="flex items-center gap-x-4">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.566709 6.14375L0.566709 6.14375L0.567045 6.14441C0.612783 6.23422 0.65045 6.28362 0.687623 6.32028C0.725975 6.35809 0.782047 6.4003 0.885451 6.45568L0.972253 6.5H3.51431H6.05646L6.15624 6.4491L6.1569 6.44876C6.24686 6.40303 6.29634 6.36537 6.33304 6.32822C6.37087 6.28992 6.41309 6.23393 6.46849 6.13069L6.51273 6.0442V3.50481V0.965417L6.4685 0.878953C6.41309 0.77569 6.37088 0.719701 6.33304 0.681395C6.29634 0.64425 6.24686 0.606586 6.1569 0.560857L6.15624 0.56052L6.05567 0.509214L3.55707 0.500823C2.6733 0.498627 2.01112 0.500835 1.56001 0.507367C1.33391 0.510641 1.16456 0.514952 1.04826 0.520116C0.999508 0.522281 0.96343 0.524455 0.938169 0.526441C0.743945 0.610951 0.584784 0.787259 0.525972 0.959131C0.525145 0.97156 0.521384 1.01193 0.517665 1.09655C0.512561 1.21268 0.508381 1.37873 0.505381 1.60075C0.499394 2.04395 0.498274 2.69643 0.50267 3.59017C0.50267 3.59021 0.50267 3.59024 0.502671 3.59028L0.515261 6.04309L0.566709 6.14375ZM0.902272 0.530108C0.902414 0.530142 0.90474 0.529868 0.908821 0.529187C0.90417 0.529735 0.90213 0.530075 0.902272 0.530108Z" stroke="black" />
                <path d="M10.0804 6.14375L10.0804 6.14375L10.0807 6.14441C10.1265 6.23422 10.1641 6.28362 10.2013 6.32028C10.2396 6.35809 10.2957 6.4003 10.3991 6.45568L10.4859 6.5H13.028H15.5701L15.6699 6.4491L15.6706 6.44876C15.7605 6.40303 15.81 6.36537 15.8467 6.32822C15.8845 6.28992 15.9268 6.23393 15.9822 6.13069L16.0264 6.0442V3.50481V0.965417L15.9822 0.878953C15.9268 0.77569 15.8845 0.719701 15.8467 0.681395C15.81 0.64425 15.7605 0.606586 15.6706 0.560857L15.6699 0.56052L15.5693 0.509214L13.0707 0.500823C12.187 0.498627 11.5248 0.500835 11.0737 0.507367C10.8476 0.510641 10.6782 0.514952 10.5619 0.520116C10.5132 0.522281 10.4771 0.524455 10.4518 0.526441C10.2576 0.610951 10.0985 0.787259 10.0396 0.959131C10.0388 0.97156 10.0351 1.01193 10.0313 1.09655C10.0262 1.21268 10.0221 1.37873 10.0191 1.60075C10.0131 2.04395 10.0119 2.69643 10.0163 3.59017C10.0163 3.59021 10.0163 3.59024 10.0163 3.59028L10.0289 6.04309L10.0804 6.14375ZM10.4159 0.530108C10.4161 0.530142 10.4184 0.529868 10.4225 0.529187C10.4178 0.529735 10.4158 0.530075 10.4159 0.530108Z" stroke="black" />
                <path d="M0.566709 15.6437L0.566709 15.6437L0.567045 15.6444C0.612783 15.7342 0.65045 15.7836 0.687623 15.8203C0.725975 15.8581 0.782047 15.9003 0.885451 15.9557L0.972253 16H3.51431H6.05646L6.15624 15.9491L6.1569 15.9488C6.24686 15.903 6.29634 15.8654 6.33304 15.8282C6.37087 15.7899 6.41309 15.7339 6.46849 15.6307L6.51273 15.5442V13.0048V10.4654L6.4685 10.379C6.41309 10.2757 6.37088 10.2197 6.33304 10.1814C6.29634 10.1442 6.24686 10.1066 6.1569 10.0609L6.15624 10.0605L6.05567 10.0092L3.55707 10.0008C2.6733 9.99863 2.01112 10.0008 1.56001 10.0074C1.33391 10.0106 1.16456 10.015 1.04826 10.0201C0.999508 10.0223 0.96343 10.0245 0.938169 10.0264C0.743945 10.111 0.584784 10.2873 0.525972 10.4591C0.525145 10.4716 0.521384 10.5119 0.517665 10.5965C0.512561 10.7127 0.508381 10.8787 0.505381 11.1007C0.499394 11.5439 0.498274 12.1964 0.50267 13.0902C0.50267 13.0902 0.50267 13.0902 0.502671 13.0903L0.515261 15.5431L0.566709 15.6437ZM0.902272 10.0301C0.902414 10.0301 0.90474 10.0299 0.908821 10.0292C0.90417 10.0297 0.90213 10.0301 0.902272 10.0301Z" stroke="black" />
                <path d="M10.0804 15.6437L10.0804 15.6437L10.0807 15.6444C10.1265 15.7342 10.1641 15.7836 10.2013 15.8203C10.2396 15.8581 10.2957 15.9003 10.3991 15.9557L10.4859 16H13.028H15.5701L15.6699 15.9491L15.6706 15.9488C15.7605 15.903 15.81 15.8654 15.8467 15.8282C15.8845 15.7899 15.9268 15.7339 15.9822 15.6307L16.0264 15.5442V13.0048V10.4654L15.9822 10.379C15.9268 10.2757 15.8845 10.2197 15.8467 10.1814C15.81 10.1442 15.7605 10.1066 15.6706 10.0609L15.6699 10.0605L15.5693 10.0092L13.0707 10.0008C12.187 9.99863 11.5248 10.0008 11.0737 10.0074C10.8476 10.0106 10.6782 10.015 10.5619 10.0201C10.5132 10.0223 10.4771 10.0245 10.4518 10.0264C10.2576 10.111 10.0985 10.2873 10.0396 10.4591C10.0388 10.4716 10.0351 10.5119 10.0313 10.5965C10.0262 10.7127 10.0221 10.8787 10.0191 11.1007C10.0131 11.5439 10.0119 12.1964 10.0163 13.0902C10.0163 13.0902 10.0163 13.0902 10.0163 13.0903L10.0289 15.5431L10.0804 15.6437ZM10.4159 10.0301C10.4161 10.0301 10.4184 10.0299 10.4225 10.0292C10.4178 10.0297 10.4158 10.0301 10.4159 10.0301Z" stroke="black" />
            </svg>
            {props.children}
        </div>
        <span className={`${router.asPath.includes(props.href) ? 'w-full' : 'w-0'} group-hover:w-full h-[3px] mt-3 justify-self-start bg-gold-land transition-all duration-1000`}></span>
    </Link>
    else return <Link {...props} className={props.classes || "group flex flex-col"}>
        {props.children}
        <span className={`${router.asPath.includes(props.href) ? 'w-full' : 'w-0'} group-hover:w-full h-[3px] mt-3 justify-self-start bg-gold-land transition-all duration-1000`}></span>
    </Link>
}

const SecondaryNavbar = (props) => {
    const calculateMinOrder = () => {
        const { currency } = props
        const minOrders = { "PKR": "15,000", "AED": "300", "SAR": "300" }
        return `${currency} ${minOrders[currency]}`
    }

    if (window.matchMedia('(min-width: 760px)').matches) return <nav className="sticky top-4 left-0 right-0 z-40 w-full max-w-[2000px] mx-auto h-[50px] flex justify-between items-end px-7 lg:px-8 xl:px-10 2xl:px-16 font_urbanist text-[15px] bg-white shadow transition-all duration-300">
        <ListItem onClick={props.closeCart} key={1} href='/products/category/all-categories' categories>All Categories</ListItem>
        <ListItem onClick={props.closeCart} key={2} href='/products/category/64d517f6218f4e9ee6253b18?name=new+collection'>New Collection</ListItem>
        <ListItem onClick={props.closeCart} key={3} href='/products/category/64a59d5816b4c91fa1967b2e?name=women'>Women</ListItem>
        <ListItem onClick={props.closeCart} key={4} href='/products/category/649b292762a7c100cfb7207f?name=men'>Men</ListItem>
        <ListItem onClick={props.closeCart} key={5} href='/products/category/64d4dfa643c643cc9c60c672?name=kids'>Kids</ListItem>
        <ListItem onClick={props.closeCart} key={6} href='/products/category/64d4dfa643c643cc9c60c672?name=baby+products' classes="group hidden 2xl:flex flex-col">Baby Products</ListItem>
        <ListItem onClick={props.closeCart} key={7} href='/products/category/sale'>Sales</ListItem>
        <ListItem onClick={props.closeCart} key={8} href='/giftcard' classes="group hidden xl:flex flex-col">Gifts</ListItem>
        <ListItem onClick={props.closeCart} key={9} href='/products/category/64b5391e2c57908f1e94dc27?name=accessories' classes="group hidden xl:flex flex-col">Accessories</ListItem>
        <ListItem onClick={props.closeCart} key={10} href='/earn-ufpoints' classes="group hidden lg:flex flex-col">Earn Uf Points</ListItem>
        <ListItem onClick={props.closeCart} key={11} href='/products/category/wishlist'>Wishlist</ListItem>
        <span className="hidden lg:flex mb-2 flex-col justify-center items-center text-sm">
            Minimum Order
            <p className="font_urbanist_bold text-[13px]">{calculateMinOrder()}</p>
        </span>
    </nav>
    else if (window.matchMedia('(max-width: 760px)').matches) return <MobileNavbar {...props} />
}

export default function Navbar() {
    const { user, country, notifications, getNotifications, address, getAddress } = useUser();
    const { points, getUfBalance, currency } = useWallet();
    const { totalUniqueItems } = useCart();
    const [cart, setCart] = useState(false);
    const [logout, setLogout] = useState(false);
    const [langModal, setLangModal] = useState(false);
    const url = useRouter().pathname;
    const Exception = url.startsWith("/about") || (window.matchMedia('(max-width: 760px)').matches && (url.startsWith('/auth') || (url.startsWith('/user/') && url.length > '/user/'.length)))
    const unseenNotificCount = notifications?.filter(notific => notific.seen === false).length || 0

    useEffect(() => {
        getNotifications();
        getUfBalance();
        if (!address) getAddress();
    }, [user])

    const closeCart = () => {
        document.body.style.overflowY = 'visible'
        setCart(false)
    }

    const toggleCart = () => {
        document.body.style.overflowY = cart ? null : 'hidden'
        setCart(!cart)
    }

    if (!Exception) return <>
        <Cart cart={cart} toggleCart={toggleCart} setCart={setCart} />
        <Logout show={logout} setLogout={setLogout} />
        <LanguageModal show={langModal} setLangModal={setLangModal} />
        <ToTopBtn />
        <nav className="sticky z-50 font_urbanist w-full h-[45px] md:h-[65px] flex justify-between items-end md:items-center px-7 lg:px-8 xl:px-10 2xl:px-16 bg-white">
            <Link href='/' className='font_copper text-[22px] lg:text-2xl tracking-1 leading-none'><h1>URBAN FITS</h1></Link>
            <Search classes="hidden md:flex" />
            <Link href={user && user.email ? '/user/address' : "#"} className="hidden lg:flex items-center text-black">
                <LocationIcon />
                <div className="flex flex-col justify-center ml-3 items-start text-[13px]">
                    <p className="font_urbanist leading-snug">Deliver to</p>
                    <p className="font_urbanist_bold truncate max-w-[130px]">{address?.shipping_address?.address || "Set your Address"}</p>
                </div>
            </Link>
            <button onClick={() => {
                if (!user || !user.email) return
            }} className="relative hidden group md:flex items-center font_urbanist text-[13px] text-black gap-x-3">
                <UserIcon />
                {user && user.email ? <>
                    <div className="flex flex-col justify-center items-start">
                        <p className="font_urbanist text-[13px]">Welcome Back</p>
                        <p className="font_urbanist_bold text-[13px] truncate max-w-[130px]">{user.firstname || user.username}</p>
                    </div>
                    <span className="absolute top-full w-full h-4 bg-transparent pointer-events-none group-hover:pointer-events-auto"></span>
                    <div className="absolute top-full translate-y-4 left-1/2 -translate-x-1/2 bg-white w-48 !p-0 text-sm font_urbanist equillibrium_shadow rounded-lg transition-all overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                        <Link onClick={closeCart} href="/user/uf-wallet" className="w-full px-4 border-b hover:bg-slate-100 flex justify-between items-center py-3 transition-all">
                            <span className="font_copper text-base">UF-Points</span>
                            <p className='font_urbanist_medium'>{points}</p>
                        </Link>
                        <Link onClick={closeCart} href="/user/myaccount" className="w-full px-4 border-b hover:bg-slate-100 flex items-center py-3 transition-all">My Dashboard</Link>
                        <Link onClick={closeCart} href="/user/orders/orders" className="w-full px-4 border-b hover:bg-slate-100 flex items-center py-3 transition-all">My Orders</Link>
                        <Link onClick={closeCart} href="/user/orders/pending" className="w-full px-4 border-b hover:bg-slate-100 flex items-center py-3 transition-all">Orders in Progress</Link>
                        <Link onClick={closeCart} href="/user/shopping-lists" className="w-full px-4 border-b hover:bg-slate-100 flex items-center py-3 transition-all">My Shopping Lists</Link>
                        <span onClick={() => setLogout(!logout)} className="w-full px-4 cursor-pointer hover:bg-slate-100 flex items-center py-3 transition-all gap-x-2"><LogoutIcon />Log Out</span>
                    </div>
                </>
                    : <><Link href='/auth/login'>Login</Link> &nbsp;/&nbsp;<Link href='/auth/signup'>Register</Link></>}
            </button>
            <section className="w-auto lg:ml-5 gap-x-7 xl:gap-x-9 flex items-center justify-end">
                <button onClick={() => setLangModal(!langModal)} className="flex items-center gap-x-1.5">
                    <span className="w-6 h-[18px] md:w-7 md:h-5 overflow-hidden" title={country?.country}><Image className='w-full h-full object-cover' width={50} height={40} src={country?.src} /></span>
                    <DropDownIcon />
                </button>
                {user ? <Link href='/user/inbox/primary' className='relative'>
                    {notifications && notifications.some(notific => !notific.seen) ? <span className="absolute -top-1 right-0 z-10 translate-x-1/2 translate-y-[10%] lg:translate-y-[-30%] w-2 h-2 lg:w-4 lg:h-4 flex justify-center items-center text-[10px] border border-white aspect-square rounded-full bg-[#FF4A60]"><p className='hidden lg:block text-white'>{unseenNotificCount}</p></span> : null}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 21 16" fill="none">
                        <path d="M1.46875 4V4.24496L1.66232 4.39509L8.73082 9.8774C9.76266 10.7325 11.2415 10.7325 12.2733 9.87735L19.3378 4.39501L19.5312 4.24488V4V2.66667C19.5312 2.03131 19.0195 1.5 18.375 1.5H2.625C1.98053 1.5 1.46875 2.03131 1.46875 2.66667V4ZM2.27269 5.10298L1.46875 4.48753V5.5V13.3333C1.46875 13.9687 1.98053 14.5 2.625 14.5H18.375C19.0195 14.5 19.5312 13.9687 19.5312 13.3333V5.5V4.48753L18.7273 5.10298L12.1961 10.103L12.1737 10.1201L12.1534 10.1396C11.7444 10.5329 11.1278 10.75 10.4851 10.75C9.84161 10.75 9.23991 10.5328 8.85355 10.1464L8.83018 10.1231L8.80394 10.103L2.27269 5.10298ZM1 2.66667C1 1.97591 1.1331 1.58565 1.33026 1.36451C1.5156 1.15663 1.8475 1 2.5 1H18.375C19.0269 1 19.4031 1.15676 19.6231 1.38154C19.8453 1.60847 20 1.99809 20 2.66667V13.3333C20 14.0019 19.8453 14.3915 19.6231 14.6185C19.4031 14.8432 19.0269 15 18.375 15H2.625C1.97308 15 1.59689 14.8432 1.37686 14.6185C1.15471 14.3915 1 14.0019 1 13.3333V2.66667Z" fill="black" stroke="black" />
                    </svg>
                </Link> : null}
                <button onClick={() => { toggleCart(); scrollTo(0, 0) }} className="hidden md:block relative">
                    {totalUniqueItems !== 0 ? <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 flex justify-center items-center border border-white text-white text-[10px] aspect-square rounded-full bg-[#FF4A60]">{totalUniqueItems}</span> : null}
                    <Image src={bag} />
                </button>
                {user && window.matchMedia('(max-width: 760px)').matches ? <Link href='/earn-ufpoints'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                        <path d="M5.00075 0.529482C4.15007 0.663237 3.41709 1.18756 3.01048 1.95263C2.66806 2.60536 1.063 6.37725 1.0095 6.65011C0.977402 6.83202 0.961351 8.77949 0.972051 11.9629C0.988102 16.655 0.998802 17.0027 1.08976 17.2703C1.30911 17.939 1.71038 18.4473 2.2882 18.7897C2.95698 19.1963 2.59316 19.1696 8.25903 19.191L13.331 19.207L13.1384 18.9502C13.0314 18.8111 12.8334 18.5062 12.6943 18.2761L12.4482 17.8641H7.91661C2.91417 17.8641 3.08538 17.8748 2.72692 17.5271C2.63061 17.4308 2.49151 17.2328 2.42731 17.0884L2.2989 16.8208V11.9896V7.16373H10.9983H19.6978L19.6603 6.81062C19.6389 6.61801 19.58 6.33445 19.5265 6.17929C19.3928 5.79408 17.7396 2.11849 17.5791 1.84028C17.242 1.26781 16.7712 0.887945 16.065 0.620436L15.7547 0.502731L10.5115 0.497379C7.6277 0.492029 5.15056 0.508081 5.00075 0.529482ZM9.68218 3.81985V5.82618H6.20455C4.29453 5.82618 2.72692 5.81548 2.72692 5.80478C2.72692 5.77268 3.99492 2.91567 4.12332 2.65351C4.32128 2.26295 4.64229 1.97939 5.0275 1.86168C5.10241 1.84028 6.1778 1.81888 7.42439 1.81888L9.68218 1.81353V3.81985ZM15.867 1.95798C16.3004 2.18804 16.4555 2.44485 17.1939 4.11947C17.5737 4.9862 17.8947 5.72453 17.9054 5.75663C17.9268 5.81013 17.2153 5.82618 14.4492 5.82618H10.9662V3.81985V1.80818L13.3096 1.82423C15.6049 1.84028 15.653 1.84028 15.867 1.95798Z" fill="#4d4d4d" />
                        <path d="M18.3499 8.555C16.9749 8.7048 15.7711 9.27727 14.7866 10.251C13.631 11.4013 13.0371 12.8405 13.0371 14.5205C13.0371 16.2004 13.631 17.6396 14.7866 18.7899C15.6373 19.6299 16.6057 20.1489 17.8148 20.411C18.3659 20.5287 19.5697 20.5287 20.1743 20.4164C21.6884 20.1221 22.9296 19.3303 23.8659 18.0677C24.631 17.0297 25.0002 15.8794 25.0002 14.5205C25.0002 13.7768 24.9253 13.2792 24.7112 12.6158C24.1495 10.8716 22.7263 9.42708 21.0036 8.84391C20.2492 8.5871 19.1524 8.46939 18.3499 8.555ZM20.1957 9.9942C21.8435 10.4276 23.0901 11.6795 23.5503 13.3434C23.7161 13.9533 23.7161 15.0876 23.5503 15.6975C23.0901 17.3614 21.8596 18.592 20.1957 19.0521C19.8479 19.143 19.6232 19.1644 19.0186 19.1644C18.4141 19.1644 18.1894 19.143 17.8416 19.0521C16.1777 18.592 14.9471 17.3614 14.487 15.6975C14.3961 15.3498 14.3747 15.125 14.3747 14.5205C14.3747 13.9159 14.3961 13.6912 14.487 13.3434C14.9792 11.5565 16.3221 10.3045 18.168 9.9193C18.6762 9.81229 19.6393 9.84975 20.1957 9.9942Z" fill="#4d4d4d" />
                        <path d="M21.1369 12.6022C21.0299 12.645 20.3986 13.2282 19.6816 13.9344C18.9861 14.6246 18.3869 15.1917 18.3494 15.1917C18.3173 15.1917 18.0017 14.9188 17.6593 14.5818C16.9423 13.8863 16.7604 13.7899 16.4501 13.9398C16.0649 14.1217 15.9258 14.5497 16.1452 14.8546C16.204 14.9349 16.6588 15.4057 17.1564 15.8979C18.0659 16.8021 18.205 16.8984 18.4993 16.8235C18.5902 16.8021 19.1948 16.2457 20.2113 15.2292C21.0727 14.3678 21.8324 13.5973 21.8913 13.5171C22.1106 13.2121 21.9555 12.7467 21.581 12.5915C21.367 12.5006 21.367 12.5006 21.1369 12.6022Z" fill="#4d4d4d" />
                    </svg>
                </Link> : null}
            </section>
        </nav>
        <SecondaryNavbar
            user={user}
            cart={cart}
            closeCart={closeCart}
            toggleCart={toggleCart}
            logout={logout}
            setLogout={setLogout}
            currency={currency}
            totalUniqueItems={totalUniqueItems}
        />
    </>
    else return <>
        <Cart cart={cart} toggleCart={toggleCart} setCart={setCart} />
        <MobileNavbar
            user={user}
            cart={cart}
            toggleCart={toggleCart}
            logout={logout}
            setLogout={setLogout}
            totalUniqueItems={totalUniqueItems}
        />
    </>
}