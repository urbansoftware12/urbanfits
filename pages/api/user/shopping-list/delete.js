import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import Shoppinglist from "@/models/shoppinglist";
import StandardApi from "@/middlewares/standard_api";

const PopulateShoppinglist = async (req, res) => StandardApi(req, res, { method: "DELETE" }, async () => {
    const { list_id } = req.query;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId(list_id)) return res.status(403).json({ success: false, msg: "Valid shoppinglist id is required. Query parameters: list_id" })
    await ConnectDB()

    const deletedList = await Shoppinglist.findOneAndDelete({ _id: list_id, user_id })
    let restShoppingLists = await Shoppinglist.find({ user_id })

    res.status(200).json({
        success: true,
        msg: `'${deletedList.name}' deleted successfully.`,
        shoppinglists: restShoppingLists
    })
})
export default PopulateShoppinglist