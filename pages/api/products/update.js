import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import mongoose from "mongoose";
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const UpdateProducts = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { id } = req.query
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, msg: "A valid product id is required." })

    await ConnectDB()
    if (!id) {
        let products = await Product.updateMany({}, req.body)
        res.status(200).json({
            success: true,
            msg: `Success ! All products has been updated successfully`,
            products
        })
    }
    else if (id) {
        let product = await Product.findById(id)
        if (!product) return res.status(404).json({ success: false, msg: `Product not found with specified id : ${id}` })
        if (product) product = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            success: true,
            msg: `Products with id ${req.query.id} has been updated successfully.`,
            product
        })
    }
})
export default UpdateProducts