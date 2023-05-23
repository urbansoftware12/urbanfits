import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import useUser from '@/hooks/useUser';
import useAddress from '@/hooks/useAddress';
import countryCodes from '@/static data/countryCodes';
import toaster from '../utils/toast_function';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Loader from './loader';
import Button from './buttons/simple_btn'
import LinkBtn from './buttons/link_btn'
// imports for images
import Urbanfit_logo from '../public/logos/logo_gold_outlined.svg'
import google_logo from '../public/logos/google-logo.svg'
import apple_logo from '../public/logos/apple-logo.svg';

// imports for validation
import { useFormik } from 'formik';
import Tooltip from './tooltip';


export default function Signing(props) {
    const { data: session } = useSession()
    const { page } = props
    const [resendOption, setResendOption] = useState(null)
    // configuring router
    const router = useRouter()
    //state to handle loader component
    const [loader, setLoader] = useState(false)
    const { updateUser } = useUser()
    const { initiateAddress } = useAddress()
    //                                      Submit function

    // setting request method according to the pathname
    const getMethod = () => {
        if (router.pathname === "/resetpassword") return "PUT"
        else return "POST"
    }
    const onsubmit = async (values, x, oAuthQuery) => {
        try {
            setLoader(<Loader />)
            let path = router.pathname
            let response = await fetch(`${process.env.HOST}/api/user${path}${oAuthQuery ? oAuthQuery : ''}`, {
                method: getMethod(),
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            let res = await response.json()
            if (res.success && res.payload) {
                updateUser(res.payload, true)
                await initiateAddress(res.payload, router)
                toaster("success", res.msg)
            }
            else if (res.resetPassToken && res.success) {
                setResendOption(<span>We just sent you and email, check your inbox and follow the link. <br /> Didn't get the mail? <button type='submit' className="border-b border-b-yellow-700">Resend Email</button></span>)
                return setLoader(null)
            }
            else if (res.resetPassword) {
                toaster('success', res.msg)
                setLoader(null)
                return router.push('/login')
            }
            else {
                setLoader(null)
                return toaster('error', res.msg)
            }
            setLoader(null)
            router.push('/user/personalinfo')
        }
        catch (error) {
            setLoader(null)
            console.log(error)
            toaster("error", "Sorry some error occurred, We're trying to fix it")

        }
    }
    //onSubmit function and destructuring Formik functions
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: props.initialValues,
        validationSchema: props.validationSchema,
        onSubmit: onsubmit
    })
    const oauth = localStorage.getItem('oauth')
    useEffect(() => {
        if (oauth && session) {
            let username = session.user.email.split('@')[0]
            let name = session.user.name.split(' ')
            let firstname = name[0]
            name.shift()
            let lastname = name.join(' ')
            const loginDetails = { email: session.user.email, username, firstname, lastname, image: session.user.image }
            onsubmit(loginDetails, null, '?auth=OAuth')
            return localStorage.setItem('oauth', false)
        }
        else return
    }, [session])

    const sessionValidity = (e) => {
        if (page === 'login') {
            const checked = e.target.checked
            localStorage.setItem('remember_me', checked)
        }
    }
    return (
        <>
            <Head>
                <title>Urban Fits - {page === 'login' ? 'Login' : 'Sign Up'}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loader}
            <main className={`bg-white lg:overflow-x-hidden`}>
                <section className='lg:flex lg:items-center text-center lg:justify-center min-w-screen min-h-screen' >
                    <div className=" w-[95%] md:w-full lg:w-[470px] mt-16 lg:mt-0 mx-auto ">
                        <h2 className="w-full lg:w-[470px]- font_gotham_medium text-2xl lg:text-[38px] lg:leading-[47px]">Join Our Urban Program <br /> and get free Shipping <br /> & free returns on <br /> every order</h2>
                        <br />
                        <p className="font_gotham_light text-xl md:text-2xl">Urban Members get Exclusive <br /> access to products, events, <br /> and offers. Just provide a <br /> few details. It’s free to join and <br /> open to all.</p>
                    </div>

                    <div className=" w-[95%] md:w-3/5 lg:w-1/3 max-w-[400px] mx-auto py-16 pb-20 font_gotham bg-white">
                        <Image src={Urbanfit_logo} alt="Urbanfits Logo" className='w-[100px] h-[100px] mx-auto mb-8' />
                        {/* These buttons of Google and Apple will show on the top in Loin page */}
                        <div className={`${router.pathname === '/login' ? '' : 'hidden'} w-full mt-3 mb-5 flex justify-center space-x-6`}>
                            <span onClick={() => { localStorage.setItem('oauth', true); signIn("google") }} className="w-[190px] h-12 py-2 px-9 bg-gray-100 border border-gray-400 rounded-full hover:shadow-xl transition cursor-pointer"><a href='#' title="Continue with Google" className='text-lg flex justify-center items-center'><Image src={google_logo} className='w-1/4 mr-3' alt="google" /><p>Google</p></a></span>
                            <button className="w-[190px] h-12 py-2 px-9 border border-black bg-black rounded-full hover:shadow-xl transition"><span title="Continue with Apple" className='text-lg flex justify-center items-center'><Image src={apple_logo} className='w-1/5 mr-3' alt="apple" /><p className=' text-white' >Apple</p></span></button>
                        </div>
                        <form className="bg-white p-2 font_gotham text-xl" onReset={handleReset} onSubmit={handleSubmit} >
                            <div className={`relative data_field ${page === 'login' ? 'hidden' : ''} flex items-center border-b  focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                                {touched.username && errors.username ? <Tooltip classes="form-error" content={errors.username} /> : null}
                                <input className="w-full outline-none border-none" type="text" name="username" id="username" value={values.username} onBlur={handleBlur} onChange={handleChange} placeholder="Username" />
                            </div>
                            <div className={` ${page === "login" && props.type === "resetpass" ? "hidden" : ''} relative data_field lex items-center border-b  focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                                {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                                <input className="w-full outline-none border-none" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder={router.pathname === '/login' || router.pathname === '/forgotpassword' ? 'Username or Email' : 'Email'} />
                            </div>
                            {resendOption}
                            <div className={`${page === 'login' ? 'hidden' : ''} relative data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                                {touched.phone_prefix && errors.phone_prefix ? <Tooltip classes="form-error" content={errors.phone_prefix} /> : null}
                                <select defaultValue='Country Code' value={values.phone_prefix} name='phone_prefix' onBlur={handleBlur} className="w-full border-none outline-none bg-transparent border-b-gray-800" onChange={handleChange}>
                                    <option value={null}>Select Country Code</option>
                                    {countryCodes.map((item) => {
                                        if (!item.code) return <option disabled>{item.name}</option>
                                        return <option value={item.code}>{item.name} {item.code}</option>
                                    })}
                                </select>
                            </div>
                            <div className={`${page === 'login' ? 'hidden' : ''} relative data_field flex items-center border-b focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                                {touched.phone_number && errors.phone_number ? <Tooltip classes="form-error" content={errors.phone_number} /> : null}
                                <input className="w-full bg-transparent outline-none border-none" type="tel" name="phone_number" id="phone_number" size="15" maxLength={15} value={values.phone_number} onBlur={handleBlur} onChange={handleChange} placeholder="Phone Number" />
                            </div>
                            <div className={`relative  ${props.type === 'forgotpass' ? 'hidden' : ''} data_field lex items-center border-b  focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4`}>
                                {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                                <input className="w-full outline-none border-none" type='password' name="password" id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder={router.pathname === '/resetpassword' ? 'New Password' : 'Password'} />
                            </div>
                            <div className={`relative  ${props.type === 'resetpass' ? '' : 'hidden'} data_field lex items-center border-b  focus:border-yellow-700 hover:border-yellow-600 transition py-2`}>
                                {touched.confirm_password && errors.confirm_password ? <Tooltip classes="form-error" content={errors.confirm_password} /> : null}
                                <input className="w-full outline-none border-none" type='password' name="confirm_password" id="confirm_password" value={values.confirm_password} onBlur={handleBlur} onChange={handleChange} placeholder="Confirm Password" />
                            </div>
                            <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                                {props.type === 'forgotpass' ? 'Please enter your username or email address. You will receive an email message with instructions on how to reset your password.' : 'Password must be at least 8 characters and can’t be easy to guess - commonly used or risky passwords are not premitted.'}
                            </div>
                            <div className={`relative ${props.type === 'forgotpass' ? 'hidden' : ''} w-full h-14 mb-5 flex items-center`}>
                                {touched.accept_policies && errors.accept_policies ? <Tooltip classes="form-error" content={errors.accept_policies} /> : null}
                                <div className='mr-2' >
                                    <input className='rounded' type="checkbox" id="todo" name="accept_policies" value={values.accept_policies} onChange={(e) => { handleChange(e); sessionValidity(e) }} />
                                </div>
                                <div className=" w-full flex justify-between text-sm text-left">
                                    <span className="ml-1 text-gray-400">{page === 'login' ? 'Remember me' : <p>By creating an account, I agree to the <Link href="/terms&conditions" className=' text-black underline' >Terms & Conditions</Link>.I have read the <Link href="/legalnotice" className=' text-black underline' >Legal Notice</Link> and <Link href="/privacypolicy" className=' text-black underline' >Privacy Policy</Link></p>}</span>
                                    <span className="ml-1 text-gray-400"><Link href="/forgotpassword" >{router.pathname === '/login' ? 'Forgot Password?' : ''}</Link></span>
                                </div>
                            </div>
                            {/* changing Buttons according to different page endpoints */}
                            {router.pathname === '/signup' ? <Button classes='w-full tracking-expand' font='font_gotham_medium' fontSize='text-sm' type="submit" >SIGN UP</Button> : null}
                            {router.pathname === '/login' ? <Button classes='w-full tracking-expand' font='font_gotham_medium' fontSize='text-sm' type="submit" >LOGIN</Button> : null}
                            {router.pathname === '/forgotpassword' ? <Button classes='w-full tracking-expand' font='font_gotham_medium' fontSize='text-sm' type="submit" >VERIFY</Button> : null}
                            {router.pathname === '/resetpassword' ? <Button classes='w-full tracking-expand' font='font_gotham_medium' fontSize='text-sm' type="submit" >LOGIN</Button> : null}

                            <Link href={page === 'login' ? '/signup' : '/login'} className='underline text-xs md:text-sm'><h1 className='w-full text-center' >{page === 'login' ? 'Create a New Account' : 'Log in with an Existing Account'}</h1></Link>
                        </form>
                        {/* These buttons of Google and Apple will show on the bottom only in Sign Up page */}
                        <div className={`${page === 'login' ? 'hidden' : ''} font_gotham w-full mt-5 flex justify-center space-x-6`}>
                            <span onClick={() => { localStorage.setItem('oauth', true); signIn("google") }} className="w-[190px] h-12 py-2 px-9 bg-gray-100 border border-gray-400 rounded-full hover:shadow-xl transition cursor-pointer"><span title="Continue with Google" className='text-lg flex justify-center items-center'><Image src={google_logo} className='w-1/4 mr-3' alt="google" /><p>Google</p></span></span>
                            <button className="w-[190px] h-12 py-2 px-9 border border-black bg-black rounded-full hover:shadow-xl transition"><span title="Continue with Google" className='text-lg flex justify-center items-center'><Image src={apple_logo} className='w-1/5 mr-3' alt="apple" /><p className='text-white' >Apple</p></span></button>
                        </div>
                    </div>
                </section>

                <div className="w-full max-w-[400px] mx-auto lg:max-w-none my-5 px-10 font_gotham hidden lg:flex justify-between lg:space-x-3">
                    <LinkBtn href='/' classes='w-full'>HOME</LinkBtn>
                    <LinkBtn href='/catelog' classes='w-full'>CATALOG</LinkBtn>
                    <LinkBtn href='/contact' classes='w-full'>CONTACT US</LinkBtn>
                    <LinkBtn href='/privacypolicy' classes='w-full'>PRIVACY POLICY</LinkBtn>
                    <LinkBtn href='/legalnotice' classes='w-full'>LEGAL NOTICE</LinkBtn>
                    <LinkBtn href='/terms&conditions' classes='w-full'>TERMS & CONDITIONS</LinkBtn>
                </div>
            </main>
        </>
    )
}
