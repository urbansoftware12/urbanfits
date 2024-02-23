import ConnectDB from "@/utils/connect_db";
import Newsletter from "@/models/newsletter";
import newsletter_confirm_template from "@/email templates/newsletter_confirm";
import sendEmail from "@/utils/sendEmail";
import sendSMS from "@/utils/sendSMS";
import StandardApi from "@/middlewares/standard_api";
import { SignJwt } from "@/utils/cyphers";

const CreateNewsletter = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    await ConnectDB()

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

    const { email, phone } = req.body;
    let letter = await Newsletter.findOne({ ...(email ? { email } : { phone }) })
    if (letter) return res.status(409).json({ success: false, msg: "This email or phone number has already subscribed our Newsletter" })

    if (email) {
        letter = await Newsletter.create({ ...req.body, active_by_email: true }).lean()
        sendSubConfirmationViaEmail(null, req.body.interests)
    }
    else if (phone) {
        letter = await Newsletter.create({ ...req.body, active_by_phone: true }).lean()
        sendSubConfirmationViaSMS(null, req.body.interests)
    }
    return res.status(200).json({
        success: true,
        msg: "You have successfully subscribed to our newsletter!",
        payload: SignJwt(letter)
    })
})
export default CreateNewsletter