import { create } from 'zustand'
import useUser from './useUser';
import toaster from "@/utils/toast_function";
import axios from 'axios';
import uploadImage from '@/utils/uploadImage';
import { shippingRates } from '@/uf.config';

const currencies = ["AED", "SAR", "PKR"]
const useWallet = create((set, get) => ({
    points: 0,
    currency: process.env.NEXT_PUBLIC_BASE_CURRENCY,
    currency_selected_by_user: false,
    exchange_rate: 1,
    walletLoading: false,
    setCurrency: (currency) => {
        if (currencies.includes(currency)) set(() => ({ currency }))
        else return toaster("error", "Invalid currency!")
    },
    getUfBalance: async () => {
        const { user, isLoggedIn } = useUser.getState()
        if (!user || !isLoggedIn()) return
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-balance?card_number=${user.uf_wallet.card_number}`)
            set(() => ({ points: data.balance }))
        } catch (e) { console.log(e); toaster("error", e.response.data.msg) }
        finally { set(() => ({ walletLoading: false })) }
    },

    getUfTasks: async (callback) => {
        const { isLoggedIn } = useUser.getState()
        if (!isLoggedIn()) return
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/get/user-tasks`)
            if (callback) callback(data)
        } catch (e) { console.log(e); toaster("error", e?.response?.data?.msg || "Oops! something went wrong, please retry.") }
        finally { set(() => ({ walletLoading: false })) }
    },

    getUfHistory: async (callback, limit = 150) => {
        const { user, isLoggedIn } = useUser.getState()
        if (!user || !isLoggedIn()) return
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-points-transactions?card_number=${user.uf_wallet.card_number}${limit ? "&limit=" + limit : ''}`)
            callback ? callback(data.history) : null
            return data.history
        } catch (e) {
            console.log(e);
            if (e.response) toaster("error", e.response.data.msg)
            else toaster("error", "Network error.")
        } finally { set(() => ({ walletLoading: false })) }
    },

    getWeeklyCheckinHistory: async (setCallbackState) => {
        const { user, isLoggedIn } = useUser.getState()
        if (!user, !isLoggedIn()) return
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-weekly-points-history?card_number=${user.uf_wallet.card_number}`)
            if (setCallbackState) setCallbackState(data.history)
            set(() => ({ walletLoading: false }))
            return data.history
        } catch (e) { console.log(e); toaster("error", e.response.data.msg) }
        finally { set(() => ({ walletLoading: false })) }
    },

    spinUfWheel: async () => {
        const { user, isLoggedIn, updateUser } = useUser.getState()
        if (!user, !isLoggedIn()) return
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/spin-wheel?card_number=${user.uf_wallet.card_number}`)
            set(() => ({ walletLoading: false }))
            await updateUser({
                ...user,
                uf_wallet: {
                    ...user.uf_wallet,
                    last_uf_spin: data.last_uf_spin,
                    last_spin_reward: data.reward,
                    ...(data.next_uf_spin ? { next_uf_spin: data.next_uf_spin } : {})
                }
            }, true, true)
            get().getUfBalance()
            return data
        } catch (e) { console.log(e); toaster("error", e.response.data.msg) }
        finally { set(() => ({ walletLoading: false })) }
    },

    uploadUfTaskImg: async (taskName, file, callback) => {
        const { user, isLoggedIn } = useUser.getState()
        if (!user, !isLoggedIn()) return
        try {
            const ssUrl = await uploadImage(file, `uf-tasks/${user._id}/${taskName}`)
            if (!ssUrl) return toaster("error", "Screenshot couldn't be uploaded, please retry.")
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/fulfill-task`, {
                user_id: user._id,
                task_name: taskName,
                image_url: ssUrl
            })
            toaster("success", data.msg)
            if (callback) callback(data, ssUrl)
            return ssUrl
        } catch (e) { console.log(e); toaster("error", e.response.data.msg) }
    },

    getExchangeRate: async (to = get().currency) => {
        if (to === "AED") {
            set(() => ({ exchange_rate: 1, walletLoading: false }))
            return 1
        }
        set(() => ({ walletLoading: true }))
        try {
            const { data } = await axios.get(`https://api.fastforex.io/fetch-one?api_key=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&from=${process.env.NEXT_PUBLIC_BASE_CURRENCY}&to=${to}`)
            set(() => ({ exchange_rate: data.result[to] }))
            return data.result[to]
        } catch (error) {
            console.log(error);
            let fallbackRate = 1;
            if (to === "PKR") fallbackRate = 77.6;
            else if (to === "SAR") fallbackRate = 1.02;
            set(() => ({ exchange_rate: fallbackRate }))
            return fallbackRate
        } finally { set(() => ({ walletLoading: false })) }
    },

    getShippingRates: (callback, shippingMethod = "standard_shipping") => {
        const { country } = useUser.getState()
        let price = 0
        let additionalKgCharges = 0
        if (country.country === "sa") {
            price = shippingRates[shippingMethod].ksa_rate;
            additionalKgCharges = shippingRates[shippingMethod].additional_kg_charge.ksa
        }
        else if (country.country === "ae") {
            price = shippingRates[shippingMethod].uae_rate;
            additionalKgCharges = shippingRates[shippingMethod].additional_kg_charge.uae
        }
        else if (country.country === "pk") {
            price = shippingRates[shippingMethod].pk_rate;
            additionalKgCharges = shippingRates[shippingMethod].additional_kg_charge.pk
        }
        const getTimeSpan = (shippingMethod) => {
            const shippingData = shippingRates[shippingMethod]
            if (country.country === "sa") return shippingData.shipping_timespan.ksa_shipping
            else if (country.country === "ae") return shippingData.shipping_timespan.uae_shipping
            else if (country.country === "pk") return shippingData.shipping_timespan.pk_shipping
        }
        const returnRates = { price, getTimeSpan, additionalKgCharges, shipping_rates: shippingRates }
        callback ? callback(returnRates) : null
        return returnRates
    },

    formatPrice: (amount = 0) => `${amount.toFixed(3).replace(/\.?0+$/, '')}د.إ`,

    formatPriceNum: (amount = 0) => parseFloat(amount.toFixed(3).replace(/\.?0+$/, ''))
}))
export default useWallet