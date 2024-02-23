import ConnectDB from "@/utils/connect_db";
import Newsletter from "@/models/newsletter";
import mongoose from "mongoose";
import StandardApi from "@/middlewares/standard_api";

const getNewsletters = async (req, res) => StandardApi(req, res, {}, async () => {
    const queries = req.query
    await ConnectDB()
    const returnIfValidId = (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) return mongoose.Types.ObjectId(value);
        else return value
    }

    const queryObject = queries && queries.user ? { ...queries, user: returnIfValidId(queries?.user) } : queries

    let letters = queries ? await Newsletter.find(queryObject) : await Newsletter.find()
    if (!letters) return res.status(404).json({ success: false, msg: "Newsletter data not found with specified filters." })
    return res.status(200).json({ success: true, payload: letters, msg: "Newsletter data found.", filters: queries })
})
export default getNewsletters