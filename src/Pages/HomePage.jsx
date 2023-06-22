import React from 'react'
import Header from '../Components/Header/Header'
import Index from '../Components/Index/Index'
import Footer from '../Components/Footer/Footer'

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
