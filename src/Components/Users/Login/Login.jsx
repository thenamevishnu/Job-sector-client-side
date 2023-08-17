import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { updateUser } from "../../../Redux/UserSlice/UserSlice"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { successAlert, errorAlert } from '../../../Functions/Toasts';
import { googleAuth } from '../../../Functions/GoogleOauth';
import ButtonLoader from '../../Loading/ButtonLoader';
import api_call from '../../../axios';

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otpInput,setOtpInput] = useState(false)
    const [buttonLoading,setButtonLoading] = useState(false)

    useEffect(()=>{
        const userStorage = localStorage.getItem("userStorage") ?? null
        if(userStorage) navigate("/")
    },[navigate])

    const [userData,setUserData] = useState({
        email:"",
        password:""
    })
    const [enteredOtp,setEnteredOtp] = useState("")
    const [loginData,setLoginData] = useState({})

    const [userObject,setUserObject] = useState(null)

    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            if(enteredOtp===""){
                setButtonLoading(true)
                const {data} = await api_call.post("/login" ,{userData},{withCredentials:true})
                setTimeout(() => {
                    setButtonLoading(false)
                }, 500);
                if(!data.status){
                    errorAlert(data.message)
                }else{
                    if(data.getUser.twoStep){
                        setOtpInput(true)
                        localStorage.setItem("twoStep",data?.sentOtp)
                        setLoginData(data)
                    }else{
                        localStorage.setItem("userStorage",JSON.stringify(data))
                        dispatch(updateUser({id:data.getUser._id,country:data.getUser.profile.country,type:data.getUser.profile.account_type,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image,audio:data.getUser.profile.audio}))
                        successAlert(data.message)
                        setTimeout(() => {
                            navigate("/")
                        }, 1600);
                    }
                }
            }else{
                const otp = localStorage.getItem("twoStep")
                if(otp !== enteredOtp){
                    errorAlert("Invalid Otp!")
                }else{
                    localStorage.setItem("userStorage",JSON.stringify(loginData))
                    dispatch(updateUser({id:loginData.getUser._id,country:loginData.getUser.profile.country,type:loginData.getUser.profile.account_type,name:loginData.getUser.profile.full_name,email:loginData.getUser.profile.email,image:loginData.getUser.profile.image,audio:loginData.getUser.profile.audio}))
                    successAlert(loginData.message)
                    setTimeout(() => {
                        localStorage.removeItem("twoStep")
                        navigate("/")
                    }, 1600);
                }
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    userObject && googleAuth(userObject).then(response=>{
        if(response?.status){
            localStorage.setItem("userStorage",JSON.stringify(response?.data))
            successAlert(response?.message)
            dispatch(updateUser(response.response))
            setTimeout(() => {
                navigate("/")
            }, 1600);
        }
    })

    return (
        <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Job Sector Login</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Email' name='email' onChange={(e) =>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>
                    <div className="mb-2">
                        <input type='password' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Password' name='password' onChange={(e) =>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>
                    {otpInput && <div className="mb-2">
                            <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder={`TwoStep Verification Otp ( ${userData.email} )`} name='otp' onChange={(e) =>setEnteredOtp(e.target.value)}></input>
                        </div>
                    }
                    <span className="text-xs text-green-600 hover:text-blue-700 cursor-pointer" onClick={()=>navigate("/forgot-password")}>
                        Forget Password?
                    </span>
                    <div className="mt-6">
                    {buttonLoading ? <button type='button' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                             <ButtonLoader/>
                        </button> : <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                             Login
                        </button>}
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className='flex mt-4 gap-x-2 justify-center'>
                <GoogleLogin text='signin_with' size="medium" context='signin' onSuccess={(credentialResponse) => {
                    setUserObject(jwt_decode(credentialResponse.credential))
                }} />
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account? <span className=" cursor-pointer font-medium text-green-600 hover:text-blue-700" onClick={()=>navigate("/type")}>Signup</span></p>
            </div>
        </div>
    )
}

export default Login
