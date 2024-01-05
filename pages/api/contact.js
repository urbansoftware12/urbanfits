import ConnectDB from "@/utils/connect_db"
import sendEmail from "@/utils/sendEmail"
import ContactTemplate from "@/email templates/contact_template"
import CorsMiddleware from "@/utils/cors-config"

const Contact = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            await ConnectDB()
            let mail = req.body

            let template = ContactTemplate(mail)
            let info = await sendEmail({senderName: mail.firstname, from: mail.email, to: process.env.NEXT_PUBLIC_SMTP_SENDER_EMAIL, subject: mail.subject}, template)
            res.status(200).json({
                success: true,
                msg: "Your mail sent successfully !",
                mail
            })
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error occurred, please try again later." })
    }
}
export default Contact