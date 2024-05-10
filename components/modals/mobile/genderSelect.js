import { useState } from 'react'
import Loader from '@/components/loaders/loader'

export default function GenderSelect({ user, updateUser, show, setGenderModal, langObj }) {
    const [loader, setLoader] = useState(null)
    const updateGender = async (e) => {
        const { name } = e.target
        if (!name) return
        setLoader(<Loader />)
        await updateUser({ gender: name })
        setLoader(null)
    }

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setGenderModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <div className="flex flex-col justify-center items-center font_urbanist text-xs">
                <h1 className="font_urbanist_medium text-lg">{langObj.genderMenu.heading}</h1>
                {langObj.dataEncrypted}
            </div>
            <i className='w-0 h-0' />
        </div>
        {loader}
        <div className="w-full px-4 flex flex-col">
            <button name='Male' onClick={updateGender} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                {langObj.genderMenu.item1}
                {user.gender?.toLowerCase() === "male" ? <i name='Male' className="fa-solid fa-check text-black text-lg z-50" /> : null}
            </button>
            <button name='Female' onClick={updateGender} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                {langObj.genderMenu.item2}
                {user.gender?.toLowerCase() === "female" ? <i name='Female' className="fa-solid fa-check text-black text-lg z-50" /> : null}
            </button>
            <button name='Other' onClick={updateGender} className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                {langObj.genderMenu.item3}
                {user.gender?.toLowerCase() === "other" ? <i name='Other' className="fa-solid fa-check text-black text-lg z-50" /> : null}
            </button>
        </div>
    </section>
}