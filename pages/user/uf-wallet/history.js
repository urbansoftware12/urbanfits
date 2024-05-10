import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BounceLoader from "@/components/loaders/bounceLoader";
import User from "..";
import useUser from "@/hooks/useUser";
import useWallet from "@/hooks/useWallet";
import useLanguage from "@/hooks/useLanguage";
import { ufWalletTab as walletLang } from "@/locales";
import Error403 from "@/pages/403";

const UfPointsNames = { daily_checkin: "Daily Checkin", prize_wheel: "Prize Wheel", signup: "Sign Up", place_order: "Place Order", uf_task: "UF Task", additional_reward: "Other", deduction: "Deduction" }

export default function UFwallet() {
    const { user, isLoggedIn } = useUser();
    const { points, getUfHistory, walletLoading, formatPrice } = useWallet();
    const { locale } = useLanguage();
    const [history, setHistory] = useState(null);
    const langObj = walletLang[locale];

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

    const groupedRecords = groupHistoryByYearAndMonth(history);
    const expiryText = (expiryDate) => {
        if (expiryDate) {
            if (new Date().getTime() < expiryDate.getTime()) return <span className="px-2 py-px bg-green-100 text-green-600 text-[10px] lg:text-xs rounded-3xl">{expiryDate.getDate() + "/" + (expiryDate.getMonth() + 1) + "/" + expiryDate.getFullYear()}</span>;
            else return <span className="px-2 py-px rounded-3xl bg-gray-200 text-gotham-black text-[10px] lg:text-xs">expired</span>;
        } else return <i className="fa-solid fa-infinity text-sm text-gotham-black" />
    }

    useEffect(() => {
        getUfHistory((history_docs) => setHistory(history_docs))
    }, [])

    if (!user && !isLoggedIn()) return <Error403 />
    else if (user && window.matchMedia('(max-width: 760px)').matches) return <>
        <Head><title>UF Wallet History - Uraban Fits</title></Head>
        <main className='w-screen h-screen bg-white flex flex-col transition-all duration-500'>
            <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
                <Link href="/user" className='fa-solid fa-chevron-left text-xl'></Link>
                <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                    <h1 className="font_urbanist_medium text-lg">{langObj.walletTitle}</h1>
                    {langObj.encryptedMsg}
                </div>
                <i className='w-0 h-0' />
            </div>
            <section className="w-full p-4">
                <h1 className="mb-5 font_urbanist_bold">{langObj.historyTitle}</h1>
                <section className="w-full mb-4 py-5 text-xs flex justify-between items-center border-y border-gray-50">
                    <div className="w-1/2 flex flex-col">
                        {langObj.linkedCard}
                        <span className="font_urbanist_bold text-base text-pinky">{user.uf_wallet.card_number}</span>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        {langObj.balance}
                        <span className="font_urbanist_bold text-base text-pinky">{points} UF pts ({formatPrice(points * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE))})</span>
                    </div>
                </section>
                <div className="w-full py-5 flex justify-between items-center text-10px">
                    <h3 className="text-sm font-semibold">{langObj.transactionsTitle}</h3>
                    <button onClick={() => getUfHistory((history_docs) => setHistory(history_docs))} disabled={walletLoading} className="px-4 py-1 text-white bg-[#FF4A60] rounded-full">{langObj.refresh}&nbsp;&nbsp; <i className={`fa-solid fa-rotate-right ${walletLoading && "fa-spin"}`} /></button>
                </div>
                <section className="w-full gap-y-4">
                    <div className="w-full mb-4 grid grid-cols-5 place-items-center text-xs font_urbanist_bold">
                        <span className="place-self-start">{langObj.transactionColumns.item1}</span>
                        <span>{langObj.transactionColumns.item2}</span>
                        <span>{langObj.transactionColumns.item3}</span>
                        <span>{langObj.transactionColumns.item4}</span>
                        <span>{langObj.transactionColumns.item5}</span>
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
                                {recordObj.records.map((record, i) => {
                                    const createdDate = new Date(record.createdAt);
                                    const expiryDate = record.expiration_date ? new Date(record.expiration_date) : null;
                                    return <section key={i} className=" bg-white border-b border-b-gray-300 grid grid-cols-5 text-xs">
                                        <div className="w-full flex items-center">
                                            <span className="py-3 flex flex-col text-[10px]">
                                                <h6 className="font_copper text-xs uppercase">{UfPointsNames[record.source]}</h6>
                                                {createdDate.getDate() + "/" + (createdDate.getMonth() + 1) + "/" + createdDate.getFullYear()}
                                            </span>
                                        </div>
                                        <span className="w-full flex justify-center items-center text-green-400">+{record.points}</span>
                                        <span className="w-full flex justify-center items-center text-red-400">-{record.spent}</span>
                                        <span className="w-full flex justify-center items-center">{expiryText(expiryDate)}</span>
                                        <span className="w-full flex justify-center items-center">{record.total_balance}</span>
                                    </section>
                                })}
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
            <h1 className="mb-10 text-2xl font_urbanist_bold">{langObj.historyTitle}</h1>
            <section className="mb-7 py-10 flex justify-between items-center border-y border-gray-50">
                <div className="flex flex-col">
                    {langObj.linkedCard}
                    <span className="font_urbanist_bold text-[22px] text-pinky">{user.uf_wallet.card_number}</span>
                </div>
                <div className="flex flex-col">
                    {langObj.balance}
                    <span className="font_urbanist_bold text-[22px] text-pinky">{points} UF pts ({formatPrice(points * parseFloat(process.env.NEXT_PUBLIC_UF_POINT_RATE))})</span>
                </div>
            </section>
            <div className="w-full py-5 flex justify-between items-center">
                <h3 className="font-semibold">{langObj.transactionsTitle}</h3>
                <button onClick={() => getUfHistory((history_docs) => setHistory(history_docs))} disabled={walletLoading} className="px-4 py-1 text-xs lg:text-sm text-white bg-pinky rounded-full">{langObj.refresh}&nbsp;&nbsp; <i className={`fa-solid fa-rotate-right text-xs ${walletLoading && "fa-spin"}`} /></button>
            </div>
            <section className="w-full gap-y-4">
                <div className="w-full mb-4 grid grid-cols-5 place-content-center place-items-center font_urbanist_bold">
                    <span className="place-self-start">{langObj.transactionColumns.item1}</span>
                    <span>{langObj.transactionColumns.item2}</span>
                    <span>{langObj.transactionColumns.item3}</span>
                    <span>{langObj.transactionColumns.item4}</span>
                    <span>{langObj.transactionColumns.item5}</span>
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
                            {recordObj.records.map((record, i) => {
                                const createdDate = new Date(record.createdAt);
                                const expiryDate = record.expiration_date ? new Date(record.expiration_date) : null;

                                return <section key={i} className=" bg-white border-b border-b-gray-300 grid grid-cols-5 text-sm">
                                    <div className="w-full flex items-center">
                                        <span className="mr-8 py-4 flex flex-col text-xs">
                                            <h6 className="font_copper text-sm uppercase">{UfPointsNames[record.source]}</h6>
                                            {createdDate.getDate() + "/" + (createdDate.getMonth() + 1) + "/" + createdDate.getFullYear()}
                                        </span>
                                    </div>
                                    <span className="w-full flex justify-center items-center text-green-400">+{record.points}</span>
                                    <span className="w-full flex justify-center items-center text-red-400">-{record.spent}</span>
                                    <span className="w-full flex justify-center items-center">{expiryText(expiryDate)}</span>
                                    <span className="w-full flex justify-center items-center">{record.total_balance}</span>
                                </section>
                            })}
                        </nav>
                    </section>
                }) : null}
            </section>
        </User>
    </>
}