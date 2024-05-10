import { useState, useEffect, useRef } from 'react'
import AuthPage from '.'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Button from '@/components/buttons/simple_btn'
import Head from 'next/head'
import Tooltip from '@/components/tooltip'
import AlertPage from '@/components/alertPage'
import useUser from '@/hooks/useUser'
import * as Yup from 'yup'
import { useFormik } from 'formik'
//Image imports
import Image from 'next/image'
import google_logo from '@/public/logos/google-logo.svg'


export default function Login() {
    const router = useRouter()
    const { user, signIn, signInWithGoogle, isLoggedIn, userLoading } = useUser();
    const [showPass, setShowPass] = useState(false)
    const passRef = useRef();

    useEffect(() => {
        const { google } = window;
        if (!google?.accounts) { return };
        const googleClient = google.accounts.id;
        googleClient.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            use_fedcm_for_prompt: true,
            ux_mode: "popup",
            callback: googleSession => signInWithGoogle(googleSession.credential, null, router)
        });
        google.accounts.id.renderButton(
            document.getElementById("signin_with_google_btn"),
            { width: "1000px", size: "large" }
        );

        return () => googleClient.cancel()
    }, []);

    const loginSchema = Yup.object({
        email: Yup.mixed().test('valid', 'Invalid email or username', function (value) {
            const { path, createError } = this;
            if (Yup.string().required('Email or Username is required').email().isValidSync(value)) return true;
            if (Yup.string().required('Email or Username is required').min(5, 'Username must be atleast 5 characters').matches(/^[a-zA-Z0-9_]+$/, 'Invalid username').isValidSync(value)) return true;
            return createError({ path, message: 'Invalid Email or Username' });
        }),
        password: Yup.string().min(8).max(30).required('Please enter your password'),
        remember_me: Yup.boolean()
    })
    const initialSignupValues = { email: '', password: '', remember_me: false, register_provider: 'urbanfits' }
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: initialSignupValues,
        validationSchema: loginSchema,
        onSubmit: values => signIn(values, null, router)
    })

    if (isLoggedIn() && user?.email) return <AlertPage type="success" heading="You are already signed in !" />
    return <>
        <Head><title>Urban Fits - Login</title></Head>
        <AuthPage loading={userLoading} mblNav="/auth/signup" mblNavName="Register">
            <form className="w-full h-full lg:h-auto bg-white p-2 lg:p-0 font_urbanist text-base flex flex-col justify-between md:justify-around lg:block" onReset={handleReset} onSubmit={handleSubmit} >
                <section className="w-full mb-6 md:mb-0">
                    <h1 className="lg:hidden text-[22px] mb-5 text-left font_urbanist">Login</h1>
                    <div className={`relative data_field lex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-pink-300"} transition py-2 mb-4`}>
                        {touched.email && errors.email ? <Tooltip classes="form-error" content={errors.email} /> : null}
                        <input className="w-full outline-none border-none" name="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='Username or Email' />
                    </div>
                    <div className={`relative data_field flex items-center border-b ${touched.new_email && errors.new_email ? "border-red-500" : "focus:border-pink-300"} transition py-2 mb-4`}>
                        {touched.password && errors.password ? <Tooltip classes="form-error" content={errors.password} /> : null}
                        <input ref={passRef} className={`w-full outline-none border-none ${values.password ? "tracking-2" : null}`} type={showPass ? "text" : "password"} id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Password' />
                        <i onClick={() => {
                            passRef.current.focus();
                            return setShowPass(!showPass);
                        }} className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"} text-black font-bold cursor-pointer select-none`} />
                    </div>
                    <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                        Password must be at least 8 characters and can’t be easy to guess - commonly used or risky passwords are not premitted.
                    </div>
                </section>

                <section>
                    <div className="relative w-full mb-2 flex items-center">
                        {touched.remember_me && errors.remember_me ? <Tooltip classes="form-error" content={errors.remember_me} /> : null}
                        <div className="w-full flex justify-between items-center text-gray-400 text-sm">
                            <div className='flex items-center gap-x-2'>
                                <span>
                                    <input className='rounded' type="checkbox" id="remember_me" name="remember_me" value={values.remember_me} onChange={handleChange} />
                                </span>
                                <label htmlFor='remember_me' className="w-full -translate-y-0.5 cursor-pointer text-gray-400">Remember me</label>
                            </div>
                            <Link href="/auth/resetpassword">Forgot Password?</Link>
                        </div>
                    </div>
                    <Button loading={userLoading} my="my-4" classes='w-full' type="submit">Login</Button><div className="lg:hidden w-full flex justify-between items-center font_urbanist text-sm">
                        <span className="w-2/5 h-px bg-gray-200"></span>
                        login via
                        <span className="w-2/5 h-px bg-gray-200"></span>
                    </div>
                    <Link href='/auth/signup' className='hidden lg:block underline text-xs md:text-sm'><h1 className='w-full text-center'>Create a New Account</h1></Link>
                    <button type='button' name='google' onClick={() => document.querySelector("#signin_with_google_btn").click()} className="relative group cursor-default w-full h-12 my-4 py-2 px-2 flex justify-center items-center bg-gray-50 text-lg border border-gray-200 rounded-full hover:shadow-xl transition">
                        <span id="signin_with_google_btn" className='absolute left-1/2 -translate-x-1/2 opacity-0'></span>
                        <Image src={google_logo} width={50} height={50} className='w-6 md:w-8 mr-3' alt="google" />
                        <span className='max-w-0 whitespace-nowrap overflow-hidden transition-all duration-500 group-hover:max-w-[8rem]'>Login with&nbsp;</span>
                        Google
                    </button>
                </section>
            </form>
        </AuthPage>
    </>
}