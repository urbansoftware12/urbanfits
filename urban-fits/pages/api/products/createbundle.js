import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import Product from "@/models/product"
import mongoose from "mongoose"

// Only accessable by Admin 
const CreateBundle = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { id } = req.query
            const { products } = req.body
            if (!id || !mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, msg: "A valid user id required." })
            if (!products || products.length <= 1) return res.status(400).json({ success: false, msg: "A 'products' array with atleast 2 product IDs is required." })

            await ConnectDB()
            let user = await User.findById(id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

            for (const id of products) {
                const filtered_products = products.filter(product => product != id)
                const bundle_ids = filtered_products.map(product => mongoose.Types.ObjectId(product))

                let newProduct = await Product.findByIdAndUpdate(id,
                    { bundle_items: bundle_ids },
                    {new: true}
                )
            }
            res.status(200).json({
                success: true,
                msg: "Bundle created successfully!"
            })
        }
        else {
            res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error ocurred, please try later." })
    }
}

export default CreateBundle