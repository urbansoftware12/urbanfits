import StandardApi from "@/middlewares/standard_api";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import { AddPoints } from "@/utils/uf-points";
import { generateRandomInt, getDateOfTimezone } from "@/utils/cyphers.js";
import { sendNotification } from "@/utils/send_notification";

const UpdateUser = async (req, res) => StandardApi(req, res, { method: "PUT" }, async () => {
    await ConnectDB();
    const user = await User.findByIdAndUpdate(req.user._id, { is_active: true }, { new: true, lean: true });
    const todayDate = getDateOfTimezone(user.timezone);
    const currentDate = getDateOfTimezone(user.timezone).setHours(0, 0, 0, 0);
    const last_checkin = new Date(user.last_checkin).getTime();
    const expiryDate = new Date(todayDate.setDate(todayDate.getDate() + 7));
    if ((currentDate > last_checkin) && (new Date(user.createdAt).setHours(23, 59, 59, 999) < currentDate)) {
        const reward = generateRandomInt(20, 50)
        await AddPoints(user._id, user.uf_wallet.card_number, user.timezone, { earned: reward, expirationDate: expiryDate, })
        await sendNotification(user._id, {
            category: "reward",
            heading: "Daily Check in Bonus",
            type: "daily_checkin",
            mini_msg: `Welcome back, you won ${reward} UF-Points today!`,
            message: `Welcome back! ${reward} UF-Points are added to your UF-wallet, they will expire after 7 days and shall be deducted from your wallet. Keep coming everyday and win exciting rewards.`
        }, { notifySilently: true })
        const last_checkin = new Date(getDateOfTimezone(user.timezone).setHours(23, 59, 59, 999));

        res.status(200).json({ success: true, last_checkin, msg: `Congratulations! You've won ${reward} UF-Points for today's check in.` });
        await User.findByIdAndUpdate(user._id, { last_checkin });
    } else return res.status(400).json({ success: false, msg: "You are not eligible for a check in reward yet." })
})

export default UpdateUser