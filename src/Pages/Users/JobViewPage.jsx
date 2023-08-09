import React from 'react'
import Header from '../../Components/Users/Header/Header'
import JobView from '../../Components/Users/JobView/JobView'

function JobViewPage() {
  return (
    <div>
        <Header icons={true} />
        <JobView /> 
    </div>
  )
}

export default JobViewPage
