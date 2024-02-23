const mongoose = require('mongoose')
import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product";
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";

const GetProductByCategory = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    const { id, min_price, max_price, limit = 30 } = req.query;

    if (!id || !mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            success: false,
            msg: 'A valid category id is required. Query parameters: id',
        });

    await ConnectDB();

    const LIMIT = limit;
    let totalProducts = await Product.countDocuments({
        categories: { $in: [mongoose.Types.ObjectId(id)] }
    });

    const totalPages = Math.ceil(totalProducts / LIMIT);
    const page = parseInt(req.query.page) || 1;
    const skipProducts = (page - 1) * LIMIT;
    const products = await Product.find({ categories: { $in: [mongoose.Types.ObjectId(id)] } })
        .sort({ createdAt: -1 })
        .skip(skipProducts)
        .limit(LIMIT)
        .populate("categories");

    let childProducts = []
    if (page >= totalPages) {
        let category = await Category.findById(id);
        if (category && category.children.length !== 0) {
            for (const child of category.children) {
                let foundChildProducts = await Product.find({ categories: { $in: [child] } })
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * LIMIT)
                    .limit(Math.ceil(category.children.length / LIMIT))
                    .populate("categories")

                childProducts.push(...foundChildProducts)
            }
        }
    }
    const finalProducts = products.concat(childProducts)

    if (!finalProducts) return res.status(404).json({
        success: false,
        msg: 'No products found with corresponding category',
    });

    // Extracting data for filters
    const minPrice = !finalProducts.length ? 0 : finalProducts.reduce((min, product) => (product.price < min ? product.price : min), finalProducts[0].price);
    const maxPrice = !finalProducts.length ? 0 : finalProducts.reduce((max, product) => (product.price > max ? product.price : max), finalProducts[0].price);

    const allAvailableColors = (finalProducts.flatMap(product => product.variants.map(variant => ({ color: variant.color, color_name: variant.color_name }))))
    const availableColors = []
    allAvailableColors.forEach((colorObj) => {
        const matchedColor = availableColors.find(obj => obj.color_name?.toLowerCase() === colorObj?.color_name?.toLowerCase())
        if (!matchedColor) availableColors.push(colorObj)
    })

    const allAvailableSizes = finalProducts.flatMap(product => product.variants.flatMap(variant => variant.sizes.map(size => ({ size: size.size, quantity: size.quantity }))))
    const availableSizes = []
    allAvailableSizes.forEach((sizeObj) => {
        const matchedSize = availableSizes.find(size => size?.toLowerCase() === sizeObj?.size?.toLowerCase() && sizeObj.quantity > 0)
        if (!matchedSize) availableSizes.push(sizeObj.size)
    })

    res.status(200).json({
        success: true,
        msg: `Products found with the category of id ${id}`,
        currentPage: page,
        totalPages,
        products: finalProducts,
        min_price: min_price && min_price < minPrice ? min_price : minPrice,
        max_price: max_price && max_price > maxPrice ? max_price : maxPrice,
        available_colors: availableColors,
        available_sizes: availableSizes
    });
})
export default GetProductByCategory