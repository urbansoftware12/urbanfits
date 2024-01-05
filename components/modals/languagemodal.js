import React from 'react'
import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';
import countryCodes from '@/static data/countryCodes';
import Image from 'next/image';
import BounceLoader from '../loaders/bounceLoader';
// imports for the schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../tooltip';
import toaster from '@/utils/toast_function';

export default function LanguageModal(props) {
    const { currency, setCurrency, setCurrency_selected_by_user } = useWallet()
    const { country, setCountry, setGeoSelectedByUser } = useUser()
    const [loading, setLoading] = React.useState(false)
    const validatedSchema = Yup.object({
        country: Yup.string().required("Please select your country"),
        language: Yup.string().required("Please select your prefered language")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: { country: 'uae', language: 'english' },
        validationSchema: validatedSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const updateCurrency = (event) => {
        const { value } = event.target
        setCurrency(value)
        location.reload()
        setCurrency_selected_by_user(true)
        toaster("success", <p>Currency udpated to <span className='font_urbanist_bold'>{value}</span>.</p>)
    }

    if (props.show) return <section className={`w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
        <div className={`${props.show === false ? "translate-y-10" : ''} relative max-w-[450px] w-11/12 md:w-4/6 lg:w-2/5 text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-2xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => props.setLangModal(false)} name="modal3" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <form className="w-full h-full p-7" onReset={handleReset} onSubmit={handleSubmit} >
                <h2 className="text-xl lg:text-2xl font_copper">COUNTRY & LANGUAGE</h2>
                <div className="w-full my-12 flex flex-col space-y-4">
                    {loading ? <div className="flex justify-center"><BounceLoader /></div> : null}
                    <h3 className='text-sm md:text-base font_urbanist_bold'>Choose your shipping destination :</h3>
                    <div className="group relative w-full md:w-4/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                        <span className="w-7 h-5 mr-2 overflow-hidden" title={country.country}><Image width={50} height={40} src={country.src} /></span>
                        {country.name}
                        {touched.country && errors.country ? <Tooltip classes="form-error" content={errors.country} /> : null}
                        <span className="absolute top-full w-full h-4 bg-transparent pointer-events-none group-hover:pointer-events-auto"></span>
                        <div className="absolute z-50 top-full translate-y-4 left-1/2 -translate-x-1/2 bg-white equillibrium_shadow w-full max-h-[15rem] py-2 text-xs rounded-lg overflow-y-scroll transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                            {countryCodes.map((c, index) => {
                                return <button onClick={async () => {
                                    setLoading(true)
                                    await setCountry(c)
                                    setLoading(false)
                                    props.setLangModal(false)
                                    return setGeoSelectedByUser(true)
                                }} key={index} title={c.country} className={`w-full px-4 ${index == countryCodes.length - 1 ? null : "border-b"} hover:bg-slate-100 flex justify-between items-center py-3 transition-all`}>
                                    <span className="flex items-center gap-x-2 capitalize">
                                        <span className="w-5 h-4 overflow-hidden">
                                            <Image width={50} height={40} src={c.src} />
                                        </span>
                                        {c.name}
                                    </span>
                                    {c.code}
                                </button>
                            })}
                        </div>
                    </div>
                </div>
                <h3 className='text-sm md:text-base font_urbanist_bold'>Choose preffered currency:</h3>
                <div className="relative w-full my-7 flex gap-x-10 md:gap-x-14 font_urbanist_medium">
                    <span className="flex items-center cursor-pointer">
                        <input className='rounded mr-1 mid:mr-2' type="radio" id="aed" name="currency" defaultChecked={currency === "AED"} value="AED" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="aed">AED (د.إ)</label>
                    </span>
                    <span className="flex items-center cursor-pointer">
                        <input className='rounded mr-1 mid:mr-2' type="radio" id="sar" name="currency" defaultChecked={currency === "SAR"} value="SAR" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="sar">SAR (﷼)</label>
                    </span>
                    <span className="flex items-center cursor-pointer">
                        <input className='rounded mr-1 mid:mr-2' type="radio" id="pkr" name="currency" defaultChecked={currency === "PKR"} value="PKR" onChange={updateCurrency} /><label className='cursor-pointer' htmlFor="pkr">PKR (₨)</label>
                    </span>
                </div>

                <h3 className='text-sm md:text-base font_urbanist_bold'>Choose your language:</h3>
                <div className="relative w-full my-7 flex space-x-16 font_urbanist_medium">
                    {touched.language && errors.language ? <Tooltip classes="form-error" content={errors.language} /> : null}
                    <span className="flex items-center">
                        <input className='rounded mx-2' type="radio" id="english" name="language" defaultChecked={true} value="english" onBlur={handleBlur} onChange={handleChange} /><label htmlFor="english">English</label>
                    </span>
                    <span className="flex items-center">
                        <input className='rounded mx-2' type="radio" id="arabic" name="language" value="arabic" onBlur={handleBlur} onChange={handleChange} /><label htmlFor="arabic">العربية</label>
                    </span>
                </div>
            </form>
        </div>
    </section>
    else return
}
