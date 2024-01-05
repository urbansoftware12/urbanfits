import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MusicBars from "@/components/musicBars";
gsap.registerPlugin(ScrollTrigger);
import Image from 'next/image';
import Logo from "@/public/logos/logo_black.svg"
//Images from S3 Bucket
const colImg1 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-1.jpg"
const colImg2 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-2.jpg"
const colImg3 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-3.jpg"
const colImg4 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-4.jpg"
const colImg5 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-5.jpg"
const colImg6 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-6.jpg"
const colImg7 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-7.jpg"
const colImg8 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-8.jpg"
const colImg9 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-9.jpg"
const sec2Img1 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-10.jpg"
const sec2Img2 = "https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/aobut-us-img-11.jpg"

const AboutComponent = () => {

    const brand = useRef()
    const brand_subhead = useRef()
    const wraperRef = useRef()
    const section_2 = useRef()
    const section_3 = useRef()
    const section_4 = useRef()
    const imgCols = useRef()
    const Col1 = useRef()
    const Col2 = useRef()
    const Col3 = useRef()
    const ufH1 = useRef()
    const ufH2 = useRef()
    const ufH3 = useRef()
    // const endingHeading = useRef()
    const blackBox = useRef()
    const blackBox_whiteSec = useRef()
    const blackBox_blackSec1 = useRef()
    const blackBox_blackSec2 = useRef()

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(wraperRef.current, {
                x: "-120vw",
                scrollTrigger: {
                    trigger: wraperRef.current,
                    start: "top top",
                    pin: true,
                    scrub: 2
                }
            })
                .to(brand.current, {
                    xPercent: 20,
                    scrollTrigger: {
                        trigger: brand.current,
                        start: "center center",
                        scrub: 1.5
                    }
                })
                .to(brand_subhead.current, {
                    yPercent: -25,
                    scrollTrigger: {
                        trigger: brand.current,
                        start: "center center",
                        scrub: 1
                    }
                })
                .to(Col1.current, {
                    y: "50vh",
                    scrollTrigger: {
                        trigger: Col1.current,
                        start: "bottom bottom",
                        scrub: 1.5
                    }
                })
                .to(Col2.current, {
                    y: "-40vh",
                    scrollTrigger: {
                        trigger: Col1.current,
                        start: "bottom bottom",
                        scrub: 1.5
                    }
                })
                .to(Col3.current, {
                    y: "50vh",
                    scrollTrigger: {
                        trigger: Col1.current,
                        start: "bottom bottom",
                        scrub: 1.5
                    }
                })
                .to(Col3.current, {
                    y: "50vh",
                    scrollTrigger: {
                        trigger: Col3.current,
                        start: "top top",
                        // markers: true,
                        scrub: 1.5
                    }
                })
                .to(blackBox.current, {
                    transform: "translateY(0)",
                    scrollTrigger: {
                        trigger: section_2.current,
                        start: "bottom top-=10",
                        scrub: 1.5,
                    }
                })
                .fromTo(ufH1.current, { opacity: 0, transform: "translateY(100%)" }, {
                    yPercent: -100,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section_3.current,
                        start: "top top",
                        end: "top top",
                        scrub: 2
                    }
                })
                .fromTo(ufH2.current, { opacity: 0, transform: "translateY(-100%)" }, {
                    yPercent: 100,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section_3.current,
                        start: "top top",
                        end: "top top",
                        scrub: 2,
                        onEnter: () => {
                            ufH1.current.classList.add("animate_heading")
                            ufH2.current.classList.add("animate_heading")
                            ufH3.current.classList.add("animate_white_heading")
                        },
                        onEnterBack: () => {
                            ufH1.current.classList.remove("animate_heading")
                            ufH2.current.classList.remove("animate_heading")
                            ufH3.current.classList.remove("animate_white_heading")
                        }
                    }
                })
                .to(blackBox_whiteSec.current, {
                    height: "100%",
                    scrollTrigger: {
                        trigger: section_3.current,
                        start: "bottom bottom",
                        pin: true,
                        scrub: 1.5
                    }
                })
                .to(blackBox_blackSec1.current, {
                    height: 0,
                    scrollTrigger: {
                        trigger: section_3.current,
                        start: "bottom bottom",
                        scrub: 1.5
                    }
                })
                .to([section_3.current, blackBox.current,], {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: section_3.current,
                        start: "center center ",
                        scrub: 1.5
                    }
                })
                // .to(endingHeading.current, {
                //     opacity: 1,
                //     scale: 1,
                //     duration: 2000,
                //     pointerEvents: "auto",
                //     scrollTrigger: {
                //         trigger: section_4.current,
                //         start: "top bottom",
                //         markers: true,
                //         scrub: 1.5
                //     }
                // })
        }, wraperRef.current)
        return () => { ctx.revert() }
    }, [])
    return (
        <>
            <Head>
                <title>About Us - UF</title>
            </Head>
            <MusicBars />
            <main className='overflow-hidden'>

                <section ref={wraperRef} className='relative w-[300vw] h-[100vh] flex justify-start overflow-y-hidden overflow-hidden'>

                    <section className="brand w-[58vw] h-screen flex justify-center items-center">
                        <div ref={brand} className="flex flex-col justify-end items-end select-none">
                            <h1 className="text-[134px] leading-[1] text-right font_copper tracking-wide">URBAN <br /> FITS</h1>
                            <h3 ref={brand_subhead} className="text-[34px] font-medium font_cinzel text-yellow-700">FASHION BRAND</h3>
                        </div>
                    </section>

                    <section ref={imgCols} className="w-[62vw] h-screen flex gap-x-3">
                        <div key={1} ref={Col1} className="w-1/3 h-[150vh] relative top-[-50vh] border-x-[16px] bg-black border-black flex flex-col">
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 1" src={colImg1} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 2" src={colImg2} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 3" src={colImg3} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                        </div>

                        <div key={2} ref={Col2} className="w-1/3 h-[150vh] relative top-[-10vh] border-x-[16px] bg-black border-black flex flex-col">
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 1" src={colImg4} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 2" src={colImg5} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 3" src={colImg6} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                        </div>

                        <div key={3} ref={Col3} className="w-1/3 h-[150vh] relative top-[-50vh] border-x-[16px] bg-black border-black flex flex-col">
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 1" src={colImg7} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 2" src={colImg9} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                            <div className="w-full h-[50vh]"> <Image priority={true} alt="col Image 3" src={colImg8} width={2000} height={3000} className='w-full h-full object-cover border-t-[2vh] border-black' /> </div>
                        </div>
                    </section>

                    <section ref={section_2} className="relative w-screen h-screen flex">
                        <div className="w-[7%] h-full flex justify-center items-center border-x-2 border-black">
                            <h2 className="font_copper text-5xl 2xl:text-7xl -rotate-90 whitespace-nowrap">Urban Fits</h2>
                        </div>
                        <div className="w-[58%] h-full px-2">
                            <h1 className="w-full h-[17%] pb-3 flex items-end font_montserrat font-bold text-6xl">ENCHANTÉ COUTURE</h1>
                            <div className="w-full h-3/5">
                                <Image alt='about-bg' width={1800} height={1600} src={sec2Img1} className='w-full h-full object-cover' />
                            </div>
                            <div className="w-full mt-3 flex justify-between items-start font_montserrat">
                                <h2 className="text-6xl font-semibold">MEN & WOMEN</h2>
                                <span className="text-2xl">/23</span>
                            </div>
                            <p className="font_montserrat text-3xl mt-3">Join The Fashion Revolution With Our Brand</p>
                        </div>
                        <div className="w-[35%] h-full px-0.5 bg-black overflow-hidden">
                            <h2 className='h-[17%] pb-3 animate_loop translate-x-full flex flex-col justify-end font_montserrat font-bold text-6xl text-white whitespace-nowrap'>COLLECTION OF 2023</h2>
                            <div className="w-full h-[83%]">
                                <Image alt='about-bg' width={1400} height={1800} src={sec2Img2} className='w-full h-full object-cover' />
                            </div>
                        </div>
                    </section>

                    <section ref={blackBox} className="absolute top-0 translate-y-full text-white w-full h-full bg-black flex flex-col justify-center">
                    </section>
                </section>
                <section ref={section_3} className="w-screen h-screen bg-black text-white flex flex-col justify-between overflow-hidden">
                    <div ref={blackBox_blackSec1} className="w-full h-1/3 justify-self-start self-start bg-black flex justify-center items-center text-white overflow-hidden">
                        <h1 ref={ufH1} className="w-full font_copper text-8xl text-white whitespace-nowrap">Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits</h1>
                    </div>

                    <div ref={blackBox_whiteSec} className="w-full h-0 justify-self-center bg-white overflow-hidden flex justify-center items-center text-black">
                        <h1 ref={ufH3} className="w-full font_copper text-8xl text-black whitespace-nowrap">Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits</h1>
                    </div>

                    <div ref={blackBox_blackSec2} className="w-full h-1/3 justify-self-end self-end bg-black flex justify-center items-center overflow-hidden">
                        <h1 ref={ufH2} className="w-full font_copper text-8xl text-white whitespace-nowrap">Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits&nbsp;&nbsp;Urban Fits</h1>
                    </div>
                </section>
                <section ref={section_4} className="bg-white w-screen h-screen flex flex-col justify-between items-center">
                    <nav className="w-full h-[70px] px-10 flex justify-between items-center">
                        <Link href="/" ><Image src={Logo} alt='UF' className='w-[40px]' /></Link>
                        <div className="w-1/5 flex justify-between items-center">
                            <Link href="/products/Men" className='font_urbanist_medium text-base' >Men</Link>
                            <Link href="/products/Women" className='font_urbanist_medium text-base' >Women</Link>
                            <Link href="/products/Kids" className='font_urbanist_medium text-base' >Kids</Link>
                        </div>
                    </nav>
                    {/* <h1 ref={endingHeading} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full font_copper text-9xl text-center opacity-0 scale-[3] pointer-events-none"><Link href='/' >URBAN FITS</Link></h1> */}
                    <h1 className="font_copper text-9xl text-center hover:tracking-[25px] transition-all duration-[1.5s]"><Link href='/' >URBAN FITS</Link></h1>
                    <div className="w-full h-20 flex justify-center items-start font_urbanist text-xs text-center">Urban Fits LLC, State ID: 7053037, Registered Office Address - 500 4th St NW Suite 102 PMB 1958 Albuquerque, NM 87 102 <br />Urban Fits LLC &copy; 2023-2024 all rights reserved</div>
                </section>
            </main>
        </>
    );
};

export default AboutComponent;