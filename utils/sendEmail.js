const nodemailer = require('nodemailer');

const sendEmail = async (options, template) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_SMTP_HOST,
            port: 587,
            auth: {
                user: process.env.NEXT_PUBLIC_SMTP_USER,
                pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const message = {
            from: `"${options.senderName ? options.senderName : "Urban Fits"}" <${options.from ? options.from : process.env.NEXT_PUBLIC_SMTP_SENDER_EMAIL}>`,
            to: options.to,
            replyTo: options.from ? options.from : process.env.NEXT_PUBLIC_SMTP_SENDER_EMAIL,
            text: "Urban Fits",
            subject: options.subject,
            html: template
        };

        let info = await transport.sendMail(message);
        console.log(info)
        return info
    } catch (error) { console.log(error); return error }
}
export default sendEmail