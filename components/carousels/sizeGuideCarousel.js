import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

export default function CatalogueCarousel(props) {
    const onPGMounted = () => {
        let pagination = document.querySelector('.splide__pagination')
        pagination.style.width = `calc(${props.slideData.length * 0.9 * 2}rem + ${props.slideData.length * 2}px)`
        let pageItems = document.querySelectorAll('.splide__pagination__page')
        pageItems.forEach((item) => {
            item.style.width = '2px'
            item.style.height = '10px'
            item.style.borderRadius = '0'
            item.style.background = 'gray'
            item.style.margin = '0.9rem'
            item.style.transition = 'all 0.4s'
        })
    }
    return (
        <Splide onPaginationMounted={onPGMounted} className="sizeGuide_carousel md:hidden w-full min-h-[480px] h-[63vh] transition-all duration-1000" hasTrack={false}
            options={{
                type: 'loop',
                rewind: true,
                fixedWidth: '100%',
                fixedHeight: '46vh',
                speed: 900,
                gap: '0.5rem',
                arrows: false,
                autoplay: true,
                padding: '0',
                waitForTransition: true,
                interval: 3000,
                pauseOnHover: false,
                pauseOnFocus: false,
            }}>
            <SplideTrack className='w-full h-full transition-all duration-1000 ease-linear' >
                {props.slideData.map((pair, index) => {
                    return <SplideSlide key={index} className="w-full h-full">
                        <Link href={`/customerservices/sizeguide/${pair.link}`} className='w-full h-full'><Image className='h-full object-cover object-top' width={500} height={500} src={pair.img} alt="Urban images" /></Link>
                        <div className="w-full text-center mt-3 font_copper tracking-[0.7em] hover:tracking-[1em] transition-all duration-500 text-base" ><Link href={`/customerservices/sizeguide/${pair.link}`}>{pair.link.toUpperCase()}</Link></div>
                    </SplideSlide>
                })}
            </SplideTrack>
        </Splide>
    )
}