import React from 'react'
import Header from "../../Components/Users/Header/Header"
import Footer from "../../Components/Users/Footer/Footer"
import Balance from '../../Components/Users/Balance/Balance'

function BalancePage() {
    return (
        <div>
            <Header icons={true}/>
            <Balance/>
            <Footer/>
        </div>
    )
}

export default BalancePage
