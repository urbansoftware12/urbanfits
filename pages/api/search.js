import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"
import Category from "@/models/category"
import CorsMiddleware from "@/utils/cors-config"

const UpdateProducts = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'GET') {
            await ConnectDB()
            const searchTerm = req.query.q
            console.log(searchTerm)

            // const results = await Product.find({
            //     $or: [
            //         // { category: { $regex: searchTerm, $options: "i" } },
            //         { name: { $regex: searchTerm, $options: "i" } },
            //         { tags: { $elemMatch: { $regex: searchTerm, $options: "i" } } }
            //     ]
            // })

            const productResults = await Product.aggregate([
                {
                    $search: {
                        index: "product",
                        text: {
                            query: searchTerm,
                            path: ["tags", "name"],
                            fuzzy: {}
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        cover_image: 1,
                        name: 1
                    },
                },
                {
                    $limit: 12
                }
            ]);
            console.log(productResults)
            const categoryResults = await Category.aggregate([
                {
                    $search: {
                        index: "category",
                        text: {
                            query: searchTerm,
                            path: ["slug", "path", "name"],
                            fuzzy: {}
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1
                    },
                },
                { $limit: 8 }
            ]);
            const finalResults = productResults.concat(categoryResults)
            res.json(finalResults);
        }
        else res.status(400).json({ error: "Method now allowed. Allowed methods: GET" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default UpdateProducts