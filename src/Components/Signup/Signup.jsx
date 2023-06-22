import React, { useEffect, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../Redux/UserSlice/UserSlice'

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

     const [userData,setUserData] = useState({
        full_name:"",
        username:"",
        email:"",
        password:"",
        country:"India",
        account_type:""
    })

    useEffect(()=>{

        const userStorage = localStorage.getItem("userStorage")
        if(userStorage) navigate("/")

        const type = localStorage.getItem("type")

        if(!type){
            navigate("/type")
        }

        async function getJson(){
            const {data} = await axios.get("https://raw.githubusercontent.com/thenamevishnu/country-state/master/index.json")
            setCountryList(data)
        }

        getJson()
    },[navigate,userData])

   
    const [country,setCountryList] = useState([])
    const [borderColor,setBorder] = useState({
        first:null,
        second:null,
        third:null,
        fourth:null,
        fifth:"1.5px solid green"
    })
    const [userObject,setUserObject] = useState(null)
console.log(userObject);
    const regex = {
         full_name : /^([A-Za-z])([A-Za-z\s]){3,11}$/gm,
         username : /^([_a-z])([a-z0-9]){3,11}$/gm,
         email : /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm,
         password : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*().\\?]).{8,16}$/gm
    }

    const errorAlert = async (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const successAlert = async (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const handleSubmit = async () => {
        
        try{

            userData.account_type = localStorage.getItem("type")

            if(userObject){
                userData.full_name = userObject.name.slice(0,12)
                userData.username = (userObject.email.split("@"))[0].replace(/[^\w]/gi,"").slice(0,12)
                userData.password = process.env.react_app_googleAuthKey
                userData.email = userObject.email
            }

            const {data} = await axios.post(process.env.react_app_server + "/signup" ,{userData},{withCredentials:true})

            if(!data.status){
                errorAlert(data.message)
                setUserObject(null)
            }else{
                setTimeout(async () => {
                    if(userObject){
                        const userData = {}
                        userData.email = userObject.email
                        userData.password = process.env.react_app_googleAuthKey
                        const {data} = await axios.post(process.env.react_app_server + "/login" ,{userData},{withCredentials:true})
                        if(!data.status){
                            errorAlert(data.message)
                            setUserObject(null)
                        }else{
                            successAlert(data.message)
                            setTimeout(async () => {
                                localStorage.setItem("userStorage",JSON.stringify(data))
                                dispatch(updateUser({id:data.getUser._id,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image}))
                                navigate("/")
                            }, 1600);
                        }
                    }else{
                        navigate("/")
                    }
                }, 0);
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    const dataChange = async (key, value, validate) => {
        setUserData({...userData,[key]:value}); 
        if(validate==='full_name'){
            if(!regex.full_name.test(value)){
                setBorder({...borderColor,first:"1.5px solid red"})
            } else { 
                setBorder({...borderColor,first:"1.5px solid green"})
            }
        }
        if(validate==='username'){
            if(!regex.username.test(value)){
                setBorder({...borderColor,second:"1.5px solid red"})
            } else { 
                setBorder({...borderColor,second:"1.5px solid green"})
            }
        }
        if(validate==="email"){
            if(!regex.email.test(value)){
                setBorder({...borderColor,third:"1.5px solid red"})
            } else {
                setBorder({...borderColor,third:"1.5px solid green"})
            }
        }
        if(validate==="password"){
            if(!regex.password.test(value)){
                setBorder({...borderColor,fourth:"1.5px solid red"})
            } else {
                setBorder({...borderColor,fourth:"1.5px solid green"})
            }
        }
    }

    return (
        <div className='Signup'>
            <div className='container'>
                <h2 className='text-center mt-3'>Signup to job sector</h2>
                <div className='form mt-5 text-center'>
                    <div className='name'>
                        {!userObject && <input type='text' className='mb-3 p-2' placeholder='Full Name' name='full_name' onChange={(e) =>dataChange(e.target.name,e.target.value,"full_name")} style={{border:borderColor.first}}></input>}
                        {!userObject && <input type='text' className='mb-3 p-2 ms-4' placeholder='Username' name='username' onChange={(e) =>dataChange(e.target.name,e.target.value,"username")} style={{border:borderColor.second}}></input>}
                    </div>
                    {!userObject && <div className='email'>
                        <input type='text' className='mb-3 p-2' placeholder='Email' name='email' onChange={(e) =>dataChange(e.target.name,e.target.value,"email")} style={{border:borderColor.third}}></input>
                    </div>}
                    {!userObject && <div className='password'>
                        <input type='password' className='mb-3 p-2' placeholder='Password' name='password' onChange={(e) =>dataChange(e.target.name,e.target.value,"password")} style={{border:borderColor.fourth}}></input>
                    </div>}
                    <div className='country'>
                        <select name="country" className='p-2 mb-3' onChange={(e) => dataChange(e.target.name,e.target.value,"country")} style={{border:borderColor.fifth}}>
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
                    <button className='button p-2 ps-3 pe-3 mb-4' onClick={()=>handleSubmit()}>Create account</button>
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
