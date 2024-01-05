import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuLink = (props) => {
    const path = useRouter().pathname
    return <Link href={`/customerservices${props.href}`} className={`${path.includes(props.href) ? 'active_bg text-white lg:text-black active' : 'bg-white text-black'} max-w-[320px] flex justify-center lg:justify-between items-center px-4 py-1 mx-2 lg:m-0 lg:py-5 whitespace-nowrap lg:border-b lg:border-[#F5F5F5] rounded-full lg:rounded text-sm lg:text-base`}>
        {props.children}
        <i className="hidden lg:block arrow material-symbols-outlined text-lg text-gray-500 transition-all">chevron_right</i>
    </Link>
}

export default function CustomerServices(props) {

    useEffect(() => {
        if (window.matchMedia('(max-width: 1000px)').matches) {
            let activeLink = document.querySelector('#menu_container .active')
            activeLink.scrollIntoView()
        }
    }, [])
    return <main className='w-full max-w-[2000px] mx-auto p-5 md:px-7 lg:px-14 xl:px-20 lg:py-16 flex flex-col lg:flex-row lg:justify-between bg-gray-50'>
        <section className={`lg:w-[27%] 2xl:w-[25%] lg:h-auto lg:max-h-none rounded-2xl lg:rounded-none transition-all duration-500 overflow-x-scroll overflow-y-hidden lg:overflow-visible hide_scrollbar`}>
            <div id='menu_container' className="lg:sticky lg:top-20 lg:left-0 lg:right-0 w-auto lg:w-full lg:pr-7 flex lg:flex-col font_urbanist rounded-2xl">
                <MenuLink href='/returns&refund' >Returns & Refund</MenuLink>
                <MenuLink href='/orderinfo' >Order Information</MenuLink>
                <MenuLink href='/payment' >Payment</MenuLink>
                <MenuLink href='/delivery' >Delivery</MenuLink>
                <MenuLink href='/productinfo' >Product Information</MenuLink>
                <MenuLink href='/myaccount' >My Account</MenuLink>
                <MenuLink href='/sizeguide' >Size Guide</MenuLink>
                <MenuLink href='/cfproducts' >Counterfeit Products</MenuLink>
                <MenuLink href='/sitemap' >Sitemap</MenuLink>
                <MenuLink href='/companyinfo' >Company Information</MenuLink>
            </div>
        </section>
        <section className={`w-full lg:w-70pr 2xl:w-3/4 mt-6 lg:m-0`}>
            <div className={props.classes || "bg-white p-4 lg:px-12 lg:py-10 rounded-md"}>
                {props.children}
            </div>
        </section>
    </main>
}
