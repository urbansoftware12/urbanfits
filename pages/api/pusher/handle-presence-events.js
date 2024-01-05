import ConnectDB from "@/utils/connect_db";
import User from "@/models/user";
import UFpoints from "@/models/ufpoints";
import GuestUser from "@/models/guest_user";
import SavePointsHistory from "@/utils/save_points_history";
import sendNotification from "@/utils/send_notification";
import { generateRandomInt } from "@/utils/generatePassword";

const HandlePresenceEvents = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { events } = req.body
            for (const event of events) {
                if (event.name === 'member_added') {
                    console.log("A member just joined with id: " + event.user_id)
                    if (event.user_id.endsWith('_isguest')) return res.status(200).json({ message: 'Webhook received successfully' });

                    await ConnectDB()
                    await User.findByIdAndUpdate(event.user_id, { is_active: true })

                    const currentDate = new Date()
                    const user = await User.findById(event.user_id)
                    const last_checkin = new Date(user.last_checkin)
                    currentDate.setHours(0, 0, 0, 0);
                    last_checkin.setHours(0, 0, 0, 0);
                    console.log(user, last_checkin)
                    const expiryDate = new Date(new Date().setDate(new Date().getDate() + 7))
                    console.log(currentDate.getDate(), last_checkin.getDate(), "here is the condition: ", currentDate.getDate() > last_checkin.getDate())
                    if ((currentDate > last_checkin) && (new Date(user.createdAt) < currentDate)) {
                        const reward = generateRandomInt(20, 50)
                        await UFpoints.create({
                            user_id: user._id,
                            card_number: user.uf_wallet.card_number,
                            points: reward,
                            source: "daily_checkin",
                            expiration_date: expiryDate
                        })
                        await sendNotification(user._id, {
                            category: "reward",
                            heading: "Daily Check in Bonus",
                            type: "daily_checkin",
                            mini_msg: `Welcome back, you won ${reward} UF-Points today!`,
                            message: `Welcome back! ${reward} UF-Points are added to your UF-wallet, they will expire after 7 days and shall be deducted from your wallet. Keep coming everyday and win exciting rewards.`
                        }, { notify: true })
                        await SavePointsHistory(user._id, user.uf_wallet.card_number, { earned: reward })
                        await User.findByIdAndUpdate(event.user_id, { last_checkin: new Date() })
                        console.log(event.user_id)
                    }
                }
                else if (event.name === 'member_removed') {
                    console.log("A member just left server with id: " + event.user_id)
                    await ConnectDB()
                    if (event.user_id.endsWith('_isguest')) {
                        const userId = event.user_id.split("_")[0]
                        await GuestUser.findByIdAndDelete(userId)
                    }
                    else {
                        await User.findByIdAndUpdate(event.user_id, { is_active: false })
                    }
                }
            }

            res.status(200).json({ success: true, msg: "presence event handled successfully" })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: POST" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}
export default HandlePresenceEvents