import React, { useState } from 'react'
import "./ForgotPassword.css"
import { ToastContainer } from 'react-toastify'
import { sendForgotLink } from '../../../Functions/ForgotLink'

function ForgotPassword() {

    const [forgotEmail,setForgotEmail] = useState("")

    return (
        <div className='forgot'>
            <div className='container'>
                <h2 className='text-center mt-3'>Forgot Password</h2>
                <div className='form mt-5 text-center'>
                    <div className='email'>
                        <input type='text' className='mb-3 p-2' placeholder='Email' name='email' value={forgotEmail} onChange={(e)=>setForgotEmail(e.target.value)}></input>
                    </div>
                    <div className='text-center'>
                        <button className='button p-1 ps-3 pe-3' onClick={()=>sendForgotLink(forgotEmail)}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}


export default ForgotPassword
