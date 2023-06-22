import React from 'react'
import PublicProfile from '../Components/PublicProfile/PublicProfile'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

function PublicProfilePage() {
  return (
    <div>
        <Header icons={true} />
        <PublicProfile />
        <Footer />
    </div>
  )
}

export default PublicProfilePage
