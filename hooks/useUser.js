import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { signOut } from "next-auth/react"
import useNewsletter from './useNewsletter';
import useWallet from './useWallet';
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useUser = create(persist((set, get) => ({
    user: null,
    guestUser: null,
    recentItems: [],
    wishList: [],
    notifications: [],
    country: { name: "United Arab Emirates", code: "+971", country: "ae", src: process.env.NEXT_PUBLIC_BASE_IMG_URL + "/country-flags/AE.webp" },
    geo_selected_by_user: false,
    setNotification: (newNotifications) => set(() => ({ notifications: newNotifications })),
    getNotifications: async () => {
        const user = get().user
        if (!user) return
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/notifications/get?user_id=${user._id}`)
            set(() => ({
                notifications: data.notification_data.notifications
            }))
        } catch (error) {
            console.log(error)
        }
    },
    setRecentItems: (newItem) => {
        const alreadyInItem = get().recentItems.filter(item => item.id === newItem.id)
        if (get().recentItems.length > 5) return console.log("max limit reached")
        if (alreadyInItem.length && alreadyInItem[0].id) {
            const itemIndex = get().recentItems.indexOf(alreadyInItem[0])
            if (itemIndex === -1) return
            if (itemIndex !== -1) return set((state) => {
                const arrayToSet = state.recentItems.splice(itemIndex, 1)
                return { recentItems: [...arrayToSet, newItem] }
            })
        }
        else return set((state) => ({ recentItems: [...state.recentItems, newItem] }))
    },
    setGeoSelectedByUser: (bool) => set(() => ({ geo_selected_by_user: bool })),
    setCountry: async (c) => {
        const { setCurrency, getExchangeRate } = useWallet.getState()
        switch (c.country) {
            case "sa":
                await getExchangeRate("SAR")
                set(() => ({ country: c }))
                setCurrency("SAR")
                break;
            case "pk":
                await getExchangeRate("PKR")
                set(() => ({ country: c }))
                setCurrency("PKR")
                break;
            default:
                await getExchangeRate("AED")
                set(() => ({ country: c }))
                setCurrency("AED")
                break;
        }
    },
    addToWishList: (item) => set((state) => {
        return { wishList: [...state.wishList, item] }
    }),
    removeFromWishList: (itemToRemove) => {
        set((state) => {
            const wishListArray = state.wishList
            const index = wishListArray.indexOf(itemToRemove);
            if (index !== -1) wishListArray.splice(index, 1);
            return { wishList: wishListArray }
        })
    },
    inWishList: (item) => {
        let isInList = get().wishList.includes(item)
        return isInList
    },
    updateUser: async (valuesObj, updateLocally = false, updateDirectly = false) => {
        if (updateLocally) {
            if (updateDirectly) set(() => ({ user: valuesObj }))
            else {
                const userData = jwt.decode(valuesObj)?._doc
                delete userData.password
                set(() => ({ user: userData }))
            }
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update?id=${get().user._id}`, valuesObj)
                const userData = jwt.decode(data.payload)?._doc
                delete userData.password
                set(() => ({ user: userData }))
                toaster("success", data.msg)
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            }
        }
    },
    setGuestUser: async (userData) => {
        // const userData = jwt.decode(token)?._doc
        set(() => ({ guestUser: userData }))
    },
    logOut: (redirect) => {
        const { clearNewsletterData } = useNewsletter.getState()
        localStorage.clear()
        window.location.href = redirect || '/'
        clearNewsletterData()
        get().setNotification([])
        if (get().user.register_provider !== "urbanfits") signOut()
        set(() => ({ user: null }))
        toaster("success", "You are signed out !")
        sessionStorage.clear()
    },
    matchOtpAndUpdate: async (values) => {
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/auth-otp-and-change-email`, values)
            const userData = jwt.decode(data.payload)?._doc
            delete userData.password
            set(() => ({ user: userData }))
            toaster("success", data.msg)
            window.location.href = '/'
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
    }
}),
    { name: "authToken" }
))
export default useUser