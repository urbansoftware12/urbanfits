import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Shoppinglist from "@/models/shoppinglist";
import StandardApi from "@/middlewares/standard_api";

const RenameShoppinglist = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    const { list_name, list_id } = req.query;
    if (!mongoose.Types.ObjectId(list_id) || !list_name) return res.status(403).json({ success: false, msg: "Valid shoppinglist id and new name is required. Query parameters: list_id, list_name" })
    await ConnectDB()

    const updatedList = await Shoppinglist.findByIdAndUpdate(list_id, {
        name: list_name
    }, { new: true })
    const shoppinglists = await Shoppinglist.find({ user_id: updatedList.user_id })

    res.status(200).json({
        success: true,
        msg: 'Shopping list updated successfully.',
        shoppinglists
    })
})
export default RenameShoppinglist