import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import jwt from 'jsonwebtoken';
import toaster from '@/utils/toast_function';
import ifExists from '@/utils/if_exists';
import Head from 'next/head';
import Loader from '@/components/loader';
import Card from '../../components/cards/card'
import Button from '../../components/buttons/simple_btn';
import countryCodes from '@/static data/countryCodes';
// image imports
import Image from 'next/image';
import female_avatar from '../../public/avatars/female.svg'
import male_avatar from '../../public/avatars/male.svg'

import User from '.';

// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../../components/tooltip';

// little function to use inside right this component to avoid mess
const InfoCard = (props) => {
    return <Card title={props.title} value={props.value} btnValue={props.btnValue} classes='w-full h-1/5 mb-7 p-9 justify-center items-center md:items-start' />
}

// User Avatar based on the gender
export function Avatar({ user }) {
    return <Image className="w-1/3 md:w-1/6 rounded-full border-2 p-2 border-white" src={ifExists(user.gender) === "Male" ? male_avatar : female_avatar} alt="avatar" />
}

// Function to show addresses of the user in a container
const AddressContainer = (props) => {
    const { tag } = props
    const addressLink = <Link href='/user/address' id='address' className="w-full px-3 py-5 border border-gray-400 rounded-md flex justify-between items-center" >Add New Address<i className="material-symbols-outlined">add</i></Link>
    let userAddress = jwt.decode(localStorage.getItem("addressToken"))
    if (userAddress) {
        let addressObj = userAddress._doc
        if (addressObj.addresses.length === 0) return addressLink
        let address = addressObj.addresses.filter((address) => {
            return address.tag === tag
        })
        if (address.length === 0) return addressLink
        let field = address[0]
        return <div className="w-full p-4 text-sm border border-yellow-500 flex justify-between items-start rounded-lg bg-white">
            <div>
                <span>{field.address_title}</span><br />
                <span>{field.firstname} {field.lastname}</span><br />
                <span>{field.address}</span><br />
                <span>{field.city}, {field.country}</span><br />
                <span>{field.phone_prefix} {field.phone_number}</span>
            </div>
            <Link href='/user/address' className='text-sm' >Modify<i class="fa-regular fa-pen-to-square mx-2"></i></Link>
        </div>
    }
    else return addressLink
}

