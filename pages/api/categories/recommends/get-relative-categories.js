import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import Product from "@/models/product"
import mongoose from "mongoose"
import CorsMiddleware from "@/utils/cors-config"

const GetRelativeCategories = async (req, res) => {
    try {
        await CorsMiddleware(req, res);
        if (req.method === 'GET') {
            const { category_id } = req.query
            if (!mongoose.Types.ObjectId.isValid(category_id)) return res.status(405).json({ success: false, msg: "Category id must be a valid one. Query parameters: category_id" })
            await ConnectDB()

            function countOccurrences(str, target) {
                const regex = new RegExp(target, 'g');
                const matches = str.match(regex);
                return matches ? matches.length : 0;
            }

            const fallbackCategories = ['649b292762a7c100cfb7207f', '64a59d5816b4c91fa1967b2e', "64d4dfa643c643cc9c60c672"].filter(id => id !== category_id)

            const respectedCategory = await Category.findById(category_id)
                .populate("children")
                .populate("parent")
            if (!respectedCategory) return res.status(404).json({ success: false, msg: "Category with provided id does not exists." })

            let relativeCategories = [...(respectedCategory?.children?.length ? respectedCategory?.children.map(categ => categ._id) : [])]


            if (countOccurrences(respectedCategory.path, "/") === 1) {
                const rootCategories = await Category.find({}).limit(5)
                relativeCategories = relativeCategories.concat(rootCategories.map(c => c._id))
            }
            else if (relativeCategories.length < 5) {
                if (respectedCategory?.parent && respectedCategory?.parent?.children.length > 1) {
                    let siblings = respectedCategory?.parent?.children?.filter(c => c._id.toString() !== category_id)
                    relativeCategories = relativeCategories.concat(siblings.map(sib => sib._id))
                } else relativeCategories = relativeCategories.concat(fallbackCategories)
            }

            if (relativeCategories.length < 5) relativeCategories = relativeCategories.concat(fallbackCategories)

            const relativeCategsSet = new Set(relativeCategories)
            const relativeCategsSetArray = Array.from(relativeCategsSet).filter(c => c.toString() !== category_id)
            const finalRelativeCategories = await Category.find({ _id: { $in: relativeCategsSetArray } })

            const latestArrivals = await Product.find({})
                .sort({ createdAt: -1 })
                .limit(6)

            res.status(200).json({
                success: true,
                msg: '',
                count: finalRelativeCategories.length,
                relative_categories: finalRelativeCategories,
                latest_arrivals: latestArrivals
            })
        } else res.status(405).json({ success: false, msg: "Method not allowed, allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default GetRelativeCategories