import mongoose from "mongoose";
import ConnectDB from "@/utils/connect_db";
import User from "@/models/user";
import GuestUser from "@/models/guest_user"
import { AddPoints } from "@/utils/uf-points";
import { sendNotification } from "@/utils/send_notification";
import { generateRandomInt, SignJwt, getDateOfTimezone } from "@/utils/cyphers.js";
import { verify, decode } from "jsonwebtoken";
import StandardApi from "@/middlewares/standard_api";
import { parse, serialize } from "cookie";

const HandlePresence = async (req, res) => StandardApi(req, res, { method: "PUT", verify_user: false }, async () => {
    const { name } = req.body.event;

    const { "session-token": sessionToken, "guest-session": guestSession } = parse(req.headers.cookie || '')
    if (sessionToken) {
        try {
            const decodedToken = verify(sessionToken, process.env.NEXT_PUBLIC_SECRET_KEY);
            if (!mongoose.Types.ObjectId.isValid(decodedToken._id)) throw new Error("invalid session token");
            if (decode(decodedToken.user_agent) !== req.headers['user-agent']) throw new Error("invalid session token");
            req.user = decodedToken;
        }
        catch (error) {
            console.log(error)
            return res.status(401).json({ success: false, error, msg: "Your session is invalid or expired. Please sign in again." })
        }
    } else if (guestSession) {
        try {
            let decodedGuest = verify(guestSession, process.env.NEXT_PUBLIC_SECRET_KEY);
            if (!mongoose.Types.ObjectId.isValid(decodedGuest._id)) throw new Error();
            req.user = decodedGuest;
        } catch (e) { return res.status(401).json({ success: false, msg: "Malicious request detected." }); }
    } else if (name === 'user_joined') {
        const guestUser = await GuestUser.create({});
        res.setHeader('Set-Cookie',
            serialize('guest-session', SignJwt({
                _id: guestUser._id,
                is_guest: true,
                createdAt: guestUser.createdAt,
            }), {
                httpOnly: true,
                sameSite: false,
                path: "/",
                secure: process.env.NEXT_PUBLIC_DEV_ENV === "PRODUCTION"
            })
        );
    }

    const user_id = req.user._id;

    if (!name) return res.status(400).send("A valid `event.name` body parameter is required.");
    if (name === 'user_joined') {
        console.log("A member just joined with id: " + user_id)
        if (req.user?.is_guest || req.user?.is_guest === "true") return res.status(200).end();

        await ConnectDB()
        const user = await User.findByIdAndUpdate(user_id, { is_active: true }, { new: true })

        const todayDate = getDateOfTimezone(req.user.timezone);
        const currentDate = getDateOfTimezone(req.user.timezone).setHours(0, 0, 0, 0);
        const last_checkin = new Date(user.last_checkin).getTime();
        const expiryDate = new Date(todayDate.setDate(todayDate.getDate() + 7));
        console.log("reached here")
        if ((currentDate > last_checkin) && (new Date(user.createdAt).setHours(23, 59, 59, 999) < currentDate)) {
            const reward = generateRandomInt(20, 50)
            console.log("the reward rewarded: ", reward)
            await AddPoints(user._id, user.uf_wallet.card_number, user.timezone, { earned: reward, expirationDate: expiryDate, })
            await sendNotification(user._id, {
                category: "reward",
                heading: "Daily Check in Bonus",
                type: "daily_checkin",
                mini_msg: `Welcome back, you won ${reward} UF-Points today!`,
                message: `Welcome back! ${reward} UF-Points are added to your UF-wallet, they will expire after 7 days and shall be deducted from your wallet. Keep coming everyday and win exciting rewards.`
            }, { notify: true })
            await User.findByIdAndUpdate(user_id, { last_checkin: new Date(getDateOfTimezone(req.user.timezone).setHours(23, 59, 59, 999)) })
        }
        console.log("user_joined handled successfully.")
    }
    else if (name === 'user_left') {
        console.log("A member just left server with id: " + user_id)
        await ConnectDB()
        if (req.user?.is_guest || req.user?.is_guest === "true") await GuestUser.findByIdAndDelete(user_id)
        else await User.findByIdAndUpdate(user_id, { is_active: false })
        console.log("user_left handled successfully.")
    }
    res.status(200).end();
})
export default HandlePresence