import React, { useState, useEffect } from 'react'
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Button from '@/components/buttons/simple_btn';
import Loader from '@/components/loaders/loader';
import Error403 from '@/pages/403';
import Image from 'next/image';
import Link from 'next/link';
import ImgLoader from '@/components/loaders/imgLoader';
import toaster from '@/utils/toast_function';
import axios from 'axios';

export default function Security() {
    const router = useRouter()
    const { user, updateUser } = useUser()
    const [qrUrl, setQrUrl] = useState(null)
    const [qrSecret, setQrSecret] = useState(null)
    const [totp, setTotp] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getQrCode = async () => {
            if (qrUrl && qrSecret) return
            setLoading(true)
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/get-qr-code?user_id=${user._id}`)
                if (data.qrSecret && data.qrCodeUrl) {
                    setQrUrl(data.qrCodeUrl)
                    setQrSecret(data.qrSecret)
                } else toaster("error", "An error occurred at our end, please try again.")
            } catch (error) {
                console.log(error)
                toaster("error", "An error occurred at our end, please try again.")
            }
            setLoading(false)
        }
        getQrCode()
    }, [qrUrl, qrSecret])

    const onTotpConfirm = async () => {
        setLoading(true)
        try {
            if (!totp || totp === '') return toaster("error", "Please enter the TOTP code from Google Authenticator.")
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/2fa/create-user-2fa`, {
                user_id: user._id,
                qr_secret: qrSecret,
                totp_code: totp
            })
            await updateUser(data.payload, true)
            router.push('/user/security')
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    if (!user) return <Error403 />
    if (user.two_fa_activation_date) {
        router.push('/user/security')
        return
    }
    else if (window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>Register for 2FA - UF</title></Head>
        <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
            <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
                <Link href="/user/security" className='fa-solid fa-chevron-left text-xl'></Link>
                <div className="flex flex-col justify-center items-center font_urbanist text-xs text-gray-400">
                    <h1 className="font_urbanist_medium text-lg">Register for 2FA</h1>
                    All data will be encrypted
                </div>
                <i className='w-0 h-0' />
            </div>
            {loading ? <Loader /> : null}
            <section className="w-full h-full p-4 flex flex-col justify-between gap-y-3 font_urbanist">
                <div className="w-full flex flex-col items-start gap-y-3">
                    <p className='text-sm'>Step 1: install 'Google Authenticator' app from Google Play or App Store</p>
                    <p className='text-sm'>Step 2: Scan the QR Code by your Google Authenticator app, or you can add account manually.</p>
                    <span className="w-36 my-5 aspect-square mx-auto">
                        {qrUrl ? <Image width={250} height={250} src={qrUrl} alt="Qr code" className="w-full h-full object-cover" /> :
                            <ImgLoader />}
                    </span>
                    <button onClick={() => navigator.clipboard.writeText(qrSecret)} className="w-full py-1 flex justify-between items-center gap-x-2 text-center text-black font_urbanist_medium text-[15px] rounded-lg border-[4px] border-transparent focus:border-[#d7bd69ad] transition-all">
                        <span className='max-w-[75vw] truncate'>{qrSecret || ''}</span>
                        <i className="fa-solid fa-copy text-black" /></button>
                    <p className="text-sm text-gray-400">If you are unable to scan the QR code, please enter thiscode manually into the app.</p>

                    <div className="w-full my-3 py-3 px-5 border rounded-full flex justify-around text-sm">
                        <input onChange={(e) => setTotp(e.target.value)} value={totp} type="text" className='w-full outline-none' placeholder='Enter the code to verify' />
                    </div>
                </div>
                <Button disabled={!totp || totp.length < 5} onClick={onTotpConfirm} my="0" classes="w-full" fontSize="text-sm">Confirm</Button>
            </section>
        </main>
    </>
}