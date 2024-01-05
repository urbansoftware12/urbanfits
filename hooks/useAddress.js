import { useState } from "react";
import useUser from "./useUser";
import jwt from 'jsonwebtoken'
import axios from "axios";
import toaster from "@/utils/toast_function";

export default function useAddress() {
    const { user } = useUser()

    const getAddressFromLS = () => {
        const address = jwt.decode(localStorage.getItem('addressToken'))
        if (address && address._doc) return address._doc
        else return null
    }
    const [address, setAddress] = useState(getAddressFromLS)
    const getAddress = async () => {
        if (!user) return
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/get?user_id=${user._id}`)
            const { payload } = res.data
            localStorage.setItem("addressToken", payload)
            const { _doc } = jwt.decode(payload)
            if (!_doc) return null
            setAddress(_doc)
            return _doc
        } catch (err) {
            console.log(err.response.data.msg)
            return null
        }
    }

    const updateAddress = async (values) => {
        try {
            let { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/addresses/update?user_id=${user._id}`, values)
            if (!data.payload) return toaster("error", "Some error occurred")
            const address = jwt.decode(data.payload)
            setAddress(address)
            localStorage.setItem("addressToken", data.payload)
            toaster("success", data.msg)
        }
        catch (e) {
            console.log(e)
            return toaster("error", e.response.data.msg)
        }
    }

    return { address, updateAddress, getAddress }
}