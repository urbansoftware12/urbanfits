import UFpoints_history from "@/models/ufpoints_history"
import WeeklyCheckinPointsHistory from "@/models/weekly_checkin_history"
import axios from "axios";

const SavePointsHistory = async (user_id, card_number, update) => {
    try {
        const {
            earned = 0,
            spent = 0,
            source = "daily_checkin"
        } = update;
        const monthNames = [
            'january', 'february', 'march', 'april',
            'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december'
        ];

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/get-balance?user_id=${user_id}&card_number=${card_number}`)
        console.log(data)

        const currentDate = new Date();
        const startOfDay = new Date(currentDate).setHours(0, 0, 0, 0);
        const endOfDay = new Date(currentDate).setHours(23, 59, 59, 999);
        await UFpoints_history.findOneAndUpdate({
            user_id,
            card_number,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            }
        },
            {
                $inc: { earned: earned, spent: spent },
                month: monthNames[currentDate.getMonth()],
                year: currentDate.getFullYear(),
                balance: data.balance,
            }, { upsert: true })

        if (source === "daily_checkin") {
            const weeklyPointsHistory = await WeeklyCheckinPointsHistory.create({
                user_id,
                card_number,
                points: earned
            })
            console.log(weeklyPointsHistory)
        }
    } catch (error) { console.log(error) }
}
export default SavePointsHistory