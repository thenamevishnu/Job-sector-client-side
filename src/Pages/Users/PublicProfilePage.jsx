import React from 'react'
import PublicProfile from '../../Components/Users/PublicProfile/PublicProfile'
import Header from '../../Components/Users/Header/Header'

function PublicProfilePage() {
  return (
    <div>
        <Header icons={true} />
        <PublicProfile />
    </div>
  )
}

export default PublicProfilePage
