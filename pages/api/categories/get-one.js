import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import mongoose from "mongoose"
import CorsMiddleware from "@/utils/cors-config"

const getOneCategory = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { category_id } = req.query
            if(!mongoose.Types.ObjectId.isValid(category_id)) return res.status(405).json({ success: false, msg: "A valid category id is required. Required query params: category_id" })
            await ConnectDB()

            const category = await Category.findById(category_id)

            res.status(200).json({
                success: true,
                msg: "",
                category
            })
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry" })
    }
}
export default getOneCategory