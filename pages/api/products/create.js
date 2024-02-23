import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import StandardApi from "@/middlewares/standard_api";

// Only accessable by Admin 
const CreateProduct = async (req, res) => StandardApi(req, res, { method: "POST", verify_admin: true }, async () => {
    await ConnectDB()
    let product = await Product.findOne().or([{ name: req.body.name }, { slug: req.body.slug }])
    if (product) return res.status(400).json({ success: false, msg: "Product already exists with this name or slug." })

    let uf_points = req.body.uf_points
    const { price } = req.body
    if (!req.body.uf_points && !req.body.sale_price) {
        if (price >= 1 && price < 50) uf_points = 40
        else if (price >= 50 && price < 100) uf_points = 80
        else if (price >= 100 && price < 150) uf_points = 120
        else if (price >= 150 && price < 200) uf_points = 160
        else if (price >= 200 && price < 300) uf_points = 200
        else if (price >= 300 && price < 400) uf_points = 250
        else if (price >= 400 && price < 500) uf_points = 300
        else if (price > 499) uf_points = 350
        else uf_points = 0
    }
    console.log({ ...req.body, uf_points })

    product = await Product.create({ ...req.body, uf_points })
    res.status(200).json({
        success: true,
        msg: "Success !",
        product
    })
})
export default CreateProduct