export default function Personalinfo() {
    const router = useRouter()
    //state to handle loader component
    const [loader, setLoader] = useState(false)
    // user data state
    const [user, setUser] = useState({})
    // getting data from input fields and applying validation
    const validatedSchema = Yup.object({
        title: Yup.string().required("Please enter a title"),
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        gender: Yup.string().required('Gender is required field'),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save'),
        newsletter_sub_email: Yup.bool(),
        newsletter_sub_phone: Yup.bool()
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues } = useFormik({
        initialValues: { title: 'Title', firstname: '', lastname: '', gender: 'Gender', phone_prefix: 'Select Country Code', phone_number: '', newsletter_sub_email: false, newsletter_sub_phone: false },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            setLoader(<Loader />)
            let response = await fetch(`${process.env.HOST}/api/user/update?id=${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            let res = await response.json()
            localStorage.setItem("authToken", res.payload)
            toaster(res.success === true ? "success" : "error", res.msg)
            setLoader(null)
        }
    })
    useEffect(() => {
        const userData = jwt.decode(localStorage.getItem("authToken"))
        if (userData) {
            let user = userData._doc
            setUser(user)
            setValues({
                title: ifExists(user.title),
                firstname: ifExists(user.firstname),
                lastname: ifExists(user.lastname),
                gender: ifExists(user.gender),
                phone_prefix: ifExists(user.phone_prefix),
                phone_number: ifExists(user.phone_number),
                newsletter_sub_email: ifExists(user.newsletter_sub_email, false),
                newsletter_sub_phone: ifExists(user.newsletter_sub_phone, false)
            })
        }
        else return router.push('/access denied')
    }, [])
    return (
        <>
            <Head>
                <title>Personal Information</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loader}
            <User>
                <form className="mt-10 font_gotham space-y-5" onReset={handleReset} onSubmit={handleSubmit} >
                    <h1 className='text-xl lg:text-[22px] font_gotham_medium tracking-widest' >PERSONAL INFORMATION</h1>
                    <div className="flex justify-between w-full ">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.title && errors.title ? <Tooltip classes="form-error" content={errors.title} /> : null}
                            <select value={values.title} name='title' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                <option >Title</option>
                                <option id="Mr" value="Mr.">Mr</option>
                                <option id="Mrs" value="Mrs.">Ms</option>
                            </select>
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" id="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="lastname" name="lastname" id="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name" />
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                            <select value={values.gender} name='gender' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                <option disabled >Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                    {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="gender" id="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur} placeholder="Date Of Birth" />
                                </div> */}
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                            <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                {countryCodes.map((item) => {
                                    if (!item.code) return <option disabled>{item.name}</option>
                                    return <option value={item.code}>{item.name} {item.code}</option>
                                })}
                            </select>
                        </div>
                        <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-xl lg:text-[22px] font_gotham_medium tracking-widest mt-5">NEWSLETTER SUBSCRIPTION</h1>
                        <div className="flex justify-between w-full md:w-3/4 my-7 space-x-4 md:space-x-0">
                            <div className="w-1/2 md:w-1/4 flex justify-between">
                                Email<label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='newsletter_sub_email' checked={values.newsletter_sub_email} value={values.newsletter_sub_email} onChange={handleChange} /><span className="slider"></span></label>
                            </div>
                            <div className="w-1/2 md:w-1/4 flex justify-between">
                                Phone<label className="switch w-[45px] md:w-11 h-6"><input type="checkbox" name='newsletter_sub_phone' checked={values.newsletter_sub_phone} value={values.newsletter_sub_phone} onChange={handleChange} /><span className="slider"></span></label>
                            </div>
                        </div>
                        <div className=" w-full space-y-5 font_gotham_light">
                            <p>Urban Fits processes the data collected to enable you to manage your information to facilitate your order. To find out more about how we manage your personal data and exercise your rights please refer to our privacy policy.</p>
                            <p>Mandatory information : If you choose not to consent to the collection of mandatory data (with an asterisk). You will not be able to manage your information.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/3 mx-2" font='font_gotham_medium' >CANCEL</Button>
                        <Button type="submit" classes="w-full md:w-1/3 ml-2" font='font_gotham_medium' >SAVE</Button>
                    </div>
                </form>
                <div className='w-full' >
                    <div className='my-14 space-y-5' >
                        <h2 className="text-xl lg:text-[22px] font_gotham_medium tracking-widest">EMAIL & PASSWORD</h2>
                        <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                            <input className="w-full bg-transparent outline-none border-none" readOnly value={ifExists(user.email, "example@gmail.com")} type="email" name="email" id="email" /><Link href='/user/email&password' ><i className="material-symbols-outlined">edit_square</i></Link>
                        </div>
                    </div>
                    <div className='my-14 space-y-5' >
                        <h2 className="text-xl lg:text-[22px] font_gotham_medium tracking-widest mb-8">MY ADDRESSES</h2>
                        <div>
                            <h5 className='text-lg font_gotham_medium tracking-widest my-2'>SHIPPING</h5>
                            <AddressContainer tag="shipping" />
                        </div>
                        <div>
                            <h5 className='text-lg font_gotham_medium tracking-widest my-2'>BILLING</h5>
                            <AddressContainer tag="billing" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <InfoCard title="FAQ" value="Find all the answers to the frequently asked questions below." href='/faq' btnValue="Get In Touch" />
                        <InfoCard title="CUSTOMER CARE" value="Do you have any questions ? We are here to help you. You can contact our customer care team by email or over the phone." href='/customerservices/returns&refund' btnValue="See Your FAQs" />
                        <InfoCard title="PRIVACY POLICY" value="Do you have any questions on how we process your data ? Please consult our privacy policy." btnValue="See Your FAQs" />
                    </div>
                </div>
            </User>
        </>
    )
}
