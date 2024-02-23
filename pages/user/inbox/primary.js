import { useEffect } from 'react'
import NotificationInbox from '.'
import useUser from '@/hooks/useUser'
import { updateNotificationStatus } from '.'

export default function Primary() {
    const { notifications } = useUser()
    const filteredNotifics = notifications.filter(notific => notific.category === "primary")
    const otherNotifics = notifications.filter(notific => notific.category !== "primary")
    useEffect(() => {
        if (filteredNotifics.some(notific => !notific.seen)) updateNotificationStatus("primary")
        const newNotifications = [...otherNotifics, ...filteredNotifics.map(notific => ({ ...notific, seen: true }))]
        useUser.setState({ notifications: newNotifications })
    }, [])
    return <NotificationInbox noNotifications={filteredNotifics.length ? false : true} filteredNotifics={filteredNotifics} />
}