import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useCart } from "react-use-cart";
import { loadStripe } from '@stripe/stripe-js';
import generatePassword from '@/utils/generatePassword';
import useUser from '@/hooks/useUser';
import useAddress from '@/hooks/useAddress';
import axios from 'axios';
import AlertPage from '@/components/alertPage'
import CheckoutCalcSection from '@/components/checkoutCalcSection';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import Loader from '@/components/loaders/loader';
import Footer from '@/components/footer';
import countryCodes from '@/static data/countryCodes';
import LanguageModal from '@/components/modals/languagemodal';
import ifExists from '@/utils/if_exists';
import toaster from '@/utils/toast_function';
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltip';
import Button from '@/components/buttons/simple_btn';

loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function Checkout1(props) {
    console.log('Generated Password:', generatePassword("binarshadsaad6@gmail.com"));
    const router = useRouter()
    const { address, getAddress } = useAddress()
    const { user } = useUser()
    // loader and billing form state
    const [loader, setLoader] = useState(null)
    const [billingForm, setBillingForm] = useState(null)
    // state and funciton to handle modify input fields
    const name = useRef(null)
    const email = useRef(null)
    const [readOnly, setReadOnly] = useState(() => {
        if (user) return true
        if (!user) return false
    })
    const handleModify = (e) => {
        setReadOnly(false)
        let elemName = e.target.getAttribute("name")
        if (elemName === "name") return name.current.focus()
        if (elemName === "email") return email.current.focus()
    }

    // states and function for change localization modal
    const [modal3, setModal3] = useState(false)
    const toggleModal = (e) => {
        if (e.target.name === "modal3") {
            if (modal3 === false) return setModal3(true)
            if (modal3 === true) return setModal3(false)
        }
    }

    const { isEmpty, totalUniqueItems, items, cartTotal, emptyCart } = useCart()

    // getting data from input fields and applying validation
    const addressFieldsValidation = {
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        address_title: Yup.string().required("Please enter your address title"),
        address: Yup.string().min(2).required("Please enter your address"),
        apt_suite: Yup.string(),
        city: Yup.string().required("Please enter your city"),
        country: Yup.string().required("Please enter your country"),
        phone_prefix: Yup.string().required("Please enter your phone prefix"),
        phone_number: Yup.string().min(9).required("Please enter your phone number")
    }
    const addressFieldsValues = (tag) => {
        const Address = address?.addresses.filter(address => { return address.tag === tag })[0]
        return {
            address_title: Address?.address_title,
            firstname: Address?.firstname,
            lastname: Address?.lastname,
            address: Address?.address,
            apt_suite: Address?.apt_suite,
            city: Address?.city,
            country: Address ? Address.country : "Country",
            phone_prefix: Address ? Address.phone_prefix : "Select Country Code",
            phone_number: Address?.phone_number
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues } = useFormik({
        initialValues: {
            name: user && user.firstname ? (user?.firstname + ' ' + user?.lastname) : "",
            email: user?.email,
            delivery_option: 'express',
            shipping_address: addressFieldsValues("shipping"),
            billing_address: addressFieldsValues("billing")
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2).required("Please enter your Full Name"),
            email: Yup.string().email().required("Please enter your email address"),
            delivery_option: Yup.string().required("Please select your prefered language"),
            shipping_address: Yup.object().shape(addressFieldsValidation),
            billing_address: Yup.object().shape(addressFieldsValidation)
        }),
        onSubmit: async (values) => {
            setLoader(<Loader />)
            try {
                const response = await axios.post(`${process.env.HOST}/api/payments/checkout_sessions`, { shipping_info: values, items: items })
                sessionStorage.setItem("this_order_data", JSON.stringify({ shipping_info: values, items: items, cartTotal }))
                window.location.href = response.data
            }
            catch (e) {
                console.log(e)
                toaster("error", "Some uexpected error occured, We're sorry, we will fix it soon.")
            }
            setLoader(null)
        }
    })

    const getValuesToBeSet = (obj) => {
        return {
            address_title: obj ? obj.address_title : '',
            firstname: obj ? obj.firstname : '',
            lastname: obj ? obj.lastname : '',
            address: obj ? obj.address : '',
            apt_suite: obj ? obj.apt_suite : '',
            city: obj ? obj.city : '',
            country: obj ? obj.country : 'Country',
            phone_prefix: obj ? obj.phone_prefix : 'Select Country Code',
            phone_number: obj ? obj.phone_number : ''
        }
    }

    useEffect(() => {
        const { payment } = router.query
        if (!payment) return toaster("error", "Payment failed, keep shoping and checkout when you're ready.")
        return
    }, [router.query.payment])

    useEffect(() => {
        return async () => {
            try {
                if (!user) return
                setLoader(<Loader />)
                if (!address) await getAddress()
                if (!address) return
                let shippingAddress = address.addresses.filter(address => { return address.tag === 'shipping' })[0]
                let billingAddress = address.addresses.filter(address => { return address.tag === 'billing' })[0]
                setValues({
                    name: ifExists(user.firstname) + ' ' + ifExists(user.lastname),
                    email: ifExists(user.email),
                    delivery_option: 'express',
                    shipping_address: getValuesToBeSet(shippingAddress),
                    billing_address: getValuesToBeSet(billingAddress)
                })
            }
            catch (error) { console.error(error) }
            setLoader(null)
        }
    }, [user, address])

    const toggleBillingForm = (e) => {
        if (errors.shipping_address) return console.log("complete shipping details first")
        let state = e.target.checked
        if (state) {
            setBillingForm('h-0')
            return setValues({
                ...values, billing_address: getValuesToBeSet(values.shipping_address)
            })
        }
        if (!state) {
            setValues({
                ...values, billing_address: getValuesToBeSet(null)
            })
            return setBillingForm(null)
        }
    }

    const handleSwitchBtn = () => {
        const classes = "pointer-events-none opacity-50"
        if (!user) {
            if (!touched.shipping_address || (touched.shipping_address && errors.shipping_address)) return classes
        }
        else if (user && errors.shipping_address) return classes
        else return null
    }

    if (isEmpty) return <AlertPage type="error" heading="Oh! There's nothing Checkout" message="You currently have nothing to checkout in your cart, please visit our store and select something to purchase" />
    if (!isEmpty) return (
        <>
            <Head>
                <title>Shipping Information - Urban Fits</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loader}
            <LanguageModal show={modal3} toggleModal={toggleModal} />
            <Navbar />
            <main className={`bg-white w-full layout_height transition-all duration-700 overflow-x-hidden overflow-y-scroll`}>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full lg:w-[85%] h-full flex flex-col lg:flex-row p-5 md:p-7 lg:p-0 lg:pt-16 font_gotham text-left pt-5' >
                        <div className="w-full lg:w-[55%] mb-3 mr-auto">
                            <form className="w-full text-sm" onSubmit={handleSubmit} onReset={handleReset} >
                                <div className="w-full border-b border-b-gray-200 mb-5 py-4"><span onClick={router.back} className='cursor-pointer'><i className="fa-solid fa-chevron-left mr-2"></i>Back</span></div>
                                <span className=" mb-7 flex justify-between items-center font_gotham_medium text-xl lg:text-2xl"> <h1>1. Contact Information</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>
                                <span className="flex flex-col mb-6">
                                    <label className='font_gotham_medium md:text-lg' htmlFor="name">Name</label>
                                    <div className="relative w-full data_field flex justify-between items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                        {touched.name && errors.name ? <Tooltip classes="form-error" content={errors.name} /> : null}
                                        <input className="w-full bg-transparent outline-none border-none" onBlur={() => { if (!user || !user.email) return; setReadOnly(true) }} onChange={handleChange} value={values.name} readOnly={readOnly} ref={name} type="text" name="name" id="name" placeholder="John Doe" /><button onClick={handleModify} ><i className={`${user && user.email ? null : "hidden"} material-symbols-outlined text-xl`} title='Edit' name="name">edit_square</i></button>
                                    </div>
                                </span>
                                <span className="flex flex-col">
                                    <label className='font_gotham_medium md:text-lg' htmlFor="email">Email</label>
                                    <div className="relative w-full data_field flex justify-between items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                        {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                                        <input className="w-full bg-transparent outline-none border-none" onBlur={() => { if (!user || !user.email) return; setReadOnly(true) }} onChange={handleChange} value={values.email} readOnly={readOnly} ref={email} type="email" name="email" id="email" placeholder="John Doe" /><button onClick={handleModify} ><i className={`${user && user.email ? null : "hidden"} material-symbols-outlined text-xl`} title='Edit' name="email">edit_square</i></button>
                                    </div>
                                </span>
                                <span className=" my-7 flex justify-between items-center font_gotham_medium text-xl lg:text-2xl"> <h1>2. Shipping Information</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>
                                <div className="flex flex-col mb-6">
                                    <label className='w-full border-b pb-3' htmlFor="delivery_options">Delivery Option</label>
                                    {touched.delivery_option && errors.delivery_option ? <Tooltip classes="form-error" content={errors.delivery_option} /> : null}
                                    <div id="delivery_options" className="w-full py-3 flex justify-between font_gotham_medium">
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="express" name="delivery_option" defaultChecked value="express" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-sm' htmlFor="express">Express Delivery <p className="font_gotham_light text-[10px]">2-4 working days</p></label>
                                        </span>
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="standard" name="delivery_option" value="standard" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-sm' htmlFor="standard">Standard Delivery <p className="font_gotham_light text-[10px]">3-5 working days</p></label>
                                        </span>
                                        <span className="flex">
                                            <input className='rounded mx-2 translate-y-1' type="radio" id="free" name="delivery_option" value="free" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-xs lg:text-sm' htmlFor="free">Free Delivery <p className="font_gotham_light text-[10px]">5-7 working days</p></label>
                                        </span>
                                    </div>
                                    <h1 className=" my-7 font_gotham_medium text-lg lg:text-xl">Enter Your Shipping Address</h1>
                                    <section className="w-full space-y-10">
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.address_title && errors.shipping_address && errors.shipping_address.address_title ? <Tooltip classes="form-error" content={errors.shipping_address.address_title} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.address_title" id="address_title" value={values.shipping_address.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.shipping_address.firstname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.firstname" id="firstname" value={values.shipping_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.lastname && errors.shipping_address && errors.shipping_address.lastname ? <Tooltip classes="form-error" content={errors.shipping_address.lastname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.lastname" id="lastname" value={values.shipping_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.address && errors.shipping_address && errors.shipping_address.address ? <Tooltip classes="form-error" content={errors.shipping_address.address} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.address" id="address" value={values.shipping_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.shipping_address && touched.shipping_address.apt_suite && errors.shipping_address && errors.shipping_address.apt_suite ? <Tooltip classes="form-error" content={errors.shipping_address.apt_suite} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.apt_suite" id="apt_suite" value={values.shipping_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.city && errors.shipping_address && errors.shipping_address.city ? <Tooltip classes="form-error" content={errors.shipping_address.city} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.city" id="city" value={values.shipping_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.country && errors.shipping_address && errors.shipping_address.country ? <Tooltip classes="form-error" content={errors.shipping_address.country} /> : null}
                                                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='shipping_address.country' value={values.shipping_address.country} onBlur={handleBlur} onChange={handleChange} >
                                                    <option disabled >Country</option>
                                                    <option value="uae">UAE</option>
                                                    <option value="usa">USA</option>
                                                    <option value="pk">Pakistan</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex text-sm">
                                            <p>Shipping outside of United Arab Emirates? </p>
                                            <button type='button' name='modal3' onClick={toggleModal} className="mx-2 underline font_gotham_medium tracking-whidest">Change Localization</button>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.phone_prefix && errors.shipping_address && errors.shipping_address.phone_prefix ? <Tooltip classes="form-error" content={errors.shipping_address.phone_prefix} /> : null}
                                                <select value={values.shipping_address.phone_prefix} name='shipping_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                                    {countryCodes.map((item) => {
                                                        if (!item.code) return <option disabled>{item.name}</option>
                                                        return <option value={item.code}>{item.name} {item.code}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.shipping_address && touched.shipping_address.phone_number && errors.shipping_address && errors.shipping_address.phone_number ? <Tooltip classes="form-error" content={errors.shipping_address.phone_number} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="tel" name="shipping_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.shipping_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </section>
                                    <div className="w-full my-7 flex flex-col">
                                        <h1 className="font_gotham_medium text-lg lg:text-xl">Enter You Billing Address</h1>
                                        <div className="my-2 flex items-center font_gotham_medium text-sm md:text-base">
                                            Use same details for Billing Address <label className={`${handleSwitchBtn()} switch w-11 md:w-11 h-6 ml-5 `}><input type="checkbox" name='same_details_as_shipping' value={true} onChange={toggleBillingForm} /><span className="slider"></span></label>
                                        </div>
                                    </div>
                                    <section className={`w-full ${billingForm} overflow-hidden space-y-10`}>
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.address_title && errors.billing_address && errors.billing_address.address_title ? <Tooltip classes="form-error" content={errors.billing_address.address_title} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.address_title" id="address_title" value={values.billing_address.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.billing_address.firstname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.firstname" id="firstname" value={values.billing_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.lastname && errors.billing_address && errors.billing_address.lastname ? <Tooltip classes="form-error" content={errors.billing_address.lastname} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.lastname" id="lastname" value={values.billing_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.address && errors.billing_address && errors.billing_address.address ? <Tooltip classes="form-error" content={errors.billing_address.address} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.address" id="address" value={values.billing_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                                        </div>
                                        <div className="relative w-full data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                            {touched.billing_address && touched.billing_address.apt_suite && errors.billing_address && errors.billing_address.apt_suite ? <Tooltip classes="form-error" content={errors.billing_address.apt_suite} /> : null}
                                            <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.apt_suite" id="apt_suite" value={values.billing_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                                        </div>
                                        <div className="flex justify-between w-full ">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.city && errors.billing_address && errors.billing_address.city ? <Tooltip classes="form-error" content={errors.billing_address.city} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.city" id="city" value={values.billing_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.country && errors.billing_address && errors.billing_address.country ? <Tooltip classes="form-error" content={errors.billing_address.country} /> : null}
                                                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='billing_address.country' value={values.billing_address.country} onBlur={handleBlur} onChange={handleChange} >
                                                    <option disabled >Country</option>
                                                    <option value="uae">UAE</option>
                                                    <option value="usa">USA</option>
                                                    <option value="pk">Pakistan</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.phone_prefix && errors.billing_address && errors.billing_address.phone_prefix ? <Tooltip classes="form-error" content={errors.billing_address.phone_prefix} /> : null}
                                                <select value={values.billing_address.phone_prefix} name='billing_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                                    {countryCodes.map((item) => {
                                                        if (!item.code) return <option disabled>{item.name}</option>
                                                        return <option value={item.code}>{item.name} {item.code}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="relative w-48pr data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                                                {touched.billing_address && touched.billing_address.phone_number && errors.billing_address && errors.billing_address.phone_number ? <Tooltip classes="form-error" content={errors.billing_address.phone_number} /> : null}
                                                <input className="w-full bg-transparent outline-none border-none" type="tel" name="billing_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.billing_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </section>
                                    <span className="flex justify-end"> <Button type="submit" classes="px-8" >Continue to Payment</Button> </span>
                                </div>
                            </form>
                        </div>
                        <CheckoutCalcSection />
                    </section>
                </div>
                <Footer />
            </main >
        </>
    )
}
