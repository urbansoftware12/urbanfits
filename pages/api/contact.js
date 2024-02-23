import ConnectDB from "@/utils/connect_db"
import sendEmail from "@/utils/sendEmail"
import ContactTemplate from "@/email templates/contact_template"
import StandardApi from "@/middlewares/standard_api"
import { sendAdminNotification } from "@/utils/send_notification"

const Contact = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    await ConnectDB()
    let mail = req.body;

    let template = ContactTemplate(mail)
    let info = await sendEmail({ senderName: mail.firstname, from: mail.email, to: process.env.NEXT_PUBLIC_SMTP_SENDER_EMAIL, subject: mail.subject }, template)
    sendAdminNotification({
        category: "user",
        data: {
            title: "Customer Contacted",
            msg: `A customer ${mail.firstname} with email ${mail.email} has just contacted with support.`,
            description: `User Message: ${mail.msg}`,
            type: "success"
        }
    })
    res.status(200).json({
        success: true,
        msg: "Your mail sent successfully !",
        info,
        mail
    })
})
export default Contact