import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Shoppinglist from "@/models/shoppinglist";
import CorsMiddleware from "@/utils/cors-config"

const GetShoppinglists = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            const { user_id } = req.query
            if (!mongoose.Types.ObjectId(user_id)) return res.status(403).json({ success: false, msg: "Valid user id is required. Query parameters: user_id" })

            await ConnectDB()
            let shoppinglists = await Shoppinglist.find({ user_id })

            res.status(200).json({
                msg: `${shoppinglists.length} Shopping lists found.`,
                shoppinglists
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default GetShoppinglists