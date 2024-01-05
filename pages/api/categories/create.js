import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import User from "@/models/user";
import Category from "@/models/category";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

const CreateProducts = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const admin_id = verifyAdminToken(req, res)
            // const { id } = req.query
            // if (!id || !mongoose.Types.ObjectId(id)) return res.status(403).json({ success: false, msg: "A valid user id required." })
            const { name, slug } = req.body;
            if (!name || !slug) return res.status(400).json({ success: false, msg: "Category name and slug are required" })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

            let category = await Category.findOne().or([{ name }, { slug }])
            if (category) return res.status(400).json({ success: false, msg: "This category already exists" })

            if (req.body.parent) {
                let parent = null
                if (mongoose.Types.ObjectId.isValid(req.body.parent)) {
                    parent = await Category.findById(req.body.parent)
                }
                else {
                    parent = await Category.findOne({ path: req.body.parent })
                }

                if (!parent) return res.status(400).json({ success: false, msg: "Invalid parent id" })
                category = await Category.create({
                    ...req.body, parent: parent._id,
                    path: `${parent.path}${req.body.slug}`
                })

                parent = await Category.findByIdAndUpdate(
                    parent._id,
                    { $push: { children: mongoose.Types.ObjectId(category._id) } },
                    { new: true }
                )
            }
            else category = await Category.create({ ...req.body, path: req.body.slug })
            const restCategories = await Category.find().populate('parent')
            res.status(200).json({
                msg: `${category.name} created successfully.`,
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
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default CreateProducts