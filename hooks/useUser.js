import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useNewsletter from './useNewsletter';
import useWallet from './useWallet';
import PusherClient from 'pusher-js';
import { toast, Slide } from "react-toastify";
import toaster from "@/utils/toast_function";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from "cookie";
import Link from 'next/link';

const useUser = create(persist((set, get) => ({
    user: null,
    guestUser: null,
    userLoading: false,
    recentItems: [],
    wishList: [],
    notifications: [],
    country: { name: "United Arab Emirates", code: "+971", country: "ae", src: process.env.NEXT_PUBLIC_BASE_IMG_URL + "/country-flags/AE.webp" },
    geo_selected_by_user: false,
    address: null,

    isLoggedIn: () => {
        const { "is_logged_in": isLoggedIn } = cookie.parse(document.cookie);
        return isLoggedIn && isLoggedIn === "true";
    },

    getMe: async () => {
        const { isLoggedIn, updateUser } = get();
        if (!isLoggedIn()) return;
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/get/me`)
            await updateUser(data.payload, true)
            set(() => ({ guestUser: null }));
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    checkIn: async () => {
        const { isLoggedIn, updateUser, user } = get();
        if (!isLoggedIn() || new Date(user.last_checkin).getTime() > new Date().getTime()) return;
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/check-in`);
            updateUser({ ...user, last_checkin: data.last_checkin }, true, true);
            toaster("success", data.msg);
            useWallet.getState().getUfBalance()
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    notifyIfNotCheckedIn: () => {
        const { user } = get();
        if (!user?._id) return;
        const currentDate = new Date();
        if (currentDate > new Date(user.last_checkin)) toast(<Link href="/earn-ufpoints" className='text-[10px] md:text-xs flex items-center gap-x-4'>
            <svg className='size-20' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.178 15.2446V15.9109C16.178 20.5292 13.6407 22.514 9.80307 22.514C5.96545 22.514 3.39222 20.5292 3.39222 15.9109V0H0V15.875C0 22.4033 4.39742 25.4 9.76717 25.4C15.1339 25.4 19.5702 22.4033 19.5702 15.875V15.244H16.178V15.2446Z" fill="#FF4A60" />
                <path d="M26.4838 8.78369H15.8185V12.126H26.4838V8.78369Z" fill="#FF4A60" />
                <path d="M29.1848 0H15.8185V3.34233H29.1848V0Z" fill="#FF4A60" />
            </svg>
            <div>
                Welcome! you haven't checked in yet. <span className="font-bold">Click here</span> to check in and gain reward points.
            </div>
        </Link>, {
            closeButton: false,
            icon: false,
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide
        })
    },

    signIn: async (credentials, callback, router) => {
        const { isLoggedIn, updateUser } = get();
        if (isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, credentials)
            if (data.redirect_url && !data.payload) router.push(data.redirect_url)
            else if (data.payload) {
                await updateUser(data.payload, true)
                set(() => ({ guestUser: null }));
                router.replace("/")
                toaster("success", data.msg)
                if (callback) callback(data)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    signUp: async (credentials, router) => {
        if (get().isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`, credentials)
            if (data.redirect_url) router.replace(data.redirect_url)
            else throw new Error("no redirect url granted.")
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    signInWithGoogle: async (token, callback, router) => {
        const { isLoggedIn, updateUser } = get();
        if (isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login/google`, { token, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
            if (data.redirect_url && !data.payload) router.push(data.redirect_url)
            else if (data.payload) {
                await updateUser(data.payload, true)
                set(() => ({ guestUser: null }));
                router.replace("/")
                toaster("success", data.msg)
                if (callback) callback(data)
            }
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    signUpWithGoogle: async (token, callback, router) => {
        const { isLoggedIn, updateUser } = get();
        if (isLoggedIn()) return toaster("info", "You are already logged in.");
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup/google`, { token, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
            await updateUser(data.payload, true)
            set(() => ({ guestUser: null }));
            router.replace("/")
            toaster("success", data.msg)
            if (callback) callback(data)
        }
        catch (error) {
            console.log(error)
            toaster("error", error.response?.data.msg || (navigator.onLine ? "Oops! somethign went wrong." : "Network Error"))
        } finally { set(() => ({ userLoading: false })); }
    },

    recordVisit: async () => {
        if (get().isLoggedIn()) return;
        try { axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/visit`) }
        catch (error) { console.log(error) }
    },

    emitPresenceEvent: () => {
        const { user } = get();
        const presenceInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
            channelAuthorization: {
                endpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
                params: {
                    user_id: user?._id,
                    email: user?.email
                }
            },
        });
        presenceInstance.subscribe("presence-urbanfits")
        return () => presenceInstance.unsubscribe("presence-urbanfits");
    },

    subscribePersonalChannel: () => {
        const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        });
        const channelName = `uf-user_${get().user._id}`
        const userChannel = pusherClient.subscribe(channelName)
        userChannel.bind('new-notification', (data) => {
            useUser.setState({ notifications: data.notification_data.notifications })
            if (data.notify) toaster("info", data.notification_data.notifications[0].mini_msg)
        })
        return () => userChannel.unsubscribe(channelName);
    },

    getNotifications: async () => {
        if (!get().isLoggedIn()) return;
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/notifications/get`)
            set(() => ({ notifications: data.notification_data.notifications }))
        }
        catch (error) { console.log(error) } finally { set(() => ({ userLoading: false })); }
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
    inWishList: (item) => get().wishList.includes(item),
    updateUser: async (valuesObj, updateLocally = false, updateDirectly = false) => {
        if (!get().isLoggedIn()) return
        if (updateLocally) set(() => ({
            user: updateDirectly ? valuesObj : jwt.decode(valuesObj)
        }))
        else {
            set(() => ({ userLoading: true }));
            try {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/update`, valuesObj)
                set(() => ({ user: jwt.decode(data.payload) }))
                toaster("success", data.msg)
            } catch (error) {
                console.log(error)
                toaster("error", error.response.data.msg)
            } finally { set(() => ({ userLoading: false })) }
        }
    },

    logOut: async (router) => {
        try {
            set(() => ({ userLoading: true }));
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`);
            router.replace("/");
        } catch (e) { console.log("Coouldn't log out.", e) }
        finally {
            set(() => ({ user: null, address: null, notifications: [], wishList: [], recentItems: [], country: { name: "United Arab Emirates", code: "+971", country: "ae", src: process.env.NEXT_PUBLIC_BASE_IMG_URL + "/country-flags/AE.webp" } }))
            localStorage.clear()
            sessionStorage.clear()
            useNewsletter.setState({ newsletterData: null })
            toaster("success", "You are signed out !")
            set(() => ({ userLoading: false }));
        }
    },

    matchOtpAndUpdate: async (values) => {
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/auth/otp/change-email`, values)
            set(() => ({ user: jwt.decode(data.payload) }))
            toaster("success", data.msg)
            window.location.href = '/'
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
    },

    getAddress: async () => {
        if (!get().isLoggedIn()) return
        set(() => ({ userLoading: true }));
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/get`, { withCredentials: true })
            set(() => ({ address: jwt.decode(data.payload) }));
        } catch (err) {
            console.log(err.response.data.msg)
            return null
        } finally { set(() => ({ userLoading: false })) }
    },

    updateAddress: async (values) => {
        set(() => ({ userLoading: true }));
        try {
            let { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/update`, values)
            const address = jwt.decode(data.payload)
            set(() => ({ address }));
            toaster("success", data.msg);
            return address;
        }
        catch (e) {
            console.log(e)
            toaster("error", e.response.data.msg)
            return null
        } finally { set(() => ({ userLoading: false })) }
    },
}), {
    name: "user_data",
    partialize: (state) => ({
        user: state.user,
        geo_selected_by_user: state.geo_selected_by_user,
        country: state.country,
        wishList: state.wishList,
        recentItems: state.recentItems
    }),
}))
export default useUser