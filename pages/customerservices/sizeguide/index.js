import React from 'react'
import SizeGuideCarousel from '@/components/carousels/sizeGuideCarousel'
// Default theme
import CustomerServices from '../index'
import Link from 'next/link'
import Image from 'next/image'
const img1 = process.env.NEXT_PUBLIC_BASE_IMG_URL + '/website-copyrights/women_img.webp'
const img2 = process.env.NEXT_PUBLIC_BASE_IMG_URL + '/website-copyrights/men_img.webp'
const img3 = process.env.NEXT_PUBLIC_BASE_IMG_URL + '/website-copyrights/kids_img.webp'

const GuideCard = (props) => {
    return <Link href={props.href} className='group w-[200px]'>
        <div className='w-full aspect-square rounded-full group-hover:rounded-none overflow-hidden transition-all duration-700'>
            <Image width={500} height={500} src={props.img} alt='cover image' className='w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700' />
        </div>
        <h4 className="mt-4 font_copper text-lg text-center tracking-1 group-hover:tracking-3 transition-all duration-700">{props.title}</h4>
    </Link>
}

export default function SizeGuide() {
    return (
        <CustomerServices>
            <h2 className="mb-10 text-xl font_urbanist_bold">Size Guides</h2>
            {/* To be displayed on the mobile screens */}
            <SizeGuideCarousel slideData={[
                { img: img1, link: 'women' },
                { img: img2, link: 'men' },
                { img: img3, link: 'kids' }
            ]} />
            {/* To be displayed on the desktop screens */}
            <div className="hidden md:flex flex-col md:flex-row items-center md:justify-around gap-5">
                <GuideCard href='/customerservices/sizeguide/women' img={img1} title='WOMEN' />
                <GuideCard href='/customerservices/sizeguide/men' img={img2} title='MEN' />
                <GuideCard href='/customerservices/sizeguide/kids' img={img3} title='KIDS' />
            </div>
        </CustomerServices>
    )
}
