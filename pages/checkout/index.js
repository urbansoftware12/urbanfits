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
import { shippingRates, paymentOptions, UAEStates } from '@/uf.config';
import { get12hFormatTime } from '@/utils/cyphers';
import countryCodes from '@/static data/countryCodes';
import LanguageModal from '@/components/modals/language';
import toaster from '@/utils/toast_function';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Tooltip from '@/components/tooltip';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ShipmentOption = ({ method, selected, handleChange, handleBlur }) => {
    const methodObj = shippingRates[method];
    const isDue = methodObj.time_limit ? (Date.now() < methodObj.time_limit) : true;
    return <div className="relative flex items-start">
        <input className='rounded mr-2 translate-y-0.5' type="radio" id={method} disabled={!isDue} name="delivery_option" defaultChecked={method === "standard_shipping"} checked={selected === method} value={method} onBlur={handleBlur} onClick={handleChange} />
        <label className="flex flex-col cursor-pointer text-10px md:text-sm" htmlFor={method}>
            <span className={!isDue ? "opacity-30 pointer-events-none" : null}>{methodObj.name}</span>
            <p className="text-[7px] mid:text-[9px] text-gray-400 leading-normal">{methodObj.timespan}</p>
            {methodObj.time_limit ? <p className="text-[7px] mid:text-[9px] text-gray-400 leading-normal">Order before {get12hFormatTime(methodObj.time_limit)}</p> : null}
        </label>
    </div>
}

