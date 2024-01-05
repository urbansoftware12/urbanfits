import { create } from 'zustand'
import useUser from './useUser';
import toaster from "@/utils/toast_function";
import axios from "axios";

const useShoppingList = create((set) => ({
    lists: null,
    listLoading: false,
    getShoppingLists: async () => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/get-lists?user_id=${user._id}`)
            set(() => ({ lists: data.shoppinglists }))
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },

    createShoppingList: async (listname) => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/create?id=${user._id}&name=${listname}`)
            set((state) => ({ lists: [...state.lists, data.shoppinglist] }))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },

    renameShoppingList: async (list_id, listname) => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/rename?list_id=${list_id}&list_name=${listname}`)
            set(() => ({ lists: data.shoppinglists }))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },

    deleteShoppingList: async (list_id) => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/delete?user_id=${user._id}&list_id=${list_id}`)
            set(() => ({ lists: data.shoppinglists }))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },

    addToShoppingList: async (list_id, product_id) => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/add-item?list_id=${list_id}&product_id=${product_id}`)
            set((state) => {
                const filteredLists = state.lists.filter(list => list._id !== list_id)
                console.log(filteredLists)
                const newLists = filteredLists.concat(data.shoppinglist)
                return { lists: newLists }
            })
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },

    removeFromShoppingList: async (list_id, product_id) => {
        const { user } = useUser.getState()
        if (!user) return

        set(() => ({ listLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/remove-item?list_id=${list_id}&product_id=${product_id}`)
            set((state) => {
                const filteredLists = state.lists.filter(list => list._id !== list_id)
                console.log(filteredLists)
                const newLists = filteredLists.concat(data.shoppinglist)
                return { lists: newLists }
            })
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            if (error.response) toaster("error", error.response.data.msg)
        }
        set(() => ({ listLoading: false }))
    },
}))
export default useShoppingList