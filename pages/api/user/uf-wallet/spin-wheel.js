import ConnectDB from "@/utils/connect_db";
import User from "@/models/user";
import { sendNotification } from "@/utils/send_notification";
import { generateRandIntWithProbabilities, getDateOfTimezone } from "@/utils/cyphers.js";
import { AddPoints, DeductPoints } from "@/utils/uf-points";
import StandardApi from "@/middlewares/standard_api";

const rewards = [0, 0, 50, 100, 200, 300, 400, 500];
const probabilities = [0.18, 0.18, 0.18, 0.18, 0.12, 0.08, 0.04, 0.04];
const SpinUfWheel = async (req, res) => StandardApi(req, res, { method: "POST" }, async () => {
    const { card_number } = req.query;
    const user_id = req.user._id;
    if (!card_number) return res.status(403).json({ success: false, msg: "Invalid arguments. Required Query parameers: card_number" })
    await ConnectDB()

    const user = await User.findOne({ _id: user_id, "uf_wallet.card_number": card_number })
    if (!user) return res.status(404).json({ success: false, msg: "Invalid information of user uf-card" })

    console.log("the user's timezone: ", req.user.timezone)
    const currentDate = new Date(getDateOfTimezone(req.user.timezone).setHours(23, 59, 59));
    const today = getDateOfTimezone(req.user.timezone);
    const currentWeekStart = new Date(new Date(new Date(today).setDate(today.getDate() - (today.getDay() + 6) % 7)).setHours(0, 0, 0, 0));
    const secondSpinTimeAvailability = new Date(new Date(currentWeekStart).setDate(new Date(currentWeekStart).getDate() + 3));
    const thirdSpinTimeAvailability = new Date(new Date(secondSpinTimeAvailability).setDate(new Date(secondSpinTimeAvailability).getDate() + 2));

    const spinUfWheel = async (nextSpinTime = null, deductSpinFee = true) => {
        const generatedReward = generateRandIntWithProbabilities(rewards, probabilities);
        if (deductSpinFee) await DeductPoints(user._id, user.uf_wallet.card_number, user.timezone, 10);

        if (generatedReward !== 0) {
            await AddPoints(user._id, user.uf_wallet.card_number, user.timezone,
                {
                    earned: generatedReward,
                    source: "prize_wheel",
                    expirationDate: new Date(new Date(getDateOfTimezone(req.user.timezone).setHours(23, 59, 59)).setDate(currentDate.getDate() + 7))
                }
            );
            sendNotification(user._id, {
                category: "reward",
                heading: "Fortune Wheel Prize",
                type: "prize_wheel",
                mini_msg: '',
                message: `Congratulations! You won ${generatedReward} UF-Points in prize wheel spin. They will expire after 7 days and shall be deducted from your wallet. Be active whole week to get chance to spin.`
            }, { notify: true, notifySilently: true })
        }
        await User.findByIdAndUpdate(user._id, {
            "uf_wallet.last_uf_spin": currentDate,
            "uf_wallet.last_spin_reward": generatedReward,
            ...(nextSpinTime && { "uf_wallet.next_uf_spin": new Date(nextSpinTime) })
        })
        return res.status(200).json({
            success: true,
            msg: generatedReward === 0 ? "Oops! no points But you gained a free change to try your luck again!" : `Congratulations! You have won ${generatedReward} UF-Points.`,
            reward: generatedReward,
            last_uf_spin: currentDate,
            ...(nextSpinTime && { next_uf_spin: new Date(nextSpinTime) })
        });
    };

    if (!user.uf_wallet.last_uf_spin && !user.uf_wallet.last_spin_reward) {
        let nextUfSpinForNewUser = null;
        if (today >= currentWeekStart && today < secondSpinTimeAvailability) nextUfSpinForNewUser = secondSpinTimeAvailability
        else if (today >= secondSpinTimeAvailability && today < thirdSpinTimeAvailability) nextUfSpinForNewUser = thirdSpinTimeAvailability
        else if (today >= thirdSpinTimeAvailability) nextUfSpinForNewUser = new Date(currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay() + 1) % 7))
        return await spinUfWheel(nextUfSpinForNewUser, false)
    }

    if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(null, false)
    else if (today >= currentWeekStart && today < secondSpinTimeAvailability) {
        if (user.uf_wallet.last_uf_spin < currentWeekStart) return await spinUfWheel(secondSpinTimeAvailability)
        else if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(secondSpinTimeAvailability, false)
        else return res.status(403).json({ success: false, msg: "You can't spin yet, wait for the cooldown." })
    }
    else if (today >= secondSpinTimeAvailability && today < thirdSpinTimeAvailability) {
        if (user.uf_wallet.last_uf_spin < secondSpinTimeAvailability) return await spinUfWheel(thirdSpinTimeAvailability)
        else if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(thirdSpinTimeAvailability, false)
        else return res.status(403).json({ success: false, msg: "You can't spin yet, wait for the cooldown." })
    }
    else if (today >= thirdSpinTimeAvailability && user.uf_wallet.last_uf_spin < thirdSpinTimeAvailability) {
        const nextMondayDate = new Date(new Date(currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay() + 1) % 7)).setHours(0, 0, 0, 0));
        if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(nextMondayDate, false)
        else return await spinUfWheel(nextMondayDate)
    }
    else return res.status(403).json({ success: false, msg: "You have used all 3 spins this week, wait for next week for more spins." })
})
export default SpinUfWheel