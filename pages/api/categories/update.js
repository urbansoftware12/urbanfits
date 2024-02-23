import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import mongoose from "mongoose";
import StandardApi from "@/middlewares/standard_api";

const getCategories = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    await ConnectDB()
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

    const category = await Category.findByIdAndUpdate(req.body._id, objToUpdate, { new: true })
    const restCategories = await Category.find().populate('parent')
    res.status(200).json({
        success: true,
        msg: `category with id '${req.body._id} updated succesfully!'`,
        category,
        categories: restCategories
    })
})
export default getCategories