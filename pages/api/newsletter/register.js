import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import Newsletter from "@/models/newsletter"
import newsletter_confirm_template from "@/email templates/newsletter_confirm"
import sendEmail from "@/utils/sendEmail"
import sendSMS from "@/utils/sendSMS"
import jwt from 'jsonwebtoken'
const mongoose = require('mongoose')
import CorsMiddleware from "@/utils/cors-config"

const CreateNewsletter = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            console.log(req.body)
            await ConnectDB()
            const id = req.body.user

            const returnIfSubscribed = async (body) => {
                console.log(body)
                const toFindObj = () => {
                    const { email, phone } = body
                    if (email) return { email }
                    if (phone) return { phone }
                }
                console.log(toFindObj())
                let letter = await Newsletter.findOne(toFindObj())
                if (letter) return res.status(400).json({ success: false, msg: "This email has already subscribed our Newsletter" })
            }
            const sendTokenRes = async (letter) => {
                const payload = jwt.sign({ ...letter }, process.env.NEXT_PUBLIC_SECRET_KEY)
                return res.status(200).json({
                    success: true,
                    msg: "You have successfully subscribed to our newsletter!",
                    payload
                })
            }
            const sendSubConfirmationViaEmail = async (name, interests) => {
                if (!req.body.email) return
                const template = newsletter_confirm_template(name, interests)
                await sendEmail({ to: req.body.email, subject: "Newsletter Subscription Confirmation" }, template)
            }
            const sendSubConfirmationViaSMS = async (name, interests) => {
                if (!req.body.phone) return
                const msg = `Welcome to Our Newsletter!\n
                Dear ${name || "Subsciber"},\n Thank you for subscribing to our newsletter. We are delighted to have you on board!\n
                You have subscribed based on the following interests:\n
                ${interests.map((interest) => `•${interest}`).join("\n")}\n
                You will receive every update about our latest new coming exciting stocks and sales\n\n
                Urban Fits L.L.C. 2023-2024. All rights reserved.`
                await sendSMS(req.body.phone, msg)
            }

            if (!id) {
                const { email, phone } = req.body
                await returnIfSubscribed(req.body)

                let letter;
                if (email) {
                    letter = await Newsletter.create({ ...req.body, active_by_email: true })
                    sendSubConfirmationViaEmail(null, req.body.interests)
                }
                if (phone) {
                    letter = await Newsletter.create({ ...req.body, active_by_phone: true })
                    sendSubConfirmationViaSMS(null, req.body.interests)
                }
                return await sendTokenRes(letter)
            }

            if (id) {
                let user = await User.findById(req.body.user)
                if (!user) return res.status(404).json({ success: false, msg: "User not found" })
                await returnIfSubscribed(req.body)

                let letter = await Newsletter.findOne({ user: mongoose.Types.ObjectId(id) })
                if (letter) {
                    const { email, phone } = req.body
                    if (email) letter = await Newsletter.findByIdAndUpdate(letter._id, { ...req.body, active_by_email: true }, { new: true })
                    if (phone) letter = await Newsletter.findByIdAndUpdate(letter._id, { ...req.body, active_by_phone: true }, { new: true })
                }
                else letter = await Newsletter.create(req.body)

                req.body.phone ? sendSubConfirmationViaSMS(user.firstname, req.body.interests) : sendSubConfirmationViaEmail(user.firstname, req.body.interests)
                return await sendTokenRes(letter)
            }
        }
        else {
            res.status(405).json({ success: false, msg: "method not allowed, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error, please try again later" })
    }
}

export default CreateNewsletter