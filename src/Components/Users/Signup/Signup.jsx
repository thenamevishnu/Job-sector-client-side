import React, { useEffect, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from "react-router-dom"
import {ToastContainer} from "react-toastify"
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

    const submitHandle = async () => {
        const response = await handleSubmit(userData, userObject, setCanShow, setUserData)
            if(response?.status){
                if(response.update){
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
        <div className='Signup'>
            <div className='container'>
                <h2 className='text-center mt-3'>Signup to job sector</h2>
                <div className='form mt-5 text-center'>
                    <div className='name'>
                        {!userObject && <input type='text' className='mb-3 p-2' placeholder='Full Name' name='full_name' value={userData.full_name} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>}
                        {!userObject && <input type='text' className='mb-3 p-2 ms-4' placeholder='Username' name='username' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>}
                    </div>
                    {!userObject && <div className='email'>
                        <input type='text' className='mb-3 p-2' placeholder='Email' name='email'value={userData.email}  onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && canShow && <div className='otp'>
                        <input type='text' className='mb-3 p-2' placeholder={"Enter otp ("+userData.email+")"} value={userData.otp} name='otp' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className='password'>
                        <input type='password' className='mb-3 p-2' placeholder='Password (should contain a-z,A-Z,0-9,special)' value={userData.password} name='password' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    {!userObject && <div className='password'>
                        <input type='password' className='mb-3 p-2' placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}></input>
                    </div>}
                    <div className='country'>
                        <select name="country" className='p-2 mb-3' onChange={(e)=>setUserData({...userData,[e.target.name]:e.target.value})}>
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
                    <button className='button p-2 ps-3 pe-3 mb-4' onClick={submitHandle}>Create account</button>
                    <Link className='default-link'>Forgot Password ?</Link>
                </div>
                <div style={{display:"flex"}}>
                    <div className='line-left'></div>&nbsp; or &nbsp;<div className='line-right'></div>
                </div>
                <div className='google-login mb-4'>
                    <GoogleLogin text='signup_with' size='medium' theme='filled_blue' shape='pill' type='standard' context='signup' onSuccess={(credentialResponse) => {
                        setUserObject(jwt_decode(credentialResponse.credential))
                    }} />
                </div>
                
                <div className='text-center mb-3'>Already have an account? <Link to="/login" className='default-link'>Login</Link></div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
