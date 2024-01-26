import React from 'react'
import NotificationInbox from '.'
import useUser from '@/hooks/useUser'
import { updateNotificationStatus } from '.'

export default function Account() {
    const { user, notifications, setNotification } = useUser()
    const filteredNotifics = notifications.filter(notific => notific.category === "account")
    const otherNotifics = notifications.filter(notific => notific.category !== "account")
    React.useEffect(() => {
        const newNotifications = [...otherNotifics, ...filteredNotifics.map(notific => ({ ...notific, seen: true }))]
        setNotification(newNotifications)
        if (filteredNotifics.some(notific => !notific.seen)) updateNotificationStatus(user._id, "account")
    }, [])
    return <NotificationInbox noNotifications={filteredNotifics.length ? false : true} filteredNotifics={filteredNotifics} />
}