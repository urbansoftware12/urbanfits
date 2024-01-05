import React, { useState, useEffect } from 'react'
import Button from '../buttons/simple_btn'
import useUser from '@/hooks/useUser';
import useNewsletter from '@/hooks/useNewsletter';
import toaster from '@/utils/toast_function';
import axios from 'axios';
import Image from 'next/image';
import bg_newsletter from '@/public/newsletterimg.png'
// imports for validation
import Tooltip from '../tooltip';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Newsletter(props) {
    const { user } = useUser()
    const { newsletterData, updateNewsletterData, getNewsletterData } = useNewsletter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        return async () => {
            if (!newsletterData) await getNewsletterData()
            if (!newsletterData) return
        }
    }, [newsletterData])

    // schema and validation with yup and fromik
    const newsLetterSchema = Yup.object({
        "contact": Yup.string()
            .required('Email or phone number is required')
            .test('contact', 'Invalid email or phone number', function (value) {
                // Validation logic
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const phoneRegex = /^\+\d{1,3}( )?\d{8,16}$/;
                const postalCodeRegex = /^\+?[0-9]{5,}$/i;

                if (emailRegex.test(value) || (phoneRegex.test(value))) {
                    return true;
                }

                return false;
            }),
        "gender": Yup.string().required("Please select your gender"),
        "interests": Yup.array().min(1, "Please select at least one interest")
    })
    const getContact = () => {
        if (user) {
            if (!newsletterData || !newsletterData.email) return user.email
            if (!newsletterData || !newsletterData.phone) return `${user.phone_prefix} ${user.phone_number}`
        }
        else return ""
    }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, setFieldError, setValues } = useFormik({
        initialValues: {
            "contact": getContact(),
            "gender": user && user.gender ? user.gender : '', "interests": []
        },
        validationSchema: newsLetterSchema,
        onSubmit: async (values0) => {
            const values = (() => {
                if (values0.contact.includes('@')) return { email: values0.contact, gender: values0.gender.toLowerCase(), interests: values0.interests }
                else return { phone: values0.contact, gender: values0.gender.toLowerCase(), interests: values0.interests }
            })()
            let id = user?._id
            let registerData = user ? { ...values, user: id } : values
            setLoading(true);
            try {
                let { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/register${user ? `?id=${user._id}` : ''}`, registerData)
                await updateNewsletterData(data.payload, false)
                toaster("success", data.msg)
                props.toggleModal(false)
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
        if (e.target.checked) {
            setFieldValue('interests', [
                ...values.interests,
                e.target.value
            ]);
        } else {
            setFieldValue(
                'interests',
                values.interests.filter((interest) => interest !== e.target.value)
            );
        }
    }

    if (!props.show) return
    if (props.show) {
        //     if (user?.newsletter_sub_email) return <>
        //         <div className={`w-full min-h-screen py-10 md:py-0 font_urbanist fixed left-0 top-0 right-0 z-40 bg-gray-800/40 backdrop-blur flex justify-center items-center overflow-y-scroll hide_scrollbar transition-all duration-500`}>
        //             <div className={` relative w-11/12 md:w-3/4 lg:w-[60rem] h-60 lg:h-96 text-sm flex justify-center items-center bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
        //                 <button onClick={props.toggleModal} className="material-symbols-rounded text-2xl absolute right-5 top-5">close</button>
        //                 <h1 className="font_urbanist_medium text-3xl">You've already subscribed the Newsletter</h1>
        //             </div>
        //         </div>
        //     </>

        return <>
            <div className={`w-full min-h-screen py-10 md:py-0 font_urbanist fixed left-0 top-0 right-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center overflow-y-scroll hide_scrollbar transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
                <div className={` ${props.show === false ? "translate-y-10" : ''} relative w-11/12 md:w-3/4 lg:w-[60rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
                    <div className="w-full hidden md:block lg:w-1/2 lg:h-auto">
                        <Image src={bg_newsletter} className="w-full h-full object-cover object-top" alt="Urban images" />
                    </div>
                    <section className="w-full h-full p-5 pt-8 md:pt-5">
                        <div className="w-full space-y-5">
                            <div className="w-full flex justify-between items-center">
                                <h3 className="text-black font_urbanist_medium text-sm md:text-base">Move To The Urban Fits</h3>
                                <button onClick={() => { handleReset(); setLoading(false); props.toggleModal() }} className="material-symbols-rounded text-2xl">close</button>
                            </div>
                            <p className='font_urbanist_light text-xs md:text-sm' >Be in the know about what’s happening at the Parisian Maison: never miss out on the latest trend, newest collections and exciting special projects from Urban fit. </p>
                        </div>
                        <form className="mt-7 font_urbanist space-y-5 md:space-y-7" onReset={handleReset} onSubmit={handleSubmit} >
                            <div className='space-y-3' >
                                <h3 className='text-black font_urbanist_medium text-xs md:text-base' >Email or Phone Sign Up*</h3>
                                <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    {touched.contact && errors.contact ? <Tooltip classes="form-error" content={errors.contact} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="contact" id="contact" value={values.contact} onBlur={handleBlur} onChange={(e) => {
                                        if (errors.contact) {
                                            setFieldError('contact', '');
                                        }
                                        handleChange(e);
                                    }} placeholder="email eg. example@gmail.com or phone eg. +971 00000000000" />
                                </div>
                            </div>
                            <div className='relative space-y-4' >
                                <h3 className='text-black font_urbanist_medium text-xs md:text-base' >Gender*</h3>
                                {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                                <div className="font_urbanist_light w-full md:w-3/5 flex justify-between items-center ">
                                    <div className='mr-2' >
                                        <input key={1} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="male" name="gender" value="male" defaultChecked={user && user.gender && user.gender.toLowerCase() == "male"} onBlur={handleBlur} onChange={handleChange} /><label htmlFor='male'>Male</label>
                                    </div>
                                    <div className='mr-2' >
                                        <input key={2} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="female" name="gender" value="female" defaultChecked={user && user.gender && user.gender.toLowerCase() == "female"} onBlur={handleBlur} onChange={handleChange} /><label htmlFor='female'>Female</label>
                                    </div>
                                    <div className='mr-2' >
                                        <input key={3} className='custom_checkbox rounded-full mx-3 translate-y-[1px]' type="radio" id="fluid" name="gender" value="fluid" defaultChecked={user && user.gender && user.gender.toLowerCase() == "fluid"} onBlur={handleBlur} onChange={handleChange} /><label htmlFor='fluid'>Fluid</label>
                                    </div>
                                </div>
                            </div>
                            <div className="relative space-y-4">
                                <h3 className="text-black font_urbanist_medium text-xs md:text-base">Favourite Subjects*</h3>
                                <div className="pill-container w-full flex flex-wrap text-xs md:text-sm space-y-2 md:space-y-0 space-x-1">
                                    {touched.interests && errors.interests ? <Tooltip classes="form-error" content={errors.interests} /> : null}
                                    {['Bags', 'Sneakers', 'Jackets', 'Dresses', 'Fashion Shows'].map((name, index) => {
                                        return (
                                            <>
                                                <input key={name} onChange={onCheck} checked={values.interests.includes(name.toLowerCase())} type="checkbox" id={name.toLowerCase()} onBlur={handleBlur} name="interests" value={name.toLowerCase()} />
                                                <label key={index} className="selector border border-gray-400 rounded-full mb-3 px-4 py-2" htmlFor={name.toLowerCase()}>{name}</label>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <p className='font_gotam_light text-[10px] md:text-sm' >Mandatory information: if you chose not to give your consent for the collection of mandatory data you will not be able to save your payment method.</p>
                            <Button type="submit" loading={loading} classes="w-11/12 mx-auto" >Subscribe</Button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    }
}