import { useState } from 'react'
import Button from '@/components/buttons/simple_btn';
import Loader from '@/components/loaders/loader';
import countryCodes from '@/static data/countryCodes';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function UserInfoModal({ user, updateUser, show, setUserInfoModal }) {
    const [loading, setLoading] = useState(false)
    const validatedSchema = Yup.object({
        firstname: Yup.string().min(2).required("Please enter your First name"),
        lastname: Yup.string().min(2).required("Please enter your Last name"),
        phone_prefix: Yup.string().required('Phone prefix is required to save'),
        phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save')
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { firstname: user.firstname || '', lastname: user.lastname || '', phone_prefix: user.phone_prefix || 'Select Country Code', phone_number: user.phone_number || '' },
        validationSchema: validatedSchema,
        onSubmit: async (values) => {
            setLoading(true)
            await updateUser(values)
            setLoading(false)
        }
    })

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setUserInfoModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                <h1 className="font_urbanist_medium text-lg">Personal Info</h1>
                All data will be encrypted
            </div>
            <i className='w-0 h-0' />
        </div>
        {loading ? <Loader /> : null}
        <form className="w-full px-4 flex flex-col font_urbanist" onSubmit={handleSubmit} onReset={handleReset}>
            <h2 className="my-4 font_urbanist_bold text-base">Name*</h2>
            <div className={`relative w-full data_field flex items-center border-b ${touched.firstname && errors.firstname ? "border-red-500" : "border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-6`}>
                <input className="w-full bg-transparent outline-none border-none" type="text" name="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" />
            </div>
            <div className={`relative w-full data_field flex items-center border-b ${touched.lastname && errors.lastname ? "border-red-500" : "border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-6`}>
                <input className="w-full bg-transparent outline-none border-none" type="text" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" />
            </div>
            <h2 className="my-4 font_urbanist_bold text-base">Phone No.*</h2>
            <div className={`relative w-full data_field flex items-center border-b ${touched.phone_prefix && errors.phone_prefix ? "border-red-500" : "border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-6`}>
                <select value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                    {countryCodes.map((item) => {
                        if (!item.code) return <option disabled>{item.name}</option>
                        return <option value={item.code}>{item.name} {item.code}</option>
                    })}
                </select>
            </div>
            <div className={`relative w-full data_field flex items-center border-b ${touched.phone_number && errors.phone_number ? "border-red-500" : "border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-6`}>
                <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
            </div>
            <div className="w-full my-4 flex gap-x-4">
                <Button loading={loading} onClick={() => setUserInfoModal(false)} type="reset" bg="bg-gray-100" text="black" classes="w-1/2" font='font_urbanist_medium'>Cancel</Button>
                <Button loading={loading} type="submit" classes="w-1/2" font='font_urbanist_medium'>Save</Button>
            </div>
        </form>
    </section>
}