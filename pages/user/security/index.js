import { useState } from 'react'
import useUser from '@/hooks/useUser';
import User from '..';
import Head from 'next/head';
import Button from '@/components/buttons/simple_btn';
import Loader from '@/components/loaders/loader';
import Error403 from '@/pages/403';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LinkBtn from '@/components/buttons/link_btn';
import axios from 'axios';
import toaster from '@/utils/toast_function';
const TwoFa = dynamic(() => import('@/components/modals/twoFa'));

const Update2FA = ({ user, updateUser, show, setTfaModal, setLoading }) => {
    const [totp, setTotp] = useState('')
    const [password, setPassword] = useState('')
    const update2FA = async () => {
        if (!password || !totp) return toaster("error", "Please fill in your password and TOTP code.")
        setTfaModal(false)
        setLoading(true)
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/update-user-2fa`, {
                password,
                totp_code: totp,
                two_fa_enabled: !user.two_fa_enabled
            })
            updateUser({ ...user, two_fa_enabled: !user.two_fa_enabled }, true, true)
            toaster("success", data.msg)
            setTotp('')
            setPassword('')
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    return <main className={`${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed z-[100] inset-0 w-screen h-screen bg-black/60 transition-all duration-500`}>
        <section className={`${show ? "bottom-0" : "-bottom-full"} absolute left-1/2 -translate-x-1/2 w-full md:w-3/4 lg:w-[40rem] bg-white font_urbanist rounded-t-3xl transition-all duration-500`}>
            <div className="w-full p-4 lg:p-6 pt-5 border-b flex justify-between items-center">
                <h2 className="text-lg">Security Varification</h2>
                <button onClick={() => setTfaModal(false)} className='text-sm'>close</button>
            </div>
            <div className="w-full p-4 lg:p-6">
                {user.two_fa_enabled && <><span className="text-xs">Note: </span><p className="mb-4 text-xs text-gray-400">After turning off 2 Factor Authentication verification, your account will be at a low security level. Proceed with caution!</p></>}
                <div className="w-full mb-4 relative flex flex-col" >
                    <label htmlFor="totp" className='font_futura text-sm flex justify-between items-center'>Enter Authenticator Code</label>
                    <input type='number' name='totp' id='totp' onChange={(e) => setTotp(e.target.value)} className="w-full mt-3 h-11 px-[10px] py-[13.5px] tracking-[8px] border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition rounded-lg outline-none" />
                </div>
                <div className="w-full relative flex flex-col" >
                    <label htmlFor="totp" className='font_futura text-sm flex justify-between items-center'>Enter Your Password</label>
                    <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 h-11 px-[10px] py-[13.5px] tracking-[8px] border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition rounded-lg outline-none" />
                </div>
                <Button onClick={update2FA} disabled={!totp || totp.length < 4 || !password || password.length < 8} classes="w-full">{user.two_fa_enabled ? "Disable 2FA" : "Enable 2FA"}</Button>
            </div>
        </section>
    </main>
}

export default function Security() {
    const { user, isLoggedIn, updateUser } = useUser();
    const [mfaModal, setMfaModal] = useState(false)
    const [tfaModal, setTfaModal] = useState(false)
    const [loading, setLoading] = useState(false)

    if (!user && !isLoggedIn()) return <Error403 />
    else if (user && window.matchMedia('(max-width: 760px)').matches) return <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <Update2FA user={user} updateUser={updateUser} show={tfaModal} setTfaModal={setTfaModal} setLoading={setLoading} />
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <Link href="/user" className='fa-solid fa-chevron-left text-xl'></Link>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                <h1 className="font_urbanist_medium text-lg">Security / 2FA</h1>
                All data will be encrypted
            </div>
            <i className='w-0 h-0' />
        </div>
        {loading ? <Loader /> : null}
        <section className="w-full h-full p-4 flex flex-col justify-between font_urbanist">
            <div className="text-sm">
                <div className="w-full mb-4 flex justify-between items-center">
                    <h1 className="font_urbanist_bold text-base">{user.two_fa_enabled && user.two_fa_activation_date ? "Disable" : "Enable"} 2FA</h1>
                    {user.two_fa_activation_date ? <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='active_by_email' checked={user.two_fa_enabled} value={user.two_fa_enabled} onChange={() => setTfaModal(true)} /><span className="slider"></span></label> : null}
                </div>
                Two-factor authentication is a method for protection your web account. When it is activated you need to enter not only your password, but also a special code. <br />
                You can receive this code by in mobile app. Even if third person will find your password, then can't access with that code.
            </div>
            {user.two_fa_activation_date ? null : <LinkBtn my='mb-20' href="/user/security/register-2fa" classes="w-full">Enable 2FA</LinkBtn>}
        </section>
    </main>
    else return <>
        <Head><title>Security - UF</title></Head>
        <User loading={loading}>
            {user.two_fa_activation_date ? null : <TwoFa show={mfaModal} setMfaModal={setMfaModal} setLoading={setLoading} />}
            <Update2FA user={user} updateUser={updateUser} show={tfaModal} setTfaModal={setTfaModal} setLoading={setLoading} />
            <h2 className="mt-12 mb-3 text-lg font_urbanist_bold">{user.two_fa_activation_date ? "Enable / Disable 2FA" : "Enable Google Authenticator"}</h2>
            <section className="flex flex-col text-sm font_urbanist_light gap-y-4">
                Two-factor authentication is a method for protection your web account. When it is activated you need to enter not only your password, but also a special code. <br />
                You can receive this code by in mobile app. Even if third person will find your password, then can't access with that code.
                <div className="flex justify-between items-center">
                    {user.two_fa_activation_date ?
                        <Button loading={loading} onClick={() => setTfaModal(true)} classes='w-44'>{user.two_fa_enabled ? "Disable 2FA" : "Enable 2FA"}</Button>
                        :
                        <Button onClick={() => setMfaModal(true)} classes='w-44'>Enable 2FA</Button>}

                    <div className="flex items-center gap-x-3 text-xs font_urbanist">
                        CURRENT STATUS:
                        <span className="py-1 px-2 font_urbanist_bold text-white rounded-md bg-gold">{user.two_fa_enabled ? "ENABLED" : "DISABLED"}</span>
                    </div>
                </div>
            </section>
        </User>
    </>
}