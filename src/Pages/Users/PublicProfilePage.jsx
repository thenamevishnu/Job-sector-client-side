import React from 'react'
import PublicProfile from '../../Components/Users/PublicProfile/PublicProfile'
import Header from '../../Components/Users/Header/Header'
import Footer from '../../Components/Users/Footer/Footer'

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
