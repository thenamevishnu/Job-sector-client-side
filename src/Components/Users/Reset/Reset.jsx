import React, { useEffect, useState } from 'react'
import { resetPassword } from '../../../Services/ForgotLink'
import { useNavigate } from 'react-router-dom'

function Reset() {

    const [password,setPassword] = useState({
        newPassword:"",
        confirmPassword:""
    })

    const navigate = useNavigate()

    useEffect(()=>{
        const resetKey = localStorage.getItem("resetKey") ? JSON.parse(localStorage.getItem("resetKey")) : null
        if(!resetKey?.key){ 
            navigate("/login")
        }
    })

    const submitHandle = async (e) => {
        e.preventDefault()
        const resposne = await resetPassword(password);
        if(resposne){
            setTimeout(() => {
                navigate("/login")
            }, 1600);
        }
    }

    return (
        <div className="mt-20 overflow-hidden px-2 md:px-0">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Reset Password</h1>
                <form className="mt-6" onSubmit={submitHandle}>
                    <div className="mb-2">
                        <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Enter new password' name='newPassword' value={password.newPassword} onChange={(e)=>setPassword({...password,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mb-2">
                        <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Confirm new password' name='confirmPassword' value={password.confirmPassword} onChange={(e)=>setPassword({...password,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Reset
