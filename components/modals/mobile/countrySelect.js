import { useState } from 'react'
import Image from 'next/image'
import useUser from '@/hooks/useUser'
import countryCodes from '@/static data/countryCodes'

export default function CountrySelection({ show, setCoutnryModal }) {
    const { country, setCountry } = useUser()
    const [query, setQuery] = useState('')
    const filteredCountries = countryCodes.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-full h-screen overflow-y-scroll bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setCoutnryModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <h1 className="font_urbanist_medium text-lg">Select Country/Region</h1>
            <i className='w-0 h-0' />
        </div>
        <div className="w-full p-4">
            <div className="relative w-full h-9 px-4 py-2 flex justify-between items-center font_urbanist bg-gray-100 text-xs rounded-full">
                <input value={query} type="text" onChange={(e) => setQuery(e.target.value)} className='w-4/5 bg-transparent border-none outline-none' placeholder='Search you country' />
                <i className="fa-solid fa-magnifying-glass text-base text-gray-400" />
            </div>
        </div>
        <div className="w-full flex flex-col">
            {filteredCountries.map((c, i) => {
                return <button onClick={() => { if (c.disabled) return; setCountry(c); setCoutnryModal(false); useUser.setState({ geo_selected_by_user: true }) }} key={i} className={`${c.disabled && "opacity-40 pointer-events-none"} w-full ${filteredCountries.length === i + 1 && "mb-20"} p-4 flex justify-between items-center ${country.country === c.country ? "bg-gray-50 border border-gray-400 rounded-lg" : "border-b border-gray-50"} font_urbanist text-base capitalize`}>
                    <div className='flex items-center gap-x-3'>
                        <span className="w-5 overflow-hidden"><Image width={100} height={80} className="w-full h-full object-cover" src={c.src} alt={c.country} /></span>
                        {c.name}
                    </div>
                    {c.disabled && <span className="px-2 py-px text-[10px] bg-gray-200 text-black rounded-2xl">coming soon</span>}
                    <span className="text-sm">{c.code}</span>
                </button>
            })}
        </div>
    </section>
}