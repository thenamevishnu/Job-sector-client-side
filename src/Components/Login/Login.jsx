import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import axios from 'axios';
import { updateUser } from "../../Redux/UserSlice/UserSlice"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { successAlert, errorAlert } from '../../Functions/Toasts';
import { googleAuth } from '../../Functions/GoogleOauth';

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        const userStorage = localStorage.getItem("userStorage")
        if(userStorage) navigate("/")
    },[navigate])

    const [userData,setUserData] = useState({
        email:"",
        password:""
    })
    const [borderColor,setBorder] = useState({
        first:null,
        second:null,
    })

    const [userObject,setUserObject] = useState(null)

    const regex = {
        email : /^([\W\w])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm,
        password : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*().\\?]).{8,16}$/gm
    }

    const handleSubmit = async () => {
        try{
            
            const {data} = await axios.post(process.env.react_app_server + "/login" ,{userData},{withCredentials:true})
        
            if(!data.status){
                errorAlert(data.message)
            }else{
                localStorage.setItem("userStorage",JSON.stringify(data))
                dispatch(updateUser({id:data.getUser._id,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image,audio:data.getUser.profile.audio}))
                successAlert(data.message)
                setTimeout(() => {
                    navigate("/")
                }, 1600);
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    userObject && googleAuth(userObject).then(response=>{
        if(response?.status){
            dispatch(updateUser(response.response))
            setTimeout(() => {
                navigate("/")
            }, 1600);
        }
    })

    

    const dataChange = async (key, value, validate) => {
        setUserData({...userData,[key]:value}); 
        if(validate==='email'){
            if(!regex.email.test(value)){
                setBorder({...borderColor,first:"1.5px solid red"})
            } else { 
                setBorder({...borderColor,first:"1.5px solid green"})
            }
        }
        if(validate==='password'){
            if(!regex.password.test(value)){
                setBorder({...borderColor,second:"1.5px solid red"})
            } else { 
                setBorder({...borderColor,second:"1.5px solid green"})
            }
        }
    }

    return (
        <div className='Login'>
            <div className='container'>
                <h2 className='text-center mt-3'>Login to job sector</h2>
                <div className='form mt-5 text-center'>
                    <div className='email'>
                        <input type='text' className='mb-3 p-2' placeholder='Email' name='email' onChange={(e) =>dataChange(e.target.name,e.target.value,"email")} style={{border:borderColor.first}}></input>
                    </div>
                    <div className='password'>
                        <input type='password' className='mb-3 p-2' placeholder='Password' name='password' onChange={(e) =>dataChange(e.target.name,e.target.value,"password")} style={{border:borderColor.second}}></input>
                    </div>
                    <button className='button p-2 ps-3 pe-3 mb-4' onClick={()=>handleSubmit()}>Continue with email</button>
                    <Link className='default-link' to="/forgot-password">Forgot Password ?</Link>
                </div>
                <div style={{display:"flex"}}>
                    <div className='line-left'></div>&nbsp; or &nbsp;<div className='line-right'></div>
                </div>
                <div className='google-login mb-4'>
                    <GoogleLogin text='signin_with' size='medium' theme='filled_blue' shape='pill' type='standard' context='signin' onSuccess={(credentialResponse) => {
                        setUserObject(jwt_decode(credentialResponse.credential))
                    }} />
                </div>
                <div className='text-center mb-3'>Don't have an account? <Link to="/type" className='default-link'>SignUp</Link></div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login
