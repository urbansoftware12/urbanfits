import ConnectDB from "@/utils/connect_db"
import { OAuth2Client } from 'google-auth-library';
import User from "@/models/user"
import { AddPoints } from "@/utils/uf-points";
import createUFcard from "@/utils/create-ufcard"
import axios from "axios"
import { sendNotification, sendAdminNotification } from "@/utils/send_notification"
import { SignJwt, SetSessionCookie, isValidTimeZone, getDateOfTimezone } from "@/utils/cyphers";
import StandardApi from "@/middlewares/standard_api"
import UAParser from "ua-parser-js";

const SignupWithGoogle = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false, verify_admin: false }, async () => {
    const { token, timezone } = req.body;
    if (!token || token.length < 20 || !isValidTimeZone(timezone)) return res.status(400).json({ success: false, msg: "A valid google token as `token` and user's time zone as `tiemzone` is required." })

    const googleClient = new OAuth2Client(process.env.CLIENT_ID);
    let ticket;
    try {
        ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        });
    } catch (e) { return res.status(401).json({ success: false, msg: "Invalid token, user unauthorized. Please try registring again with valid google account." }) }
    const { name, email, picture } = ticket.getPayload();

    let username = email.split('@')[0]
    let splittedName = name.split(' ')
    let firstname = splittedName[0]
    splittedName.shift()
    let lastname = splittedName.join(' ')

    await ConnectDB();
    let user = await User.findOne().or([{ email }, { username }]);
    if (user) return res.status(409).json({ success: false, msg: "This Email or Username already in use." });

    const currentUserAgent = req.headers['user-agent']
    const parser = new UAParser(currentUserAgent)
    const ufCardData = await createUFcard()
    user = (await User.create({
        email,
        username,
        firstname,
        lastname,
        image: picture,
        uf_wallet: ufCardData,
        timezone,
        user_agent: SignJwt(currentUserAgent),
        register_provider: "google",
        createdAt: getDateOfTimezone(timezone)
    })).toObject();
    await AddPoints(user._id, user.uf_wallet.card_number, user.timezone, {
        earned: 500,
        source: "signup"
    });
    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/create-tasks-record?user_id=${user._id}`)

    SetSessionCookie(req, res, {
        _id: user._id,
        username: user.username,
        email: user.email,
        register_provider: user.register_provider,
        timezone: user.timezone,
        user_agent: user.user_agent,
        two_fa_enabled: user.two_fa_enabled,
        uf_wallet: user.uf_wallet,
        last_checkin: user.last_checkin,
        createdAt: user.createdAt,
        ...(user.two_fa_activation_date && { two_fa_activation_date: user.two_fa_activation_date }),
        ...(user.role && { role: user.role })
    });

    res.status(200).json({
        success: true,
        msg: "You are Resgistered successfully !",
        payload: SignJwt(user)
    })
    sendNotification(user._id, {
        category: "reward",
        heading: "Signup Bonus",
        type: "signup",
        mini_msg: `Congratulations, You won 500 UF Points as a signup bonus!`,
        message: `Congratulations ! You're a part of Urban Fits now. You got 500 UF Points as a signup bonus, Happy Shopping! Sign up device: ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name}`
    }, { notify: true })
    sendAdminNotification({
        category: "user",
        data: {
            title: "New Signup",
            msg: `A new user ${user.username} just signed up with google through ${parser.getOS().name}${parser.getOS().version}/${parser.getBrowser().name}.`,
            href: "/user/userlist",
            type: "success"
        }
    })
})
export default SignupWithGoogle