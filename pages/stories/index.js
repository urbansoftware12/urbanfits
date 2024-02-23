import Link from 'next/link'
import StoryCarousel from '@/components/carousels/storyCarousel'
import Image from 'next/image'
import img1 from '@/public/stories/img9.webp'
import img2 from '@/public/stories/img10.webp'
import img3 from '@/public/stories/img11.webp'
import img4 from '@/public/stories/img2.webp'
import img5 from '@/public/stories/img12.webp'
// images for carousel component
import img6 from '@/public/stories/img13.webp'
import img7 from '@/public/stories/img14.webp'
import img8 from '@/public/stories/img15.webp'

const StoryHeading = (props) => {
    return <>
        <div className="md:hidden w-full h-full flex justify-center items-center">
            <h2 className="font_copper text-lg text-black whitespace-normal tracking-[0.15em] group-hover:tracking-3 transition-all duration-[1.6s]"> <Link href={props.href || "#"} >{props.children}</Link></h2>
        </div>
    </>
}

export default function Story() {
    return <main className='w-full px-6 md:px-[15%] py-10'>
        <div className="z-10 flex flex-col justify-center items-center gap-5">
            <span className="font_urbanist text-sm "><Link className="underline decoration-gray-300 underline-offset-4" href='/' >Main Page</Link> / <Link className="underline decoration-gray-300 underline-offset-4" href='/stories' >Stories</Link></span>
            <h1 className="font_copper text-2xl md:text-[32px] tracking-[0.15em]">STORIES</h1>
        </div>

        <div className="relative w-full my-14 flex flex-col-reverse md:block">
            <StoryCarousel slideData={[img6, img7, img8]} />
            <div className="w-full md:w-auto md:absolute top-1/2 md:-translate-y-1/2 md:translate-x-[-80%] flex items-center justify-between text-xs md:text-[10px] lg:text-xs text-black font_urbanist_medium italic tracking-widest  lg:tracking-[0.15em] gap-x-4">
                SELECTED
                <span className='w-2/5 md:w-[7vw] lg:w-[9vw] h-0.5 bg-black'></span>
            </div>
        </div>

        <section className="w-full my-14 pt-14 border-t">

            <div className="mb-12 lg:mb-0 grid grid-cols-2 md:grid-cols-3 gap-x-4 2xl:gap-x-6">
                <Link href='/stories/high voltage' className='group relative w-full' >
                    <div className='w-full overflow-hidden' ><Image alt='hero background' src={img1} className='w-full object-cover object-top group-hover:scale-105 transition-all duration-[1.2s]' /></div>
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 md:translate-y-0 md:top-[60%] right-0 translate-x-[110%] md:translate-x-[80%] flex-col items-end">
                        <h2 className="font_copper text-lg md:text-3xl lg:text-5xl 2xl:text-[52px] text-black whitespace-pre-wrap md:whitespace-nowrap tracking-[0.15em] group-hover:tracking-[15px] transition-all duration-[1.6s]">HIGH VOLTAGE</h2>
                        <span className="hidden md:block md:mt-3 xl:mt-4 font_urbanist text-xs xl:text-sm text-black">Spring Summer. Woman 2019.</span>
                    </div>
                </Link>
                <StoryHeading href='/stories/high voltage' >HIGH VOLTAGE</StoryHeading>
            </div>

            <div className="mb-12 lg:mb-0 grid grid-cols-2 md:grid-cols-3 gap-x-4 2xl:gap-x-6">
                <StoryHeading href='/stories/tailoring' >TAILORING</StoryHeading>
                <Link href='/stories/tailoring' className='group relative w-full col-start-2 md:col-start-3 xl:translate-y-[-10%]' >
                    <div className='w-full overflow-hidden' ><Image alt='story image' src={img2} placeholder='blur' className='w-full object-cover object-top group-hover:scale-105 transition-all duration-[1.2s]' /></div>
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 md:translate-y-0 md:top-[35%] left-0 translate-x-[-110%] md:translate-x-[-80%] flex-col items-start">
                        <h2 className="font_copper text-lg md:text-3xl lg:text-5xl 2xl:text-[52px] text-black whitespace-nowrap tracking-[0.15em] group-hover:tracking-[15px] transition-all duration-[1.6s]">TAILORING</h2>
                        <span className="hidden md:block md:mt-3 xl:mt-4 font_urbanist text-xs xl:text-sm text-black">Spring Summer. Man 2019.</span>
                    </div>
                </Link>
            </div>

            <div className="mb-12 lg:mb-0 xl:mt-12 xl:mb-16 grid grid-cols-2 md:grid-cols-3 gap-x-4 2xl:gap-x-6">
                <Link href='/stories/the tuorist' className='group relative w-full md:col-start-2' >
                    <div className='w-full overflow-hidden'><Image placeholder='blur' alt='story image' src={img3} className='w-full object-cover object-top group-hover:scale-105 transition-all duration-[1.2s]' /></div>
                    <div className="hidden md:flex pt-4 flex-col items-center">
                        <h2 className="font_copper text-lg md:text-3xl lg:text-5xl 2xl:text-[52px] text-black whitespace-nowrap tracking-[0.15em] group-hover:tracking-[15px] transition-all duration-[1.6s]">THE TUORIST</h2>
                        <span className="hidden md:block md:mt-3 xl:mt-4 font_urbanist text-xs xl:text-sm text-black">Spring Summer. Woman 2019.</span>
                    </div>
                </Link>
                <StoryHeading href='/stories/the tuorist' >THE TUORIST</StoryHeading>
            </div>

            <div className="mb-12 lg:mb-0 grid grid-cols-2 md:grid-cols-3 gap-x-4 2xl:gap-x-6">
                <StoryHeading href='/stories/eyond nature' >BEYOND NATURE</StoryHeading>
                <Link href='/stories/beyond nature' className='group relative w-full col-start-2 md:col-start-1' >
                    <div className='w-full overflow-hidden' ><Image placeholder='blur' alt='story image' src={img4} className='w-full object-cover object-top group-hover:scale-105 transition-all duration-[1.2s]' /></div>
                    <div className="hidden md:flex absolute top-[60%] right-0 translate-x-[80%] flex-col items-end">
                        <h2 className="font_copper text-lg md:text-3xl lg:text-5xl 2xl:text-[52px] text-black whitespace-nowrap tracking-[0.15em] group-hover:tracking-[15px] transition-all duration-[1.6s]">BEYOND NATURE</h2>
                        <span className="hidden md:block md:mt-3 xl:mt-4 font_urbanist text-xs xl:text-sm text-black">Spring Summer. TRF 2019.</span>
                    </div>
                </Link>
            </div>

            <div className="mb-12 lg:mb-0 xl:my-14 grid grid-cols-2 md:grid-cols-3 gap-x-4 2xl:gap-x-6">
                <Link href='/stories/traveler' className='group relative w-full md:col-start-2' >
                    <div className='w-full overflow-hidden' ><Image placeholder='blur' alt='story image' src={img5} className='w-full object-cover object-top group-hover:scale-105 transition-all duration-[1.2s]' /></div>
                    <div className="hidden md:flex absolute top-[35%] left-0 -translate-x-[70%] flex-col items-start">
                        <h2 className="font_copper text-lg md:text-3xl lg:text-5xl 2xl:text-[52px] text-black whitespace-nowrap tracking-[0.15em] group-hover:tracking-[15px] transition-all duration-[1.6s]">TRAVELER</h2>
                        <span className="hidden md:block md:mt-3 xl:mt-4 font_urbanist text-xs xl:text-sm text-black">Spring Summer. Man 2019.</span>
                    </div>
                </Link>
                <StoryHeading href='/stories/traveler' >TRAVELER</StoryHeading>
            </div>

        </section>
    </main>
}
