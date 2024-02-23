import Notification from "@/models/notification";
import AdminNotific from "@/models/admin_notifications";
import { pusherServer, beamsServer } from "./pusher";

const isProdEnv = process.env.NEXT_PUBLIC_DEV_ENV === "PRODUCTION";
export const sendNotification = async (user_id, params, options = {}) => {
    const {
        notify = true,
        notifySilently = false,
        userData = null,
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

    const notificObj = {
        title: params.heading,
        body: params.mini_msg || params.message,
    }
    await beamsServer.publishToInterests([user_id.toString()], {
        web: {
            notification: {
                ...notificObj,
                hide_notification_if_site_has_focus: false,
                deep_link: isProdEnv? "https://st.urbanfits.ae": "http://127.0.0.1:3000",
            }
        }
        // apns: {
        //     aps: { alert: notificObj }
        // },
        // fcm: { notification: notificObj }
    })
}

export const sendAdminNotification = async (notific_data) => {

    const totalAdminNotifics = await AdminNotific.countDocuments();
    (async () => {
        if (totalAdminNotifics > 99) {
            const oldestNotification = (await AdminNotific.find().sort({ createdAt: -1 }).limit(1))[0];
            await AdminNotific.findByIdAndDelete(oldestNotification._id)
        }
    })()
    const newNotification = await AdminNotific.create(notific_data);

    pusherServer.trigger("admin-channel", "new-notification", newNotification)

    await beamsServer.publishToInterests(["@_urbanfits_admin_notifications"], {
        web: {
            notification: {
                title: newNotification.data?.title,
                body: newNotification.data?.msg,
                deep_link: isProdEnv? "https://admin.urbanfits.ae": "http://127.0.0.1:3000",
                // deep_link: newNotification.data?.href || "https://admin.urbanfits.ae",
            }
        }
    })
    console.log(`Notification with id : ${newNotification._id} sent to the Admins.`)
}