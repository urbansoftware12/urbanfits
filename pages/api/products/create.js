import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import User from "@/models/user";
import CorsMiddleware from "@/utils/cors-config"
import verifyAdminToken from "@/utils/verify_admin";

// Only accessable by Admin 
const CreateProduct = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const admin_id = verifyAdminToken(req, res)
            // const { id } = req.query
            // if (!id || !mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, msg: "A valid user id required." })

            await ConnectDB()
            let user = await User.findById(admin_id)
            if (!user || user.role !== "administrator") return res.status(403).json({ success: false, msg: "The user with corresponding id must exist and should be administrator create categories" })

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
        }
        else return res.status(405).json({ success: false, msg: "Method not Allowed, you are using wrong request method!" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default CreateProduct