import React from 'react'
import Header from '../Components/Header/Header'
import ProfileSettings from '../Components/ProfileSettings/ProfileSettings'
import Footer from '../Components/Footer/Footer'

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
