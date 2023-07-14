import React from 'react'
import Header from '../../Components/Users/Header/Header'
import JobView from '../../Components/Users/JobView/JobView'
import Footer from '../../Components/Users/Footer/Footer'

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
