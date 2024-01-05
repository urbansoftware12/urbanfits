import ConnectDB from "@/utils/connect_db"
import Newsletter from "@/models/newsletter"
import jwt from 'jsonwebtoken'
const mongoose = require('mongoose')
import CorsMiddleware from "@/utils/cors-config"

const UpdateNewsletter = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { id } = req.query
            if (!id) return res.status(400).json({ success: false, msg: "no user id parameter was found in the query." })
            await ConnectDB()
            const letter = await Newsletter.findOneAndUpdate({ user: mongoose.Types.ObjectId(id) }, req.body, { new: true })
            if (!letter) return res.status(404).json({ success: false, msg: "No registration found with the corresponding user id" })
            console.log(letter)
            const payload = jwt.sign({ ...letter }, process.env.NEXT_PUBLIC_SECRET_KEY)
            res.status(200).json({
                success: true,
                msg: `Newsletter subscription updated successfully`,
                payload
            })
        }
        else {
            res.status(403).json({ success: false, msg: "Method no allowed, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal Server Error occurred. Please retry later." })
    }
}

export default UpdateNewsletter