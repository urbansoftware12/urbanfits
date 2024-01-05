import React from 'react'
import Link from 'next/link'

export default function OfferCard(props) {
    return <Link {...props} className='relative w-full h-[20vh] md:h-[30vh] lg:h-[40vh] py-[2vh] flex flex-col justify-center items-center bg-gray-100 rounded-2xl gap-y-2 md:gap-y-7 lg:gap-y-8 overflow-hidden'>
        <span className="absolute top-0 left-0 bg-[#FF4A60] px-3 md:px-4 py-1 md:py-2 font_urbanist text-white text-[10px] md:text-sm lg:text-base rounded-br-2xl">{props.badge}</span>
        <h2 className="font_urbanist_extra_bold text-lg md:text-2xl lg:text-[32px]">{props.heading}</h2>
        <h2 className="font_copper text-[26px] md:text-5xl lg:text-[70px]">{props.offer}</h2>
        <span className="font_urbanist_medium underline md:text-2xl lg:text-3xl 2xl:text-4xl">Shop Now</span>
    </Link>
}