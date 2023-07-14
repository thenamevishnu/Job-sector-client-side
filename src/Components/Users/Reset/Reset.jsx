import React, { useEffect, useState } from 'react'
import "./Reset.css"
import { ToastContainer } from 'react-toastify'
import { resetPassword } from '../../../Functions/ForgotLink'
import { useNavigate } from 'react-router-dom'

function Reset() {

    const [password,setPassword] = useState({
        newPassword:"",
        confirmPassword:""
    })

    const navigate = useNavigate()

    useEffect(()=>{
        const resetKey = localStorage.getItem("resetKey") ? JSON.parse(localStorage.getItem("resetKey")) : null
        if(!resetKey.key){
            navigate("/login")
        }
    })

    return (
        <div className='forgot'>
            <div className='container'>
                <h2 className='text-center mt-3'>Reset Password</h2>
                <div className='form mt-5 text-center'>
                    <div className='Password'>
                        <input type='text' className='mb-3 p-2' placeholder='password' name='newPassword' value={password.newPassword} onChange={(e)=>setPassword({...password,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className='Password'>
                        <input type='text' className='mb-3 p-2' placeholder='password' name='confirmPassword' value={password.confirmPassword} onChange={(e)=>setPassword({...password,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className='text-center'>
                        <button className='button p-1 ps-3 pe-3' onClick={async ()=>{
                            const resposne = await resetPassword(password);
                            if(resposne){
                                setTimeout(() => {
                                    navigate("/login")
                                }, 1600);
                            }
                            }}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}


export default Reset
