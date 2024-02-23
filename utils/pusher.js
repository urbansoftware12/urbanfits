import PusherServer from 'pusher';
import PusherClient from 'pusher-js';
import PushNotifications from "@pusher/push-notifications-server"; // For Server side
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import useUser from '@/hooks/useUser';
const { user } = useUser.getState()

// Pusher Channel intialization
const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true
});

const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});



// Pusher Beams initialization
let beamsServer = new PushNotifications({
    instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
    secretKey: process.env.NEXT_PUBLIC_PUSHER_PRIMARY_KEY
});

const initBeamsClient = async () => {
    if (!user?._id) return
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
    });
    beamsClient.start()
        .then(() => beamsClient.addDeviceInterest(user._id))
        .then(() => console.log('User subscribed to the beams successfully!'))
        .catch(console.error);
}

export { pusherServer, pusherClient, beamsServer, initBeamsClient }