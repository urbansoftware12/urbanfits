import ConnectDB from "@/utils/connect_db";
import Signs from "@/models/signs";
import { getDateOfTimezone, groupBy } from "@/utils/cyphers";
import StandardApi from "@/middlewares/standard_api";

const monthMap = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

const MonthsActivity = async (req, res) => StandardApi(req, res, { method: "GET", verify_user: false }, async () => {
    await ConnectDB();
    const currentDate = getDateOfTimezone();

    const pastMonths = 7;
    let pastMonth = currentDate.getMonth() - (pastMonths - 1);
    let pastYear = currentDate.getFullYear();
    if (pastMonth < 0) {
        pastMonth += 12;
        pastYear -= 1;
    }
    const pastMonthDate = new Date(pastYear, pastMonth, 1);

    const signMetrics = await Signs.find({ user_id: { $exists: true }, createdAt: { $gt: pastMonthDate } }).sort({ _id: 1 }).lean();

    let monthsActivityMetrics = [];
    const monthGrouping = groupBy(signMetrics, "month");
    Object.keys(monthGrouping).forEach(month => {
        const dateGrouping = groupBy(monthGrouping[month], "date");
        let monthActivityCount = 0;
        let registered_users = 0;

        Object.keys(dateGrouping).forEach((date) => {
            const usersSet = new Set(dateGrouping[date]);
            monthActivityCount += usersSet.size;
            Array.from(usersSet).reduce((acc, user) => {
                registered_users += user.registered_users - acc || 0;
                return user.registered_users;
            }, 0);
        })
        monthsActivityMetrics.push({
            month,
            registered_users,
            activity: monthActivityCount
        })
    });

    res.status(200).json({
        success: true,
        months_activity: monthsActivityMetrics.sort((a, b) => monthMap[a.month] - monthMap[b.month])
    })
})
export default MonthsActivity