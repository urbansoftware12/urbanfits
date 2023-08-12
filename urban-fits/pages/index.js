import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const HomeCarousel = dynamic(() => import('@/components/carousels/homeCarousel'));
const HomeCarousel2 = dynamic(() => import('@/components/carousels/homeCarousel2'));
import Link from "next/link";
import ListingShopSection from "@/components/listingShop_section";
import OfferCard from "@/components/cards/offerCard";
import Shoppingcard from "@/components/cards/shoppingcard";
// Modal imports
import LoadingModal from "../components/modals/loadingmodal";
import LanguageModal from "../components/modals/languagemodal";
// imports for images
import image4 from "@/public/card imgs/card img13.png";
import image5 from "@/public/card imgs/card img14.png";
import image6 from "@/public/card imgs/card img15.png";
import image7 from "@/public/card imgs/card img16.png";

export default function Home() {
    const [modal1, setModal1] = useState(false);
    const [modal3, setModal3] = useState(false);

    useEffect(() => {
        let item = localStorage.getItem("loadingModal");
        if (item) return;
        setModal1(true);
        localStorage.setItem("loadingModal", true);
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

    // temporary product object for shopping card
    const product = {
        name: 'Sample Product name',
        price: '76.99',
        variants: [1, 2, 3, 4]
    }

    return <>
        <Head>
            <title>Urban Fits</title>
        </Head>
        <main className="w-full h-full">
            <LoadingModal show={modal1} toggleModal={toggleModal} />
            <LanguageModal show={modal3} toggleModal={toggleModal} />
            <main className='w-full bg-white flex flex-col transition-all gap-y-7 lg:gap-y-10 overflow-hidden' >
                <section className="w-full layout_height mb-4 flex justify-center items-center transition-all duration-700 ease-linear overflow-hidden">
                    <HomeCarousel />
                </section>

                {/* Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">New Collection</h2>
                        <Link href='#' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">See all Collection</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-8 2xl:gap-14">
                        <Shoppingcard margin='0' product={product} img={image4} />
                        <Shoppingcard margin='0' product={product} img={image5} />
                        <Shoppingcard margin='0' product={product} img={image6} />
                        <Shoppingcard margin='0' product={product} img={image7} />
                    </div>
                </section>

                <section className="w-full px-5 md:px-7 lg:px-14 grid grid-cols-2 gap-4 xl:gap-7">
                    <OfferCard key={1} href="#" badge="Clearance" heading="Up To" offer="50% Off" />
                    <OfferCard key={2} href="#" badge="Shop Women" heading="All Under" offer="$50.00" />
                    <OfferCard key={2} href="#" badge="Shop Men" heading="All Under" offer="$50.00" />
                    <OfferCard key={4} href="#" badge="Accessories Zone" heading="Stars From" offer="$30.00" />
                </section>

                {/* Women Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Women Collection</h2>
                        <Link href='#' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Women</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-8 2xl:gap-14">
                        <Shoppingcard margin='0' product={product} img={image4} />
                        <Shoppingcard margin='0' product={product} img={image5} />
                        <Shoppingcard margin='0' product={product} img={image6} />
                        <Shoppingcard margin='0' product={product} img={image7} />
                    </div>
                </section>

                <HomeCarousel2 />

                {/* Men Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Men Collection</h2>
                        <Link href='#' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Men</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-8 2xl:gap-14">
                        <Shoppingcard margin='0' product={product} img={image4} />
                        <Shoppingcard margin='0' product={product} img={image5} />
                        <Shoppingcard margin='0' product={product} img={image6} />
                        <Shoppingcard margin='0' product={product} img={image7} />
                    </div>
                </section>

                {/* Kids Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Kids Collection</h2>
                        <Link href='#' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Kids</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-8 2xl:gap-14">
                        <Shoppingcard margin='0' product={product} img={image4} />
                        <Shoppingcard margin='0' product={product} img={image5} />
                        <Shoppingcard margin='0' product={product} img={image6} />
                        <Shoppingcard margin='0' product={product} img={image7} />
                    </div>
                </section>
            </main>
            <ListingShopSection classes="mt-7 lg:mt-10" whiteTheme />
        </main>
    </>
}