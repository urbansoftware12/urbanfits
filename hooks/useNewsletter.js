import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useUser from './useUser';
import toaster from "@/utils/toast_function";
import axios from "axios";
import jwt from 'jsonwebtoken';

const useNewsletter = create(persist((set) => ({
    newsletterData: null,
    getNewsletterData: async () => {
        const { user } = useUser.getState()
        if (!user) return

        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/get?id=${user._id}`)
            const decodedData = jwt.decode(data.payload)?._doc
            delete decodedData._id;
            delete decodedData.user;
            return set(() => ({ newsletterData: decodedData }))
        } catch (error) {
            return console.log(error)
        }
    },

    updateNewsletterData: async (valuesObj, sendRequest = true) => {
        const { user } = useUser.getState()
        if (sendRequest) {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/newsletter/update?id=${user._id}`, valuesObj)
                toaster("success", data.msg)
                const decodedData = jwt.decode(data.payload)?._doc
                delete decodedData._id;
                delete decodedData.user;
                set(() => ({ newsletterData: decodedData }))
                return decodedData
            } catch (error) {
                console.log(error)
                return toaster("error", error.response.data.msg)
            }
        }
        else if (!sendRequest) {
            const decodedData = jwt.decode(valuesObj)?._doc
            set(() => ({ newsletterData: decodedData }))
            return decodedData
        }
    },
    clearNewsletterData: () => set(() => ({ newsletterData: null }))

}), { name: 'user_newsletter_data' }))
export default useNewsletter