import React, { useState } from 'react'
import Navbar from '../subcomponents/_navbar'
import Image from 'next/image'
import Card from '../subcomponents/_card'
import Footer from '../subcomponents/_footer'
import giftBanner from '../public/giftbanner.png'

export default function Giftcard() {
    const [expand, setExpand] = useState(false)
    return (
        <>
            <main className="w-full h-full bg-gray-100 transition duration-700">
                <Navbar setExpand={setExpand} />
                    <section className={`${expand === true ? 'w-3/4' : 'w-full lg:w-[95%]'} absolute right-0 top-0 pt-7 flex flex-col justify-center items-center space-y-5 transition-all duration-700`}>
                        <div className={` ${expand === true ? 'rounded-3xl' : 'rounded-sm'} overflow-hidden w-[95%] lg:w-11/12 h-[40vh] lg:h-auto relative mx-5 lg:mx-auto bg_giftbanner bg-no-repeat bg-cover bg-right transition-all duration-700`}>
                            <h1 className="w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6vw] lg:text-[4vw] font_futuraLT ">Urban Gift Cards</h1>
                            <Image src={giftBanner} alt='' className={`hidden lg:block`} />
                        </div>
                        <div className="w-full lg:w-11/12 mx-3 p-5 flex flex-col lg:flex-row justify-around items-center space-y-6 lg:space-y-0">
                            <Card title="e-Gift Cards" value='Add a personalized messgae, we deliver your gift via email.' valueCenter btnValue="Shop Gift Card" classes='w-full py-20 justify-center items-center h-72 md:w-1/2 lg:w-2/5 md:h-1/2' />
                            <Card title="Gift Cards" value='Pick one out and we’ll mail it to the lucky recipent.' valueCenter btnValue="Shop Gift Card" classes='w-full py-20 justify-center items-center h-72 md:w-1/2 lg:w-2/5 md:h-2/5' />
                        </div>
                    <Footer classes={expand === true ? 'rounded-3xl' : 'rounded-sm'} />
                    </section>
            </main>
        </>
    )
}
