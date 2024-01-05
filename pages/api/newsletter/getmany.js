import ConnectDB from "@/utils/connect_db";
import Newsletter from "@/models/newsletter";
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config"

const getNewsletters = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === "GET") {
            const queries = req.query
            console.log(queries)
            await ConnectDB()
            const returnIfValidId = (value) => {
                if (mongoose.Types.ObjectId.isValid(value)) {
                    return mongoose.Types.ObjectId(value);
                }
                else return value
            }

            const queryObject = queries && queries.user ? { ...queries, user: returnIfValidId(queries?.user) } : queries

            let letters = queries ? await Newsletter.find(queryObject) : await Newsletter.find()
            if (!letters) return res.status(404).json({ success: false, msg: "Newsletter data not found with specified filters." })
            return res.status(200).json({ success: true, payload: letters, msg: "Newsletter data found.", filters: queries })

        } else return res.status(405).json({ success: false, msg: "method not allowed, you are using wrong request method!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default getNewsletters