import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import Category from "@/models/category"
const mongoose = require('mongoose')
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

// Only accessable by Admin 
const DeleteCategories = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            // const { id } = req.query
            // if (!id || !mongoose.Types.ObjectId(id)) return res.status(403).json({ success: false, msg: "A valid user id required." })
            const { categories } = req.body
            if (!categories || categories.length < 1) return res.status(400).json({ success: false, msg: "Categories array is required with atleast one valid id." })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

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
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, please use `PUT` method instead!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default DeleteCategories