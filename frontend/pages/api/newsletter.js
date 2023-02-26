import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import Newsletter from "@/models/newsletter"

// Only accessable by Admin 
const CreateNewsletter = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await ConnectDB()
            let user = await User.findById(req.query.id)
            if (!user) return res.status(404).send({ success: false, message: "User not found" })
            let letter = await Newsletter.findOne({ email: req.body.email })
            if (letter) return res.status(400).json({ success: false, message: "This email has already subscribed our Newsletter" })
            letter = await Newsletter.create(req.body)
            res.status(200).json({
                success: true,
                message: "You have successfully subscribed to our newsletter!"
            })
        }
        else {
            res.status(400).json({ success: false, message: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Internal server error, please try again later" })
    }
}

export default CreateNewsletter