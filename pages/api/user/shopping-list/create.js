import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import User from "@/models/user";
import Shoppinglist from "@/models/shoppinglist";
import CorsMiddleware from "@/utils/cors-config"

const CreateShoppinglist = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const { id, name } = req.query
            if (!mongoose.Types.ObjectId(id) || !name) return res.status(403).json({ success: false, msg: "Valid user id and list name are required. Query parameters: id (user's id), name (shopping list name)" })

            await ConnectDB()
            let user = await User.findById(id)
            if (!user) return res.status(404).json({ success: false, msg: "The user with corresponding id does not exist." })

            const numOfLists = await Shoppinglist.countDocuments({ user_id: id })
            if (numOfLists >= 20) return res.status(403).json({ success: false, msg: "You can make maximum 20 shopping lists." })
            let shoppinglist = await Shoppinglist.findOne({ user_id: id, name })
            if (shoppinglist) return res.status(403).json({ success: false, msg: `The shopping list '${name}' already exists. Please choose another name.` })
            else shoppinglist = await Shoppinglist.create({ user_id: id, name})

            res.status(200).json({
                msg: `${shoppinglist.name} created successfully.`,
                shoppinglist
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: POST" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default CreateShoppinglist