import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthPage from "."
import Button from '@/components/buttons/simple_btn';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import toaster from '@/utils/toast_function';
import AlertPage from '@/components/alertPage';
import Tooltip from '@/components/tooltip';
import * as Yup from 'yup'
import { useFormik } from 'formik';

export default function ResetPassword() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState(null)
    const [token, setToken] = useState(null)

    const onsubmit = async (values) => {
        console.log(values, token)
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.HOST}/api/user/resetpassword`, { ...values, token })
            if (res.data.success && res.data.resetPassword) {
                const { data } = res
                toaster("success", data.msg)
                router.push('/auth/login')
            }
            else {
                const { data } = res.response
                toaster("error", data.msg)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    const resetpassSchema = Yup.object({
        email: Yup.string().email().required('Email is required to change your password'),
        password: Yup.string().min(8).max(30).required("Please enter your password"),
        confirm_password: Yup.string().min(8, "Password must be atleast 8 characters").max(30, "Password cannot exceed 30 characters").required("Please enter your password").oneOf([Yup.ref("password"), null], "Password must match")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setValues } = useFormik({
        initialValues: { email: payload?.email, password: '', confirm_password: '' },
        validationSchema: resetpassSchema,
        onSubmit: onsubmit
    })

    useEffect(() => {
        const resetpassToken = router.query.token
        const decodedToken = jwt.decode(resetpassToken)
        setPayload(decodedToken)
        setToken(resetpassToken)
        setValues({ ...values, email: decodedToken?.email })
    }, [router.query])

    const unixTime = Math.floor(Date.now() / 1000)
    if (!payload || payload.exp <= unixTime) return <AlertPage type="error" heading="Oh Snap! Session Expired" message="The content your are trying to access either invalid or expired. Please try again." />

    return (
        <>
            <AuthPage loading={loading} >
                <form className="bg-white p-2 font_gotham text-xl overflow-x-hidden" onReset={handleReset} onSubmit={handleSubmit} >
                    <div className={`relative data_field lex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                        <span className="w-full outline-none border-none" name="email" id="email" value={values.email} placeholder='Email' >{values.email}</span>
                    </div>
                    <div className={`relative data_field lex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                        {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                        <input className="w-full outline-none border-none" type='password' name="password" id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password' />
                    </div>
                    <div className={`relative data_field lex items-center border-b  focus:border-yellow-700 hover:border-yellow-600 transition py-2`}>
                        {touched.confirm_password && errors.confirm_password ? <Tooltip classes="form-error" content={errors.confirm_password} /> : null}
                        <input className="w-full outline-none border-none" type='password' name="confirm_password" id="confirm_password" value={values.confirm_password} onBlur={handleBlur} onChange={handleChange} placeholder="Confirm Password" />
                    </div>
                    <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                        Password must be at least 8 characters and can’t be easy to guess - commonly used or risky passwords are not premitted.
                    </div>
                    <Button loading={loading} classes='w-full tracking-expand' font='font_gotham_medium' fontSize='text-sm' type="submit" >UPDATE</Button>
                    <Link href='/auth/login' className='underline text-xs md:text-sm'><h1 className='w-full text-center' >Log in with an Existing Account</h1></Link>
                </form>
            </AuthPage>
        </>
    )
}