import React from 'react'
import Login from '../../Components/Users/Login/Login'
import Header from '../../Components/Users/Header/Header'

function LoginPage() {
  return (
    <div>
        <Header icons={false} />
        <Login />
    </div>
  )
}

export default LoginPage
