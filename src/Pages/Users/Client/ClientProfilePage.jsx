import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import ClientProfile from '../../../Components/Users/Clients/ClientProfile/ClientProfile'

function ClientProfilePage() {
    return (
        <div>
            <Header icons={true} />
            <ClientProfile/>
        </div>
    )
}

export default ClientProfilePage
