import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
const mongoose = require('mongoose')
import Category from "@/models/category";
import CorsMiddleware from "@/utils/cors-config"

const GetSingleProduct = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { product_id } = req.query
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
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default GetSingleProduct