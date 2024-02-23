import { useState } from 'react'
// import Card from '../components/cards/card';
import toaster from '@/utils/toast_function';
import Button from '../components/buttons/simple_btn';
import Head from 'next/head';
import Loader from '@/components/loaders/loader';
import countryCodes from '@/static data/countryCodes';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../components/tooltip';

// const InfoCard = (props) => {
//     return <Card href={props.href} title={props.title} value={props.value} btnValue={props.btnValue} btnClasses="w-1/2 md:w-1/3 text-sm" classes='w-full h-1/3 mb-7 p-9 justify-center items-center md:items-start' />
// }

export default function Contact() {
    const [loader, setLoader] = useState(null)

    const validatedSchema = Yup.object({
        title: Yup.string().required("Please enter a title"),
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        // phone: Yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid phone number with postal code and space eg. +971 0000000000").required(),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save'),
        email: Yup.string().email().required("Please enter your email address"),
        subject: Yup.string().min(2, "message must be atleast 2 characters").max(100, "Subject cannot exceed 100 characters").required("Please type a your subject here"),
        msg: Yup.string().min(20, "message must be atleast 20 characters").max(1000).required("Please leave a message here"),
        dateofbirth: Yup.string()

    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { title: 'Title', firstname: '', lastname: '', phone_prefix: 'Select Country Code', phone_number: '', email: '', subject: '', msg: '' },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            console.log(values)
            setLoader(<Loader />)
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            let res = await response.json()
            console.log(res)
            toaster(res.success ? "success" : "error", res.msg)
            setLoader(null)
            handleReset()
        }
    })

    return (
        <>
            <Head>
                <title>UF - Contact Us</title>
                <meta name="description" content="Urban Fits, The brand of culture" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loader}
            <main className="w-full py-10 px-5 lg:py-20 lg:px-28 xl:px-32 bg-white font_urbanist overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font_urbanist_medium mb-4">Contact Us</h2>
                <form className="mt-16 font_urbanist space-y-10" onReset={handleReset} onSubmit={handleSubmit}>
                    <div className="flex justify-between w-full">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.title && errors.title ? <Tooltip classes="form-error" content={errors.title} /> : null}
                            <select value={values.title} name='title' className="w-full border-none outline-none bg-transparent border-b-gray-800" onBlur={handleBlur} onChange={handleChange} >
                                <option id="mr" value="mr">Title</option>
                                <option id="mr" value="mr">Mr</option>
                                <option id="ms" value="ms">Ms</option>
                                <option id="other" value="other">Other</option>
                            </select>
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="text" value={values.firstname} name="firstname" id="firstname" onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full ">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="text" value={values.lastname} name="lastname" id="lastname" onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="email" value={values.email} name="email" id="email" onBlur={handleBlur} onChange={handleChange} placeholder="Email*" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                            <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                {countryCodes.map((item) => {
                                    if (!item.code) return <option disabled>{item.name}</option>
                                    return <option value={item.code}>{item.name} {item.code}</option>
                                })}
                            </select>
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                        {touched.subject && errors.subject ? <Tooltip classes="form-error" content={errors.subject} /> : null}
                        <input className="w-full bg-transparent outline-none border-none" type="text" name="subject" id="subject" size="100" maxLength={100} value={values.subject} onBlur={handleBlur} onChange={handleChange} placeholder="Subject" />
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="relative w-full data_field flex items-center border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition p-2 mt-4">
                            {touched.msg && errors.msg ? <Tooltip classes="form-error" content={errors.msg} /> : null}
                            <textarea rows={5} className="w-full bg-transparent outline-none border-none" type="text" value={values.msg} name="msg" id="msg" maxLength={1000} onBlur={handleBlur} onChange={handleChange} placeholder="Type Your Message here..." />
                        </div>
                        <small className='self-end text-gray-500 my-3' >1000 characters max</small>
                    </div>
                    <div className=" w-full my-10 space-y-5">
                        <p>Urban Fits processes the data collected to enable you to manage your information to facilitate your order. To find out more about how we manage your personal data and exercise your rights please refer to our privacy policy.</p>
                        <p>Mandatory information : If you choose not to consent to the collection of mandatory data (with an asterisk). You will not be able to manage your information.</p>
                    </div>
                    <div className="w-full flex justify-end space-x-4">
                        <Button type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-2/12" font='font_urbanist_medium' >Cancel</Button>
                        <Button type="submit" classes="w-full md:w-2/12" font='font_urbanist_medium' >Send</Button>
                    </div>
                </form>
            </main>
        </>
    )
}