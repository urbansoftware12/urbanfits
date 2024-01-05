import ConnectDB from "@/utils/connect_db";
import Newsletter from "@/models/newsletter";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken")
import CorsMiddleware from "@/utils/cors-config"

const getNewsletters = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === "GET") {
            const { id, email } = req.query
            await ConnectDB()

            if (!id && !email) return res.status(400).json({ success: false, msg: "Invalid request, neither id nor email provided." })

            if (id) {
                const letter = await Newsletter.findOne({ user: mongoose.Types.ObjectId(id) })
                if (!letter) return res.status(404).json({ success: false, msg: "Newsletter not registered with this id." })
                const payload = jwt.sign({ ...letter }, process.env.NEXT_PUBLIC_SECRET_KEY)
                return res.status(200).json({
                    success: true,
                    payload,
                    msg: id && email ? "Both id and email were provided but id was prioritized." : "Newsletter registration found."
                })
            }
            if (email) {
                const letter = await Newsletter.findOne({ email })
                if (!letter) return res.status(404).json({ success: false, msg: "Newsletter not registered with this id" })
                const payload = jwt.sign({ ...letter }, process.env.NEXT_PUBLIC_SECRET_KEY)
                return res.status(200).json({
                    success: true,
                    payload,
                    msg: "Newsletter registration found."
                })
            }

        } else return res.status(405).json({ success: false, msg: "method not allowed, you are using wrong request method!" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}
export default getNewsletters