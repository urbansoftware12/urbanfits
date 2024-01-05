import React, { useRef, useState } from 'react'
import Link from 'next/link'
import useUser from '@/hooks/useUser';
import Button from '@/components/buttons/simple_btn';
import Tooltip from '@/components/tooltip';
import Loader from '@/components/loaders/loader';
import Error404 from '../404'
import toaster from '@/utils/toast_function';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios';
import mongoose from 'mongoose';

export default function ChangeEmail() {
    const { user, matchOtpAndUpdate, logOut } = useUser()
    const [showPass, setShowPass] = useState(false)
    const passRef = useRef()
    const [otpId, setOtpId] = useState(null)
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const initialSignupValues = { new_email: '', old_email: user.email, password: '' }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: initialSignupValues,
        validationSchema: Yup.object({
            new_email: Yup.string().email().required("Please enter your new email address"),
            old_email: Yup.string().email().required(),
            password: Yup.string().min(8).max(30).required('Please enter your password')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/emailauth-via-otp`, values)
                if (data.otp_id && mongoose.Types.ObjectId.isValid(data.otp_id)) {
                    setOtpId(data.otp_id)
                    toaster("info", data.msg)
                }
                else toaster("error", "Something went wrong, please try again.")
            } catch (error) {
                setOtpId(null)
                console.log(error)
                toaster("error", error.response.data.msg)
            }
            setLoading(false)
        }
    })
    const matchOtpAndUpdateEmail = async () => {
        setLoading(true)
        await matchOtpAndUpdate({
            otp_id: otpId,
            otp
        })
        setLoading(false)
    }

    if (user.register_provider !== "urbanfits" || window.matchMedia('(min-width: 1024px)').matches) return <Error404 />
    return <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <Link href="/user/emailaddress" className='fa-solid fa-chevron-left text-xl'></Link>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs text-gray-400">
                <h1 className="font_urbanist_medium text-lg">Change the linked email</h1>
                All data will be encrypted
            </div>
            <i className='w-0 h-0' />
        </div>
        {loading ? <Loader /> : null}
        <form onSubmit={handleSubmit} onReset={handleReset} className="w-full h-full p-4 mt-7 font_urbanist flex flex-col justify-between">
            <section className="w-full">
                <label htmlFor="email" className='font_urbanist text-sm'>New Email Address</label>
                <div className={`relative data_field flex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                    {touched.new_email && errors.new_email ? <Tooltip classes="form-error" content={errors.new_email} /> : null}
                    <input className="w-full outline-none border-none" name="new_email" id="new_email" value={values.new_email} onBlur={handleBlur} onChange={handleChange} placeholder='Please new email address' />
                </div>
                <label htmlFor="email" className='font_urbanist text-sm'>Current Password</label>
                <div className={`relative data_field flex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                    {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                    <input ref={passRef} className="w-full outline-none border-none" type={showPass ? "text" : "password"} id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password' />
                    <i onClick={() => {
                        passRef.current.focus();
                        return setShowPass(!showPass);
                    }} className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"} text-black font-bold cursor-pointer select-none`} />
                </div>
                {otpId ? <><div className="w-full my-6 flex justify-between items-center font_urbanist text-10px text-black">
                    <i className="w-[40%] h-px bg-black" />
                    Enter OTP code
                    <i className="w-[40%] h-px bg-black" />
                </div>
                    <div className={`relative data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                        <input value={otp} type='number' onChange={(e) => setOtp(e.target.value)} className="w-full outline-none border-none" name="otp" id="otp" placeholder='Enter OTP' />
                    </div>
                    <span className="w-full my-4 flex justify-center items-center text-xs font_urbanist text-gray-400">
                        We just send you a 5-6 digit code, please check your email and submit the code here. The code will be expired in 5 minutes.
                    </span>
                    <div className="w-full flex justify-between items-center text-xs font_urbanist text-gray-400">
                        Didn't get the email?
                        <button type="submit" className="text-black underline">Resend Code</button>
                    </div>

                </> : null}
            </section>
            {otpId ? <Button onClick={matchOtpAndUpdateEmail} type="button" loading={loading} disabled={!otp || otp.length < 5} classes="w-full">Change Email</Button> :
                <Button loading={loading} type="submit" classes="w-full">Send OTP</Button>}
        </form>
    </main>
}