import React, { useState } from 'react'

export default function LanguageSelect({ show, setLanguageModal }) {
    const [loader, setLoader] = useState(null)

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setLanguageModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <h1 className="font_urbanist_medium text-lg">Language</h1>
            <i className='w-0 h-0' />
        </div>
        {loader}
        <div className="w-full px-4 flex flex-col">
            <button name='Male' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                English
                <i name='Male' className="fa-solid fa-check text-black text-lg z-50" />
            </button>
            <button name='Female' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                العربية
            </button>
        </div>
    </section>
}