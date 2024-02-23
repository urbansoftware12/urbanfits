import ConnectDB from "@/utils/connect_db"
import Category from "@/models/category"
import Product from "@/models/product"
import StandardApi from "@/middlewares/standard_api"

const GetIndexContent = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
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
})
export default GetIndexContent