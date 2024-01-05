import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import Product from "@/models/product"
import CorsMiddleware from "@/utils/cors-config"

const GetIndexContent = async (req, res) => {
    try {
        await CorsMiddleware(req, res);
        if (req.method === 'GET') {
            const homeCollectionSlugs = ["women/", "men/", "kids/", "latest-arrival/", "new-collection/"]
            await ConnectDB()

            const homeCollectionCategories = await Category.find({ slug: { $in: homeCollectionSlugs } })

            const getRespectedCollection = async (slug) => {
                const respectedCategoryId = homeCollectionCategories.filter(category => category.slug === slug)[0]._id
                const collection = await Product.find({ categories: { $all: [respectedCategoryId] } })
                    .limit(5)
                    .sort({ createdAt: -1 })
                    .populate("categories")
                return collection
            }

            const latestArrivals = await getRespectedCollection("latest-arrival/")
            const newCollection = await getRespectedCollection("new-collection/")
            const womenCollection = await getRespectedCollection("women/")
            const menCollection = await getRespectedCollection("men/")
            const kidsCollection = await getRespectedCollection("kids/")

            res.status(200).json({
                success: true,
                msg: '',
                latestArrivals,
                newCollection,
                womenCollection,
                menCollection,
                kidsCollection
            })
        } else res.status(405).json({ success: false, msg: "Method not allowed, allowed methods: GET" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default GetIndexContent