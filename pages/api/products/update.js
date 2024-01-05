import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import User from "@/models/user";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

// Only accessable by Admin 
const UpdateProducts = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            const { id } = req.query
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, msg: "A valid product id is required." })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

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
                if (product) {
                    product = await Product.findByIdAndUpdate(id, req.body)
                }
                res.status(200).json({
                    success: true,
                    msg: `Products with id ${req.query.id} has been updated successfully.`,
                    product
                })
            }
        }
        else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default UpdateProducts