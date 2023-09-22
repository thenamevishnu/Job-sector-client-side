import React from 'react'
import Header from "../../Components/Users/Header/Header"
import Payments from '../../Components/Users/Payments/Payments'

function PaymentsPage() {
    return (
        <div>
            <Header icons={true}/>
            <Payments/>
        </div>
    )
}

export default PaymentsPage
