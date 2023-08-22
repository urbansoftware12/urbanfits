import React, { useState, useEffect } from 'react'
import useUser from '@/hooks/useUser';
import User from '.';
import Head from 'next/head';
import useAddress from '@/hooks/useAddress';
import Error403 from '../403';
import countryCodes from '@/static data/countryCodes';
import Button from '../../components/buttons/simple_btn';
import Loader from '@/components/loaders/loader';
// imports for the schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../../components/tooltip';

const AddressForm = (props) => {
    const { type, loading, address } = props
    const { values, errors, touched, handleChange, handleReset, handleBlur, handleSubmit, setValues } = useFormik({
        initialValues: {
            address_title: '',
            firstname: '',
            lastname: '',
            address: '',
            apt_suite: '',
            city: '',
            country: 'Country',
            phone_prefix: 'Select Country Code',
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
            phone_prefix: Yup.string().required("Please enter your phone prefix"),
            phone_number: Yup.string().min(9).required("Please enter your phone number"),
        }),
        onSubmit: async (values) => await props.onsubmit(values, type)
    })

    useEffect(() => {
        if (!address || !address[type]) return
        setValues(address[type])
    }, [])

    return (
        <form className="mt-10 font_urbanist text-sm space-y-10 overflow-hidden" onReset={handleReset} onSubmit={handleSubmit} >
            <h1 className='text-sm lg:text-base font_urbanist_bold' >{props.heading}</h1>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.address_title && errors.address_title ? <Tooltip classes="form-error" content={errors.address_title} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="address_title" id="address_title" value={values.address_title} onBlur={handleBlur} onChange={handleChange} placeholder="Address Title*" />
            </div>
            <div className="flex justify-between w-full ">
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.firstname && errors.firstname ? <Tooltip classes="form-error" content={errors.firstname} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" id="firstname" value={values.firstname} onBlur={handleBlur} onChange={handleChange} placeholder="First Name" />
                </div>
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.lastname && errors.lastname ? <Tooltip classes="form-error" content={errors.lastname} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="lastname" id="lastname" value={values.lastname} onBlur={handleBlur} onChange={handleChange} placeholder="Last Name" />
                </div>
            </div>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.address && errors.address ? <Tooltip classes="form-error" content={errors.address} /> : null}
                <input className="w-full bg-transparent outline-none border-none" type="text" name="address" id="address" value={values.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address 1*" />
            </div>
            <div className="flex justify-between w-full ">
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.city && errors.city ? <Tooltip classes="form-error" content={errors.city} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="city" id="city" value={values.city} onBlur={handleBlur} onChange={handleChange} placeholder="City*" />
                </div>
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.apt_suite && errors.apt_suite ? <Tooltip classes="form-error" content={errors.apt_suite} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="apt_suite" id="apt_suite" value={values.apt_suite} onBlur={handleBlur} onChange={handleChange} placeholder="Apt or Suite (optional)" />
                </div>
            </div>
            <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                {touched.country && errors.country ? <Tooltip classes="form-error" content={errors.country} /> : null}
                <select className="w-full border-none outline-none bg-transparent border-b-gray-800" name='country' value={values.country} onBlur={handleBlur} onChange={handleChange} >
                    <option disabled >Country</option>
                    <option value="uae">UAE</option>
                    <option value="usa">USA</option>
                    <option value="pk">Pakistan</option>
                </select>
            </div>
            <div className="flex justify-between w-full">
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                    <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                        {countryCodes.map((item) => {
                            if (!item.code) return <option disabled>{item.name}</option>
                            return <option value={item.code}>{item.name} {item.code}</option>
                        })}
                    </select>
                </div>
                <div className="relative w-48pr data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                </div>
            </div>
            <div className="w-full flex justify-end space-x-4">
                <Button disabled={loading} type="reset" bg="bg-gray-100" text="black" classes="w-full md:w-1/3" >Cancel</Button>
                <Button loading={loading} type="submit" classes="w-full md:w-1/3" >Save</Button>
            </div>
        </form>)
}

export default function Address() {
    const { user } = useUser()
    const { address, updateAddress, getAddress } = useAddress()
    const [loading, setLoading] = useState(false)
    const [updatelLoad, setUpdatelLoad] = useState(false)

    useEffect(() => {
        return async () => {
            if (!address) {
                setLoading(true)
                await getAddress()
                setLoading(false)
            }
            if (!address) return
        }
    }, [address])

    const onsubmit = async (values, type) => {
        setUpdatelLoad(true)
        if (type === 'shipping_address') await updateAddress({ shipping_address: values })
        if (type === 'billing_address') await updateAddress({ billing_address: values })
        setUpdatelLoad(false)
    }

    if (!user) return <Error403 />
    return (
        <>
            <Head>
                <title>Addresses - UF</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <User>
                {loading ? <div className="w-full h-screen flex justify-center items-center text-base md:text-xl font_urbanist_medium tracking-widest">LOADING...</div> :
                    <>
                        <AddressForm loading={updatelLoad} address={address} type="shipping_address" heading="Add or change the Shipping Address" onsubmit={onsubmit} />
                        <AddressForm loading={updatelLoad} address={address} type="billing_address" heading="Add or change the Billing Address" onsubmit={onsubmit} />
                    </>}
            </User>
        </>
    )
}