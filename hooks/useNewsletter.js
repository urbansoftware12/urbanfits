import { create } from 'zustand'
import useUser from './useUser';
import toaster from "@/utils/toast_function";
import axios from "axios";
import jwt from 'jsonwebtoken';

const useNewsletter = create((set) => ({
    newsletterData: null,
    show: false,
    toggleNewsletterModal: () => set((state) => ({ show: !state.show })),
    getNewsletterData: async () => {
        const { user } = useUser.getState()
        if (!user) return
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/get`)
            const decodedData = jwt.decode(data.payload)
            delete decodedData._id;
            delete decodedData.user;
            return set(() => ({ newsletterData: decodedData }))
        } catch (error) { console.log(error) }
    },

    updateNewsletterData: async (valuesObj, sendRequest = true) => {
        const { user } = useUser.getState()
        if (!user) return
        if (sendRequest) {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/update`, valuesObj)
                toaster("success", data.msg)
                const decodedData = jwt.decode(data.payload)
                delete decodedData._id;
                delete decodedData.user;
                set(() => ({ newsletterData: decodedData }))
                return decodedData
            } catch (error) {
                console.log(error)
                return toaster("error", error?.response?.data?.msg || "Oops! something went wrong, we're working on it.")
            }
        }
        else if (!sendRequest) {
            const decodedData = jwt.decode(valuesObj)
            set(() => ({ newsletterData: decodedData }))
            return decodedData
        }
    }
}));
export default useNewsletter