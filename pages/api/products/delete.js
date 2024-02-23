import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const DeleteProducts = async (req, res) => StandardApi(req, res, { method: "PUT", verify_admin: true }, async () => {
    const { products } = req.body;
    await ConnectDB()
    if (!products || products.length < 1) return res.status(400).json({ success: false, msg: "Products array is required with atleast one valid id." })
    else await Product.deleteMany({ _id: { $in: products } })
    res.status(200).json({
        success: true,
        msg: `${products.length} Products deleted successfully`
    })
})
export default DeleteProducts