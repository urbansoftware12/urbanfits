import Link from 'next/link'
import React, { useState } from 'react'
import LinkBtn from '../buttons/link_btn';
import LanguageModal from './languagemodal';

// Country location notifyer Modal Component
export default function LoadingModal(props) {
    const [modal3, setModal3] = useState(false)
    const toggleModal = (e) => {
        if (e.target.name === "modal3") {
            if (modal3 === false) return setModal3(true)
            if (modal3 === true) return setModal3(false)
        }
    }
    return <>
        <LanguageModal show={modal3} toggleModal={toggleModal} />
        <div className={`w-full h-full font_urbanist fixed inset-0 z-30 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
            <div className={` ${props.show === false ? "translate-y-10" : ''} relative w-11/12 md:w-3/5 lg:w-[33rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                <button onClick={props.toggleModal} name="modal1" className="fa-solid fa-xmark text-2xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-500"></button>
                <section className="w-full h-full p-7">
                    <div className="w-full space-y-5">
                        <h2 className="text-lg md:text-xl lg:text-[26px] font_copper tracking-widest">CHANGE COUNTRY</h2>
                        <p className='text-xs md:text-sm' >You are trying to access the united states sites - would you like to go to the United Arab Emirates site?</p>
                    </div>
                    <div className="w-full mt-7 flex flex-col justify-center space-y-3">
                        <LinkBtn my="my-0" value="" classes="w-full text-xs md:text-sm">Yes, go to United Arab Emirates site</LinkBtn>
                        <LinkBtn my="my-0" value="" bg="bg-white" text="black" classes="w-full text-xs md:text-sm border border-black">No, stay on the United States site</LinkBtn>
                        <Link href="#" onClick={toggleModal} name="modal3" className="w-full text-xs md:text-sm text-center text-gray-500 underline " >Choose a different Country/Region</Link>
                    </div>
                </section>
            </div>
        </div>
    </>
}