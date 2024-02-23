import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Product from "@/models/product";
import Shoppinglist from "@/models/shoppinglist";
import StandardApi from "@/middlewares/standard_api";

const PopulateShoppinglist = async (req, res) => StandardApi(req, res, {}, async () => {
    const { list_id } = req.query
    if (!mongoose.Types.ObjectId(list_id)) return res.status(403).json({ success: false, msg: "Valid shoppinglist id is required. Query parameters: list_id" })
    await ConnectDB()

    const populatedList = await Shoppinglist.findById(list_id).populate("products")
    res.status(200).json({
        success: true,
        msg: '',
        shoppinglist: populatedList
    })
})
export default PopulateShoppinglist