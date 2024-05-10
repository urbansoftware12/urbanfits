import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useLanguage from '@/hooks/useLanguage';
const Search = dynamic(() => import('../search'));
import { mobileNavMenu as mblNavLang } from '@/locales';

const MobileListItem = (props) => {
    const [open, setOpen] = useState(false)
    if (props.subLinks) return <div {...props} className="border-b border-gray-50">
        <button onClick={() => setOpen(!open)} className="relative w-full py-[17px] flex justify-between items-center cursor-pointer">
            <span className="font_urbanist_bold text-base text-black duration-700">{props.name}</span>
            <i className={`${open ? 'rotate-90' : null} fa-solid fa-chevron-right text-xs text-gray-300 transition-all duration-500`} />
        </button>
        <div className={`${open ? 'max-h-[50vh]' : 'max-h-0'} w-full text-sm overflow-y-hidden transition-all duration-500`}>
            {props.subLinks.map((link, i) => {
                return <Link key={i} href={link.href} onClick={props.toggleMenu} className='w-full pb-4 pl-8 font_urbanist text-black flex justify-between items-center'>
                    {link.name}<i className="fa-solid fa-chevron-right text-xs text-gray-300" />
                </Link>
            })}
        </div>
    </div>
    else return <Link {...props} href={props.href} onClick={props.toggleMenu} className="w-full py-[17px] border-b border-gray-50 flex justify-between items-center cursor-pointer">
        <span className="font_urbanist_bold text-base text-black duration-700">{props.name}</span>
        <i className="fa-solid fa-chevron-right text-xs text-gray-300 transition-all duration-500" />
    </Link>
}

