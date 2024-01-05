import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import Category from "@/models/category"
const mongoose = require('mongoose')
import { pusherServer } from "@/utils/pusher"
import CorsMiddleware from "@/utils/cors-config"

const GetSingleProduct = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { id } = req.query
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
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

            pusherServer.trigger('urban-fits', 'server-update', {
                success: true,
                pusher_msg: "Product fetched to the client successfully. (socket event)"
            })
            res.status(200).json({
                success: true,
                msg: `Product found with the id ${id}`,
                product
            })
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default GetSingleProduct