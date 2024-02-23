import ConnectDB from "@/utils/connect_db";
import Product from "@/models/product";
import Category from "@/models/category";
import mongoose from 'mongoose';
import StandardApi from "@/middlewares/standard_api";

const GetSingleProduct = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    const { id } = req.query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            msg: "A valid product id is required. Query parameters: id"
        })
    }
    await ConnectDB()

    let product = await Product.findById(id)
        .populate('categories')
        .populate('bundle_items')
    if (!product) return res.status(404).json({
        success: false,
        msg: "Product not found with corresponding id",
    })

    res.status(200).json({
        success: true,
        msg: `Product found with the id ${id}`,
        product
    })
})
export default GetSingleProduct