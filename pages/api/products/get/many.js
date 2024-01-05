import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import Category from "@/models/category";
import CorsMiddleware from "@/utils/cors-config"

const getManyProducts = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
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
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, Allowed methods: GET" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}
export default getManyProducts