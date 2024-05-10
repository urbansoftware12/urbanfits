import { useEffect } from 'react'
import useUser from '@/hooks/useUser';
import useLanguage from '@/hooks/useLanguage';
import { addressTab as addressLang } from '@/locales';
import User from '.';
import Head from 'next/head';
import Error403 from '../403';
import Link from 'next/link';
import countryCodes from '@/static data/countryCodes';
import Button from '../../components/buttons/simple_btn';
import Spinner from '@/components/loaders/spinner';
import { UAEStates } from '@/uf.config';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../../components/tooltip';
import toaster from '@/utils/toast_function';

const AddressForm = ({ langObj, type, loading, address, heading, onsubmit }) => {
    const { values, errors, touched, handleChange, handleReset, handleBlur, handleSubmit, setValues } = useFormik({
        initialValues: {
            address_title: '',
            firstname: '',
            lastname: '',
            address: '',
            apt_suite: '',
            city: '',
            country: 'uae',
            state: '',
            phone_prefix: '+971',
            phone_number: ''
        },
        validationSchema: Yup.object({
            address_title: Yup.string().required("Please enter your address title"),
            firstname: Yup.string().min(2).max(30).required("Please enter your firstname"),
            lastname: Yup.string().min(2).max(30).required("Please enter your lastname"),
            address: Yup.string().min(2).required("Please enter your address"),
            apt_suite: Yup.string(),
            city: Yup.string().required("Please enter your city"),
            country: Yup.string().required("Please enter your country"),
            state: Yup.string().required("Please select a state"),
            phone_prefix: Yup.string().required("Please enter your phone prefix"),
            phone_number: Yup.string().min(9).required("Please enter your phone number"),
        }),
        onSubmit: async (values) => await onsubmit(values, type)
    })

    useEffect(() => {
        if (address && address[type]) setValues(address[type])
    }, [])

    return <form className={`mt-10 font_urbanist text-sm space-y-10 overflow-hidden ${loading && "animate-pulse pointer-events-none"}`} onReset={handleReset} onSubmit={handleSubmit} >
        <h1 className='text-base font_urbanist_bold' >{heading}</h1>
        <div className="relative w-full data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
            {touched.address_title && errors.address_title ? <Tooltip classes="form-error" content={errors.address_title} /> : null}
            <input className="w-full bg-transparent outline-none border-none" type="text" name="address_title" id="address_title" value={values.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title* e.g Home" />
        </div>
        <div className="flex justify-between w-full ">
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" id="firstname" value={values.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
            </div>
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="lastname" id="lastname" value={values.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
            </div>
        </div>
        <div className="relative w-full data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
            {touched.address && errors.address ? <Tooltip classes="form-error" content={errors.address} /> : null}
            <input className="w-full bg-transparent outline-none border-none" type="text" name="address" id="address" value={values.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
        </div>
        <div className="flex justify-between w-full ">
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.city && errors.city ? <Tooltip classes="form-error" content={errors.city} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="city" id="city" value={values.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
            </div>
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.apt_suite && errors.apt_suite ? <Tooltip classes="form-error" content={errors.apt_suite} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="apt_suite" id="apt_suite" value={values.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
            </div>
        </div>
        <nav className="w-full flex gap-x-8">
            <div className="relative w-1/2 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.country && errors.country ? <Tooltip classes="form-error" content={errors.country} /> : null}
                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='country' value={values.country} onBlur={handleBlur} onChange={handleChange} >
                    <option disabled >Country</option>
                    <option value="uae" selected>UAE (United Arab Emirates)</option>
                </select>
            </div>
            <div className="relative w-1/2 data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.state && errors.state ? <Tooltip classes="form-error" content={errors.state} /> : null}
                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='state' value={values.state} onBlur={handleBlur} onChange={handleChange} >
                    <option disabled value='' >State</option>
                    {Object.keys(UAEStates).map(state => <option value={state} selected>{UAEStates[state]}</option>)}
                </select>
            </div>
        </nav>
        <div className="flex justify-between w-full">
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                    {countryCodes.map((item) => {
                        if (!item.code) return <option disabled value=''>{item.name}</option>
                        return <option value={item.code}>{item.name} {item.code}</option>
                    })}
                </select>
            </div>
            <div className="relative w-48pr data_field flex items-center border-b border-b-gray-200 hover:border-pink-300 transition py-2 mb-4">
                {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
            </div>
        </div>
        <p className="font_urbanist text-[13px]">{langObj.addressTip.pt1} <br />{langObj.addressTip.pt2} <Link href="/policies/privacypolicy" className="underline">{langObj.addressTip.pt3}</Link>.</p>
        <div className="w-full flex justify-end space-x-4">
            <Button disabled={loading} type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/3" >{langObj.cancelBtn}</Button>
            <Button loading={loading} type="submit" classes="w-full md:w-1/3" >{langObj.saveBtn}</Button>
        </div>
    </form>
}

export default function Address() {
    const { user, isLoggedIn, address, updateAddress, getAddress, userLoading } = useUser();
    const { locale } = useLanguage();
    const langObj = addressLang[locale];

    useEffect(() => {
        getAddress();
    }, [])

    const onsubmit = (values, type) => {
        if (!["address1", "address2"].includes(type)) return toaster("error", "Invalid address type.")
        updateAddress({ [type]: values })
    }

    if (!user && !isLoggedIn()) return <Error403 />
    else if (user && window.matchMedia('(max-width: 760px)').matches) return <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <Link href="/user/myaccount" className='fa-solid fa-chevron-left text-xl'></Link>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                <h1 className="font_urbanist_medium text-lg">{langObj.title}</h1>
                {langObj.encryptedMsg}
            </div>
            <i className='w-0 h-0' />
        </div>
        <section className="w-full p-4 pb-20">
            {userLoading ? <div className="w-full py-40 flex justify-center"><Spinner forBtn variant="border-black" /></div> :
                <>
                    <AddressForm langObj={langObj} loading={userLoading} address={address} type="address1" heading={langObj.addOrChangeAddress + "1 "} onsubmit={onsubmit} />
                    <AddressForm langObj={langObj} loading={userLoading} address={address} type="address2" heading={langObj.addOrChangeAddress + "2 "} onsubmit={onsubmit} />
                </>}
        </section>
    </main>
    else return <>
        <Head><title>Addresses - UF</title></Head>
        <User loading={userLoading}>
            <AddressForm langObj={langObj} loading={userLoading} address={address} type="address1" heading={langObj.addOrChangeAddress + "1 "} onsubmit={onsubmit} />
            <AddressForm langObj={langObj} loading={userLoading} address={address} type="address2" heading={langObj.addOrChangeAddress + "2 "} onsubmit={onsubmit} />
        </User>
    </>
}