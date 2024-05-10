import useLanguage from "@/hooks/useLanguage";
export default function LanguageSelect({ show, setLanguageModal }) {
    const { locale, switchLanguage } = useLanguage();
    const langObj = {
        en: "Language",
        ar: "اللغة"
    }

    return <section style={{ transform: show ? "translateX(-100%)" : "translateX(0)" }} className='fixed z-50 top-0 -right-full w-screen h-screen bg-white flex flex-col transition-all duration-500'>
        <div className="w-full p-4 border-b border-gray-50 flex justify-between items-center">
            <button onClick={() => setLanguageModal(false)} className='fa-solid fa-chevron-left text-xl'></button>
            <h1 className="font_urbanist_medium text-lg">{langObj[locale]}</h1>
            <i className='w-0 h-0' />
        </div>
        <div className="w-full px-4 flex flex-col">
            <button onClick={() => switchLanguage("en")} name='english' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                English
                {locale === "en" && <i name='Male' className="fa-solid fa-check text-black text-lg z-50" />}
            </button>
            <button onClick={() => switchLanguage("ar")} name='arabic' className="w-full py-4 flex justify-between items-center border-b border-gray-50 font_urbanist text-base">
                العربية
                {locale === "ar" && <i name='Male' className="fa-solid fa-check text-black text-lg z-50" />}
            </button>
        </div>
    </section>
}