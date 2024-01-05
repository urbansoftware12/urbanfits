import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import CorsMiddleware from "@/utils/cors-config"

const getCategories = async (req, res) => {
    try {
        const { populate_parents } = req.query
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            await ConnectDB()

            let categories;
            if (populate_parents !== undefined && (populate_parents == "false" || populate_parents == false)) categories = await Category.find()
            else categories = await Category.find().populate('parent')

            res.status(200).json({
                success: true,
                msg: "",
                length: categories.length,
                categories
            })
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry" })
    }
}
export default getCategories