const addressModes = {
    address1: "Address 1",
    address2: "Address 2",
    custom: "Custom"
}
export default function Checkout1() {
    const router = useRouter();
    const { isLoggedIn, user, country, address, getAddress } = useUser();
    const { points, currency, formatPrice } = useWallet();
    const { totalUniqueItems, cartTotal, isEmpty, items } = useCart();
    const [langModal, setLangModal] = useState(false)
    const [loader, setLoader] = useState(null)
    const [addressMode, setAddressMode] = useState({
        name: user?._id ? "Address 1" : "Custom",
        mode: user?._id ? "shipping_address" : "custom",
        available_modes: ["custom"]
    })
    const name = useRef(null)
    const email = useRef(null)

    const [readOnly, setReadOnly] = useState(user?._id ? true : false)
    const handleModify = (e) => {
        setReadOnly(false)
        let elemName = e.target.getAttribute("name")
        if (elemName === "name") return name.current.focus()
        if (elemName === "email") return email.current.focus()
    }

    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues, setFieldValue, setFieldError } = useFormik({
        initialValues: {
            isGiftCard: items.some(item => item.is_giftcard) ? true : false,
            name: user && user.firstname ? (user?.firstname + ' ' + user?.lastname) : "",
            email: user?.email,
            delivery_option: 'standard_shipping',
            payment_option: 'online_payment',
            points_to_use: 0,
            gift_code: '',
            coupon_code: '',
            shipping_address: {
                address_title: '',
                firstname: '',
                lastname: '',
                address: '',
                apt_suite: '',
                city: '',
                country: country.country,
                state: "",
                phone_prefix: country.code,
                phone_number: ''
            }
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2).required("Please enter your Full Name"),
            email: Yup.string().email().required("Please enter your email address"),
            delivery_option: Yup.string().when("isGiftCard", {
                is: true,
                then: Yup.string().notRequired(),
                otherwise: Yup.string().oneOf(Object.keys(shippingRates)).required("Please select your prefered Delivery Option")
            }),
            payment_option: Yup.string().oneOf(Object.keys(paymentOptions)).required("Please select your prefered Payment Option"),
            points_to_use: Yup.number().lessThan(points, "You can't apply more points than you have.").max(points, "You can't apply more points than you have."),
            gift_code: Yup.string(),
            coupon_code: Yup.string(),
            shipping_address: Yup.object().when("isGiftCard", {
                is: true,
                then: Yup.object().notRequired(),
                otherwise: Yup.object().shape({
                    firstname: Yup.string().min(2).required("Please enter your First name"),
                    lastname: Yup.string().min(2).required("Please enter your Last name"),
                    address_title: Yup.string().required("Please enter your address title"),
                    address: Yup.string().min(2).required("Please enter your address"),
                    apt_suite: Yup.string(),
                    city: Yup.string().required("Please enter your city"),
                    country: Yup.string().required("Please enter your country"),
                    state: Yup.string().oneOf(Object.keys(UAEStates)).required("Please select a state"),
                    phone_prefix: Yup.string().required("Please enter your phone prefix"),
                    phone_number: Yup.string().min(9).required("Please enter your phone number")
                })
            })
        }),
        onSubmit: async (values) => {
            setLoader(<Loader />)
            try {
                const payload = {
                    ...(user?._id && { user_id: user._id }),
                    is_guest: user?._id ? false : true,
                    shipping_info: { ...values, card_number: user?.uf_wallet?.card_number },
                    order_items: items
                }
                const { data, data: { order_data } } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/checkout`, { payload })
                sessionStorage.setItem("bought_order_data", JSON.stringify(order_data))
                if (order_data.payment_method === "online_payment") router.push(data.payment_url);
                else if (order_data.payment_method === "cash_on_delivery") router.replace(`/checkout/thanks`);
                else return toaster("error", "Unsupported payment method.")
            }
            catch (e) {
                console.log(e)
                if (e.response) toaster("error", e?.response?.data?.msg || "Network Error")
            }
            setLoader(null)
        }
    })

    const getValuesToBeSet = (obj) => ({
        address_title: obj?.address_title || '',
        firstname: obj?.firstname || '',
        lastname: obj?.lastname || '',
        address: obj?.address || '',
        apt_suite: obj?.apt_suite || '',
        city: obj?.city || '',
        country: obj?.country || country.country,
        state: obj?.state || '',
        phone_prefix: obj?.phone_prefix || country.code,
        phone_number: obj?.phone_number || ''
    })

    const changeAddressMode = (mode) => {
        setAddressMode(prev => ({ ...prev, mode }))
        setValues({
            ...values, shipping_address: mode == "custom" ? getValuesToBeSet(null) : getValuesToBeSet(address[mode])
        })
    }

    useEffect(() => {
        const { payment } = router.query;
        if (payment == 'false' || payment == false) return toaster("error", "Payment failed, keep shopping and checkout when you're ready.")
    }, [router.query.payment])

    useEffect(() => {
        if (items.some(item => item.is_giftcard)) setFieldValue("isGiftCard", true);
        setFieldValue("currency", currency);
        setFieldValue("delivery_option", "standard_shipping");
        setFieldValue("shipping_address.country", country.country);
        setFieldValue("shipping_address.phone_prefix", country.code);
        (async () => {
            setLoader(<Loader />)
            if (user) {
                if (!address) await getAddress();
                if (!address) return setLoader(null)
                let addressKey = null;
                const addAddressMode = (modeKey, modeName) => setAddressMode(prev => {
                    const newModes = [...prev.available_modes, modeKey];
                    return { mode: modeKey, name: modeName, available_modes: Array.from(new Set(newModes)) }
                })
                if (address?.address1 && address?.address1?.address_title) {
                    addressKey = "address1";
                    addAddressMode("address1", address.address1.address_title);
                }
                if (address?.address2 && address?.address2?.address_title) {
                    addressKey = "address2";
                    addAddressMode("address2", address.address2.address_title);
                }
                setValues({
                    ...values, ...(addressKey ? { shipping_address: getValuesToBeSet(address[addressKey]) } : {})
                })
            }
            const filledAddressInfo = sessionStorage.getItem("this_order_data")
            if (filledAddressInfo) {
                const { shipping_info } = JSON.parse(filledAddressInfo);
                setValues({
                    name: shipping_info.name,
                    email: shipping_info.email,
                    delivery_option: 'express',
                    shipping_address: getValuesToBeSet(shipping_info.shipping_address),
                })
            }
            setLoader(null)
        })()
    }, [user, address])

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

    const totalShippingFee = (() => {
        if (items.find(item => item.is_giftcard)) return 0;
        const currentMethod = shippingRates[values.delivery_option];

        if (values.coupon_code && coupon?.coupon_config?.free_shipping) return 0;
        const filteredItems = items.filter(item => !item.is_giftcard);
        if (!filteredItems.length) return 0;
        const totalWeight = filteredItems.reduce((accValue, item) => accValue + (item.weight * item.quantity), 0);
        if (totalWeight <= 5000) return currentMethod.rate;
        const additionalWeight = totalWeight - 5000;
        const additionalCharges = (additionalWeight / 1000) * currentMethod.additional_kg_charge;
        return currentMethod.rate + additionalCharges;
    })()

    const totalUfPoints = items.reduce((total, item) => item.quantity * (total + (item?.uf_points || 0)), 0);
    const TotalOrderPrice = cartTotal + totalShippingFee;
    const couponDiscount = getCouponDiscount(coupon.coupon, values.coupon_code, items, cartTotal, user)

    const totalAmount = (() => {
        const pointsDiscount = parseFloat(values.points_to_use) * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE) || 0;
        const giftcardDiscount = parseFloat(values.gift_code && giftCard ? giftCard?.price : 0);
        return TotalOrderPrice - (pointsDiscount + giftcardDiscount + couponDiscount)
    })()

    const parsedPaymentDiscount = (() => {
        const paymentMethod = paymentOptions[values.payment_option];
        if (paymentMethod.rate) return (totalAmount / 100 * paymentMethod.rate);
        else if (paymentMethod.discount) return -(totalAmount / 100 * paymentMethod.discount);
    })()

    const displayTotalAmount = (returnDiscount = false, raw = false) => {
        if (returnDiscount) return (100 - (totalAmount / TotalOrderPrice * 100)).toFixed(2)
        if (TotalOrderPrice !== totalAmount) return <span className='flex gap-x-2'><p className="line-through text-gray-400 text-10px xl:text-sm">{formatPrice(TotalOrderPrice)}</p>&nbsp;{formatPrice(totalAmount)}</span>
        else if (raw) return totalAmount;
        else return formatPrice(totalAmount);
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
                    {!values.isGiftCard && <span className=" my-7 flex justify-between items-center font_urbanist_bold text-xl lg:text-2xl"> <h1>2. Shipping Information</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>}
                    <div className="flex flex-col mb-6">
                        {!values.isGiftCard && <>
                            <label className='w-full border-b pb-3 font_urbanist_medium' htmlFor="delivery_options">Delivery Option</label>
                            {touched.delivery_option && errors.delivery_option ? <Tooltip classes="form-error" content={errors.delivery_option} /> : null}
                            <div id="delivery_options" className="w-full py-3 grid grid-cols-3 xl:gap-x-4 font_urbanist_medium">
                                <ShipmentOption selected={values.delivery_option} method="standard_shipping" handleChange={handleChange} handleBlur={handleBlur} />
                                <ShipmentOption selected={values.delivery_option} method="express_shipping" handleChange={handleChange} handleBlur={handleBlur} />
                                <ShipmentOption selected={values.delivery_option} method="express_4h_shipping" handleChange={handleChange} handleBlur={handleBlur} />
                            </div>
                        </>}
                        {!values.isGiftCard && <h1 className=" my-7 font_urbanist_bold text-lg lg:text-xl">Enter Your Shipping Address</h1>}

                        {!values.isGiftCard && isLoggedIn() && <div className="w-full mb-5 grid grid-cols-3">
                            {addressMode.available_modes.map((mode, index) => {
                                console.log("the fucking mode here: ", mode)
                                return <button type='button' key={index} onClick={() => changeAddressMode(mode)} className="flex items-center gap-x-2" name={mode}>
                                    <span className={`${addressMode.mode == mode && "bg-pinky"} size-2 lg:size-4 rounded-3xl border`} />
                                    {mode !== "custom" ? address[mode].address_title : addressModes[mode]}
                                </button>
                            })}
                        </div>}

                        <section className="w-full space-y-10">
                            {!values.isGiftCard && <>
                                <div className="relative w-full data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                                    {touched.shipping_address && touched.shipping_address.address_title && errors.shipping_address && errors.shipping_address.address_title ? <Tooltip classes="form-error" content={errors.shipping_address.address_title} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" id="address_title" type="text" value={values.shipping_address.address_title} name='shipping_address.address_title' onBlur={handleBlur} onChange={handleChange} placeholder="Address Title* e.g Home" />
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
                                <div className="w-full flex justify-between gap-x-8">
                                    <div className="relative w-1/2 data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                        {touched.shipping_address && touched.shipping_address.apt_suite && errors.shipping_address && errors.shipping_address.apt_suite ? <Tooltip classes="form-error" content={errors.shipping_address.apt_suite} /> : null}
                                        <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.apt_suite" id="apt_suite" value={values.shipping_address.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                                    </div>
                                    <div className="relative w-1/2 data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                        {touched.shipping_address && touched.shipping_address.city && errors.shipping_address && errors.shipping_address.city ? <Tooltip classes="form-error" content={errors.shipping_address.city} /> : null}
                                        <input className="w-full bg-transparent outline-none border-none" type="text" name="shipping_address.city" id="city" value={values.shipping_address.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                                    </div>
                                </div>
                                <nav className="w-full flex justify-between">
                                    <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                        {touched.shipping_address && touched.shipping_address.country && errors.shipping_address && errors.shipping_address.country ? <Tooltip classes="form-error" content={errors.shipping_address.country} /> : null}
                                        <select value={values.shipping_address.country} name='shipping_address.country' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                            {[{ name: "Select country code" }, { name: "United Arab Emirates", code: "+971", country: "ae", src: process.env.NEXT_PUBLIC_BASE_IMG_URL + "/country-flags/AE.webp" }].map((item, index) => {
                                                if (!item.code) return <option key={index + "-a"} value=''>{item.name}</option>
                                                return <option key={index} value={item.country}>{item.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                                        {touched.state && errors.state ? <Tooltip classes="form-error" content={errors.state} /> : null}
                                        <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='shipping_address.state' value={values.state} onBlur={handleBlur} onChange={handleChange} >
                                            <option disabled selected value='' >State</option>
                                            {Object.keys(UAEStates).map(state => <option value={state}>{UAEStates[state]}</option>)}
                                        </select>
                                    </div>
                                </nav>
                                <div className="flex justify-between w-full">
                                    <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                        {touched.shipping_address && touched.shipping_address.phone_prefix && errors.shipping_address && errors.shipping_address.phone_prefix ? <Tooltip classes="form-error" content={errors.shipping_address.phone_prefix} /> : null}
                                        <select value={values.shipping_address.phone_prefix} name='shipping_address.phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                            {countryCodes.map((item, index) => <option key={index} selected={item.country === "ae"} value={item.code}>{item.name} {item.code}</option>)}
                                        </select>
                                    </div>
                                    <div className="relative w-48pr data_field flex items-center border-b focus:border-pink-300 hover:border-pink-400 transition py-2 mb-4">
                                        {touched.shipping_address && touched.shipping_address.phone_number && errors.shipping_address && errors.shipping_address.phone_number ? <Tooltip classes="form-error" content={errors.shipping_address.phone_number} /> : null}
                                        <input className="w-full bg-transparent outline-none border-none" type="tel" name="shipping_address.phone_number" id="phone_number" size="15" maxLength={15} value={values.shipping_address.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                                    </div>
                                </div></>}
                        </section>
                        <span className="my-7 flex justify-between items-center font_urbanist_bold text-xl lg:text-2xl"> <h1>{values.isGiftCard ? 2 : 3}. Select Payment Method</h1> <i className="fa-solid fa-circle-check text-base md:text-xl"></i> </span>
                        <div className="grid grid-cols-2">
                            <span className="flex">
                                <input className='rounded mr-2 translate-y-0.5' type="radio" id="online_payment" name="payment_option" value="online_payment" defaultChecked onBlur={handleBlur} onChange={handleChange} />
                                <label className='flex flex-col cursor-pointer text-10px md:text-sm leading-tight' htmlFor="online_payment">Online Payment <p className="text-[9px] lg:text-xs text-gray-400">Save {formatPrice(totalAmount / 100 * 2.5)}</p></label>
                            </span>
                            {!values.isGiftCard && <span className="flex">
                                <input className='rounded mr-2 translate-y-0.5' type="radio" id="cash_on_delivery" name="payment_option" value="cash_on_delivery" onBlur={handleBlur} onChange={handleChange} />
                                <label className='flex flex-col cursor-pointer text-10px md:text-sm leading-tight' htmlFor="cash_on_delivery">Cash On Delivery <p className="text-[9px] lg:text-xs text-gray-400">Charges will be {formatPrice(totalAmount / 100 * 3.3)}</p></label>
                            </span>}
                        </div>
                        <span className="flex justify-end"> <Button onClick={() => { if (Object.keys(errors).length > 0) toaster("error", "Please fill out all the information") }} loading={!loader ? false : true} type="submit" classes="px-8" >Continue to Payment</Button> </span>
                    </div>
                </form>
            </section>
            {/* Checkout Calculation Section */}
            <section className="w-full lg:w-[42%] max-w-[850px] pb-4 flex flex-col gap-y-5">
                <section className="bg-white w-full p-4 md:p-5 lg:p-7 flex flex-col items-center rounded-xl">
                    <h3 className="text-xl md:text-2xl font-bold mb-3">Order Summary ({totalUniqueItems})</h3>

                    <div className="w-full max-h-[25rem] flex flex-col overflow-auto">
                        {items.map((item, i) => {
                            if (item.is_giftcard) return <section className="w-full mb-4 md:mb-6 p-4 border rounded-lg">
                                <h3 key={-i - 1} className="mb-2 self-start font_urbanist_medium text-sm md:text-base text-left capitalize">{item?.name}</h3>
                                <div key={i} className="w-full mb-2 flex justify-between xl:items-center">
                                    <div className="w-24 h-20 flex flex-col justify-center items-center rounded-md md:rounded-lg bg-pinky text-[8px] lg:text-[10px] font-semibold text-white uppercase">
                                        <span className="font_copper text-[10px]">UF E-GIFTCARD</span>
                                        AED {item.price}
                                    </div>
                                    <aside className="flex-1 flex lg:flex-col xl:flex-row items-start justify-between md:justify-start lg:justify-between ml-4 mid:ml-6 lg:ml-3 gap-x-2 md:gap-x-10 lg:gap-y-2.5 xl:gap-x-4 text-10px md:text-[13px]">
                                        <div className="w-full lg:my-0 flex flex-col gap-y-2.5">
                                            <div key={1} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Price:</span> <span>{formatPrice(item.price)}</span></div>
                                            <div key={2} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>For:</span> <span>{item.buy_for === "self" ? "Self" : "Friend"}</span></div>
                                            <div key={3} className="w-full mx-auto flex justify-between font_urbanist_bold"><span className='font_urbanist_medium text-gray-400'>Quantity:</span> <span>{item.quantity}</span></div>
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
                        <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Discount</span> <span>{displayTotalAmount(true)}%</span></div>
                        <div className="w-full mx-auto flex justify-between"><span className='font_urbanist text-gray-400'>Shipping</span> <span>{formatPrice(totalShippingFee) || "We don't ship here"}</span></div>
                    </div>
                    {values.points_to_use ? parseFloat(values.points_to_use) > 0 && <div className="w-full py-2 flex justify-between font_urbanist_bold text-base">
                        <h4>Saved</h4>
                        <h4>{formatPrice(cartTotal + totalShippingFee - ((cartTotal + totalShippingFee) - parseFloat(values.points_to_use) * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE)))}</h4>
                    </div> : null}
                    <div className="w-full py-2 flex justify-between font_urbanist_bold text-lg border-t border-t-gray-">
                        <h4>Total</h4>
                        <h4>{formatPrice(totalAmount + parsedPaymentDiscount)}</h4>
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
        </main >
    </>
}
