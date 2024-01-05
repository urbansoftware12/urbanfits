import Notification from "@/models/notification";
import { pusherServer } from "./pusher";

const sendNotification = async (user_id, params, options = {}) => {
    const {
        notify = true,
        notifySilently = false,
        userData = null
    } = options;
    const userNotification = await Notification.findOneAndUpdate(
        { user_id },
        {
            $push: {
                notifications: {
                    $each: [{
                        ...params,
                        timestamp: new Date()
                    }],
                    $position: 0,
                    $slice: 20,
                }
            }
        },
        { upsert: true, new: true }
    );
    if (notify) pusherServer.trigger(`uf-user_${user_id}`, "new-notification", {
        notify: !notifySilently,
        notification_data: userNotification,
        ...(userData && { user_data: userData })
    })
}
export default sendNotification