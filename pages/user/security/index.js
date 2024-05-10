import { useState } from 'react'
import useUser from '@/hooks/useUser';
import useLanguage from '@/hooks/useLanguage';
import { securityTab as securityLang } from '@/locales';
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

const Update2FA = ({ user, updateUser, show, setTfaModal, setLoading, langObj }) => {
    const [totp, setTotp] = useState('')
    const update2FA = async () => {
        if (!totp) return toaster("error", "Please fill in your password and TOTP code.")
        setTfaModal(false)
        setLoading(true)
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/update-user-2fa`, {
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
                <h2 className="text-lg">{langObj.securityVerification}</h2>
                <button onClick={() => setTfaModal(false)} className='text-sm'>{langObj.close}</button>
            </div>
            <div className="w-full p-4 lg:p-6">
                {user.two_fa_enabled && <><span className="text-xs">Note: </span><p className="mb-4 text-xs text-gray-400">After turning off 2 Factor Authentication verification, your account will be at a low security level. Proceed with caution!</p></>}
                <div className="w-full mb-4 relative flex flex-col" >
                    <label htmlFor="totp" className='font_futura text-sm flex justify-between items-center'>{langObj.enterAuthCode}</label>
                    <input type='number' name='totp' id='totp' onChange={(e) => setTotp(e.target.value)} className="w-full mt-3 h-11 px-[10px] py-[13.5px] tracking-[8px] border border-gray-300 focus:border-pinky hover:border-pink-400 transition rounded-lg outline-none" />
                </div>
                {/* <div className="w-full relative flex flex-col" >
                    <label htmlFor="totp" className='font_futura text-sm flex justify-between items-center'>Enter Your Password</label>
                    <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 h-11 px-[10px] py-[13.5px] tracking-[8px] border border-gray-300 focus:border-pinky hover:border-pink-400 transition rounded-lg outline-none" />
                </div> */}
                <Button onClick={update2FA} disabled={!totp || totp.length < 4} classes="w-full">{user.two_fa_enabled ? langObj.disable2fa : langObj.enable2fa}</Button>
            </div>
        </section>
    </main>
}

export default function Security() {
    const { user, isLoggedIn, updateUser } = useUser();
    const { locale } = useLanguage();
    const [mfaModal, setMfaModal] = useState(false)
    const [tfaModal, setTfaModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const langObj = securityLang[locale];

    if (!user && !isLoggedIn()) return <Error403 />
    else if (user && window.matchMedia('(max-width: 760px)').matches) return <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <Update2FA user={user} updateUser={updateUser} show={tfaModal} setTfaModal={setTfaModal} setLoading={setLoading} langObj={langObj} />
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <Link href="/user" className='fa-solid fa-chevron-left text-xl'></Link>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                <h1 className="font_urbanist_medium text-lg">{langObj.title}</h1>
                {langObj.encryptedData}
            </div>
            <i className='w-0 h-0' />
        </div>
        {loading ? <Loader /> : null}
        <section className="w-full h-full p-4 flex flex-col justify-between font_urbanist">
            <div className="text-sm">
                <div className="w-full mb-4 flex justify-between items-center">
                    <h1 className="font_urbanist_bold text-base">{user.two_fa_enabled && user.two_fa_activation_date ? langObj.disable2fa : langObj.enable2fa}</h1>
                    {user.two_fa_activation_date ? <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='active_by_email' checked={user.two_fa_enabled} value={user.two_fa_enabled} onChange={() => setTfaModal(true)} /><span className="slider"></span></label> : null}
                </div>
                {langObj.securityMsg}
            </div>
            {user.two_fa_activation_date ? null : <LinkBtn my='mb-20' href="/user/security/register-2fa" classes="w-full">{langObj.enable2fa}</LinkBtn>}
        </section>
    </main>
    else return <>
        <Head><title>Security - UF</title></Head>
        <User loading={loading}>
            {user.two_fa_activation_date ? null : <TwoFa show={mfaModal} setMfaModal={setMfaModal} setLoading={setLoading} langObj={langObj} />}
            <Update2FA user={user} updateUser={updateUser} show={tfaModal} setTfaModal={setTfaModal} setLoading={setLoading} langObj={langObj} />
            <h2 className="mt-12 mb-3 text-lg font_urbanist_bold">{user.two_fa_activation_date ? langObj.enableOrDisable : langObj.enableGoogleAuth}</h2>
            <section className="flex flex-col text-sm font_urbanist_light gap-y-4">
                {langObj.securityMsg}
                <div className="flex justify-between items-center">
                    {user.two_fa_activation_date ?
                        <Button loading={loading} onClick={() => setTfaModal(true)} classes='w-44'>{user.two_fa_enabled ? langObj.disable2fa : langObj.enable2fa}</Button>
                        :
                        <Button onClick={() => setMfaModal(true)} classes='w-44'>{langObj.enable2fa}</Button>}
                    <div className="flex items-center gap-x-3 text-xs font_urbanist uppercase">
                        {langObj.status}
                        <span className="py-1 px-2 font_urbanist_bold text-white rounded-md bg-gold uppercase">{user.two_fa_enabled ? langObj.enabled : langObj.disabled}</span>
                    </div>
                </div>
            </section>
        </User>
    </>
}