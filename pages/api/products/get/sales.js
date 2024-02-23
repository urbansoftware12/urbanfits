import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";

const getSaleProducts = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    const { min_price, max_price } = req.query;
    await ConnectDB()
    const LIMIT = 50;
    let totalProducts = await Product.countDocuments({ sale_price: { $exists: true, $type: 'number', $ne: 0 } });

    const totalPages = Math.ceil(totalProducts / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipProducts = (page - 1) * LIMIT;
    let products = await Product.find({ sale_price: { $exists: true, $type: 'number', $ne: 0 } })
        .sort({ createdAt: -1 })
        .skip(skipProducts)
        .limit(LIMIT)
        .populate("categories")
        .exec();

    // Extracting data for filters
    const minPrice = !products.length ? 0 : products.reduce((min, product) => (product.price < min ? product.price : min), products[0].price);
    const maxPrice = !products.length ? 0 : products.reduce((max, product) => (product.price > max ? product.price : max), products[0].price);

    const allAvailableColors = (products.flatMap(product => product.variants.map(variant => ({ color: variant.color, color_name: variant.color_name }))))
    const availableColors = []
    allAvailableColors.forEach((colorObj) => {
        const matchedColor = availableColors.find(obj => obj.color_name?.toLowerCase() === colorObj?.color_name?.toLowerCase())
        if (!matchedColor) availableColors.push(colorObj)
    })

    const allAvailableSizes = products.flatMap(product => product.variants.flatMap(variant => variant.sizes.map(size => ({ size: size.size, quantity: size.quantity }))))
    const availableSizes = []
    allAvailableSizes.forEach((sizeObj) => {
        const matchedSize = availableSizes.find(size => size?.toLowerCase() === sizeObj?.size?.toLowerCase() && sizeObj.quantity > 0)
        if (!matchedSize) availableSizes.push(sizeObj.size)
    })

    res.status(200).json({
        length: products.length,
        totalProducts,
        totalPages,
        currentPage: page,
        products,
        min_price: min_price && min_price < minPrice ? min_price : minPrice,
        max_price: max_price && max_price > maxPrice ? max_price : maxPrice,
        available_colors: availableColors,
        available_sizes: availableSizes
    })
})
export default getSaleProducts