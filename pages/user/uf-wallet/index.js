import { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import Button from "@/components/buttons/simple_btn"
import Image from "next/image"
import User from ".."
import useUser from "@/hooks/useUser"
import useWallet from "@/hooks/useWallet"
import Error403 from "@/pages/403"
// import div from "react-parallax-tilt"

export default function UFwallet() {
    const { points, getUfBalance, walletLoading, currency, formatPrice } = useWallet()
    const { user, isLoggedIn } = useUser()
    useEffect(() => {
        getUfBalance()
    }, [])

    const get3dpNumber = (num) => {
        if (num) return Number.isInteger(num) ? num : num.toFixed(3)
    }

    if (!user && !isLoggedIn()) return <Error403 />
    else if (user && window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>My UF Wallet - Uraban Fits</title></Head>
        <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
            <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
                <Link href="/user" className='fa-solid fa-chevron-left text-xl'></Link>
                <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                    <h1 className="font_urbanist_medium text-lg">UF Wallet</h1>
                    All data will be encrypted
                </div>
                <i className='w-0 h-0' />
            </div>
            <section className="w-full p-4">
                <h1 className="mb-5 mid:text-lg font_urbanist_bold">UF Wallet</h1>

                <div
                    className="w-full mid:w-96 h-[13rem] mb-10 text-white equillibrium_shadow select-none rounded-2xl overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                // glareEnable
                // glareMaxOpacity={0.5}
                // gyroscope={true}
                // transitionSpeed={1500}
                // tiltMaxAngleX={10}
                // tiltMaxAngleY={10}
                >
                    <div className="w-full h-1/2 py-5 px-7 gap-y-4 bg-[#FF4A60]">
                        <div className="w-full flex justify-between">
                            <span style={{ transform: "translateZ(25px)" }} className="font_copper font-thin text-xl">Points</span>
                            <span className="font_urbanist_bold text-xl">{get3dpNumber(points)}</span>
                        </div>
                        <div className="w-full flex justify-between">
                            <span className="font_copper text-xl">{currency}</span>
                            <span className="font_urbanist_bold text-xl">{formatPrice(points * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE))}</span>
                        </div>
                    </div>
                    <div className="w-full h-1/2 p-5 flex justify-center items-center">
                        <span className="w-full h-full">
                            <Image width={1000} height={1000} className="w-full h-full object-cover" src={process.env.NEXT_PUBLIC_BASE_IMG_URL + user.uf_wallet.bar_code} alt="barcode" />
                        </span>
                    </div>
                </div>

                <nav className="w-full flex justify-between">
                    <div className="flex flex-col">
                        <span className="font_copper text-sm">{user.uf_wallet.card_number}</span>
                        <Link href="/earn-ufpoints" className="font_urbanist_bold text-sm text-[#FF4A60]">Find out more about UF-Points</Link>
                    </div>
                    <Link href="/user/uf-wallet/history" className="underline underline-offset-1 text-sm">View Points History</Link>
                </nav>
                <p className="mt-2 text-sm">As a Urban Fits member, you can earn point on all your purchases across UF brands and experiences. Points can then be redeemed towards any of your purchases.</p>
            </section>
        </main>
    </>
    else return <>
        <Head><title>My UF Wallet - Uraban Fits</title></Head>
        <User profileNull>
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font_urbanist_bold">UF Wallet</h1>
                <Button disabled={walletLoading} my="0" onClick={getUfBalance} fontSize="text-sm">Refresh&nbsp;&nbsp; <i className={`fa-solid fa-rotate-right text-sm ${walletLoading && "fa-spin"}`} /></Button>
            </div>
            <section className="w-full h-[13rem] my-10 flex items-center gap-x-5">

                <div
                    className="w-96 h-full text-white equillibrium_shadow tranform_preserve_3d select-none rounded-2xl overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                // scale={1.08}
                // glareEnable
                // glareMaxOpacity={0.65}
                // reset={true}
                // transitionSpeed={1500}
                // tiltMaxAngleX={10}
                // tiltMaxAngleY={10}
                >
                    <div className="w-full h-1/2 py-5 px-7 gap-y-4 bg-[#FF4A60]">
                        <div className="translate_z w-full flex justify-between">
                            <span className="font_copper font-thin text-xl">Points</span>
                            <span className="font_urbanist_bold text-xl">{get3dpNumber(points)}</span>
                        </div>
                        <div className="translate_z w-full flex justify-between">
                            <span className="font_copper text-xl">{currency}</span>
                            <span className="font_urbanist_bold text-xl">{formatPrice(points * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE))}</span>
                        </div>
                    </div>
                    <div className="w-full h-1/2 p-6 bg-gray-50 flex justify-center items-center">
                        <span className="w-full h-full">
                            <Image width={1000} height={1000} className="w-full h-full object-cover" src={process.env.NEXT_PUBLIC_BASE_IMG_URL + user.uf_wallet.bar_code} alt="barcode" />
                        </span>
                    </div>
                </div>

                <nav className="h-full flex flex-col justify-between">
                    <div className="flex flex-col">
                        <span className="font_copper">{user.uf_wallet.card_number}</span>
                        <Link href="/earn-ufpoints" className="font_urbanist_bold text-[#FF4A60]">Find out more about UF-Points</Link>
                    </div>
                    <Link href="/user/uf-wallet/history" className="underline underline-offset-1">View Points History</Link>
                </nav>
            </section>
            <p>As a Urban Fits member, you can earn point on all your purchases across UF brands and experiences. Points can then be redeemed towards any of your purchases.</p>
        </User>
    </>
}