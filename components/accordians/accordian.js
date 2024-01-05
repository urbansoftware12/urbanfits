import React, { useState } from 'react'
// This accordian is for Customer Services pages
export default function Accordian(props) {
    const [open, setOpen] = useState(false)
    return <div className="p-4 lg:p-6 outline-none accordion-section rounded-xl bg-gray-50 mb-6" tabIndex={1}>
        <div onClick={() => setOpen(!open)} className="flex justify-between h-5 items-center transition ease duration-700 cursor-pointer relative">
            <div className="text-base lg:text-lg font_urbanist_bold text-black transition ease duration-700">{props.title}</div>
            <i className={`${open ? '-rotate-180' : null} fa-solid fa-caret-down transform transition ease duration-500`}/>
        </div>
        <div className={` ${open ? 'max-h-screen mt-2' : 'max-h-0'} relative max-w-full text-sm leading-5 rounded overflow-y-hidden scrollbar_x ease duration-700`}>
            <div id='Accordian_Container' className="flex items-center">
                <div className='xl:w-full font_urbanist_light text-sm text-black'>{props.children}</div>
            </div>
        </div>
    </div>
}