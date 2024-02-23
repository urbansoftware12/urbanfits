import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';
import Image from 'next/image';
import toaster from '@/utils/toast_function';
// import { useState } from 'react'
// import BounceLoader from '../loaders/bounceLoader';
// import countryCodes from '@/static data/countryCodes';

export default function LanguageModal(props) {
    const { currency, setCurrency } = useWallet();
    const { country, setCountry } = useUser();
    // const [loading, setLoading] = useState(false)

    const updateCurrency = (event) => {
        const { value } = event.target
        setCurrency(value)
        location.reload();
        useWallet.setState({ currency_selected_by_user: true })
        toaster("success", <p>Currency udpated to <span className='font_urbanist_bold'>{value}</span>.</p>)
    }

    if (props.show) return <section className={`w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
        <div className={`${props.show === false ? "translate-y-10" : ''} relative max-w-[450px] w-11/12 md:w-4/6 lg:w-2/5 text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-2xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => props.setLangModal(false)} name="modal3" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <form className="w-full h-full p-7" >
                <h2 className="text-xl lg:text-2xl font_copper">COUNTRY & LANGUAGE</h2>
                <div className="w-full my-12 flex flex-col space-y-4">
                    {/* {loading ? <div className="flex justify-center"><BounceLoader /></div> : null} */}
                    <h3 className='text-sm md:text-base font_urbanist_bold'>Choose your shipping destination :</h3>
                    <div className="group relative w-full md:w-4/5 data_field flex items-center border-b border-b-gray-400 hover:border-pink-400 transition py-2 mb-4">
                        <span className="w-7 h-5 mr-2 overflow-hidden" title={country.country}><Image width={50} height={40} src={country.src} /></span>
                        {country.name}
                        <span className="absolute top-full w-full h-4 bg-transparent pointer-events-none group-hover:pointer-events-auto"></span>
                        <div className="absolute z-50 top-full translate-y-4 left-1/2 -translate-x-1/2 bg-white equillibrium_shadow w-full max-h-[15rem] text-xs rounded-lg overflow-y-auto transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                            {/* {countryCodes.map((c, index) => { */}
                            <button onClick={() => {
                                // if (c.disabled) return
                                // setLoading(true)
                                // await setCountry(c)
                                // setLoading(false)
                                // props.setLangModal(false)
                                // useUser.setState({ geo_selected_by_user: true })
                            }} title={country.country} className={`w-full px-4 hover:bg-slate-100 flex justify-between items-center py-3 transition-all`}>
                                <div className="flex items-center gap-x-2 capitalize">
                                    <span className="w-5 h-4 overflow-hidden">
                                        <Image width={50} height={40} src={country.src} />
                                    </span>
                                    {country.name}
                                </div>
                                {/* {c.disabled && <span className="px-2 py-px text-[10px] bg-gray-200 text-black rounded-2xl">coming soon</span>} */}
                                {country.code}
                            </button>
                            {/* })} */}
                        </div>
                    </div>
                </div>
                <h3 className='text-sm md:text-base font_urbanist_bold'>Choose preffered currency:</h3>
                <div className="relative w-full my-7 flex gap-x-10 md:gap-x-14 font_urbanist_medium">
                    <span className="flex items-center cursor-pointer">
                        <input className='rounded mr-1 mid:mr-2' type="radio" id="aed" name="currency" defaultChecked={currency === "AED"} value="AED" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="aed">AED (د.إ)</label>
                    </span>
                    {/* <span className="opacity-40 pointer-events-none flex items-center cursor-pointer">
                        <input disabled className='rounded mr-1 mid:mr-2' type="radio" id="sar" name="currency" defaultChecked={currency === "SAR"} value="SAR" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="sar">SAR (﷼)</label>
                    </span>
                    <span className="opacity-40 pointer-events-none flex items-center cursor-pointer">
                        <input disabled className='rounded mr-1 mid:mr-2' type="radio" id="pkr" name="currency" defaultChecked={currency === "PKR"} value="PKR" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="pkr">PKR (₨)</label>
                    </span> */}
                </div>

                <h3 className='text-sm md:text-base font_urbanist_bold'>Choose your language:</h3>
                <div className="relative w-full my-7 flex space-x-16 font_urbanist_medium">
                    <span className="flex items-center">
                        <input className='rounded mx-2' type="radio" id="english" name="language" defaultChecked={true} value="english" /><label style={{ cursor: "pointer" }} htmlFor="english">English</label>
                    </span>
                    <span className="opacity-40 pointer-events-none flex items-center">
                        <input disabled className='rounded mx-2' type="radio" id="arabic" name="language" value="arabic" /><label htmlFor="arabic">العربية</label>
                    </span>
                </div>
            </form>
        </div>
    </section>
    else return
}
