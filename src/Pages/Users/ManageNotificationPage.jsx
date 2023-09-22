import React from 'react'
import Header from '../../Components/Users/Header/Header'
import Notifications from '../../Components/Users/Notifications/Notifications'

function ManageNotificationPage() {
    return (
        <div>
            <Header icons={true}/>
            <Notifications/>
        </div>
    )
}

export default ManageNotificationPage
