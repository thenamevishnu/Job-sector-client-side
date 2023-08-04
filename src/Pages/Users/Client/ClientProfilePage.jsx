import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import ClientProfile from '../../../Components/Users/Clients/ClientProfile/ClientProfile'
import Footer from '../../../Components/Users/Footer/Footer'

function ClientProfilePage() {
    return (
        <div>
            <Header icons={true} />
            <ClientProfile/>
            <Footer/>
        </div>
    )
}

export default ClientProfilePage
