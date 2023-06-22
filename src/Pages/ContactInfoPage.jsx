import React from 'react'
import Header from '../Components/Header/Header'
import ContactInfo from '../Components/ContactInfo/ContactInfo'
import Footer from '../Components/Footer/Footer'

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
