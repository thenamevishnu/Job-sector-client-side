import React from 'react'
import Header from '../../Components/Users/Header/Header'
import Notifications from '../../Components/Users/Notifications/Notifications'
import Footer from '../../Components/Users/Footer/Footer'

function ManageNotificationPage() {
    return (
        <div>
            <Header icons={true}/>
            <Notifications/>
            <Footer/>
        </div>
    )
}

export default ManageNotificationPage
