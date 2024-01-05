import React from 'react'
import Image from 'next/image'
import blackThemeBg from '@/public/listing banners/listingbg1.webp'
import whiteThemeBg from '@/public/listing banners/listingbg2.webp'

export default function ListingShopSection(props) {
    return <div className={`w-full h-60 lg:h-[430px] flex relative justify-between ${props.classes}`}>
        <div className={`w-3/5 h-full pl-[10%] flex flex-col justify-center items-start gap-y-3 md:gap-y-4 lg:gap-y-10 z-10 ${props.whiteTheme ? 'bglisting_white' : 'bglisting_black'}`}>
            <span className={`md:w-11/12 lg:w-3/4 font_urbanist_bold text-base md:text-xl lg:text-[30px] pt-[6%] border-0 md:border-2 xl:border-[3px] border-transparent ${props.whiteTheme ? 'text-black border-t-gotham-black border-r-gotham-black' : 'text-white border-t-white border-r-white'}`}>Shopping Without Limits.</span>
            <p className={`w-11/12 md:w-4/5 lg:w-3/5 font_urbanist text-[10px] md:text-sm lg:text-lg ${props.whiteTheme ? 'text-black' : 'text-white'}`}>You can choose the best option for you, and it does not matter whether you are in UAE or USA. We will deliver your purchase anywhere!</p>
            <button className={`w-28 lg:w-40 py-2 lg:py-4 border ${props.whiteTheme ? 'border-black text-black' : 'border-white text-white'} font_urbanist_bold text-xs lg:text-sm rounded-full`}>SHOP NOW</button>
        </div>
        <div className="absolute top-0 right-0 lg:w-3/5 h-full">
            <Image placeholder='blur' width={1000} height={450} src={props.whiteTheme ? whiteThemeBg : blackThemeBg} alt='shopping section cover image' className='h-full float-right object-cover object-right' />
        </div>
    </div>
}