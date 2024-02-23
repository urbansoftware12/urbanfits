import ConnectDB from "@/utils/connect_db";
import { isValidObjectId } from "mongoose";
import User from "@/models/user";
import { AddPoints } from "@/utils/uf-points";
import { generateRandomInt, getDateOfTimezone } from "@/utils/cyphers.js";
import sendNotification from "@/utils/send_notification";
import StandardApi from "@/middlewares/standard_api";

const HandlePresenceEvents = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    const { events } = req.body
    for (const { name, user_id } of events) {
        if (name === 'member_added') {
            console.log("A member just joined with id: " + user_id)
            if (isValidObjectId(user_id)) {
                await ConnectDB()
                const user = await User.findByIdAndUpdate(user_id, { is_active: true }, { new: true })

                const todayDate = getDateOfTimezone(req.user.timezone);
                const currentDate = getDateOfTimezone(req.user.timezone).setHours(0, 0, 0, 0);
                const last_checkin = new Date(user.last_checkin).getTime();
                const expiryDate = new Date(todayDate.setDate(todayDate.getDate() + 7));
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
            } else return res.status(200).end();
        }
        else if (name === 'member_removed') {
            console.log("A member just left server with id: " + user_id)
            await ConnectDB()
            if (isValidObjectId(user_id)) await User.findByIdAndUpdate(user_id, { is_active: false })
            console.log("user_left handled successfully.")
        }
    }
    res.status(200).json({ success: true, msg: "presence event handled successfully" })
})
export default HandlePresenceEvents