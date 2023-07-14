import React from 'react'
import Header from '../../Components/Users/Header/Header'
import ProfileSettings from '../../Components/Users/ProfileSettings/ProfileSettings'
import Footer from '../../Components/Users/Footer/Footer'

function ProfileSettingsPage() {
  return (
    <div>
        <Header icons={true} />
        <ProfileSettings />
        <Footer />
    </div>
  )
}

export default ProfileSettingsPage
