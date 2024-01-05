import React from 'react'
import useWallet from '@/hooks/useWallet'

export default function CurrencySelect({ show, setCurrencyModal }) {
    const { currency, setCurrency, setCurrency_selected_by_user } = useWallet()

    const updateCurrency = (event) => {
        const { name } = event.target
        setCurrency(name)
        location.reload()
        setCurrency_selected_by_user(true)
        toaster("success", <p>Currency udpated to <span className='font_urbanist_bold'>{name}</span>.</p>)
    }

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setCurrencyModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <h1 className="font_urbanist_medium text-lg">Currency</h1>
            <i className='w-0 h-0' />
        </div>
        <div className="w-full px-4 flex flex-col">
            <button onClick={updateCurrency} name='AED' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                AED (د.إ)
                {currency === "AED" && <i name='AED' className="fa-solid fa-check text-black text-lg z-50" />}
            </button>
            <button onClick={updateCurrency} name='SAR' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                SAR (﷼)
                {currency === "SAR" && <i name='SAR' className="fa-solid fa-check text-black text-lg z-50" />}
            </button>
            <button onClick={updateCurrency} name='PKR' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                PKR (₨)
                {currency === "PKR" && <i name='PKR' className="fa-solid fa-check text-black text-lg z-50" />}
            </button>
        </div>
    </section>
}