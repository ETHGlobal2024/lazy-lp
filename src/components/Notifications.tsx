import {useNotifications, useSubscription} from '@web3inbox/react'
import React from 'react'

function Notifications() {
    const {data: subscription} = useSubscription()
    const {data: notifications, fetchNextPage} = useNotifications(5)

    return (
        <div>
            <h2>Notifications</h2>
            <p>You have {subscription?.unreadNotificationCount} unread notifications.</p>
            <div>
                {!notifications?.length ? (
                    <p>No notifications yet.</p>
                ) : (
                    notifications.map(({id, ...message}) => (
                        <div key={id}>
                            <h3>{message.title}</h3>
                            <p>{message.body}</p>
                            <p>{message.isRead ? 'Read' : 'Unread'}</p>
                            <button onClick={message.read}>Mark as read</button>
                        </div>
                    ))
                )}
            </div>
            <button onClick={fetchNextPage}>Next page</button>
        </div>
    )
}

export default Notifications