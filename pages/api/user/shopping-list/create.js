import ConnectDB from "@/utils/connect_db";
import Shoppinglist from "@/models/shoppinglist";
import StandardApi from "@/middlewares/standard_api";

const CreateShoppinglist = async (req, res) => StandardApi(req, res, { method: "POST" }, async () => {
    const { name } = req.query;
    const user_id = req.user._id;
    if (!name) return res.status(403).json({ success: false, msg: "Valid list name is required. Query parameters: name (shopping list name)" })

    await ConnectDB()

    const numOfLists = await Shoppinglist.countDocuments({ user_id })
    if (numOfLists >= 20) return res.status(403).json({ success: false, msg: "You can make maximum 20 shopping lists." })
    let shoppinglist = await Shoppinglist.findOne({ user_id, name })
    if (shoppinglist) return res.status(403).json({ success: false, msg: `The shopping list '${name}' already exists. Please choose another name.` })
    else shoppinglist = await Shoppinglist.create({ user_id, name })

    res.status(200).json({
        msg: `${shoppinglist.name} created successfully.`,
        shoppinglist
    })
})
export default CreateShoppinglist