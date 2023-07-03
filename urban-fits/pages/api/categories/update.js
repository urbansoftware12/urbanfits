import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import User from "@/models/user";
import mongoose from "mongoose";

const getCategories = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const { id } = req.query
            if (!id || !mongoose.Types.ObjectId(id)) return res.status(400).json({ success: false, msg: "A valid user id required." })
            await ConnectDB()
            let user = await User.findById(id)
            if (!user || user.role !== "administrator") return res.status(400).json({ success: false, msg: "The user with corresponding id must exist and should be administrator to access this data." })
            let category = await Category.findByIdAndUpdate(req.body._id, req.body)
            res.status(200).json({
                success: true,
                msg: `category with id '${req.body._id} updated succesfully!'`,
                category
            })
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Internal Server Error occurred. Please retry" })
    }
}

export default getCategories