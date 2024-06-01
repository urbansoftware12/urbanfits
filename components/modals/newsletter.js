import { useState, useEffect } from 'react';
import Button from '../buttons/simple_btn';
import useUser from '@/hooks/useUser';
import useNewsletter from '@/hooks/useNewsletter';
import useLanguage from '@/hooks/useLanguage';
import { newsletter as newsletterLang } from '@/locales';
import toaster from '@/utils/toast_function';
import axios from 'axios';
import Image from 'next/image';
import { newsletterInterests } from '@/uf.config';
import bg_newsletter from '@/public/newsletterimg.png';
// imports for validation
import Tooltip from '../tooltip';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Newsletter() {
    const { user } = useUser();
    const { locale } = useLanguage();
    const { newsletterData, show, toggleNewsletterModal, updateNewsletterData, getNewsletterData } = useNewsletter();
    const [loading, setLoading] = useState(false);

    const langObj = newsletterLang[locale];

    useEffect(() => {
        if (!newsletterData) getNewsletterData()
    }, [])

    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, setFieldError, setValues } = useFormik({
        initialValues: {
            email: user?.email || "",
            gender: user?.gender || "",
            interests: []
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email or phone number is required'),
            gender: Yup.string().required("Please select your gender"),
            interests: Yup.array(Yup.string().oneOf(newsletterInterests, "This interest is not available.")).min(1, "Please select at least one interest")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                let { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/register`, values, { withCredentials: true });
                await updateNewsletterData(data.payload, false)
                toaster("success", data.msg)
                toggleNewsletterModal()
                handleReset()
            } catch (e) {
                console.log(e)
                const { msg } = e.response?.data
                toaster('error', msg)
            }
            return setLoading(false);
        }
    })
    // function to get input from pill buttons in an array
    const onCheck = (e) => {
        const { name } = e.target;
        if (values.interests.includes(name)) setFieldValue("interests", values.interests.filter(interest => interest !== name));
        else setFieldValue('interests', [...values.interests, name]);
    }

    if (show) return <>
        <div className={`w-full min-h-screen py-10 md:py-0 font_urbanist fixed left-0 top-0 right-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center overflow-y-scroll hide_scrollbar transition-all duration-500 ${show === false ? "opacity-0 pointer-events-none" : ''}`}>
            <div className={` ${show === false ? "translate-y-10" : ''} relative w-11/12 md:w-3/4 lg:w-[60rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                <div className="w-full hidden md:block lg:w-1/2 lg:h-auto">
                    <Image src={bg_newsletter} className="w-full h-full object-cover object-top" alt="Urban images" />
                </div>
                <section className="w-full h-full p-5 pt-8 md:pt-5">
                    <div className="w-full space-y-5">
                        <div className="w-full flex justify-between items-center">
                            <h3 className="text-black font_urbanist_medium text-sm md:text-base">{langObj.title}</h3>
                            <button onClick={() => { handleReset(); setLoading(false); toggleNewsletterModal() }} className="material-symbols-rounded text-2xl">close</button>
                        </div>
                        <p className='font_urbanist_light text-xs md:text-sm'>{langObj.description}</p>
                    </div>
                    <form className="mt-7 font_urbanist space-y-5 md:space-y-7" onReset={handleReset} onSubmit={handleSubmit} >
                        <div className='space-y-3' >
                            <h3 className='text-black font_urbanist_medium text-xs md:text-base'>Email*</h3>
                            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-pinky hover:border-pinky transition py-2 mb-4">
                                {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="text" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={(e) => {
                                    if (errors.email) setFieldError('email', '');
                                    handleChange(e);
                                }} placeholder="example@gmail.com" />
                            </div>
                        </div>
                        <div className='relative space-y-4' >
                            <h3 className='text-black font_urbanist_medium text-xs md:text-base'>{langObj.gender}</h3>
                            {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                            <div className="font_urbanist_light w-full md:w-3/5 flex justify-between items-center ">
                                {langObj.genders.map((gender, index) => <button type='button' key={index} onClick={() => setFieldValue("gender", gender)} className="flex items-center gap-x-2 capitalize" name={gender} title={gender}>
                                    <span className={`${values.gender == gender && "bg-pinky"} size-2 lg:size-4 rounded-3xl border`} />
                                    {gender}
                                </button>)}
                            </div>
                        </div>
                        <div className="relative space-y-4">
                            <h3 className="text-black font_urbanist_medium text-xs md:text-base">{langObj.interests}*</h3>
                            <div className="pill-container w-full flex flex-wrap text-xs md:text-sm space-y-2 md:space-y-0 space-x-1">
                                {touched.interests && errors.interests ? <Tooltip classes="form-error" content={errors.interests} /> : null}
                                {newsletterInterests.map((interest, index) => <button key={index} onClick={onCheck} type='button' name={interest} title={interest} className={`${values.interests.includes(interest) && "bg-pinky text-white"} px-4 py-1.5 border rounded-full text-xs md:text-sm lg:text-base transition-all capitalize`}>{interest}</button>)}
                            </div>
                        </div>
                        <Button type="submit" loading={loading} classes="w-11/12 mx-auto">{langObj.subscribe}</Button>
                    </form>
                </section>
            </div>
        </div>
    </>
}