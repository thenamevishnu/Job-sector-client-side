import React from 'react'
import Header from "../../Components/Users/Header/Header"
import Payments from '../../Components/Users/Payments/Payments'
import Footer from "../../Components/Users/Footer/Footer"

function PaymentsPage() {
    return (
        <div>
            <Header icons={true}/>
            <Payments/>
            <Footer/>
        </div>
    )
}

export default PaymentsPage
