import React from 'react'
import Header from '../../Components/Users/Header/Header'
import Index from '../../Components/Users/Index/Index'

function HomePage() {
  return (
    <div>
      <Header icons={true}/>
      <Index />
    </div>
  )
}

export default HomePage
