import React from 'react'
import Header from '../../../Components/Users/Header/Header'
import Reports from '../../../Components/Users/Clients/Reports/Reports'
import Footer from '../../../Components/Users/Footer/Footer'

function ClientReportPage() {
    return (
        <div>
            <Header icons={true} />
            <Reports/>
            <Footer/>
        </div>
    )
}

export default ClientReportPage
