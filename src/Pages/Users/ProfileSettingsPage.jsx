import React from 'react'
import Header from '../../Components/Users/Header/Header'
import ProfileSettings from '../../Components/Users/ProfileSettings/ProfileSettings'

function ProfileSettingsPage() {
  return (
    <div>
        <Header icons={true} />
        <ProfileSettings />
    </div>
  )
}

export default ProfileSettingsPage
