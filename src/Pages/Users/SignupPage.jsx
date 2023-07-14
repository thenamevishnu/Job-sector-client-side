import React from 'react'
import Header from '../../Components/Users/Header/Header'
import Signup from '../../Components/Users/Signup/Signup'

function SignupPage() {
  return (
    <div>
      <Header icons={false} />
      <Signup />
    </div>
  )
}

export default SignupPage