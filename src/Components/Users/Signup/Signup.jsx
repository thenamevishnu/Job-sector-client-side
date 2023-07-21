import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../Redux/UserSlice/UserSlice'
import { handleSubmit } from '../../../Functions/Signup'
import {successAlert} from "../../../Functions/Toasts"

import json from "country-region-data/data.json"

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

     const [userData,setUserData] = useState({
        full_name:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        country:"India",
        account_type:"",
        otp:""
    })
    const [canShow,setCanShow] = useState(null)

    useEffect(()=>{

        const userStorage = localStorage.getItem("userStorage")
        if(userStorage) navigate("/")

        const type = localStorage.getItem("type")

        if(!type){
            navigate("/type")
        }

        setCountryList(json)

    },[navigate,userData])

   
    const [country,setCountryList] = useState([])
  
    const [userObject,setUserObject] = useState(null)

    const submitHandle = async (e) => {
        e.preventDefault()
        const response = await handleSubmit(userData, userObject, setCanShow, setUserData)
            if(response?.status){
                if(response?.update){
                    successAlert(response.text)
                    dispatch(updateUser(response.response))
                    setTimeout(() => {
                        navigate("/")
                    }, 1600);
                }else{
                    successAlert(response.message)
                    setTimeout(() => {
                        navigate("/")
                    }, 1600);
                }
            }
            if(response?.setUserObject==null){
                setUserObject(null)
            }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Job Sector Registration</h1>
                <form className="mt-6" onSubmit={submitHandle}>
                    {!userObject && <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Full Name' name='full_name' value={userData.full_name} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='UserName' name='username' value={userData.username} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Email' name='email' value={userData.email}  onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && canShow && <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder={"Enter otp ("+userData.email+")"} value={userData.otp} name='otp' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className="mb-2">
                        <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Password' name='password' value={userData.password} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className="mb-2">
                        <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    <div className='mt-2'>
                        <select name="country" className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}>
                            <option value="India">India</option>
                            {
                                country.map(obj => {
                                    return(
                                        <option key={obj.countryName} value={obj.countryName}>
                                            {obj.countryName}
                                        </option>
                                    )
                                }) 
                            }
                        </select>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            Register
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className='flex mt-4 gap-x-2 justify-center'>
                <GoogleLogin text='signup_with' size="medium" context='signup' onSuccess={(credentialResponse) => {
                    setUserObject(jwt_decode(credentialResponse.credential))
                }} />
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700"> Already have an account? <span className=" cursor-pointer font-medium text-green-600 hover:text-blue-700" onClick={()=>navigate("/login")}>Login</span></p>
            </div>
        </div>
    )
}

export default Signup
