import { useState, useEffect } from 'react'
import useUser from '@/hooks/useUser';
import Link from 'next/link'
import Image from 'next/image';
import User from '.';
import uploadImage from '@/utils/uploadImage'
import Head from 'next/head';
import Error403 from '../403';
import Newsletter from '@/components/modals/newsletter';
import useNewsletter from '@/hooks/useNewsletter';
import useWallet from '@/hooks/useWallet'
import Button from '../../components/buttons/simple_btn';
import countryCodes from '@/static data/countryCodes';
import dynamic from 'next/dynamic';
const GenderSelect = dynamic(() => import('@/components/modals/mobile/genderSelect'));
const UserInfoModal = dynamic(() => import('@/components/modals/mobile/userInfo'));
const CountrySelection = dynamic(() => import('@/components/modals/mobile/countrySelect'));
const LanguageSelect = dynamic(() => import('@/components/modals/mobile/language'));
const CurrencySelect = dynamic(() => import('@/components/modals/mobile/currency'));
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../../components/tooltip';
import { EditIcon } from '@/public/accountIcons';

// Function to show addresses of the user in a container
const AddressContainer = (props) => {
    const { type, address } = props;
    const addressLink = <Link href='/user/address' id='address' className="w-full px-3 py-4 border border-gray-400 text-sm rounded-md flex justify-between items-center" >Add New Address<i className="material-symbols-outlined">add</i></Link>
    if (address && address[type]) return <div className="w-full p-4 text-sm border border-black flex justify-between items-start rounded-lg bg-white">
        <div>
            <span>{userAddress[type].address_title}</span><br />
            <span>{userAddress[type].firstname} {userAddress[type].lastname}</span><br />
            <span>{userAddress[type].address}</span><br />
            <span>{userAddress[type].city}, {userAddress[type].country}</span><br />
            <span>{userAddress[type].phone_prefix} {userAddress[type].phone_number}</span>
        </div>
        <Link href='/user/address' className='text-xs' >Modify<i className="fa-regular fa-pen-to-square mx-2"></i></Link>
    </div>
    else return addressLink
}

