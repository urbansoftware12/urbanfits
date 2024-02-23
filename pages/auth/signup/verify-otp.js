import { useState } from 'react'
import AuthPage from '..'
import Button from '@/components/buttons/simple_btn'
import Head from 'next/head'
import useUser from '@/hooks/useUser'
import toaster from '@/utils/toast_function'
import AlertPage from '@/components/alertPage'
import axios from 'axios'
import { useRouter } from 'next/router'
import Error404 from '@/pages/404'

export default function VerifyOtp() {
    const { user, updateUser, userLoading } = useUser()
    const router = useRouter()
    const [otp, setOtp] = useState('')

    const onVerifyClick = async (otpId) => {
        if (!otpId || otpId.length < 18) return toaster("error", "Something went wrong, please try login again.")
        useUser.setState({ userLoading: true });
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup/callback`, {
                otp_id: otpId,
                otp
            })
            await updateUser(data.payload, true)
            router.replace('/');
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        } finally { useUser.setState({ userLoading: false }) }
    }

    if (!router.query.otp_id) return <Error404 />
    if (user && user.email) return <AlertPage type="success" heading="You are already signed in !" />
    return <>
        <Head><title>Urban Fits - Confirm 2FA TOTP code</title></Head>
        <AuthPage loading={userLoading} mblNav="/auth/signup" mblNavName="Register">
            <main className="w-full h-full lg:h-auto bg-white p-2 lg:p-0 font_urbanist text-base flex flex-col justify-between md:justify-around lg:block" >
                <section className="w-full mb-6 md:mb-0">
                    <h1 className="lg:hidden text-[22px] mb-5 text-left font_urbanist">Confirm OTP code</h1>
                    <div className="relative data_field lex items-center border-b focus:border-pink-300 transition py-2 mb-4">
                        <input className="w-full outline-none border-none" type='number' name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP code' />
                    </div>
                    <div className="my-3 text-gray-400 text-xs md:text-sm text-left">
                        Please open your Email inbox and check for an OTP code and submit it here for registration.
                    </div>
                </section>
                <Button disabled={!otp || otp.length < 5 || otp.length > 10} onClick={() => onVerifyClick(router.query.otp_id)} loading={userLoading} my="my-4" classes='w-full'>Verify</Button>
            </main>
        </AuthPage>
    </>
}