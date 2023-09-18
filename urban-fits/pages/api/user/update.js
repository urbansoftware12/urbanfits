import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
import CorsMiddleware from "@/utils/cors-config"

const UpdateUser = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'PUT') {
            const { id } = req.query
            if (!id) return res.status(400).json({ success: false, msg: "User id is required. Query parameters: id" })
            await ConnectDB()
            // authenticating user password if authpassword query exists
            if (req.query.authpassword) {
                let user = await User.findById(req.query.id)
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
                if (req.query.authpassword !== originalPassword) return res.status(404).json({ success: false, msg: "Your password is incorrect" })
            }
            // updating the user profile
            let user = await User.findById(id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            delete req.body.email
            delete req.body.password
            delete req.body.two_fa_secret
            delete req.body.role
            user = await User.findByIdAndUpdate(id, req.body, { new: true })
            const payload = jwt.sign({ ...user }, process.env.SECRET_KEY)
            res.status(200).json({
                success: true,
                msg: `Your data has been updated successfully`,
                payload
            })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default UpdateUser