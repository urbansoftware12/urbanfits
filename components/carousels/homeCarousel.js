import { useState } from 'react'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from 'next/link';

import Image from 'next/image';
import image1 from '@/public/carousel imgs/carousel img1.webp'
import image2 from '@/public/carousel imgs/carousel img2.webp'
import image3 from '@/public/carousel imgs/carousel img3.webp'
import image4 from '@/public/carousel imgs/carousel img4.webp'
import image5 from '@/public/carousel imgs/carousel img5.webp'
import image6 from '@/public/carousel imgs/carousel img6.webp'

export default function HomeCarousel() {
    const [play, setPlay] = useState(true)
    const togglePlay = () => {
        if (play === true) return setPlay(false)
        if (play === false) return setPlay(true)
    }
    return <Splide fixed className="w-full h-full relative font_urbanist transition-all duration-1000" hasTrack={false}
        options={{
            type: 'loop',
            // fixedWidth: '100vw',
            // fixedHeight: '99.5vh',
            speed: 900,
            gap: '0.5rem',
            cover: true,
            autoplay: true,
            waitForTransition: true,
            interval: 3300,
            // easing: 'cubic-bezier(1,0.35,0.15,1)',
            drag: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            pagination: false
        }}>
        <SplideTrack className='w-full h-full transition-all duration-1000 ease-linear' >
            {[image1, image2, image3, image4, image5, image6].map((img, index) => {
                return <SplideSlide key={index} className="w-full h-full">
                    <Link className="w-full h-full" href="#">
                        <Image className='w-full h-full object-cover' src={img} priority placeholder='blur' alt="Urban images" />
                    </Link>
                </SplideSlide>
            })}
        </SplideTrack>

        {/* Carousel Title */}
        <div className="w-full text-center absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-cente space-y-5">
            <h1 className="text-3xl md:text-[64px] text-white font_copper tracking-3">URBAN FITS</h1>
        </div>

        {/* Buttons for next, prev slide and to pause the carousel */}
        <div className="splide__arrows absolute flex items-center gap-x-5 right-[3%] bottom-[12%] lg:bottom-[10%]">
            <button className="splide__arrow--prev hover:bg-pink-200 flex justify-center items-center w-8 h-8 rounded-full bg-white rotate-180 transition-all duration-500" >
                <span className="w-3 md:w-5 aspect-square">
                    <svg className='w-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 12.0001C1.75 12.4143 2.08579 12.7501 2.5 12.7501L21.5 12.7501C21.9142 12.7501 22.25 12.4143 22.25 12.0001C22.25 11.5858 21.9142 11.2501 21.5 11.2501L2.5 11.2501C2.08579 11.2501 1.75 11.5858 1.75 12.0001Z" fill="#BFBFBF" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 12.0001C1.75 12.199 1.82902 12.3897 1.96967 12.5304L8.96967 19.5304C9.26256 19.8233 9.73744 19.8233 10.0303 19.5304C10.3232 19.2375 10.3232 18.7626 10.0303 18.4697L3.56066 12.0001L10.0303 5.53039C10.3232 5.2375 10.3232 4.76262 10.0303 4.46973C9.73744 4.17684 9.26256 4.17684 8.96967 4.46973L1.96967 11.4697C1.82902 11.6104 1.75 11.8011 1.75 12.0001Z" fill="black" />
                    </svg>
                </span>
            </button>
            {/* <button className="splide__arrow--prev font_copper px-3 py-1.5 skew-x-12 rounded text-[8px] md:text-10px tracking-2 bg-white hover:bg-black hover:text-white transition-all duration-300">PREV</button> */}

            <button onClick={togglePlay} className="splide__toggle hover:bg-pink-200 flex justify-center items-center w-8 h-8 rounded-full bg-white  transition-all duration-500" >
                {play === false ? <span className="w-3 lg:w-5 aspect-square">
                    <svg className='w-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8751 14.1986C18.3751 13.3326 18.3751 11.1675 16.8751 10.3015L9.37506 5.97134C7.87506 5.10532 6.00006 6.18785 6.00006 7.9199L6.00006 16.5802C6.00006 18.3122 7.87506 19.3947 9.37506 18.5287L16.8751 14.1986ZM17.6251 9.00243C20.1251 10.4458 20.1251 14.0542 17.6251 15.4976L10.1251 19.8277C7.62506 21.2711 4.50006 19.4669 4.50006 16.5802L4.50006 7.9199C4.50006 5.03315 7.62506 3.22893 10.1251 4.67231L17.6251 9.00243Z" fill="black" />
                    </svg>
                </span>
                    : <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.25" y1="12" x2="1.25" stroke="black" strokeWidth="1.5" />
                        <line x1="7.25" y1="12" x2="7.25" stroke="black" strokeWidth="1.5" />
                    </svg>}
            </button>

            {/* <button className="splide__arrow--next font_copper px-3 py-1.5 -skew-x-12 rounded text-[8px] md:text-10px tracking-2 bg-white hover:bg-black hover:text-white transition-all duration-300">NEXT</button> */}
            <button className="splide__arrow--next hover:bg-pink-200 flex justify-center items-center w-8 h-8 rounded-full bg-white transition-all duration-500" >
                <span className="w-3 md:w-5 aspect-square">
                    <svg className='w-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.25 12.0001C22.25 12.4143 21.9142 12.7501 21.5 12.7501L2.5 12.7501C2.08579 12.7501 1.75 12.4143 1.75 12.0001C1.75 11.5859 2.08579 11.2501 2.5 11.2501L21.5 11.2501C21.9142 11.2501 22.25 11.5858 22.25 12.0001Z" fill="#BFBFBF" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.25 12.0001C22.25 12.199 22.171 12.3897 22.0303 12.5304L15.0303 19.5304C14.7374 19.8233 14.2626 19.8233 13.9697 19.5304C13.6768 19.2375 13.6768 18.7626 13.9697 18.4697L20.4393 12.0001L13.9697 5.53039C13.6768 5.2375 13.6768 4.76263 13.9697 4.46973C14.2626 4.17684 14.7374 4.17684 15.0303 4.46973L22.0303 11.4697C22.171 11.6104 22.25 11.8011 22.25 12.0001Z" fill="black" />
                    </svg>
                </span>
            </button>
        </div>
    </Splide>
}