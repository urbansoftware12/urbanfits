import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import mongoose from "mongoose"
import StandardApi from "@/middlewares/standard_api"

// Only accessable by Admin 
const CreateBundle = async (req, res) => StandardApi(req, res, { method: "POST", verify_admin: true }, async () => {
    const { products } = req.body;
    if (!products || products.length <= 1) return res.status(400).json({ success: false, msg: "A 'products' array with atleast 2 product IDs is required." })

    await ConnectDB()
    for (const id of products) {
        const filtered_products = products.filter(product => product != id)
        const bundle_ids = filtered_products.map(product => mongoose.Types.ObjectId(product))

        let newProduct = await Product.findByIdAndUpdate(id,
            { bundle_items: bundle_ids },
            { new: true }
        )
    }
    res.status(200).json({
        success: true,
        msg: "Bundle created successfully!"
    })
})
export default CreateBundle