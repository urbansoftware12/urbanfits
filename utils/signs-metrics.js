import { isValidObjectId } from "mongoose";
import Signs from "@/models/signs";
import User from "@/models/user";
import { monthNames, signsTypes } from "@/uf.config";
import { getDateOfTimezone } from "./cyphers";

const SaveSignsMetrics = async (incProp, user_id) => {
    if (!signsTypes.includes(incProp)) throw new Error("Invalid incrememnt property, should be the one of: signups, visitors")
    const date = getDateOfTimezone(process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE);

    const dateObj = {
        month: monthNames[date.getMonth()],
        date: date.getDate(),
        year: date.getFullYear()
    }

    const registered_users = await User.countDocuments();
    await Signs.create({
        ...(isValidObjectId(user_id) ? { user_id } : {}),
        ...dateObj,
        registered_users,
        type: incProp
    })
    console.log(incProp + " incremented by 1")
}

export default SaveSignsMetrics