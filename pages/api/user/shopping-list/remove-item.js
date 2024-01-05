import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Shoppinglist from "@/models/shoppinglist";
import CorsMiddleware from "@/utils/cors-config"

const RemoveFromShoppinglist = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { list_id, product_id } = req.query
            if (!mongoose.Types.ObjectId(list_id) || !mongoose.Types.ObjectId(product_id)) return res.status(403).json({ success: false, msg: "Valid shoppinglist id and list name are required. Query parameters: list_id, product_id" })
            await ConnectDB()

            let shoppinglist = await Shoppinglist.findById(list_id)
            if (!shoppinglist) return res.status(403).json({ success: false, msg: `The shopping list you want to remove from, does not exist.` })
            shoppinglist = await Shoppinglist.findByIdAndUpdate(list_id, {
                $pull: { products: mongoose.Types.ObjectId(product_id) }
            }, { new: true })

            res.status(200).json({
                msg: `Item removed successfully.`,
                shoppinglist
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default RemoveFromShoppinglist