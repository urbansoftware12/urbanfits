import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import mongoose from "mongoose";
import User from "@/models/user";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

// Only accessable by Admin 
const DeleteProducts = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const admin_id = verifyAdminToken(req, res)
            // const { user_id } = req.query
            // if (!user_id || !mongoose.Types.ObjectId(user_id)) return res.status(403).json({ success: false, msg: "A valid user id required." })
            const { products } = req.body

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

            if (!products || products.length === 0) return res.status(400).json({ success: false, msg: "Products array is required with atleast one valid id." })
            else await Product.deleteMany({ _id: { $in: products } })
            res.status(200).json({
                success: true,
                msg: `${products.length} Products deleted successfully`
            })
        }
        else res.status(405).json({ success: false, msg: "Method not Allowed. Allowed methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry." })
    }
}

export default DeleteProducts