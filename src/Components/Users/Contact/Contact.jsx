import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { errorAlert, successAlert } from '../../../Functions/Toasts'
import { contactMessage } from '../../../Api/user'
import Loading from '../../Loading/Loading'

function Contact() {

    const {name,email,id} = useSelector(state => state.user)

    const [userData,setUserData] = useState({id:id,email:email,name:name,subject:"",message:""})
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        userData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(userData.subject.trim() === ""){
            errorAlert("Subject is empty!")
        }else if(userData.subject.trim().length < 10){
            errorAlert("Subject is too short!")
        }else if(userData.message.trim() === ""){
            errorAlert("Message is empty!")
        }else if(userData.message.trim().length < 20){
            errorAlert("Message is too short!")
        }else{
            successAlert("Message sent!")
            contactMessage(userData)
            setUserData({...userData,subject:"",message:""})

        }
    }

    return (
        <>
        {loading ? <Loading/> : <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Contact us</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                    <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Subject...' value={userData.subject} name='subject' onChange={(e) =>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mb-2">
                    <textarea type='text' className='block resize-none w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Message...' value={userData.message} name='message' onChange={(e) =>setUserData({...userData,[e.target.name]:e.target.value})}></textarea>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </div>}
        </>
    )
}

export default Contact
