import React from 'react'
import { useCart } from 'react-use-cart'
import useWallet from '@/hooks/useWallet'
import toaster from '@/utils/toast_function'

export default function Giftcard() {
    const { formatPrice } = useWallet()
    const { addItem, inCart } = useCart()
    return <>
        <main className='w-full max-w-[2000px] mx-auto p-5 md:p-7 lg:p-14 xl:p-16 2xl:p-24 bg-white grid grid-cols-1 mid:grid-cols-2 transition-all gap-7 lg:gap-y-10 lg:gap-x-28 xl:gap-y-16 xl:gap-x-40 overflow-hidden'>
            <h1 className="col-span-full font_urbanist_bold capitalize text-lg md:text-xl lg:text-2xl">Gift Cards</h1>

            <div id="giftcard_bronze" key={1} className="group relative w-full max-w-[590px] mx-auto h-60 mid:h-64 lg:h-72 xl:h-80 rounded-3xl border-b border-gray-300 overflow-clip equillibrium_shadow transition-all">
                <span className="absolute top-full left-[-10%] group-hover:left-[110%] group-hover:-top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-[250%] -rotate-12 bg-white/40 transition-all duration-500"></span>
                <section className="w-full h-3/4 p-4 md:p-7 flex flex-col bronze_metal_bg border-b-2 border-[#bb8e47]">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="gradient_text text-xs md:text-sm font_urbanist_bold">UF-GiftCard</h2>
                        <button onClick={() => {if(inCart("giftcard_bronze")) return toaster("info", "You can buy only one Giftcard per checkout."); addItem({ id: "giftcard_bronze", name: "Bronze UF-Giftcard", d_name: "Bronze", bg: "bronze_metal_bg", price: 100 }); toaster("success", "Bronze Giftcard added to the cart.") }} className="fa-solid fa-cart-plus text-sm md:text-base text-white" />
                    </div>
                    <span className="mx-auto my-auto flex flex-col justify-center items-center font_montserrat_bold text-white text-xl lg:text-3xl tracking-2 group-hover:tracking-3 text-opacity-80 transition-all duration-1000">BRONZE CARD</span>
                </section>
                <section className="w-full h-1/4 p-4 md:px-7 flex justify-between items-center black_glass">
                    <span className="font_montserrat_bold text-base lg:text-lg text-gray-700">{formatPrice(100)}</span>
                    <svg className='w-5 lg:w-auto aspect-square' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FFFF" />
                        <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FFFF" />
                        <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FFFF" />
                    </svg>
                </section>
            </div>
            <div id="giftcard_silver" key={2} className="group relative w-full max-w-[590px] mx-auto h-60 mid:h-64 lg:h-72 xl:h-80 rounded-3xl border-b border-gray-300 overflow-clip equillibrium_shadow transition-all">
                <span className="absolute top-full left-[-10%] group-hover:left-[110%] group-hover:-top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-[250%] -rotate-12 bg-white/40 transition-all duration-500"></span>
                <section className="w-full h-3/4 p-4 md:p-7 flex flex-col silver_metal_bg border-b-2 border-gray-400">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="gradient_text text-xs md:text-sm font_urbanist_bold">UF-GiftCard</h2>
                        <button onClick={() => {if(inCart("giftcard_silver")) return toaster("info", "You can buy only one Giftcard per checkout."); addItem({ id: "giftcard_silver", name: "Silver UF-Giftcard", d_name: "Silver", bg: "silver_metal_bg", price: 200 }); toaster("success", "Silver Giftcard added to the cart.") }} className="fa-solid fa-cart-plus text-white" />
                    </div>
                    <span className="mx-auto my-auto flex flex-col justify-center items-center font_montserrat_bold text-white text-xl lg:text-3xl tracking-2 group-hover:tracking-3 text-opacity-80 transition-all duration-1000">SILVER CARD</span>
                </section>
                <section className="w-full h-1/4 p-4 md:px-7 flex justify-between items-center black_glass">
                    <span className="font_montserrat_bold text-base lg:text-lg text-gray-700">{formatPrice(200)}</span>
                    <svg className='w-5 lg:w-auto aspect-square' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FFFF" />
                        <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FFFF" />
                        <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FFFF" />
                    </svg>
                </section>
            </div>
            <div id="giftcard_gold" key={3} className="group relative w-full max-w-[590px] mx-auto h-60 mid:h-64 lg:h-72 xl:h-80 rounded-3xl border-b border-gray-300 overflow-clip equillibrium_shadow transition-all">
                <span className="absolute top-full left-[-10%] group-hover:left-[110%] group-hover:-top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-[250%] -rotate-12 bg-white/40 transition-all duration-500"></span>
                <section className="w-full h-3/4 p-4 md:p-7 flex flex-col gold_metal_bg border-b-2 border-[#bb8e47]">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="gradient_text text-xs md:text-sm font_urbanist_bold">UF-GiftCard</h2>
                        <button onClick={() => {if(inCart("giftcard_gold")) return toaster("info", "You can buy only one Giftcard per checkout."); addItem({ id: "giftcard_gold", name: "Gold UF-Giftcard", d_name: "Gold", bg: "gold_metal_bg", price: 300 }); toaster("success", "Gold Giftcard added to the cart.") }} className="fa-solid fa-cart-plus text-white" />
                    </div>
                    <span className="mx-auto my-auto flex flex-col justify-center items-center font_montserrat_bold text-white text-xl lg:text-3xl tracking-2 group-hover:tracking-3 text-opacity-80 transition-all duration-1000">GOLD CARD</span>
                </section>
                <section className="w-full h-1/4 p-4 md:px-7 flex justify-between items-center black_glass">
                    <span className="font_montserrat_bold text-base lg:text-lg text-gray-700">{formatPrice(300)}</span>
                    <svg className='w-5 lg:w-auto aspect-square' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FFFF" />
                        <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FFFF" />
                        <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FFFF" />
                    </svg>
                </section>
            </div>
            <div id="giftcard_platinum" key={4} className="group relative w-full max-w-[590px] mx-auto h-60 mid:h-64 lg:h-72 xl:h-80 rounded-3xl border-b border-gray-300 overflow-clip equillibrium_shadow transition-all">
                <span className="absolute top-full left-[-10%] group-hover:left-[110%] group-hover:-top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-[250%] -rotate-12 bg-white/40 transition-all duration-500"></span>
                <section className="w-full h-3/4 p-4 md:p-7 flex flex-col platinum_metal_bg border-b-2 border-gray-600">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="gradient_text text-xs md:text-sm font_urbanist_bold">UF-GiftCard</h2>
                        <button onClick={() => {if(inCart("giftcard_platinum")) return toaster("info", "You can buy only one Giftcard per checkout."); addItem({ id: "giftcard_platinum", name: "Platinum UF-Giftcard", d_name: "Platinum", bg: "platinum_metal_bg", price: 400 }); toaster("success", "Platinum Giftcard added to the cart.") }} className="fa-solid fa-cart-plus text-white" />
                    </div>
                    <span className="mx-auto my-auto flex flex-col justify-center items-center font_montserrat_bold text-white text-xl lg:text-3xl tracking-2 group-hover:tracking-3 text-opacity-80 transition-all duration-1000">PLATINUM CARD</span>
                </section>
                <section className="w-full h-1/4 p-4 md:px-7 flex justify-between items-center black_glass">
                    <span className="font_montserrat_bold text-base lg:text-lg text-gray-700">{formatPrice(400)}</span>
                    <svg className='w-5 lg:w-auto aspect-square' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FFFF" />
                        <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FFFF" />
                        <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FFFF" />
                    </svg>
                </section>
            </div>
            <div id="giftcard_diamond" key={5} className="group relative w-full max-w-[590px] mx-auto h-60 mid:h-64 lg:h-72 xl:h-80 rounded-3xl border-b border-gray-300 overflow-clip equillibrium_shadow transition-all">
                <span className="absolute top-full left-[-10%] group-hover:left-[110%] group-hover:-top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-[250%] -rotate-12 bg-white/40 transition-all duration-500"></span>
                <section className="w-full h-3/4 p-4 md:p-7 flex flex-col diamond_metal_bg border-b-2 border-purple-700">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="gradient_text text-xs md:text-sm font_urbanist_bold">UF-GiftCard</h2>
                        <button onClick={() => {if(inCart("giftcard_diamond")) return toaster("info", "You can buy only one Giftcard per checkout."); addItem({ id: "giftcard_diamond", name: "Diamond UF-Giftcard", d_name: "Diamond", bg: "diamond_metal_bg", price: 500 }); toaster("success", "Diamond Giftcard added to the cart.") }} className="fa-solid fa-cart-plus text-white" />
                    </div>
                    <span className="mx-auto my-auto flex flex-col justify-center items-center font_montserrat_bold text-white text-xl lg:text-3xl tracking-2 group-hover:tracking-3 text-opacity-80 transition-all duration-1000">DIAMOND CARD</span>
                </section>
                <section className="w-full h-1/4 p-4 md:px-7 flex justify-between items-center black_glass">
                    <span className="font_montserrat_bold text-base lg:text-lg text-gray-700">{formatPrice(500)}</span>
                    <svg className='w-5 lg:w-auto aspect-square' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FFFF" />
                        <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FFFF" />
                        <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FFFF" />
                    </svg>
                </section>
            </div>

        </main >
    </>
}