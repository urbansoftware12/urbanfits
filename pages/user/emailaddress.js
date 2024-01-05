import React, { useState, useRef } from 'react'
import Error403 from '../403';
import useUser from '@/hooks/useUser';
import User from '.';
import Link from 'next/link'
import toaster from '@/utils/toast_function';
import Head from 'next/head';
import Loader from '@/components/loaders/loader';
import Button from '../../components/buttons/simple_btn';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import mongoose from 'mongoose';
import Tooltip from '../../components/tooltip';

export default function EmailPassword() {
    const { user, matchOtpAndUpdate, logOut } = useUser()
    const [showPass, setShowPass] = useState(false)
    const passRef = useRef()
    const [otpId, setOtpId] = useState(null)
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const validatedSchema = Yup.object({
        old_email: Yup.string().email().required("Please enter your email address"),
        new_email: Yup.string().email().required("Please enter new email address"),
        password: Yup.string().min(8).max(30).required("Please enter your password")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { old_email: user?.email, password: '', new_email: '' },
        validationSchema: validatedSchema,
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

    if (!user || user.register_provider !== "urbanfits") return <Error403 />
    if (window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>Email</title></Head>
        <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
            <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
                <Link href="/user/myaccount" className='fa-solid fa-chevron-left text-xl'></Link>
                <div className="flex flex-col justify-center items-center font_urbanist text-xs text-gray-400">
                    <h1 className="font_urbanist_medium text-lg">Email Address</h1>
                    All data will be encrypted
                </div>
                <i className='w-0 h-0' />
            </div>
            <div className="w-full mt-7 px-4 flex flex-col">
                <div className="flex justify-between items-center p-4 rounded-md bg-gray-50 font_urbanist text-sm">
                    <span className="text-base">{user.email}</span>
                    {user.register_provider !== "urbanfits" ? null : <Link href="/user/change-email">Change</Link>}
                </div>
                <p className="mt-2 font_urbanist text-[15px]">The bound email can be used as a login username and will act as a security verification when authentication is enabled.</p>
                <div className="w-full mt-5 flex items-center justify-between font_urbanist_medium text-base">
                    Email verification
                    <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='active_by_email' /><span className="slider"></span></label>
                </div>
            </div>
        </main>
    </>
    else return <>
        <Head><title>Email</title></Head>
        <User>
            {loading ? <Loader /> : null}
            <form className="w-full mt-10 font_urbanist text-sm overflow-x-hidden" onReset={handleReset} onSubmit={handleSubmit} >
                <h1 className='mb-10 text-sm lg:text-base font_urbanist_bold' >Change Email</h1>
                <h2 className='text-sm font_urbanist_medium' >Current Email</h2>
                <div className={`relative w-full mb-10 data_field flex items-center border-b ${touched.old_email && errors.old_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2`}>
                    {touched.old_email && errors.old_email ? <Tooltip classes="form-error" content={errors.old_email} /> : null}
                    <input disabled className="w-full bg-transparent outline-none border-none" name="old_email" id="old_email" value={values.old_email} onChange={handleChange} onBlur={handleBlur} placeholder="Email*" />
                </div>
                <h2 className='text-sm font_urbanist_medium' >New Email</h2>
                <div className={`relative w-full mb-10 data_field flex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2`}>
                    {touched.new_email && errors.new_email ? <Tooltip classes="form-error" content={errors.new_email} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" name="new_email" id="new_email" value={values.new_email} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm Email*" />
                </div>
                <div className='w-full flex justify-between items-center text-sm font_urbanist_medium' ><h2>Current Password</h2> <button type='button' onClick={() => { logOut(); useRouter().push("/auth/resetpassword") }} className='text-xs flex items-center' >Change<i className="material-symbols-outlined text-sm ml-2">edit_square</i></button></div>
                <div className={`relative data_field flex items-center border-b ${touched.password && errors.password ? "border-red-500" : "focus:border-yellow-700 hover:border-yellow-600"} transition py-2 mb-4`}>
                    {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                    <input ref={passRef} className={`w-full outline-none border-none ${values.password && "tracking-2"}`} type={showPass ? "text" : "password"} id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password*' />
                    <i onClick={() => {
                        passRef.current.focus();
                        return setShowPass(!showPass);
                    }} className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"} text-black font-bold cursor-pointer select-none`} />
                </div>
                {otpId ? <><h2 className='mt-10 text-[15px] font_urbanist_bold' >Enter OTP</h2>
                    <div className={`relative data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                        <input value={otp} type='number' onChange={(e) => setOtp(e.target.value)} className="w-full outline-none border-none" name="otp" id="otp" placeholder='Enter OTP' />
                    </div>
                    <span className="w-full my-4 flex text-xs font_urbanist text-gray-400">
                        We just send you a 5-6 digit code, please check your email and submit the code here. The code will be expired in 5 minutes.
                    </span>
                    <div className="w-full flex items-center text-xs font_urbanist text-gray-400 gap-x-10">
                        Didn't get the email?
                        <button type="submit" className="text-black underline">Resend Code</button>
                    </div>
                </> : null}
                <div className="w-full flex justify-end space-x-4">
                    <Button loading={loading} type="reset" bg="bg-gray-100" text="black" font='font_urbanist_medium' classes="w-full md:w-1/3" >Cancel</Button>
                    {otpId ?
                        <Button onClick={matchOtpAndUpdateEmail} type="button" loading={loading} disabled={!otp || otp.length < 5} classes="w-full md:w-1/3" font='font_urbanist_medium'>Change Email</Button> :
                        <Button loading={loading} type="submit" classes="w-full md:w-1/3" font='font_urbanist_medium'>Send OTP</Button>
                    }
                </div>
            </form>
        </User>
    </>
}