function MobileNavbar({ user, cart, toggleCart, logout, setLogout, totalUniqueItems }) {
    const router = useRouter();
    const url = router.pathname;
    const { locale } = useLanguage();
    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu(!menu);
    const Exception = url.startsWith("/about") || window.matchMedia('(max-width: 760px)').matches && (url.startsWith('/auth'))
    const SearchException = url.startsWith("/about") || (window.matchMedia('(max-width: 760px)').matches && (url.startsWith('/auth') || (url.startsWith('/user/') && url.length > '/user/'.length)))

    const langObj = mblNavLang[locale];

    if (!Exception) return <>
        {!SearchException && <section className="sticky top-0 left-0 right-0 z-50 w-full h-[70px] flex justify-center items-center px-7 lg:px-8 xl:px-10 2xl:px-16 font_urbanist text-[15px] bg-white border-b transition-all duration-300">
            <Search classes="flex md:hidden" placeholder={langObj.searchProducts} noResultsMsg={langObj.noResults} />
        </section>}
        <section style={{ transform: menu ? "translateX(0)" : "translateX(-100%)" }} className="fixed z-[70] inset-0 w-screen min-h-screen overflow-y-scroll p-4 flex flex-col items-center bg-white overflow-x-hidden transition-all duration-700">
            <nav className="absolute left-0 top-0 right-0 w-full p-4 mb-6 flex justify-center items-center border-b border-gray-50">
                <button onClick={toggleMenu} className='fa-solid fa-chevron-left absolute left-4 text-xl'></button>
                <h1 className="font_urbanist_medium text-lg">{langObj.siteMenu}</h1>
            </nav>
            <section className="w-full mt-16">
                <MobileListItem toggleMenu={toggleMenu} key={0} name={langObj.categoryMenu.heading} subLinks={[
                    { name: langObj.categoryMenu.item1, href: "/products/category/64d517f6218f4e9ee6253b18?name=new+collection" },
                    { name: langObj.categoryMenu.item2, href: "/products/category/64a59d5816b4c91fa1967b2e?name=women" },
                    { name: langObj.categoryMenu.item3, href: "/products/category/649b292762a7c100cfb7207f?name=men" },
                    { name: langObj.categoryMenu.item4, href: "/products/category/64d4dfa643c643cc9c60c672?name=kids" },
                    { name: langObj.categoryMenu.item5, href: "/products/category/all-categories" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={1} name={langObj.ufPointsMenu.heading} subLinks={[
                    { name: langObj.ufPointsMenu.item1, href: "/user/myaccount" },
                    { name: langObj.ufPointsMenu.item2, href: "/user/uf-wallet/history" },
                    { name: langObj.ufPointsMenu.item3, href: "earn-ufpoints" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={2} name={langObj.saleMenu.heading} subLinks={[
                    { name: langObj.saleMenu.item1, href: "#" },
                    { name: langObj.saleMenu.item2, href: "#" },
                    { name: langObj.saleMenu.item3, href: "#" },
                    { name: langObj.saleMenu.item4, href: "#" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={3} name={langObj.accessoriesMenu.heading} subLinks={[
                    { name: langObj.accessoriesMenu.item1, href: "#" },
                    { name: langObj.accessoriesMenu.item2, href: "#" },
                    { name: langObj.accessoriesMenu.item3, href: "#" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={4} name={langObj.sizeGuideMenu.heading} subLinks={[
                    { name: langObj.sizeGuideMenu.item1, href: "/customerservices/sizeguide/women" },
                    { name: langObj.sizeGuideMenu.item2, href: "/customerservices/sizeguide/men" },
                    { name: langObj.sizeGuideMenu.item3, href: "/customerservices/sizeguide/kids" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={5} name={langObj.orderMenu.heading} subLinks={[
                    { name: langObj.orderMenu.item1, href: "/user/orders/processing" },
                    { name: langObj.orderMenu.item2, href: "/trackorder" },
                    { name: langObj.orderMenu.item3, href: "/customerservices/delivery" },
                    { name: langObj.orderMenu.item4, href: "/customerservices/returns&refunds" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={6} name={langObj.supportMenu.heading} subLinks={[
                    { name: langObj.supportMenu.item1, href: "/contact" },
                    { name: langObj.supportMenu.item2, href: "/faq" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={7} name={langObj.policyMenu.heading} subLinks={[
                    { name: langObj.policyMenu.item1, href: "/policies/terms&conditions" },
                    { name: langObj.policyMenu.item2, href: "/policies/privacypolicy" },
                    { name: langObj.policyMenu.item3, href: "/policies/cookiespolicy" },
                    { name: langObj.policyMenu.item4, href: "/customerservices/companyinfo" }
                ]} />
                <MobileListItem toggleMenu={toggleMenu} key={8} name={langObj.stories} href="/stories" />
                <MobileListItem toggleMenu={toggleMenu} key={9} name={langObj.about} href="/about" />
            </section>
            <p className="my-5 font_urbanist_medium text-sm text-gray-500">Urban Fits LLC (7053037)</p>
            {user && user.email ? <button onClick={() => setLogout(!logout)} className="w-full py-3 bg-gray-50 rounded-full font_urbanist_medium text-sm">{langObj.signout}</button> : null}
        </section>
        <section className="fixed z-[60] bottom-4 left-1/2 -translate-x-1/2 bg-gray-50 w-[90%] md:w-3/5 h-14 rounded-full border flex justify-around items-center">
            <button onClick={toggleMenu}>
                <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1.80469" x2="25" y2="1.80469" stroke="gray" strokeWidth="2" />
                    <line y1="8.80469" x2="20" y2="8.80469" stroke="gray" strokeWidth="2" />
                    <line y1="15.8047" x2="25" y2="15.8047" stroke="gray" strokeWidth="2" />
                </svg>
            </button>
            <Link href="/products/category/wishlist">
                {router.pathname === '/products/category/wishlist' ? <i className="fa-solid fa-heart text-black text-[22px]" /> :
                    <svg width="24" height="21" viewBox="0 0 24 21" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group"><path id="Vector" d="M5.70654 0.532631C5.61255 0.54438 5.34821 0.597248 5.11912 0.650116C3.20413 1.09655 1.5711 2.37713 0.689969 4.12177C-0.255778 5.99564 -0.226407 8.42756 0.760459 10.3308C1.31851 11.4058 1.60634 11.7054 5.57731 15.4002C7.61566 17.2976 9.57764 19.1245 9.93597 19.4534C10.2884 19.7883 10.6996 20.1407 10.8406 20.2347C11.3986 20.5989 12.0624 20.5872 12.6381 20.2053C12.8026 20.0996 13.3841 19.5886 13.9304 19.0775C19.3641 14.0198 21.4847 12.0285 21.6903 11.7876C22.5949 10.7126 23.0942 9.71401 23.3409 8.46868C23.4701 7.81664 23.4701 6.50082 23.3409 5.84879C22.8768 3.52847 21.3495 1.71922 19.1467 0.890957C18.4536 0.632492 17.9954 0.54438 17.1612 0.509134C15.5811 0.444517 14.3592 0.808718 12.9847 1.76034C12.456 2.12454 12.2152 2.33014 11.9567 2.64147L11.7452 2.89406L11.3986 2.53573C10.447 1.56649 9.00784 0.808718 7.68615 0.579624C7.23971 0.497385 6.16473 0.473888 5.70654 0.532631ZM7.93874 2.10692C9.08421 2.42413 9.86548 2.9528 10.7701 4.02191C11.2107 4.54471 11.4456 4.72094 11.7217 4.72094C12.0213 4.72094 12.2093 4.58583 12.6616 4.05128C13.437 3.14078 14.0009 2.69434 14.8351 2.34776C15.5282 2.05405 15.8689 1.99531 16.8382 1.99531C17.9073 1.99531 18.4007 2.10692 19.2231 2.52399C20.5859 3.21714 21.514 4.40373 21.8782 5.91928C21.9957 6.43033 22.0075 7.75203 21.9017 8.27483C21.6844 9.27932 21.2438 10.1605 20.6035 10.8536C20.4332 11.0357 15.6457 15.506 12.4384 18.4783C12.0977 18.7955 11.7746 19.054 11.7217 19.054C11.6747 19.054 10.0593 17.5972 8.13846 15.8173C2.49922 10.5834 2.58734 10.6656 2.08803 9.76101C1.64746 8.96212 1.47711 8.21609 1.48299 7.09999C1.48886 5.89578 1.71795 5.12039 2.34649 4.18639C3.08664 3.07616 4.26736 2.30077 5.60668 2.04818C6.18235 1.93657 7.43943 1.97181 7.93874 2.10692Z" fill='gray' /></g>
                    </svg>}
            </Link>
            <button onClick={toggleCart} className="relative">
                {totalUniqueItems !== 0 ? <i className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-2 h-2 border border-white aspect-square rounded-full bg-[#FF4A60]"></i> : null}
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99911 0.762917C9.93454 0.771265 9.72701 0.800486 9.53792 0.825531C8.24195 0.996679 7.01978 1.90252 6.4894 3.08386C6.26341 3.58061 6.21729 3.85611 6.18501 4.83709L6.15734 5.7471H4.40017C2.45853 5.7471 2.24638 5.76797 1.74368 5.99756C1.19946 6.24802 0.793609 6.76564 0.682922 7.36675C0.646026 7.56712 0.636802 9.06154 0.650638 12.593C0.669086 18.0281 0.65525 17.7692 0.950417 18.4288C1.47618 19.5851 2.55538 20.4074 3.9113 20.6829C4.22492 20.7456 4.80603 20.7539 10.322 20.7539C15.8379 20.7539 16.419 20.7456 16.7326 20.6829C18.0885 20.4074 19.1677 19.5851 19.6935 18.4288C19.9887 17.7692 19.9748 18.0281 19.9933 12.593C20.0071 9.06154 19.9979 7.56712 19.961 7.36675C19.8918 6.9994 19.6474 6.5444 19.3891 6.31481C19.2784 6.21045 19.057 6.06852 18.9002 5.99756C18.3975 5.76797 18.1854 5.7471 16.2437 5.7471H14.4866L14.4589 4.83709C14.4266 3.85611 14.3805 3.58061 14.1545 3.08386C13.638 1.93591 12.4988 1.06347 11.2213 0.842228C10.8616 0.779613 10.179 0.733696 9.99911 0.762917ZM10.8662 2.05697C11.5395 2.1822 12.1575 2.54537 12.5541 3.04629C12.9784 3.58478 13.0891 3.99804 13.0891 5.03746V5.7471H10.322H7.55477V5.03746C7.55477 3.99804 7.66545 3.58478 8.08975 3.04629C8.47716 2.55371 9.09978 2.1822 9.74545 2.06114C10.1698 1.97765 10.4373 1.97765 10.8662 2.05697ZM6.1804 8.65662C6.19423 10.5017 6.19884 10.5142 6.50785 10.6603C6.83069 10.8106 7.29188 10.7104 7.44869 10.4516C7.52248 10.3305 7.53171 10.151 7.54554 8.65662L7.55938 6.9994H10.322H13.0845L13.0984 8.65662C13.1122 10.5017 13.1168 10.5142 13.4258 10.6603C13.7486 10.8106 14.2098 10.7104 14.3667 10.4516C14.4404 10.3305 14.4497 10.151 14.4635 8.65662L14.4773 6.99523L16.3314 7.00775C18.3698 7.02028 18.3283 7.0161 18.5174 7.27909C18.5958 7.38344 18.6004 7.69235 18.6143 12.28C18.6281 17.6607 18.6327 17.5397 18.3468 18.0823C18.0747 18.5916 17.4982 19.0967 16.9494 19.3096C16.3959 19.5266 16.4743 19.5225 10.322 19.5225C4.16958 19.5225 4.24798 19.5266 3.69454 19.3096C3.14572 19.0967 2.56922 18.5874 2.29711 18.0823C2.01578 17.5438 2.02039 17.6649 2.02039 12.376C2.02039 9.32035 2.03884 7.50867 2.06651 7.41266C2.12186 7.23734 2.27867 7.09541 2.46314 7.04115C2.53694 7.02445 3.39938 7.00358 4.38173 7.00358L6.16656 6.9994L6.1804 8.65662Z"
                        fill={cart ? 'black' : 'gray'} />
                </svg>
            </button>
            <Link href='/user'>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2819 15.5591C13.2577 15.5591 13.2214 15.5591 13.1973 15.5591C13.161 15.5591 13.1126 15.5591 13.0763 15.5591C10.3312 15.4744 8.27539 13.334 8.27539 10.6977C8.27539 8.01304 10.4642 5.82422 13.1489 5.82422C15.8335 5.82422 18.0223 8.01304 18.0223 10.6977C18.0103 13.3461 15.9424 15.4744 13.3182 15.5591C13.294 15.5591 13.294 15.5591 13.2819 15.5591ZM13.1368 7.62607C11.4438 7.62607 10.0772 9.00466 10.0772 10.6856C10.0772 12.3423 11.3712 13.6847 13.0159 13.7451C13.0521 13.733 13.1731 13.733 13.294 13.7451C14.9145 13.6605 16.1842 12.3302 16.1963 10.6856C16.1963 9.00466 14.8298 7.62607 13.1368 7.62607Z" fill={router.pathname.startsWith('/user') ? 'black' : 'gray'} />
                    <path d="M12.9984 26.9023C9.76795 26.9023 6.68162 25.5367 4.29182 23.0513C4.07566 22.8328 3.97958 22.5051 4.0036 22.191C4.15972 20.5659 5.04839 19.0501 6.52551 17.9303C10.1042 15.2264 15.9046 15.2264 19.4713 17.9303C20.9484 19.0637 21.8371 20.5659 21.9932 22.191C22.0292 22.5187 21.9211 22.8328 21.705 23.0513C19.3151 25.5367 16.2288 26.9023 12.9984 26.9023ZM5.88903 21.9179C7.88253 23.8161 10.3924 24.8539 12.9984 24.8539C15.6043 24.8539 18.1142 23.8161 20.1077 21.9179C19.8916 21.0848 19.3152 20.2791 18.4625 19.6236C15.5083 17.384 10.5005 17.384 7.52226 19.6236C6.66962 20.2791 6.10519 21.0848 5.88903 21.9179Z" fill={router.pathname.startsWith('/user') ? 'black' : 'gray'} />
                    <path d="M13.1347 26.7069C5.96357 26.7069 0.134766 20.8781 0.134766 13.707C0.134766 6.53583 5.96357 0.707031 13.1347 0.707031C20.3058 0.707031 26.1346 6.53583 26.1346 13.707C26.1346 20.8781 20.3058 26.7069 13.1347 26.7069ZM13.1347 2.52097C6.96728 2.52097 1.94871 7.53955 1.94871 13.707C1.94871 19.8744 6.96728 24.8929 13.1347 24.8929C19.3021 24.8929 24.3207 19.8744 24.3207 13.707C24.3207 7.53955 19.3021 2.52097 13.1347 2.52097Z" fill={router.pathname.startsWith('/user') ? 'black' : 'gray'} />
                </svg>
            </Link>
            <Link href='/' className={`fa-solid fa-house text-xl ${router.pathname === '/' ? 'text-black' : 'text-gray-400'}`}></Link>
        </section>
    </>
}
export default MobileNavbar