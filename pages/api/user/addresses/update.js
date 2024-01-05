import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"
import User from "@/models/user"
import mongoose from "mongoose"
const jwt = require("jsonwebtoken")
import CorsMiddleware from "@/utils/cors-config"

const UpdateAddress = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { user_id } = req.query
            if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({ success: false, msg: "A valid user id is required. Query Parameter: user_id" })
            await ConnectDB()
            let user = await User.findById(user_id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found with corresponding user_id." })

            // let addresses = await Addresses.findOne({ user_id: user._id })
            // if (!addresses) {
            //     const createdAddress = await Addresses.create({ ...req.body, user_id: user._id })
            //     const payload = jwt.sign({ ...createdAddress }, process.env.NEXT_PUBLIC_SECRET_KEY)
            //     return res.status(200).json({
            //         success: true,
            //         msg: "Your Address updated successfully",
            //         payload
            //     })
            // }
            // if (addresses) {
            const updatedAddress = await Addresses.findOneAndUpdate({ user_id }, req.body, { new: true, upsert: true })
            const payload = jwt.sign({ ...updatedAddress }, process.env.NEXT_PUBLIC_SECRET_KEY)
            return res.status(200).json({
                success: true,
                msg: "Your Address updated successfully",
                payload
            })

        }
        else return res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default UpdateAddress