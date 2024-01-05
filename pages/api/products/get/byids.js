import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import CorsMiddleware from "@/utils/cors-config"

const getProductsByIds = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { productIds } = req.body
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
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: PUT" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default getProductsByIds