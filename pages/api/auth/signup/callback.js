import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import UFpoints from "@/models/ufpoints"
import createUFcard from "@/utils/create-ufcard"
import OTP from "@/models/otp"
import Newsletter from "@/models/newsletter"
import { sendNotification, sendAdminNotification } from "@/utils/send_notification"
import CryptoJS from "crypto-js";
import axios from "axios"
import { SignJwt, SetSessionCookie } from "@/utils/cyphers";
import UAParser from "ua-parser-js";
import StandardApi from "@/middlewares/standard_api";

const SignupCallback = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { otp_id, otp } = req.body
    if (!otp_id || otp_id.length < 18) return res.status(401).json({
        success: false,
        msg: "All valid parameters are required. Body Parameter: otp_id, otp"
    })
    await ConnectDB()

    const dbOtp = await OTP.findById(otp_id)
    if (!dbOtp) return res.status(401).json({ success: false, msg: "The OTP has expired, please try again." })
    if (dbOtp.otp !== otp) return res.status(401).json({ success: false, msg: "The OTP is incorrect." })

    let credentials = dbOtp.new_user
    if (dbOtp) {
        let user = await User.findOne().or([{ email: credentials.email }, { username: credentials.username }])
        if (user) return res.status(409).json({ success: false, msg: "This Email or Username already in use." })
        const ufCardData = await createUFcard()
        const currentUserAgent = req.headers['user-agent'];
        const parser = new UAParser(currentUserAgent);
        user = await User.create({
            ...credentials,
            user_agent: SignJwt(currentUserAgent),
            password: CryptoJS.AES.encrypt(credentials.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(),
            uf_wallet: ufCardData
        })
        await UFpoints.create({
            user_id: user._id,
            card_number: user.uf_wallet.card_number,
            points: 500,
            source: "signup"
        })

        SetSessionCookie(res, {
            _id: user._id,
            username: user.username,
            email: user.email,
            register_provider: user.register_provider,
            user_agent: user.user_agent,
            uf_wallet: user.uf_wallet,
            last_checkin: user.last_checkin,
            createdAt: user.createdAt,
            ...(user.role && { role: user.role })
        });

        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/create-tasks-record?user_id=${user._id}`)
        res.status(200).json({
            success: true,
            msg: "You're Resgistered successfully !",
            session_token: SignJwt(user),
        })
        sendNotification(user._id, {
            category: "reward",
            heading: "Signup Bonus",
            type: "signup",
            mini_msg: `Congratulations, You won 500 UF Points as a signup bonus!`,
            message: `Congratulations ! You're a part of Urban Fits now. You got 500 UF Points as a signup bonus, Happy Shopping!`
        }, { notify: true })
        sendAdminNotification({
            category: "user",
            data: {
                title: "New Signup",
                msg: `A new user ${user.username} just signed up with urbanfits provider through ${parser.getOS()} - ${parser.getBrowser()}..`,
                href: "/user/userlist",
                type: "success"
            }
        })
        const userLetter = await Newsletter.findOne({ email: credentials.email, user: "guest" })
        if (userLetter) return userLetter.update({ active: true, user: user._id })
    }
})
export default SignupCallback