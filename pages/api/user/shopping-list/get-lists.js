import ConnectDB from "@/utils/connect_db";
import Shoppinglist from "@/models/shoppinglist";
import StandardApi from "@/middlewares/standard_api";

const GetShoppinglists = async (req, res) => StandardApi(req, res, {}, async () => {
    const user_id = req.user._id;
    await ConnectDB()
    let shoppinglists = await Shoppinglist.find({ user_id })
    res.status(200).json({
        msg: `${shoppinglists.length} Shopping lists found.`,
        shoppinglists
    })
})
export default GetShoppinglists