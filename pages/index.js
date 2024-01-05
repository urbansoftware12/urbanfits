import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const HomeCarousel = dynamic(() => import('@/components/carousels/homeCarousel'));
// const HomeCarousel2 = dynamic(() => import('@/components/carousels/homeCarousel2'));
import Link from "next/link";
import ListingShopSection from "@/components/listingShop_section";
import OfferCard from "@/components/cards/offerCard";
import Shoppingcard from "@/components/cards/shoppingcard";
import axios from "axios";

export default function Home() {
    const [indexContent, setIndexContent] = useState(null)

    const getIndexContent = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/get-index-content`);
            setIndexContent(data);
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        getIndexContent();
        return () => setIndexContent(null)
    }, [])

    return <>
        <Head><title>Urban Fits</title></Head>
        <main className="w-full max-w-[2000px] mx-auto h-full">
            <main className='w-full bg-white flex flex-col transition-all gap-y-7 lg:gap-y-10 overflow-hidden' >
                <section className="w-full layout_height mb-4 flex justify-center items-center transition-all duration-700 ease-linear overflow-hidden">
                    <HomeCarousel />
                </section>
                {/* Latest Arrivals */}
                {indexContent?.latestArrivals?.length ? <section>
                    <h2 className="w-full font_urbanist_bold text-center text-pinky text-lg md:xl lg:text-2xl">Urban Fits Latest Arrivals</h2>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
                        {indexContent?.latestArrivals.map((product, index) => {
                            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                            else if (index > 4) return
                            return <Shoppingcard margin='0' product={product} />
                        })}
                    </div>
                </section> : null}
                {/* Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 xl:px-20 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">New Collection</h2>
                        <Link href='/products/category/64d517f6218f4e9ee6253b18?name=new+collection' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">See all Collection</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
                        {indexContent?.newCollection.map((product, index) => {
                            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                            else if (index > 4) return
                            return <Shoppingcard margin='0' product={product} />
                        })}
                    </div>
                </section>

                <section className="w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 gap-4 xl:gap-7">
                    <OfferCard key={1} href="#" badge="Clearance" heading="Up To" offer="50% Off" />
                    <OfferCard key={2} href="#" badge="Shop Women" heading="All Under" offer="$50.00" />
                    <OfferCard key={2} href="#" badge="Shop Men" heading="All Under" offer="$50.00" />
                    <OfferCard key={4} href="#" badge="Accessories Zone" heading="Stars From" offer="$30.00" />
                </section>

                {/* Women Collection Section */}
                <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 xl:px-20 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Women Collection</h2>
                        <Link href='/products/category/64a59d5816b4c91fa1967b2e?name=women' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Women</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
                        {indexContent?.womenCollection.map((product, index) => {
                            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                            else if (index > 4) return
                            return <Shoppingcard margin='0' product={product} />
                        })}
                    </div>
                </section>

                {/* <HomeCarousel2 /> */}

                {/* Men Collection Section */}
                {indexContent?.menCollection.length ? <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 xl:px-20 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Men Collection</h2>
                        <Link href='/products/category/649b292762a7c100cfb7207f?name=men' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Men</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
                        {indexContent?.menCollection.map((product, index) => {
                            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                            else if (index > 4) return
                            return <Shoppingcard margin='0' product={product} />
                        })}
                    </div>
                </section> : null}

                {/* Kids Collection Section */}
                {indexContent?.kidsCollection.length ? <section>
                    <div className="w-full px-5 md:px-7 lg:px-14 xl:px-20 mb-3 md:mb-5 flex justify-between items-center">
                        <h2 className="font_urbanist_bold text-lg md:xl lg:text-2xl">Urban Fits Kids Collection</h2>
                        <Link href='/products/category/64d4dfa643c643cc9c60c672?name=kids' className="px-4 py-2 bg-gray-100 text-xs md:text-[15px] rounded-full font_urbanist_medium">Shop Kids</Link>
                    </div>
                    <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
                        {indexContent?.kidsCollection.map((product, index) => {
                            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                            else if (index > 4) return
                            return <Shoppingcard margin='0' product={product} />
                        })}
                    </div>
                </section> : null}
            </main>
            <ListingShopSection classes="mt-7 lg:mt-10" whiteTheme />
        </main>
    </>
}