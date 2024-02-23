import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";

const getManyProducts = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    await ConnectDB()
    const LIMIT = 50;
    let totalProducts = await Product.countDocuments();

    const totalPages = Math.ceil(totalProducts / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipProducts = (page - 1) * LIMIT;
    let products = await Product.find()
        .sort({ createdAt: -1 })
        .skip(skipProducts)
        .limit(LIMIT)
        .populate("categories")
        .exec();

    res.status(200).json({
        length: products.length,
        totalProducts,
        totalPages,
        currentPage: page,
        products
    })
})
export default getManyProducts