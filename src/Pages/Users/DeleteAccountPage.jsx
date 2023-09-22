import React from 'react'
import Header from '../../Components/Users/Header/Header'
import DeleteAccount from '../../Components/Users/DeleteAccount/DeleteAccount'

function DeleteAccountPage() {
    return (
        <div>
            <Header icons={true} />
            <DeleteAccount/>
        </div>
    )
}

export default DeleteAccountPage