export default function Personalinfo() {
    const { user, isLoggedIn, updateUser, country, address, getAddress, userLoading } = useUser();
    const { currency } = useWallet();
    const { newsletterData, getNewsletterData, updateNewsletterData } = useNewsletter();
    const [imgSpinner, SetImgSpinner] = useState(null);
    const [letterModal, setLetterModal] = useState(false);
    const [genderModal, setGenderModal] = useState(false);
    const [userInfoModal, setUserInfoModal] = useState(false);
    const [countryModal, setCoutnryModal] = useState(false);
    const [languageModal, setLanguageModal] = useState(false);
    const [currencyModal, setCurrencyModal] = useState(false);
    const getPfp = () => {
        if (!user) return
        if (user.image) return user.image
        else return process.env.NEXT_PUBLIC_DEFAULT_PFP
    }
    const [photo, setPhoto] = useState(getPfp)
    const onFileChange = async (e) => {
        const file = e.target.files[0]
        SetImgSpinner(<Spinner />)
        const imgUrl = await uploadImage(file, `user-profiles/${user._id}`)
        setPhoto(imgUrl)
        await updateUser({ image: imgUrl })
        SetImgSpinner(null)
    }

    const toggleLetterModal = () => setLetterModal(!letterModal)
    // getting data from input fields and applying validation
    const validatedSchema = Yup.object({
        title: Yup.string().required("Please enter a title"),
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        gender: Yup.string().required('Gender is required field'),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save')
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues } = useFormik({
        initialValues: { title: 'Title', firstname: '', lastname: '', gender: 'Gender', phone_prefix: 'Select Country Code', phone_number: '' },
        validationSchema: validatedSchema,
        onSubmit: values => updateUser(values)
    })

    const newsletterSubToggle = async (e) => {
        const { name } = e.target
        if (name == "active_by_email") {
            if (!newsletterData || !newsletterData.email) return toggleLetterModal()
            else {
                useUser.setState({ userLoading: true });
                await updateNewsletterData({ active_by_email: !newsletterData.active_by_email })
                useUser.setState({ userLoading: false });
            }
        }
        if (name == "active_by_phone") {
            if (!newsletterData || !newsletterData.phone) return toggleLetterModal()
            else {
                useUser.setState({ userLoading: true });
                await updateNewsletterData({ active_by_phone: !newsletterData.active_by_phone })
                useUser.setState({ userLoading: false });
            }
        }
    }

    useEffect(() => {
        if (user) {
            setValues({
                title: user.title || '',
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                gender: user.gender || '',
                phone_prefix: user.phone_prefix || '',
                phone_number: user.phone_number || ''
            })
            if (!address) getAddress()
            if (!newsletterData) getNewsletterData()
        }
    }, [])

    if (!user && !isLoggedIn()) return <Error403 />
    if (user && window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>My Profile</title></Head>
        <main className="relative w-screen h-screen p-4 pb-10 bg-white">
            <div className="absolute left-0 top-0 right-0 w-full p-4 border-b border-gray-100 flex justify-between items-center">
                <Link href='/user' className='fa-solid fa-chevron-left text-xl'></Link>
                <h1 className="font_urbanist_medium text-lg">My Profile</h1>
                <i className='w-3 h-0' />
            </div>
            <section className="w-full h-44 mt-16 flex flex-col justify-center items-center gap-y-4">
                <label htmlFor='pfp' className="group relative w-20 aspect-square rounded-full cursor-pointer border-2 border-gray-300 overflow-hidden">
                    <span className="opacity-0 group-hover:opacity-100 text-white font_urbanist_medium text-xs cursor-pointer flex flex-col items-center gap-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                        <i className="fa-solid fa-camera text-white" />Upload
                    </span>
                    {imgSpinner}
                    <Image className="w-full h-full object-cover" width={150} height={150} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + photo + '?timestamp=' + Date.now()} alt="avatar" />
                </label>
                <input type="file" id='pfp' name='pfp' accept="image/*" onChange={onFileChange} className="opacity-0 w-0 h-0 appearance-none" />
                <button onClick={() => setUserInfoModal(true)} className="flex font_urbanist_bold text-base gap-x-2">{user.firstname} {user.lastname} <EditIcon /></button>
            </section>
            <GenderSelect user={user} updateUser={updateUser} show={genderModal} setGenderModal={setGenderModal} />
            <UserInfoModal user={user} updateUser={updateUser} show={userInfoModal} setUserInfoModal={setUserInfoModal} />
            <CountrySelection show={countryModal} setCoutnryModal={setCoutnryModal} />
            <LanguageSelect show={languageModal} setLanguageModal={setLanguageModal} />
            <CurrencySelect show={currencyModal} setCurrencyModal={setCurrencyModal} />
            <section className="w-full flex flex-col">
                <button onClick={() => setGenderModal(true)} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Gender<span className="flex items-center gap-x-2 font_urbanist capitalize">{user.gender ? user.gender : "Set your gender"} <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </button>
                {user.register_provider !== "urbanfits" ? <Link href="/user/emailaddress" className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Email<span className="flex items-center gap-x-2 font_urbanist"><p className="max-w-[16rem] truncate">{user.email}</p> <i className="fa-solid fa-chevron-right text-xs" /></span>/
                </Link> :
                    <span className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                        Email<span className="flex items-center gap-x-2 font_urbanist"><p className="max-w-[16rem] truncate">{user.email}</p></span>
                    </span>}
                <button onClick={() => setCoutnryModal(true)} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Country<span className="flex items-center gap-x-2 font_urbanist capitalize">{country.name || "Set your name"} <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </button>
                <button onClick={() => setUserInfoModal(true)} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Phone No.<span className="flex items-center gap-x-2 font_urbanist capitalize">{user.phone_prefix || null} {user.phone_number || "Set your phone no."} <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </button>
                <Link href="/user/address" className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Address<span className="flex items-center gap-x-2 font_urbanist capitalize"><p className="max-w-[10rem] truncate">{address?.shipping_address?.address || "Set your address"}</p> <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </Link>
                <button onClick={() => setLanguageModal(true)} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Language<span className="flex items-center gap-x-2 font_urbanist capitalize">English <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </button>
                <button onClick={() => setCurrencyModal(true)} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist_bold">
                    Currency<span className="flex items-center gap-x-2 font_urbanist capitalize">{currency} <i className="fa-solid fa-chevron-right text-xs"></i></span>
                </button>
            </section>
        </main>
    </>
    return <>
        <Head><title>My Profile</title></Head>
        <Newsletter show={letterModal} toggleModal={toggleLetterModal} />
        <User loading={userLoading}>
            <form className="mt-10 font_urbanist gap-y-5" onReset={handleReset} onSubmit={handleSubmit} >
                <h1 className='text-sm lg:text-base font_urbanist_bold' >Personal Information</h1>
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full text-sm ">
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 my-6">
                        {touched.title && errors.title ? <Tooltip classes="form-error" content={errors.title} /> : null}
                        <select value={values.title} name='title' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                            <option >Title</option>
                            <option id="Mr" value="Mr.">Mr</option>
                            <option id="Mrs" value="Mrs.">Ms</option>
                        </select>
                    </div>
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-6">
                        {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                        <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" id="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full text-sm">
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-6">
                        {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                        <input className="w-full bg-transparent outline-none border-none" type="lastname" name="lastname" id="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name" />
                    </div>
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-6">
                        {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                        <select value={values.gender} name='gender' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                            <option disabled >Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="fluid">Fluid</option>
                        </select>
                    </div>
                    {/* <div className="relative w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                                    {touched.gender && errors.gender ? <Tooltip classes="form-error" content={errors.gender} /> : null}
                                    <input className="w-full bg-transparent outline-none border-none" type="text" name="gender" id="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur} placeholder="Date Of Birth" />
                                </div> */}
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full text-sm">
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-6">
                        {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                        <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                            {countryCodes.map((item) => {
                                if (!item.code) return <option disabled>{item.name}</option>
                                return <option value={item.code}>{item.name} {item.code}</option>
                            })}
                        </select>
                    </div>
                    <div className="relative w-full md:w-2/5 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-6">
                        {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                        <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                    </div>
                </div>
                <div className="w-full text-sm">
                    <h1 className="text-sm lg:text-base font_urbanist_bold mt-5">Newsletter Subscription</h1>
                    <div className="flex items-center w-full md:w-3/4 my-7 gap-x-16">
                        <div className="w-1/2 md:w-1/4 flex justify-between">
                            Email<label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='active_by_email' checked={newsletterData?.active_by_email || false} value={newsletterData?.active_by_email} onChange={newsletterSubToggle} /><span className="slider"></span></label>
                        </div>
                        <div className="w-1/2 md:w-1/4 flex justify-between">
                            Phone<label className="switch w-[45px] md:w-11 h-6"><input type="checkbox" name='active_by_phone' checked={newsletterData?.active_by_phone || false} value={newsletterData?.active_by_phone} onChange={newsletterSubToggle} /><span className="slider"></span></label>
                        </div>
                    </div>
                    <div className=" w-full space-y-5 font_urbanist_light">
                        <p>Urban Fits processes the data collected to enable you to manage your information to facilitate your order. To find out more about how we manage your personal data and exercise your rights please refer to our privacy policy.</p>
                        <p>Mandatory information : If you choose not to consent to the collection of mandatory data (with an asterisk). You will not be able to manage your information.</p>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Button disabled={userLoading} type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/3 mx-2" font='font_urbanist_medium'>Cancel</Button>
                    <Button loading={userLoading} type="submit" classes="w-full md:w-1/3 ml-2" font='font_urbanist_medium'>Save</Button>
                </div>
            </form>
            <div className='w-full' >
                <div className='my-14 space-y-5' >
                    <h2 className="text-sm lg:text-base font_urbanist_bold">Email</h2>
                    <div className=" w-full data_field flex justify-between items-center border-b border-b-gray-200 text-sm hover:border-pink-300 transition py-2 mb-4">
                        <input className="w-full bg-transparent outline-none border-none" readOnly value={user.email} type="email" name="email" id="email" /><Link href='/user/emailaddress' >{user.register_provider === "urbanfits" ? <i className="material-symbols-outlined">edit_square</i> : null}</Link>
                    </div>
                </div>
                <div className='my-14 space-y-5' >
                    <h2 className="text-sm lg:text-base font_urbanist_bold mb-8">My Address</h2>
                    <div>
                        <h5 className='text-sm font_urbanist my-2'>Shipping</h5>
                        <AddressContainer type="shipping_address" />
                    </div>
                    <div>
                        <h5 className='text-sm font_urbanist my-2'>Billing</h5>
                        <AddressContainer type="billing_address" />
                    </div>
                </div>
            </div>
        </User>
    </>
}
