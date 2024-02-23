import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";

const CreateProducts = async (req, res) => StandardApi(req, res, { method: "POST", verify_admin: true }, async () => {
    const { name, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ success: false, msg: "Category name and slug are required" })

    await ConnectDB()
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
})
export default CreateProducts