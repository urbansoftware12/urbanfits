import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import StandardApi from "@/middlewares/standard_api";

const getProductsByIds = async (req, res) => StandardApi(req, res, { method: "PUT", verify_user: false }, async () => {
    const { productIds } = req.body;
    if (!productIds || productIds.length === 0) return res.status(400).json({ success: false, msg: "No products to get, product id array wasn't specified. Body parameters: productIds (array)" })

    await ConnectDB()
    const LIMIT = 30;
    let totalProducts = productIds.length;
    const totalPages = Math.ceil(totalProducts / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipProducts = (page - 1) * LIMIT;
    const products = await Product.find({ _id: { $in: productIds } })
        .sort({ createdAt: -1 })
        .skip(skipProducts)
        .limit(LIMIT)

    res.status(200).json({
        length: products.length,
        totalProducts,
        totalPages,
        currentPage: page,
        products
    })
})
export default getProductsByIds