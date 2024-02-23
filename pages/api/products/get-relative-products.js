import ConnectDB from "@/utils/connect_db";
import Product from "@/models/product";
import mongoose from 'mongoose';
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";

const GetSingleProduct = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    const { product_id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(product_id)) return res.status(400).json({ success: false, msg: "A valid product id is required. Query parameters: product_id" })
    await ConnectDB()

    const product = await Product.findById(product_id)
    if (!product) return res.status(404).json({
        success: false,
        msg: "Product not found with corresponding id",
    })
    const { categories } = product
    let relativeProducts = []
    for (const category of categories) {
        const relativeProduct = await Product.find({ categories: { $in: [category] } }).populate("categories")
        relativeProducts = relativeProducts.concat(relativeProduct)
        if (relativeProducts.length > 5) break
    }
    const filteredRelativeProducts = relativeProducts.filter(product => product._id !== product_id).slice(0, 5)

    res.status(200).json({
        success: true,
        msg: '',
        relative_products: filteredRelativeProducts
    })
})
export default GetSingleProduct