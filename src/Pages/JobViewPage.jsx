import React from 'react'
import Header from '../Components/Header/Header'
import JobView from '../Components/JobView/JobView'
import Footer from '../Components/Footer/Footer'

function JobViewPage() {
  return (
    <div>
        <Header icons={true} />
        <JobView />
        <Footer />  
    </div>
  )
}

export default JobViewPage
