import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Shoppinglist from "@/models/shoppinglist";
import CorsMiddleware from "@/utils/cors-config"

const PopulateShoppinglist = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'DELETE') {
            const { list_id, user_id } = req.query
            if (!mongoose.Types.ObjectId(list_id)) return res.status(403).json({ success: false, msg: "Valid shoppinglist id is required. Query parameters: list_id" })
            await ConnectDB()

            const deletedList = await Shoppinglist.findOneAndDelete({ _id: list_id, user_id })
            let restShoppingLists = await Shoppinglist.find({ user_id })

            res.status(200).json({
                success: true,
                msg: `'${deletedList.name}' deleted successfully.`,
                shoppinglists: restShoppingLists
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: DELETE" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default PopulateShoppinglist