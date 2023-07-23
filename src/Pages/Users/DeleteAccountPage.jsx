import React from 'react'
import Header from '../../Components/Users/Header/Header'
import DeleteAccount from '../../Components/Users/DeleteAccount/DeleteAccount'
import Footer from '../../Components/Users/Footer/Footer'

function DeleteAccountPage() {
    return (
        <div>
            <Header icons={true} />
            <DeleteAccount/>
            <Footer/>
        </div>
    )
}

export default DeleteAccountPage
