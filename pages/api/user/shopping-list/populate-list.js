import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Product from "@/models/product";
import Shoppinglist from "@/models/shoppinglist";
import CorsMiddleware from "@/utils/cors-config"

const PopulateShoppinglist = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { list_id } = req.query
            if (!mongoose.Types.ObjectId(list_id)) return res.status(403).json({ success: false, msg: "Valid shoppinglist id is required. Query parameters: list_id" })
            await ConnectDB()

            const populatedList = await Shoppinglist.findById(list_id).populate("products")

            res.status(200).json({
                success: true,
                msg: '',
                shoppinglist: populatedList
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default PopulateShoppinglist