import { useEffect, useState } from 'react'
import Button from '../buttons/simple_btn';
import Image from 'next/image';
import Spinner from '../loaders/spinner';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import toaster from '@/utils/toast_function';

export default function TwoFa({ show, setMfaModal, langObj }) {
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
    }, [])

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
            toaster("success", data.msg)
            setMfaModal(false)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoading(false)
    }

    if (show) return <div className={`w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500`}>
        <div className={`relative lg:w-[33rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => setMfaModal(false)} className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            {qrSecret && qrUrl && !loading ? <section className="w-full h-full p-10 flex flex-col items-center gap-y-5">
                <h2 className="text-black text-[22px] font_urbanist_medium">{langObj.enable2fa}</h2>
                <p className='text-xs md:text-sm text-center'>{langObj.registerMethods.msg1}</p>
                <p className='text-xs md:text-sm text-center'>{langObj.registerMethods.msg2}</p>
                <span className="w-32 aspect-square"><Image width={250} height={250} src={qrUrl} alt="Qr code" className="w-full h-full object-cover" /></span>
                <button onClick={() => navigator.clipboard.writeText(qrSecret)} className="p-1 flex items-center gap-x-2 text-center text-black font_urbanist_medium text-[15px] rounded-lg border-[4px] border-transparent focus:border-[#d7bd69ad] transition-all">{qrSecret}<i className="fa-solid fa-copy text-black" /></button>
                <p className="px-5 text-sm text-gray-500 text-center">{langObj.registerMethods.msg3}</p>

                <div className="w-full py-1 pl-5 pr-1 border rounded-full flex justify-around text-sm">
                    <input onChange={(e) => setTotp(e.target.value)} value={totp} type="text" className='w-4/5 outline-none' placeholder={langObj.enterCodePlaceholder} />
                    <Button disabled={!totp || totp === ''} onClick={onTotpConfirm} my="0" bg="bg-gold" classes="w-1/4 text-sm md:text-base text-center" fontSize="text-sm">{langObj.confirm}</Button>
                </div>
            </section> : <div className="w-full h-[30vh] flex justify-center items-center"><Spinner forBtn variant="border-black" /></div>}
        </div>
    </div>
}