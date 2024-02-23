import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import mongoose from "mongoose"
import StandardApi from "@/middlewares/standard_api"

const getOneCategory = async (req, res) => StandardApi(req, res, { verify_admin: false, verify_user: false }, async () => {
    const { category_id } = req.query
    if (!mongoose.Types.ObjectId.isValid(category_id)) return res.status(405).json({ success: false, msg: "A valid category id is required. Required query params: category_id" })
    await ConnectDB()
    const category = await Category.findById(category_id)
    res.status(200).json({
        success: true,
        msg: "",
        category
    })
})
export default getOneCategory