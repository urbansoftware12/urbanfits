import React from "react"
import Head from "next/head"
import Link from "next/link"
import BounceLoader from "@/components/loaders/bounceLoader"
import User from ".."
import useUser from "@/hooks/useUser"
import useWallet from "@/hooks/useWallet"

export default function UFwallet() {
    const { user } = useUser()
    const { points, getUfHistory, walletLoading, currency, formatPrice } = useWallet()
    const [history, setHistory] = React.useState(null)

    const groupHistoryByYearAndMonth = (history) => {
        if (!history) return null
        const groupedHistory = {};

        history.forEach((record) => {
            const { year, month } = record;
            const key = `${year}-${month}`;

            if (!groupedHistory[key]) {
                groupedHistory[key] = {
                    year,
                    month,
                    records: [],
                };
            }
            groupedHistory[key].records.push(record);
        });

        const groupedRecords = Object.values(groupedHistory);
        return groupedRecords;
    };

    const groupedRecords = groupHistoryByYearAndMonth(history)

    React.useEffect(() => {
        getUfHistory(setHistory)
    }, [])

    if (!user || !user.email) return <Error403 />
    if (window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>UF Wallet History - Uraban Fits</title></Head>
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
                <h1 className="mb-5 font_urbanist_bold">UF - Points History</h1>
                <section className="w-full mb-4 py-5 text-xs flex justify-between items-center border-y border-gray-50">
                    <div className="w-1/2 flex flex-col">
                        Linked Card number
                        <span className="font_urbanist_bold text-base text-[#FF4A60]">{user.uf_wallet.card_number}</span>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        Balance
                        <span className="font_urbanist_bold text-base text-[#FF4A60]">{points} UF pts ({formatPrice(points * process.env.NEXT_PUBLIC_UF_POINT_RATE)})</span>
                    </div>
                </section>
                <div className="w-full py-5 flex justify-end text-10px">
                    <button onClick={() => getUfHistory(setHistory)} disabled={walletLoading} className="px-4 py-1 text-white bg-[#FF4A60] rounded-full">Refresh history&nbsp;&nbsp; <i className={`fa-solid fa-arrows-rotate ${walletLoading && "fa-spin"}`} /></button>
                </div>
                <section className="w-full gap-y-4">
                    <div className="w-full mb-4 flex justify-between items-center text-xs font_urbanist_bold">
                        <span>Transactions</span>
                        <span>Points earned</span>
                        <span>Points used</span>
                        <span>Total Balance</span>
                    </div>
                    {walletLoading && <div className="w-full my-5 flex justify-center"><BounceLoader /></div>}
                    {groupedRecords ? groupedRecords.map((recordObj, index) => {
                        return <section key={index} className={`group outline-none accordion-section ${groupedRecords.length === index + 1 ? "mb-20" : "mb-7"}`} tabIndex={1} >
                            <nav className="group flex justify-between py-3 items-center border-b border-b-gray-300 transition ease duration-500 cursor-pointer pr-10 relative">
                                <h2 className="group-focus:text-black font_urbanist_medium text-sm capitalize transition ease duration-500">{recordObj.month}&nbsp;{recordObj.year}</h2>
                                <i className={`group-focus:-rotate-180 absolute top-1/2 -translate-y-1/2 right-0 mb-auto ml-auto mt-2 mr-2 transform transition ease duration-500`}>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                                    </svg>
                                </i>
                            </nav>
                            <nav className="group-focus:max-h-[50vh] max-h-0 rounded overflow-x-hidden overflow-y-auto duration-500">
                                {recordObj.records.map((record, i) => <section key={i} className=" bg-white border-b border-b-gray-300 grid grid-cols-4 text-xs">
                                    <div className="w-full flex items-center">
                                        <span className="py-3 flex flex-col text-xs">
                                            <h6 className="font_copper text-sm">UF-Points</h6>
                                            {new Date(record.createdAt).getDate() + "/" + (new Date(record.createdAt).getMonth() + 1) + "/" + new Date(record.createdAt).getFullYear()}
                                        </span>
                                    </div>
                                    <span className="w-full flex justify-center items-center">+{record.earned}</span>
                                    <span className="w-full flex justify-center items-center">-{record.spent}</span>
                                    <span className="w-full flex justify-center items-center">{record.balance}</span>
                                </section>)}
                            </nav>
                        </section>
                    }) : null}
                </section>
            </section>
        </main>
    </>
    else return <>
        <Head><title>My UF Wallet - Uraban Fits</title></Head>
        <User profileNull>
            <h1 className="mb-10 text-2xl font_urbanist_bold">UF Points History</h1>
            <section className="mb-7 py-10 flex justify-between items-center border-y border-gray-50">
                <div className="flex flex-col">
                    Linked Card number
                    <span className="font_urbanist_bold text-[22px] text-yellow-600">{user.uf_wallet.card_number}</span>
                </div>
                <div className="flex flex-col">
                    Balance
                    <span className="font_urbanist_bold text-[22px] text-yellow-600">{points} UF pts ({formatPrice(points * process.env.NEXT_PUBLIC_UF_POINT_RATE)})</span>
                </div>
            </section>
            <div className="w-full py-5 flex justify-end">
                <button onClick={() => getUfHistory(setHistory)} disabled={walletLoading} className="px-4 py-1 text-xs lg:text-sm text-white bg-black rounded-full">Refresh history&nbsp;&nbsp; <i className={`fa-solid fa-arrows-rotate text-xs ${walletLoading && "fa-spin"}`} /></button>
            </div>
            <section className="w-full gap-y-4">
                <div className="w-full mb-4 flex justify-between items-center font_urbanist_bold">
                    <span className="w-1/3">Transactions</span>
                    <span>Points earned</span>
                    <span>Points used</span>
                    <span>Total Balance</span>
                </div>
                {walletLoading && <div className="w-full my-8 flex justify-center"><BounceLoader /></div>}
                {groupedRecords ? groupedRecords.map((recordObj, index) => {
                    return <section key={index} className="group outline-none accordion-section mb-7" tabIndex={1} >
                        <nav className="group flex justify-between py-3 items-center border-b border-b-gray-300 transition ease duration-500 cursor-pointer pr-10 relative">
                            <h2 className="group-focus:text-black font_urbanist_medium capitalize transition ease duration-500">{recordObj.month}&nbsp;{recordObj.year}</h2>
                            <i className={`group-focus:-rotate-180 absolute top-1/2 -translate-y-1/2 right-0 mb-auto ml-auto mt-2 mr-2 transform transition ease duration-500`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.718574 1.26652C0.471471 0.976974 0.475731 0.51076 0.729225 0.226124C0.852776 0.0862599 1.01361 0.0163273 1.1755 0.0163274C1.34166 0.0163274 1.50675 0.0899399 1.63136 0.238392L4.99708 4.20367L8.44587 0.231032C8.6951 -0.0536042 9.09984 -0.054831 9.35014 0.232259C9.59831 0.520576 9.59831 0.985564 9.34907 1.27388L5.44336 5.77162C5.323 5.90903 5.1611 5.98633 4.99175 5.98633L4.98749 5.98633C4.81708 5.9851 4.65305 5.90535 4.53483 5.76426L0.718574 1.26652Z" fill="#C4C4C4" />
                                </svg>
                            </i>
                        </nav>
                        <nav className="group-focus:max-h-[50vh] max-h-0 rounded overflow-x-hidden overflow-y-auto duration-500">
                            {recordObj.records.map((record, i) => <section key={i} className=" bg-white border-b border-b-gray-300 grid grid-cols-5 text-sm">
                                <div className="col-span-2 w-full flex items-center">
                                    <span className="mr-8 py-4 flex flex-col text-xs">
                                        <h6 className="font_copper text-sm">UF-Points</h6>
                                        Urban Fits
                                    </span>
                                    {new Date(record.createdAt).getDate() + "/" + (new Date(record.createdAt).getMonth() + 1) + "/" + new Date(record.createdAt).getFullYear()}
                                </div>
                                <span className="w-full flex justify-center items-center">+{record.earned}</span>
                                <span className="w-full flex justify-center items-center">-{record.spent}</span>
                                <span className="w-full flex justify-center items-center">{record.balance}</span>
                            </section>)}
                        </nav>
                    </section>
                }) : null}
            </section>
        </User>
    </>
}