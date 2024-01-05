import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
import sendNotification from "@/utils/send_notification"
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
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY)
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
                if (req.query.authpassword !== originalPassword) return res.status(404).json({ success: false, msg: "Your password is incorrect" })
            }
            let user = await User.findById(id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            delete req.body.email
            delete req.body.username
            delete req.body.password
            delete req.body.two_fa_secret
            delete req.body.two_fa_enabled
            delete req.body.role
            delete req.body.last_seen
            delete req.body.uf_wallet
            user = await User.findByIdAndUpdate(id, req.body, { new: true })
            delete user.password

            const payload = jwt.sign({ ...user }, process.env.NEXT_PUBLIC_SECRET_KEY)
            res.status(200).json({
                success: true,
                msg: `Your data has been updated successfully`,
                payload
            })
            await sendNotification(user._id, {
                category: "account",
                heading: "User Data Updated",
                type: "user-data",
                mini_msg: `You updated your profile data.`,
                message: `You updated your profile data.`,
            }, { notify: true, notifySilently: true })
        }
        else res.status(405).json({ success: false, msg: "Method not allowed, Allowed Methods: PUT" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}

export default UpdateUser