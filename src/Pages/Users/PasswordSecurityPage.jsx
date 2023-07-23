import React from 'react'
import Header from '../../Components/Users/Header/Header'
import PasswordSecurity from '../../Components/Users/PasswordSecurity/PasswordSecurity'
import Footer from '../../Components/Users/Footer/Footer'

function PasswordSecurityPage() {
    return (
        <div>
            <Header icons={true}/>
            <PasswordSecurity/>
            <Footer/>
        </div>
    )
}

export default PasswordSecurityPage
