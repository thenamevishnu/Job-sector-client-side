import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { errorAlert, successAlert } from '../../../Functions/Toasts'
import axios from 'axios'
import { updateAdmin } from '../../../Redux/AdminSlice/AdminSlice'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        const adminStorage = localStorage.getItem("adminStorage")
        console.log(adminStorage);
        if(adminStorage) navigate("/admin")
    },[navigate])

    const [adminData,setUserData] = useState({
        email:"",
        password:""
    })

    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            const {data} = await axios.post(process.env.react_app_server + "/admin/login" ,{adminData},{withCredentials:true})
        
            if(!data.status){
                errorAlert(data.message)
            }else{
                localStorage.setItem("adminStorage",JSON.stringify(data))
                dispatch(updateAdmin({admin_id:data.getAdmin._id,admin_name:data.getAdmin.name,admin_email:data.getAdmin.email,admin_username:data.getAdmin.username}))
                successAlert(data.message)
                setTimeout(() => {
                    navigate("/admin")
                }, 2000);
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    return (
        <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Job sector admin</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                    <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Email' name='email' onChange={(e) =>setUserData({...adminData,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mb-2">
                    <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Password' name='password' onChange={(e) =>setUserData({...adminData,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
