import ConnectDB from "@/utils/connect_db"
import User from "@/models/user";
import Notification from "@/models/notification";
import UFpoints from "@/models/ufpoints";
import { isValidObjectId } from "mongoose";
import { getDateOfTimezone } from "@/utils/cyphers";
import StandardApi from "@/middlewares/standard_api";

const getUserById = async (req, res) => StandardApi(req, res, { verify_admin: true }, async () => {
    const { user_to_get } = req.query;
    if (!isValidObjectId(user_to_get)) return res.status(400).json({ success: false, msg: "A valid user id required. Query parameters: user_to_get" })

    await ConnectDB()
    const userToGet = await User.findById(user_to_get).lean();
    if (!userToGet) return res.status(404).json({ success: false, msg: "The user with corresponding id does not exist." })

    const userNotifications = await Notification.findOne({ user_id: userToGet._id });

    const currentDate = getDateOfTimezone(userToGet.timezone);
    const pointsDocs = await UFpoints.find({
        user_id: userToGet._id,
        card_number: userToGet.uf_wallet.card_number,
        $or: [
            { expirationDate: { $exists: false } },
            { expirationDate: { $gt: currentDate } }
        ]
    })
    const totalPoints = pointsDocs.reduce((prevTotal, currentObj) => prevTotal + currentObj.points, 0)

    const historyDocs = await UFpoints.find({
        user_id: userToGet._id,
        card_number: userToGet.uf_wallet.card_number,
    }).sort({ _id: -1 }).limit(200).lean();

    res.status(200).json({
        success: true,
        user: {
            ...userToGet,
            notifications: userNotifications || [],
            uf_balance: totalPoints
        },
        points_history: historyDocs
    })
})
export default getUserById