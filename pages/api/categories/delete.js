import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
const mongoose = require('mongoose')
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const DeleteCategories = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { categories } = req.body
    if (!categories || categories.length < 1) return res.status(400).json({ success: false, msg: "Categories array is required with atleast one valid id." })

    await ConnectDB()
    let deletedCount = 0
    DeleteCategoriesLoop: for (const category_id of categories) {
        if (!mongoose.Types.ObjectId.isValid(category_id)) continue DeleteCategoriesLoop
        let category = await Category.findById(category_id)
        if (!category) continue DeleteCategoriesLoop

        // if this category has a parent
        if (category.parent) {
            await Category.findByIdAndUpdate(category.parent,
                { $pull: { children: category._id } },
                { new: true }
            )
        }

        // if this category has children
        if (category.children.length !== 0) {
            await category.children.forEach(async (child) => {
                const foundChild = await Category.findById(child)
                await Category.findByIdAndUpdate(child, {
                    $unset: { parent: null },
                    path: foundChild.slug
                })
            });
        }

        await Category.findByIdAndDelete(category._id);
        deletedCount++
    };

    let restCategories = await Category.find().populate('parent')
    // const { deletedCount } = await Category.deleteMany({ _id: { $in: categories } })
    res.status(200).json({
        success: true,
        msg: `${deletedCount} category(s) deleted successfully.`,
        deletedCount,
        length: restCategories.length,
        categories: restCategories

    })
})
export default DeleteCategories