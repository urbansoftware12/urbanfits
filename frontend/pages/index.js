import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
// import _ from 'lodash';
import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '@/components/footer';
// import { Inter } from '@next/font/google'
import Carousel from '@/components/carousels/carousel';
import CardCarousel from '@/components/carousels/cardCarousel';
import Card from '@/components/cards/card';
import PicCard from '@/components/cards/picCard';

// Modal imports
import LoadingModal from '../components/modals/loadingmodal';
import LanguageModal from '../components/modals/languagemodal';

// imports for images
import Image from 'next/image';
import Logo from '../public/logos/logo_black.svg'
import image1 from '../public/card imgs/card img5.jpg'
import image2 from '../public/card imgs/card img6.jpg'
import image3 from '../public/card imgs/card img1.jpg'
import image4 from '../public/card imgs/card img8.jpg'

// Confifure font
// const inter = Inter({ subsets: ['latin'] })

function Home() {
    // state for navbar expansion
    const [expand, setExpand] = useState(false)
    // states and function for modals
    const [modal1, setModal1] = useState(false)
    const [modal3, setModal3] = useState(false)
    const toggleModal = (e) => {
        if (e.target.name === "modal1") {
            if (modal1 === false) return setModal1(true)
            if (modal1 === true) return setModal1(false)
        }
        else if (e.target.name === "modal3") {
            if (modal3 === false) return setModal3(true)
            if (modal3 === true) return setModal3(false)
        }
    }

    const [resize, setResize] = useState(false)
    useEffect(() => {
        const setSizefunc = () => {
            let position = window.pageYOffset
            if (position >> 0) {
                setResize(true)
            }
        }
        if (resize === true) return window.removeEventListener('scroll', setSizefunc)

        window.addEventListener('scroll', setSizefunc)
    }, [resize])

    useEffect(() => {
        let item = localStorage.getItem("loadingModal")
        if(item) return
        setModal1(true)
        localStorage.setItem("loadingModal", true)
    }, [])

    return (
        <>
            <Head>
                <title>Urban Fits</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="w-full h-full section_container">
                <Navbar logoNull setExpand={setExpand} classes={resize === true ? "" : "-translate-x-56 opacity-0 pointer-events-none"} />
                <LoadingModal show={modal1} toggleModal={toggleModal} />
                <LanguageModal show={modal3} toggleModal={toggleModal} />
                <section className={`${expand === true ? 'w-full lg:w-[79.4%]' : 'w-full'} bg-gray-100 float-right flex justify-center lg:justify-end transition-all duration-700`}>
                    <Image alt="Urban images" src={Logo} className={`${resize === true ? "" : "translate-x-44"} fixed top-6 right-6 md:top-10 md:right-10 z-10 w-14 md:w-20 transition-all duration-700`} ></Image>
                    <div className={`${resize === true ? "w-full lg:w-[94.6%]" : "w-full"} flex flex-col justify-center items-center space-y-5 transition-all duration-700`}>
                        <Carousel classes={resize === true ? "w-11/12 h-[80vh] md:h-[90vh] rounded-[2rem] mt-7 mx-auto lg:m-10" : "w-full h-screen"} />
                        {/* Auto scroll Carousel  */}
                        <section className="relative w-full h-screen p-3 md:p-5 md:pr-0 flex flex-col md:flex-row items-center justify-center font_futuraLT">
                            <div className="w-full md:w-[35%] md:h-full p-5 flex flex-col justify-center items-start">
                                <h2 className="text-2xl md:text-5xl word-wrap leading-tight">Newest Gear to Work</h2>
                                <h4 className="font_futuraLTlite text-lg">Innovation and Comfort for Women</h4>
                            </div>
                            <div className="w-full md:w-[70%] h-full">
                                <CardCarousel />
                            </div>
                            <div className="absolute w-1/5 h-full top-0 right-0 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </section>
                        {/* Shopping Card Section */}
                        <section className="w-full h-screen p-3 md:p-10 flex flex-col lg:flex-row justify-between font_futuraLT space-y-7 lg:space-y-0 snap-center">
                            <PicCard object_fit="object-top" img={image1} />
                            <PicCard img={image2} />
                        </section>
                        {/* Shopping Card Section */}
                        <section className="w-full font_futuraLT snap-center">
                            <h3 className="text-4xl ml-10">Urban Unicorn Sneakers</h3>
                            <div className="w-full h-screen p-3 md:p-10 flex flex-col md:flex-row justify-between space-y-7 lg:space-y-0">
                                <PicCard img={image4} />
                                <PicCard img={image3} />
                            </div>
                        </section>
                        {/* Auto scroll Carousel  */}
                        <section className="relative w-full h-screen p-3 md:p-5 md:pr-0 flex flex-col md:flex-row font_futuraLT snap-center">
                            <div className="w-full md:w-[35%] md:h-full p-5 flex flex-col justify-center items-start">
                                <h2 className="text-2xl md:text-5xl word-wrap leading-tight self-start">Newest Gear to Work</h2>
                                <h4 className="font_futuraLTlite text-lg">Innovation and Comfort for Men</h4>
                            </div>
                            <div className="w-full md:w-[70%] h-full">
                                <CardCarousel />
                            </div>
                            <div className="absolute w-1/5 h-full top-0 right-0 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </section>
                        {/* Ending Link Cards section */}
                        <section className="w-full h-auto lg:h-[80vh] p-5 flex flex-col lg:flex-row justify-around items-center space-y-6 lg:space-y-0">
                            <Card href="/contact" title="Contact Us" value='If you have any query then please contact us.' valueCenter btnValue="Contact Us" classes='w-full md:w-[60vw] py-20 justify-center items-center h-full lg:w-[30%] md:h-3/4' />
                            <Card href="/customercare" title="Customer Care" value='Do you have any questions? We are here to help you. You can contact our customer care team by email or over the phone.' valueCenter btnValue="Get In Touch" classes='lg:scale-110 w-full md:w-[60vw] py-20 justify-center items-center h-full lg:w-[30%] md:h-3/4' />
                            <Card href="/faq" title="FAQ" value='Find all the answers to the frequently asked questions below.' valueCenter btnValue="See Our FAQs" classes='w-full md:w-[60vw] py-20 justify-center items-center h-full lg:w-[30%] md:h-3/4' />
                        </section>
                        <Footer />
                    </div>
                </section>
            </main>
        </>
    )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
export async function getServerSideProps(context) {
    return { props: {} }
}