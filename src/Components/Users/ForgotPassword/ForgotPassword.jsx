import React, { useState } from 'react'
import { sendForgotLink } from '../../../Functions/ForgotLink'
import ButtonLoader from '../../Loading/ButtonLoader'

function ForgotPassword() {

    const [forgotEmail,setForgotEmail] = useState("")
    const [buttonLoading,setButtonLoading] = useState(false)

    const submitHandle = async (e) => {
        e.preventDefault()
        setButtonLoading(true)
        await sendForgotLink(forgotEmail)
        setTimeout(() => {
            setButtonLoading(false)
        }, 500);
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">forgot password</h1>
                <form className="mt-6" onSubmit={submitHandle}>
                    <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='email' name='Email' value={forgotEmail} onChange={(e)=>setForgotEmail(e.target.value)}></input>
                    </div>
                    <div className="mt-6">
                        {buttonLoading ? <button type='button' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            <ButtonLoader/>
                        </button> : <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            Continue
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ForgotPassword
