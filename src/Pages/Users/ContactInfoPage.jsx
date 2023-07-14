import React from 'react'
import Header from '../../Components/Users/Header/Header'
import ContactInfo from '../../Components/Users/ContactInfo/ContactInfo'
import Footer from '../../Components/Users/Footer/Footer'

function ContactInfoPage() {
  return (
    <div>
        <Header icons={true}/>
        <ContactInfo />
        <Footer />
    </div>
  )
}

export default ContactInfoPage
