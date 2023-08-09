import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import PublicClientProfile from '../../../Components/Users/Clients/ClientProfile/PublicClientProfile'

function ClientPublicProfilePage() {
    return (
        <div>
            <Header icons={true} />
            <PublicClientProfile/>
        </div>
    )
}

export default ClientPublicProfilePage
