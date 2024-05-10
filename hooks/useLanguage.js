import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { locales } from '@/uf.config';

const useLanguage = create(persist((set, get) => ({
    locale: locales[0],
    switchLanguage: (langLocale) => {
        if (!locales.includes(langLocale)) return console.log("Invalid language locale");
        else set(() => ({ locale: langLocale }))
    }
}), { name: "locale" }))

export default useLanguage