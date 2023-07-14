import React from 'react'
import Header from '../../Components/Users/Header/Header'
import Index from '../../Components/Users/Index/Index'
import Footer from '../../Components/Users/Footer/Footer'

function HomePage() {
  return (
    <div>
      <Header icons={true}/>
      <Index />
      <Footer />
    </div>
  )
}

export default HomePage
