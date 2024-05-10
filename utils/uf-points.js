import UFpoints from "@/models/ufpoints";
import WeeklyCheckinPointsHistory from "@/models/weekly_checkin_history"
import { getDateOfTimezone } from "./cyphers";
import { monthNames } from "@/uf.config";

export const AddPoints = async (user_id, card_number, timezone, data) => {
    try {
        const currentDate = getDateOfTimezone(timezone);
        const {
            earned = 0,
            spent = 0,
            source = "daily_checkin",
            expirationDate
        } = data;

        const pointsDocs = await UFpoints.find({
            user_id,
            card_number,
            $or: [
                { expirationDate: { $exists: false } },
                { expirationDate: { $gt: currentDate } }
            ]
        })
        const totalBalance = pointsDocs.reduce((prevTotal, currentObj) => prevTotal + currentObj.points, 0)

        await UFpoints.create({
            user_id,
            card_number,
            source,
            spent,
            points: earned,
            actual_points: earned,
            total_balance: (totalBalance + earned),
            createdAt: currentDate,
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear(),
            ...(expirationDate && { expiration_date: expirationDate }),
        })

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

export const GetUFBalance = async (user_id, card_number, timezone) => {
    const currentDate = getDateOfTimezone(timezone);
    const pointsDocs = await UFpoints.find({
        user_id,
        card_number,
        source: { $ne: "deduction" },
        $or: [
            { expirationDate: { $exists: false } },
            { expirationDate: { $gt: currentDate } }
        ]
    })
    const totalPoints = pointsDocs.reduce((prevTotal, currentObj) => prevTotal + currentObj.points, 0);
    return totalPoints;
}

export const DeductPoints = async (user_id, card_number, timezone, points_to_deduct) => {
    let pointsDocs = await UFpoints.find({ user_id, card_number, source: { $ne: "deduction" } });

    const pointsToDeduct = Math.abs(points_to_deduct);
    let deductedPoints = 0;
    for (const pointsDoc of pointsDocs) {
        const remainingPoints = pointsToDeduct - deductedPoints;

        if (pointsDoc.points >= remainingPoints) {
            console.log("condition 1 ran")
            pointsDoc.points -= remainingPoints;
            await pointsDoc.save();

            deductedPoints += remainingPoints;
            break;
        }
        else if (pointsDoc.points > 0 && pointsDoc.points < remainingPoints) {
            console.log("condition 2 ran")
            deductedPoints += pointsDoc.points;

            pointsDoc.points = 0;
            await pointsDoc.save();
        }
    }

    console.log(deductedPoints)
    await AddPoints(user_id, card_number, timezone, { spent: deductedPoints, source: "deduction" })
}