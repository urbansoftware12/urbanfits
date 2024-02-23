import { useEffect } from 'react'
import NotificationInbox from '.'
import useUser from '@/hooks/useUser'
import { updateNotificationStatus } from '.'

export default function Orders() {
    const { notifications } = useUser()
    const filteredNotifics = notifications.filter(notific => notific.category === "order")
    const otherNotifics = notifications.filter(notific => notific.category !== "order")
    useEffect(() => {
        if (filteredNotifics.some(notific => !notific.seen)) updateNotificationStatus("order")
        const newNotifications = [...otherNotifics, ...filteredNotifics.map(notific => ({ ...notific, seen: true }))]
        useUser.setState({ notifications: newNotifications })
    }, [])
    return <NotificationInbox noNotifications={filteredNotifics.length ? false : true} filteredNotifics={filteredNotifics} />
}