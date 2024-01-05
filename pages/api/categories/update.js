import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import User from "@/models/user";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const getCategories = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            // const { id } = req.query
            // if (!id || !mongoose.Types.ObjectId(id)) return res.status(400).json({ success: false, msg: "A valid user id required." })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(400).json({ success: false, msg: "The user with corresponding id must exist and should be administrator to access this data." })

            const getObjToUpdate = async () => {
                if (req.body.parent) {
                    let parent = await Category.findByIdAndUpdate(req.body.parent,
                        { $push: { children: mongoose.Types.ObjectId(req.body._id) } }
                    )
                    return {
                        ...req.body, parent: mongoose.Types.ObjectId(req.body.parent),
                        path: `${parent.path}${req.body.slug}`
                    }
                }
                else return req.body
            }
            const objToUpdate = await getObjToUpdate()
            console.log(objToUpdate)

            const category = await Category.findByIdAndUpdate(req.body._id, objToUpdate, { new: true })
            const restCategories = await Category.find().populate('parent')
            res.status(200).json({
                success: true,
                msg: `category with id '${req.body._id} updated succesfully!'`,
                category,
                categories: restCategories
            })
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry" })
    }
}

export default getCategories