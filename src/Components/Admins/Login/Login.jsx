import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { errorAlert, successAlert } from '../../../Functions/Toasts'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { updateAdmin } from '../../../Redux/AdminSlice/AdminSlice'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        // const adminStorage = localStorage.getItem("adminStorage")
        const adminStorage = null
        if(adminStorage) navigate("/admin")
    },[navigate])

    const [adminData,setUserData] = useState({
        email:"",
        password:""
    })
    const [borderColor,setBorder] = useState({
        first:null,
        second:null,
    })

    const regex = {
        email : /^([\W\w])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm,
        password : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*().\\?]).{8,16}$/gm
    }

    const handleSubmit = async () => {
        try{
            
            const {data} = await axios.post(process.env.react_app_server + "/admin/login" ,{adminData},{withCredentials:true})
        
            if(!data.status){
                errorAlert(data.message)
            }else{
                localStorage.setItem("adminStorage",JSON.stringify(data))
                dispatch(updateAdmin({admin_id:data.getAdmin._id,admin_name:data.getAdmin.name,admin_email:data.getAdmin.email,admin_username:data.getAdmin.username}))
                successAlert(data.message)
                setTimeout(() => {
                    navigate("/admin")
                }, 1600);
            }
        }catch(err){
            errorAlert(err.message)
        }
    }
   
    const dataChange = async (key, value, validate) => {
        setUserData({...adminData,[key]:value}); 
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
                <h2 className='text-center mt-3'>Job sector admin</h2>
                <div className='form mt-5 text-center'>
                    <div className='email'>
                        <input type='text' className='mb-3 p-2' placeholder='Email' name='email' onChange={(e) =>dataChange(e.target.name,e.target.value,"email")} style={{border:borderColor.first}}></input>
                    </div>
                    <div className='password'>
                        <input type='password' className='mb-3 p-2' placeholder='Password' name='password' onChange={(e) =>dataChange(e.target.name,e.target.value,"password")} style={{border:borderColor.second}}></input>
                    </div>
                    <button className='button p-2 ps-3 pe-3 mb-4' onClick={()=>handleSubmit()}>Continue with email</button>
                </div>
                
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login
