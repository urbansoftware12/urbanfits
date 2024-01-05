import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";

const useCategories = create((set, get) => ({

    categories: [],
    categLoading: false,
    getCategories: async (callback) => {
        set(() => ({ categLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/categories/get?populate_parents=false`)
            set(() => (
                { categories: data.categories }
            ))
            callback(data.categories[0])
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ categLoading: false }))
    },

    getRelativeCategories: async (category_id, callback) => {
        set(() => ({ categLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/categories/recommends/get-relative-categories?category_id=${category_id}`)
            callback(data)
            set(() => ({ categLoading: false }))
            return data
        } catch (error) {
            console.log(error)
            toaster("error", error?.response?.data?.msg || "Network error")
        }
        set(() => ({ categLoading: false }))
    }

}))

export default useCategories