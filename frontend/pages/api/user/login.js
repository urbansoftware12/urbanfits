import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")


const Login = async (req, res) => {
    if (req.method === 'POST') {
        await ConnectDB()
        let user = await User.findOne({ email: req.body.email })
        if (!user) user = await User.findOne({ username: req.body.email })
        if (!user) return res.status(404).json({ success: false, msg: "User not found, please create an account" })
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
        if (req.body.password !== originalPassword) return res.status(404).json({ success: false, msg: "Your password is incorrect" })
        const payload = jwt.sign({username: user.username, email: user.email, phone:user.phone }, process.env.SECRET_KEY)
        res.status(200).json({
            success: true,
            msg: "You are Logged in successfully !",
            payload
        })
    }
    else {
        res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
    }
}

export default Login