import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import HomeCarousel from "@/components/carousels/homeCarousel";
import HomeCarousel2 from "@/components/carousels/homeCarousel2";
// import CardCarousel from "@/components/carousels/cardCarousel";
import Card from "@/components/cards/card";
import PicCard from "@/components/cards/picCard";
// Modal imports
import LoadingModal from "../components/modals/loadingmodal";
import LanguageModal from "../components/modals/languagemodal";
// imports for images
import image1 from "../public/card imgs/card img5.jpg";
import image2 from "../public/card imgs/card img6.jpg";
import image3 from "../public/card imgs/card img1.jpg";
import image4 from "../public/card imgs/card img8.jpg";

export default function Home() {
    // states and function for modals
    const [modal1, setModal1] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [hideNav, setHideNav] = useState(true);
    const [carouselClasses, setCarouselClasses] = useState('w-full h-screen');
    const [carousel_textContainer, setTextContainer] = useState('bottom-[8%] left-[4%]')

    useEffect(() => {
        let item = localStorage.getItem("loadingModal");
        if (item) return;
        setModal1(true);
        localStorage.setItem("loadingModal", true);
    }, []);

    useEffect(() => {
        const setSizefunc = () => {
            let position = window.pageYOffset;
            if (position >> 0) {
                setCarouselClasses('w-11/12 lg:w-90pr h-80vh lg:h-85vh rounded-2rem my-[3vh]')
                setTextContainer('bottom-[26.4%] left-[4%] lg:bottom-[26.4%] lg:left-[4%]')
                setHideNav(false)
                window.removeEventListener('scroll', setSizefunc);
            }
        }
        window.addEventListener('scroll', setSizefunc);
    }, []);

    const toggleModal = (e) => {
        if (e.target.name === "modal1") {
            if (modal1 === false) return setModal1(true);
            if (modal1 === true) return setModal1(false);
        } else if (e.target.name === "modal3") {
            if (modal3 === false) return setModal3(true);
            if (modal3 === true) return setModal3(false);
        }
    };

    return (
        <>
            <Head>
                <title>Urban Fits</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="w-full h-full section_container">
                <LoadingModal show={modal1} toggleModal={toggleModal} />
                <LanguageModal show={modal3} toggleModal={toggleModal} />
                <Navbar hideNav={hideNav} />
                <section className='w-full bg-white flex justify-center lg:justify-end transition-all ease-linear duration-700' >
                    <div className="w-full flex flex-col justify-center items-center gap-y-5 transition-all ease-linear duration-700" >
                        <div className={`${carouselClasses} flex justify-center items-center font_gotham transition-all duration-700 ease-linear overflow-hidden`} >
                            <HomeCarousel carousel_textContainer={carousel_textContainer} />
                        </div>
                        {/* Auto scroll Carousel  */}
                        {/* <section className="relative w-full h-80vh md:h-87vh p-5 mf:p-10 lg:pr-0 flex flex-col lg:flex-row items-center justify-center font_gotham overflow-hidden">
                            <div className="lg:absolute left-0 w-full lg:w-[35vw] lg:h-full md:pl-5 lg:pl-10 mb-3 lg:m-0 leading-7 flex flex-col justify-center items-start">
                                <h2 className="text-xl md:text-3xl lg:text-5xl word-wrap leading-tight">Newest Gear to<br/>Work</h2>
                                <h4 className="font_gotam_light">Innovation and Comfort for Women</h4>
                            </div>
                            <div className="lg:absolute h-80vh w-full lg:ml-[40rem] lg:w-[80vw] lg:h-[95%] rounded-3xl flex items-center">
                                <CardCarousel />
                            </div>
                            <div className="hidden lg:block absolute w-1/5 h-full top-0 right-0 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </section> */}
                        {/* Shopping Card Section */}
                        {/* <section className="w-full p-5 md:p-10 md:pb-0 font_gotham">
                            <div className="w-full h-87vh md:h-auto lg:h-87vh py-5 md:py-10 flex flex-col lg:flex-row justify-around space-y-5 lg:space-y-0">
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP WOMEN" img={image1} />
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP MEN" img={image2} />
                            </div>
                        </section> */}
                        {/* Shopping Card Section */}
                        <div className="w-90pr flex items-center mt-10 mb-3 text-base lg:text-[26px] leading-3 font_gotham_medium tracking-expand ml-7"><h3>READY TO WEAR&nbsp;</h3><span className="w-14 md:w-20 h-[2px] mx-1 bg-black transition-all"></span></div>
                        <section className="w-full h-90vh md:h-auto lg:h-87vh p-5 pt-0 md:p-10 md:pt-0 flex flex-col lg:flex-row justify-around font_gotham gap-5 lg:gap-0">
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP WOMEN" img={image1} />
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP MEN" img={image2} />
                        </section>
                        {/* Shopping Card Section */}
                        <section className="w-full h-90vh md:h-auto lg:h-87vh p-5 md:p-10 md:pt-0 flex flex-col lg:flex-row justify-around font_gotham space-y-5 lg:space-y-0">
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP WOMEN" img={image4} />
                            <PicCard h1="NEW IN" h2="READY TO WEAR" btnValue="SHOP MEN" img={image3} />
                        </section>
                        {/* second carousel */}
                        <section className="relative bg_metal_gold w-full h-60vh lg:h-87vh lg:px-10 lg:pr-0 flex flex-col-reverse lg:flex-row items-center justify-center font_gotham overflow-hidden">
                            <div className="hidden lg:flex left-0 w-full lg:w-[35vw] lg:h-full md:pl-10 mb-3 lg:m-0 leading-7 flex-col justify-center items-start">
                                <h2 className="text-xl md:text-3xl lg:text-[32px] word-wrap font_gotham_medium leading-tight">URBAN<br />NEW ARRIVAL</h2>
                            </div>
                            <div className="h-full w-full lg:w-[65vw] rounded-3xl flex items-center">
                                <HomeCarousel2 />
                            </div>
                        </section>
                        <section className="w-full h-auto lg:h-80vh p-5 flex flex-col lg:flex-row justify-center items-center gap-5">
                            <Card href="/contact" title="CONTACT US" value="If you have any query then please contact us." valueCenter btnClasses="w-1/2 py-5" btnValue="Contact Us" classes="w-full md:w-60vw py-20 justify-center items-center h-full lg:w-30pr md:h-3/4" />
                            <Card href="/customercare" title="CUSTOMER CARE" value="Do you have any questions? We are here to help you. You can contact our customer care team by email or over the phone." valueCenter btnClasses="w-1/2 py-5" btnValue="Get In Touch" classes="w-full md:w-60vw py-20 justify-center items-center h-full lg:w-30pr md:h-3/4" />
                            <Card href="/faq" title="FAQ" value="Find all the answers to the frequently asked questions below." valueCenter btnClasses="w-1/2 py-5" btnValue="See Our FAQs" classes="w-full md:w-60vw py-20 justify-center items-center h-full lg:w-30pr md:h-3/4" />
                        </section>
                        <Footer />
                    </div>
                </section>
            </main>
        </>
    );
}
