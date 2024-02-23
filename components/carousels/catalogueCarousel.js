import Link from 'next/link';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Default theme
import Image from 'next/image';
import Logo from '@/public/logos/logo_black.svg'
import displayImg1 from '@/public/catalogueCarousel imgs/display_img1.webp'
import displayImg2 from '@/public/catalogueCarousel imgs/display_img2.webp'
import displayImg3 from '@/public/catalogueCarousel imgs/display_img3.webp'
import pairImg1 from '@/public/catalogueCarousel imgs/img1.webp'
import pairImg2 from '@/public/catalogueCarousel imgs/img2.webp'
import pairImg3 from '@/public/catalogueCarousel imgs/img3.webp'

export default function CatalogueCarousel() {
    const slideData = [{ img: displayImg1, pairImg: pairImg1 }, { img: displayImg2, pairImg: pairImg2 }, { img: displayImg3, pairImg: pairImg3 }, { img: displayImg1, pairImg: pairImg1 }, { img: displayImg2, pairImg: pairImg2 }]
    const onPGMounted = () => {
        let pagination = document.querySelector('.splide__pagination')
        if (window.matchMedia('(min-width: 1000px)').matches) {
            pagination.style.left = `calc(25% - ((${slideData.length * 0.9 * 2}rem + ${slideData.length * 2}px) / 2))`
        }
        else {
            pagination.style.width = `calc(${slideData.length * 0.9 * 2}rem + ${slideData.length * 2}px)`
        }
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

    return <Splide onPaginationMounted={onPGMounted} className="catalogue_carousel w-full layout_height relative transition-all duration-1000" hasTrack={false}
        options={{
            type: 'fade',
            rewind: true,
            // fixedWidth: '100vw',
            // fixedHeight: '100vh',
            speed: 900,
            gap: '0.5rem',
            arrows: false,
            autoplay: true,
            padding: '0',
            waitForTransition: true,
            interval: 3200,
            drag: false,
            pauseOnHover: false,
            pauseOnFocus: false,
        }}>
        <SplideTrack className='w-full h-full transition-all duration-1000 ease-linear' >
            {slideData.map((pair, index) => {
                return <SplideSlide key={index} className="w-full h-full p-10">
                    <section className="flex justify-center items-center w-full h-full bg-white">
                        <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
                            <Link href='/products/Carousel Item' className='w-3/5 h-[45%] md:h-3/5 lg:w-[42%] lg:h-[68%] z-20 flex flex-col justify-center items-center bg-gray-100 overflow-hidden' >
                                <Image src={pair.pairImg} priority placeholder='blur' alt='product image' className='w-4/5' />
                                <span className="w-36 my-4 justify-self-end font_urbanist_medium text-[10px] tracking-widest">
                                    SATIN FINISH PLAYSUIT DRESS <br />
                                    $26
                                </span>
                            </Link>
                        </div>
                        <div className="absolute top-0 left-0 z-[5] opacity-10 lg:opacity-100 lg:static pointer-events-none lg:pointer-events-auto w-full lg:w-1/2 h-full">
                            <Image className='h-full object-cover' priority placeholder='blur' src={pair.img} alt="Urban images" />
                        </div>
                    </section>
                    <Link href="/products/New Item" className="hidden lg:block absolute z-20 left-1/2 bottom-10 -translate-x-1/2 font_urbanist_bold tracking-[1.5em] hover:tracking-[2.5em] transition-all duration-500 text-xs md:text-base" >BUY</Link>
                </SplideSlide>
            })}
        </SplideTrack>
        <Image src={Logo} alt='Urban Fits' className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px]" />
    </Splide>
}