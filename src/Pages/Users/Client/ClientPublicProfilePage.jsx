import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import PublicClientProfile from '../../../Components/Users/Clients/ClientProfile/PublicClientProfile'
import Footer from '../../../Components/Users/Footer/Footer'

function ClientPublicProfilePage() {
    return (
        <div>
            <Header icons={true} />
            <PublicClientProfile/>
            <Footer/>
        </div>
    )
}

export default ClientPublicProfilePage
