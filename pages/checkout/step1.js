import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useCart } from "react-use-cart";
import { loadStripe } from '@stripe/stripe-js';
import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';
import AlertPage from '@/components/alertPage'
import DiscountBox, { getCouponDiscount } from '@/components/discountBox';
import Accordians from '@/components/accordians/accordians';
import Head from 'next/head';
import Button from '@/components/buttons/simple_btn';
import Loader from '@/components/loaders/loader';
import Image from "next/image"
import countryCodes from '@/static data/countryCodes';
import LanguageModal from '@/components/modals/languagemodal';
import toaster from '@/utils/toast_function';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltip';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout1() {
    const router = useRouter()
    const { user, guestUser, country, address, getAddress } = useUser()
    const { points, currency, getShippingRates, formatPrice } = useWallet()
    const { totalUniqueItems, cartTotal, isEmpty, items } = useCart()
    const [shippingRates, setShippingRates] = useState(null)
    const [langModal, setLangModal] = useState(false)
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
    const addressFieldsValues = (type) => ({
        address_title: address && address[type] ? address[type].address_title : '',
        firstname: address && address[type] ? address[type].firstname : '',
        lastname: address && address[type] ? address[type].lastname : '',
        address: address && address[type] ? address[type].address : '',
        apt_suite: address && address[type] ? address[type].apt_suite : '',
        city: address && address[type] ? address[type].city : '',
        country: address && address[type] ? address[type].country : country.country,
        phone_prefix: address && address[type] ? address[type].phone_prefix : country.code,
        phone_number: address && address[type] ? address[type].phone_number : ''
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues, setFieldValue, setFieldError } = useFormik({
        initialValues: {
            currency,
            country: country.country,
            name: user && user.firstname ? (user?.firstname + ' ' + user?.lastname) : "",
            email: user?.email,
            delivery_option: 'standard_shipping',
            points_to_use: 0,
            gift_code: '',
            coupon_code: '',
            shipping_address: addressFieldsValues("shipping_address"),
            billing_address: addressFieldsValues("billing_address")
        },
        validationSchema: Yup.object().shape({
            currency: Yup.string().required(),
            country: Yup.string().required(),
            name: Yup.string().min(2).required("Please enter your Full Name"),
            email: Yup.string().email().required("Please enter your email address"),
            delivery_option: Yup.string().required("Please select your prefered language"),
            points_to_use: Yup.number().lessThan(points, "You can't apply more points than you have.").max(points, "You can't apply more points than you have."),
            gift_code: Yup.string(),
            coupon_code: Yup.string(),
            shipping_address: Yup.object().shape(addressFieldsValidation),
            billing_address: Yup.object().shape(addressFieldsValidation)
        }),
        onSubmit: async (values) => {
            setLoader(<Loader />)
            try {
                const payload = {
                    user_id: user?._id || guestUser?._id,
                    is_guest: user && user?._id ? false : true,
                    shipping_info: { ...values, card_number: user?.uf_wallet?.card_number },
                    order_items: items
                }
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/payments/checkout_sessions`, { payload })
                console.log(data)
                router.push(data.url)
            }
            catch (e) {
                console.log(e)
                if (e.response) toaster("error", e.response.data.msg)
            }
            setLoader(null)
        }
    })

    const getValuesToBeSet = (obj) => ({
        address_title: obj ? obj.address_title : '',
        firstname: obj ? obj.firstname : '',
        lastname: obj ? obj.lastname : '',
        address: obj ? obj.address : '',
        apt_suite: obj ? obj.apt_suite : '',
        city: obj ? obj.city : '',
        country: obj ? obj.country : country.country,
        phone_prefix: obj ? obj.phone_prefix : country.code,
        phone_number: obj ? obj.phone_number : ''
    })

    const calculateTotalShippingFee = (fees, shippingMethod = values?.delivery_option, coupon) => {
        if (shippingMethod === "free_shipping") return 0;
        if (values.coupon_code && coupon && coupon.coupon_config?.free_shipping) return 0;
        const filteredItems = items.filter(item => !item.id.startsWith("giftcard_"))
        if (!filteredItems.length) return 0
        const totalWeight = filteredItems.reduce((accValue, item) => { return accValue + (item.weight * item.quantity) }, 0)
        if (totalWeight <= 5100) return fees
        const additionalWeight = totalWeight - 5100
        const additionalCharges = (additionalWeight / 1000) * (shippingRates?.additionalKgCharges || 1)
        return fees + additionalCharges
    }

    const getFreeDeliveryLimit = () => {
        const shippingData = shippingRates?.shipping_rates.free_shipping
        if (country.country === "sa") return shippingData?.ksa_order_rate
        else if (country.country === "pk") return shippingData?.pk_order_rate
        else if (country.country === "ae") return shippingData?.uae_order_rate
    }

    useEffect(() => {
        if (values.delivery_option !== "free_shipping") getShippingRates((data) => setShippingRates(data), values.delivery_option)
        else setShippingRates({ ...shippingRates, price: 0, additionalKgCharges: 0 })
    }, [values.delivery_option])

    useEffect(() => {
        const { payment } = router.query
        if (payment == 'false' || payment == false) return toaster("error", "Payment failed, keep shopping and checkout when you're ready.")
        return
    }, [router.query.payment])

    useEffect(() => {
        setFieldValue("currency", currency);
        setFieldValue("delivery_option", "standard_shipping");
        setFieldValue("shipping_address.country", country.country);
        setFieldValue("billing_address.country", country.country);
        setFieldValue("shipping_address.phone_prefix", country.code);
        setFieldValue("billing_address.phone_prefix", country.code);
        (async () => {
            setLoader(<Loader />)
            if (user) {
                if (!address) await getAddress();
                if (!address) return setLoader(null)
                setValues({
                    ...values,
                    ...(address.shipping_address && { shipping_address: getValuesToBeSet(address.shipping_address) }),
                    ...(address.billing_address && { billing_address: getValuesToBeSet(address.billing_address) }),
                })
            }
            const filledAddressInfo = sessionStorage.getItem("this_order_data")
            if (filledAddressInfo) {
                const { shipping_info } = JSON.parse(filledAddressInfo)
                setValues({
                    name: shipping_info.name,
                    email: shipping_info.email,
                    delivery_option: 'express',
                    shipping_address: getValuesToBeSet(shipping_info.shipping_address),
                    billing_address: getValuesToBeSet(shipping_info.billing_address)
                })
            }
            setLoader(null)
        })()
    }, [user, address])

    const toggleBillingForm = (e) => {
        if (errors.shipping_address) return toaster("error", "Please complete the Shipping Address details.")
        let state = e.target.checked
        if (state) {
            setBillingForm('h-0')
            setValues({
                ...values, billing_address: getValuesToBeSet(values.shipping_address)
            })
        }
        else if (!state) {
            setValues({
                ...values, billing_address: getValuesToBeSet(null)
            })
            setBillingForm(null)
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

    // Checkout Calculations section logic
    const [giftCard, setGiftCard] = useState({
        card: null,
        code: '',
        loading: false,
    })
    const [coupon, setCoupon] = useState({
        coupon: null,
        code: '',
        loading: false,
    })
    const totalUfPoints = items.reduce((total, item) => total + (item?.uf_points || 0), 0)
    const TotalOrderPrice = cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, values.delivery_option, coupon.coupon) //in AED

    const couponDiscount = getCouponDiscount(coupon.coupon, values.coupon_code, items, cartTotal, user)
    console.log("calculated Coupon discount: ", couponDiscount)

    const getTotalAmount = (returnDiscount = false) => {
        const pointsDiscount = parseFloat(values.points_to_use) * process.env.NEXT_PUBLIC_UF_POINT_RATE || 0 //in AED
        const giftcardDiscount = parseFloat(values.gift_code && giftCard ? giftCard?.price : 0)

        const finalTotalAmount = TotalOrderPrice - (pointsDiscount + giftcardDiscount + couponDiscount)
        if (returnDiscount) return (100 - (finalTotalAmount / TotalOrderPrice * 100)).toFixed(2)
        if (TotalOrderPrice !== finalTotalAmount) return <span className='flex gap-x-2'><p className="line-through text-gray-400 text-10px xl:text-sm">{formatPrice(TotalOrderPrice)}</p>&nbsp;{formatPrice(finalTotalAmount)}</span>
        else return formatPrice(finalTotalAmount)
    }

    if (isEmpty) return <AlertPage type="error" heading="Oh! There's nothing to Checkout with" message="You currently have nothing to checkout in your cart, please visit our store and select something to purchase" />
    if (!isEmpty) return <>
        <Head><title>Checkout - Urban Fits</title></Head>
        {loader}
        <LanguageModal show={langModal} setLangModal={setLangModal} />
        <main className='bg-gray-100 w-full h-full px-4 md:px-5 lg:px-10 xl:px-14 2xl:px-20 flex flex-col lg:flex-row lg:flex-wrap p-5 md:p-7 lg:p-0 lg:pt-10 font_urbanist text-left' >
            <div className="w-full mb-2"><span onClick={router.back} className='cursor-pointer font_urbanist_medium'><i className="fa-solid fa-chevron-left text-xs mr-2"></i>Back</span></div>
            <section className="bg-white w-full lg:w-[56%] mb-10 p-4 md:p-5 lg:p-7 mr-auto rounded-2xl">
                <DiscountBox
                    formatPrice={formatPrice}
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    giftCard={giftCard}
                    setGiftCard={setGiftCard}
                    coupon={coupon}
                    setCoupon={setCoupon}
                />
                <form className="w-full mt-4 lg:mt-6 text-sm" onSubmit={handleSubmit} onReset={handleReset} >
                    <span className=" mb-7 flex justify-between items-center font_urbanist_bold text-xl lg:text-2xl"> <h1>1. Contact Information</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>
                    <span className="flex flex-col mb-6">
                        <label className='font_urbanist_medium md:text-lg' htmlFor="name">Name</label>
                        <div className="relative w-full data_field flex justify-between items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                            {touched.name && errors.name ? <Tooltip classes="form-error" content={errors.name} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" onBlur={() => { if (!user || !user.email) return; setReadOnly(true) }} onChange={handleChange} value={values.name} readOnly={readOnly} ref={name} type="text" name="name" id="name" placeholder="John Doe" /><button type='button' onClick={handleModify} ><i className={`${user && user.email ? null : "hidden"} material-symbols-outlined text-xl`} title='Edit' name="name">edit_square</i></button>
                        </div>
                    </span>
                    <span className="flex flex-col">
                        <label className='font_urbanist_medium md:text-lg' htmlFor="email">Email</label>
                        <div className="relative w-full data_field flex justify-between items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                            {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                            <input className="w-full bg-transparent outline-none border-none" onBlur={() => { if (!user || !user.email) return; setReadOnly(true) }} onChange={handleChange} value={values.email} readOnly={readOnly} ref={email} type="email" name="email" id="email" placeholder="johndoe.123@gmail.com" /><button type='button' onClick={handleModify} ><i className={`${user && user.email ? null : "hidden"} material-symbols-outlined text-xl`} title='Edit' name="email">edit_square</i></button>
                        </div>
                    </span>
                    <span className=" my-7 flex justify-between items-center font_urbanist_bold text-xl lg:text-2xl"> <h1>2. Shipping Information</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>
                    <div className="flex flex-col mb-6">
                        <label className='w-full border-b pb-3 font_urbanist_medium' htmlFor="delivery_options">Delivery Option</label>
                        {touched.delivery_option && errors.delivery_option ? <Tooltip classes="form-error" content={errors.delivery_option} /> : null}
                        <div id="delivery_options" className="w-full py-3 grid grid-cols-3 xl:gap-x-4 font_urbanist_medium">
                            <span className="flex">
                                <input className='rounded mr-2 translate-y-1' type="radio" id="standard_shipping" name="delivery_option" value="standard_shipping" defaultChecked onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-10px md:text-sm leading-tight' htmlFor="standard_shipping">Standard Delivery <p className="text-[7px] mid:text-[9px] text-gray-400">{shippingRates?.getTimeSpan("standard_shipping")}</p></label>
                            </span>
                            {country.country !== "ae" && <span className="w-full flex justify-center">
                                <input className='rounded mr-2 translate-y-1' type="radio" id="express_shipping" name="delivery_option" value="express_shipping" onBlur={handleBlur} onChange={handleChange} /><label className='flex flex-col cursor-pointer text-10px md:text-sm leading-tight' htmlFor="express_shipping">Express Delivery <p className="text-[7px] mid:text-[9px] text-gray-400">{shippingRates?.getTimeSpan("express_shipping")}</p></label>
                            </span>}
                            <span className={`w-full flex justify-end ${cartTotal >= getFreeDeliveryLimit() ? null : "opacity-40 pointer-events-none"}`}>
                                <input className="rounded mr-2 translate-y-1" type="radio" id="free_shipping" name="delivery_option" value="free_shipping" disabled={cartTotal < getFreeDeliveryLimit()} onBlur={handleBlur} onChange={(e) => {
                                    if (cartTotal >= getFreeDeliveryLimit()) {
                                        setShippingRates({ ...shippingRates, price: 0, additionalKgCharges: 0 }); handleChange(e)
                                    }
                                    else return toaster("error", `Your order must be atleast ${formatPrice(getFreeDeliveryLimit())} to avail Free Delivery.`)
                                }} /><div className='flex flex-col cursor-pointer text-10px md:text-sm leading-tight'><label htmlFor="free_shipping" className='cursor-pointer'>Free Delivery</label><p className="text-[7px] mid:text-[9px] text-gray-400 leading-tight">{shippingRates?.getTimeSpan("free_shipping")}</p><p className="text-[7px] mid:text-[9px] text-gray-400 leading-tight">Minimum {formatPrice(getFreeDeliveryLimit())}&nbsp; order</p></div>
                            </span>
                        </div>
                        <h1 className=" my-7 font_urbanist_bold text-lg lg:text-xl">Enter Your Shipping Address</h1>
                        <section className="w-full space-y-10">
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.shipping_address && touched.shipping_address.address_title && errors.shipping_address && errors.shipping_address.address_title ? <Tooltip classes="form-error" content={errors.shipping_address.address_title} /> : null}
                                <select value={values.shipping_address.address_title} name='shipping_address.address_title' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full ">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.shipping_address.firstname} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.firstname" id="firstname" value={values.shipping_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.lastname && errors.shipping_address && errors.shipping_address.lastname ? <Tooltip classes="form-error" content={errors.shipping_address.lastname} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.lastname" id="lastname" value={values.shipping_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.shipping_address && touched.shipping_address.address && errors.shipping_address && errors.shipping_address.address ? <Tooltip classes="form-error" content={errors.shipping_address.address} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.address" id="address" value={values.shipping_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                            </div>
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.shipping_address && touched.shipping_address.apt_suite && errors.shipping_address && errors.shipping_address.apt_suite ? <Tooltip classes="form-error" content={errors.shipping_address.apt_suite} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.apt_suite" id="apt_suite" value={values.shipping_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                            </div>
                            <div className="flex justify-between w-full ">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.city && errors.shipping_address && errors.shipping_address.city ? <Tooltip classes="form-error" content={errors.shipping_address.city} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.city" id="city" value={values.shipping_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.country && errors.shipping_address && errors.shipping_address.country ? <Tooltip classes="form-error" content={errors.shipping_address.country} /> : null}
                                    <select value={values.shipping_address.country} name='shipping_address.country' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                        {countryCodes.map((item, index) => {
                                            // if (!item.code) return <option key={index} value=''>{item.name}</option>
                                            return <option key={index} value={item.country}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.phone_prefix && errors.shipping_address && errors.shipping_address.phone_prefix ? <Tooltip classes="form-error" content={errors.shipping_address.phone_prefix} /> : null}
                                    <select value={values.shipping_address.phone_prefix} name='shipping_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                        {[{ name: "Select country code" }, ...countryCodes].map((item, index) => {
                                            if (!item.code) return <option key={index} value=''>{item.name}</option>
                                            return <option key={index} value={item.code}>{item.name} {item.code}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.phone_number && errors.shipping_address && errors.shipping_address.phone_number ? <Tooltip classes="form-error" content={errors.shipping_address.phone_number} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="tel" name="shipping_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.shipping_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="text-sm">
                                Shipping outside of United Arab Emirates?&nbsp;
                                <button type='button' name='modal3' onClick={() => setLangModal(true)} className="underline">Change Localization</button>
                            </div>
                        </section>
                        <div className="w-full my-7 flex flex-col">
                            <h1 className="font_urbanist_bold text-lg lg:text-xl">Enter You Billing Address</h1>
                            <div className="w-full my-2 flex justify-between items-center font_urbanist_medium text-gray-400 text-sm md:text-base">
                                Use same details for Billing Address <label className={`${handleSwitchBtn()} switch w-11 md:w-11 h-6 ml-5 `}><input type="checkbox" name='same_details_as_shipping' value={true} onChange={toggleBillingForm} /><span className="slider"></span></label>
                            </div>
                        </div>
                        <section className={`w-full ${billingForm} overflow-hidden space-y-10`}>
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.billing_address && touched.billing_address.address_title && errors.billing_address && errors.billing_address.address_title ? <Tooltip classes="form-error" content={errors.billing_address.address_title} /> : null}
                                <select value={values.billing_address.address_title} name='billing_address.address_title' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full ">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.firstname && errors.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.billing_address.firstname} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.firstname" id="firstname" value={values.billing_address.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.lastname && errors.billing_address && errors.billing_address.lastname ? <Tooltip classes="form-error" content={errors.billing_address.lastname} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.lastname" id="lastname" value={values.billing_address.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.billing_address && touched.billing_address.address && errors.billing_address && errors.billing_address.address ? <Tooltip classes="form-error" content={errors.billing_address.address} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.address" id="address" value={values.billing_address.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
                            </div>
                            <div className="relative w-full data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                {touched.billing_address && touched.billing_address.apt_suite && errors.billing_address && errors.billing_address.apt_suite ? <Tooltip classes="form-error" content={errors.billing_address.apt_suite} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.apt_suite" id="apt_suite" value={values.billing_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                            </div>
                            <div className="flex justify-between w-full ">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.city && errors.billing_address && errors.billing_address.city ? <Tooltip classes="form-error" content={errors.billing_address.city} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="billing_address.city" id="city" value={values.billing_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.country && errors.billing_address && errors.billing_address.country ? <Tooltip classes="form-error" content={errors.billing_address.country} /> : null}
                                    <select placeholder='Country' value={values.billing_address.country} name='billing_address.country' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                        {countryCodes.map((item, index) => {
                                            // if (!item.code) return <option key={index} value=''>{item.name}</option>
                                            return <option key={index} value={item.country}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.phone_prefix && errors.billing_address && errors.billing_address.phone_prefix ? <Tooltip classes="form-error" content={errors.billing_address.phone_prefix} /> : null}
                                    <select placeholder='Select country code' value={values.billing_address.phone_prefix} name='billing_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                        {countryCodes.map((item, index) => {
                                            // if (!item.code) return <option key={index} value=''>{item.name}</option>
                                            return <option key={index} value={item.code}>{item.name} {item.code}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                    {touched.billing_address && touched.billing_address.phone_number && errors.billing_address && errors.billing_address.phone_number ? <Tooltip classes="form-error" content={errors.billing_address.phone_number} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="tel" name="billing_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.billing_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                </div>
                            </div>
                        </section>
                        <span className="flex justify-end"> <Button loading={!loader ? false : true} type="submit" classes="px-8" >Continue to Payment</Button> </span>
                    </div>
                </form>
            </section>
            {/* Checkout Calculation Section */}
            <section className="w-full lg:w-[42%] max-w-[850px] flex flex-col gap-y-5">
                <section className="bg-white w-full p-4 md:p-5 lg:p-7 flex flex-col items-center rounded-xl">
                    <h3 className="text-xl md:text-2xl font-bold mb-3">Order Summary ({totalUniqueItems})</h3>

                    <div className="w-full max-h-[25rem] flex flex-col overflow-auto">
                        {items.map((item, i) => {
                            if (item.id.startsWith("giftcard_")) return <section className="w-full mb-4 md:mb-6 p-4 border rounded-lg">
                                <h3 key={-i - 1} className="mb-2 self-start font_urbanist_medium text-sm md:text-base text-left capitalize">{item?.name}</h3>
                                <div key={i} className="w-full mb-2 flex justify-between xl:items-center">
                                    <div className={`${item.bg} w-24 h-20 flex justify-center items-center rounded-md md:rounded-lg text-xs text-white font_montserrat_bold tracking-1 uppercase overflow-hidden`}>{item.d_name}</div>
                                    <aside className="flex-1 flex lg:flex-col xl:flex-row items-start justify-between md:justify-start lg:justify-between ml-4 mid:ml-6 lg:ml-3 gap-x-2 md:gap-x-10 lg:gap-y-2.5 xl:gap-x-4 text-10px md:text-[13px]">
                                        <div className="w-full lg:my-0 flex flex-col gap-y-2.5">
                                            <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Price:</span> <span>{formatPrice(item.price)}</span></div>
                                        </div>
                                    </aside>
                                </div>
                            </section>
                            return <>
                                <section className="w-full mb-4 md:mb-6 p-4 border rounded-lg">
                                    <h3 key={-i - 1} className="mb-2 self-start font_urbanist_medium text-sm md:text-base text-left capitalize">{item?.name}</h3>
                                    <div key={i} className="w-full mb-2 flex justify-between xl:items-center">
                                        <div className="w-20 h-20 rounded-md md:rounded-lg overflow-hidden">
                                            <Image width={640} height={640} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.images[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <aside className="flex-1 flex lg:flex-col xl:flex-row items-start justify-between md:justify-start lg:justify-between ml-4 mid:ml-6 lg:ml-3 gap-x-2 md:gap-x-10 lg:gap-y-2.5 xl:gap-x-4 text-10px md:text-[13px]">
                                            <div className="lg:w-full xl:w-1/2 lg:my-0 flex flex-col gap-y-2.5">
                                                <div key={1} className="w-full mx-auto flex justify-between font_urbanist_bold capitalize"><span className='font_urbanist_medium text-gray-400'>Color:</span> <span className='truncate'>{item.color}</span></div>
                                                <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Size:</span> <span>{item.size}</span></div>
                                                <div key={3} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Quantity:</span> <span>{item.quantity}</span></div>
                                            </div>
                                            <div className="lg:w-full xl:w-1/2 lg:my-0 flex flex-col gap-y-2.5">
                                                {item.uf_points ? <div key={1} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-red-500'>UF Points:</span> <span>{item.uf_points}</span></div> : null}
                                                <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Price:</span> <span>{formatPrice(item.price)}</span></div>
                                                <div key={3} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Total Price:</span> <span>{formatPrice(item.price * item.quantity)}</span></div>
                                            </div>
                                        </aside>
                                    </div>
                                </section>
                            </>
                        })}
                    </div>
                    <div className="w-full h-auto flex flex-col my-5 md:my-3 font_urbanist_bold text-sm md:text-base gap-y-3 md:gap-y-4">
                        {user && <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Card Number</span> <span>xxx-xxxxxxxxxxxxx-{user.uf_wallet.card_number.slice(-4)}</span></div>}
                        {user && <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-red-500'>Earned UF-Points</span> <span>{totalUfPoints}</span></div>}
                        <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Subtotal</span> <span>{formatPrice(cartTotal)}</span></div>
                        <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Discount</span> <span>{getTotalAmount(true)}%</span></div>
                        <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Shipping</span> <span>{formatPrice(calculateTotalShippingFee(shippingRates?.price || 0, values.delivery_option, coupon.coupon)) || "We don't ship here"}</span></div>
                    </div>
                    {values.points_to_use ? parseFloat(values.points_to_use) > 0 && <div className="w-full py-2 flex justify-between font_urbanist_bold text-base">
                        <h4>Saved</h4>
                        <h4>{formatPrice(cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, values.delivery_option, coupon.coupon) - ((cartTotal + calculateTotalShippingFee(shippingRates?.price || 0, values.delivery_option, coupon.coupon)) - parseFloat(values.points_to_use) * process.env.NEXT_PUBLIC_UF_POINT_RATE))}</h4>
                    </div> : null}
                    <div className="w-full py-2 flex justify-between font_urbanist_bold text-lg border-t border-t-gray-">
                        <h4>Total</h4>
                        <h4>{getTotalAmount()}</h4>
                    </div>
                    {user && <div className="w-full mt-4 p-2 border rounded-lg">
                        <h4 className="mb-3 font_urbanist_bold text-lg">Apply UF-Points</h4>
                        <span className="w-full flex justify-between items-center">
                            Your UF Balance: <p>{values.points_to_use && parseFloat(values.points_to_use) > 0 ? <span>{points} - {values.points_to_use} = {points - values.points_to_use}</span> : points} pts</p>
                        </span>
                        <div className="w-full relative flex flex-col">
                            <input name='points_to_use' id='points_to_use' type='number' onChange={(e) => {
                                const value = parseFloat(e.target.value)
                                value > points ? setFieldError("points_to_use", "You can't apply more points than your actual balance.") : setFieldValue("points_to_use", value)
                            }} onBlur={handleChange} value={values.points_to_use} placeholder='Points to use' className={`w-full mt-3 h-11 px-4 py-2.5 border border-gray-300 focus:border-pink-500 hover:border-pink-400 transition rounded-lg outline-none`} />
                            <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-10px'>{errors && errors.point_to_use}</p>
                        </div>
                    </div>}

                </section>
                <Accordians />
            </section>
        </main>
    </>
}
