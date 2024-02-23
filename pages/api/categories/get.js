import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import StandardApi from "@/middlewares/standard_api"

const getCategories = async (req, res) => StandardApi(req, res, { verify_admin: false, verify_user: false }, async () => {
    const { populate_parents } = req.query
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
})
export default getCategories