import Image from 'next/image'
import truck from '@/public/truck.svg'
import phone from '@/public/phone.svg'

export default function Accordians() {
    return (
        <>
            <div className="group p-5 outline-none accordion-section rounded-2xl bg-white border-b" tabIndex={1}>
                <div className="group flex justify-between h-9 items-center transition ease duration-700 cursor-pointer relative">
                    <div className="group-focus:text-black text-xs md:text-sm font_urbanist_bold transition ease duration-700">Contact</div>
                    <span className="transform transition ease duration-500 group-focus:text-black group-focus:-rotate-180 ">
                        <i className="fas fa-minus minus_icon group-focus:block"></i>
                        <i className="fas fa-plus group-focus:hidden"></i>
                    </span>
                </div>
                <div className="group-focus:max-h-screen max-h-0 border-b-gray-300 text-sm leading-5 rounded overflow-hidden ease duration-700">
                    <div className="flex items-center mb-3 py-2 border-b border-b-gray-200">
                        <i className="material-symbols-outlined mr-6">mail</i>
                        <span>
                            <p className='font_gotam_light text-xs md:text-sm'>Send us an email : Our customer care team will get back to you as soon as possible.</p>
                        </span>
                    </div>
                    <div className="flex items-center py-2">
                        <Image className='mr-6' src={phone} alt="contact info" />
                        <span>
                            <p className='font_gotam_light text-xs md:text-sm'>You can also call us on the following number +1 (559) 554-0082 Monday to Saturday from 9am to 8pm, except public holiday. </p>
                        </span>
                    </div>
                </div>
            </div>

            <div className="group p-5 outline-none accordion-section rounded-2xl bg-white border-b" tabIndex={1}>
                <div className="group flex justify-between h-9 items-center transition ease duration-700 cursor-pointer relative">
                    <div className="group-focus:text-black text-xs md:text-sm font_urbanist_bold transition ease duration-700">Delivery & Return</div>
                    <span className="transform transition ease duration-500 group-focus:text-black group-focus:-rotate-180 ">
                        <i className="fas fa-minus minus_icon group-focus:block"></i>
                        <i className="fas fa-plus group-focus:hidden"></i>
                    </span>
                </div>
                <div className="group-focus:max-h-screen max-h-0 border-b-gray-200 text-sm leading-5 rounded overflow-hidden ease duration-700">
                    <div className="flex items-center mb-3 py-2 border-b border-b-gray-200">
                        <i className="material-symbols-outlined mr-6">local_mall</i>
                        <span>
                            <h5 className='mb-2'>Delivery</h5>
                            <p className='font_gotam_light text-xs md:text-sm'>-Express delivery made within 2-4 working days(30$)<br />-Potential delays to be communicated due to customs-approved treatment.</p>
                        </span>
                    </div>
                    <div className="flex items-center mb-3 py-2 border-b border-b-gray-200">
                        <Image className='mr-6' src={truck} alt="delivery vehicle" />
                        <span>
                            <h5 className='mb-2'>Return</h5>
                            <p className='font_gotam_light text-xs md:text-sm'>We make return easy for you. For more information see our return policy.<br />-Potential delays to be communicated due to customs-approved treatment.</p>
                        </span>
                    </div>
                    <div className="flex items-center mb-3 py-2 border-b border-b-gray-200">
                        <i className="fa-regular fa-credit-card mr-6 text-xl"></i>
                        <span>
                            <h5 className='mb-2'>Payment</h5>
                            <p className='font_gotam_light text-xs md:text-sm'>Credit card, Debit card & Paypal.</p>
                        </span>
                    </div>
                    <div className="flex items-center py-2">
                        <i className="material-symbols-outlined mr-6">search</i>
                        <span>
                            <h5 className='mb-2'>FAQ</h5>
                            <p className='font_gotam_light text-xs md:text-sm'>Looking for information? See our FAQs</p>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
