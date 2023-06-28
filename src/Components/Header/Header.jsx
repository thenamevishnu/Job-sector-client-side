import React, { useEffect } from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { errorAlert } from '../../Functions/Toasts'

function Header({icons}) {

    const navigate = useNavigate()
    const {image} = useSelector(state => state.user)
    
    useEffect(()=>{
        
      if(icons){
          const userStorage = localStorage.getItem("userStorage")

          if(!userStorage) navigate("/login")

          const getAuth = async () => {
              try{
                  const {data} = await axios.post(process.env.react_app_server + "/auth",{userStorage},{withCredentials:true})
                  if(!data.status){
                      navigate("/login")
                  }
              }catch(err){
                  errorAlert(err.message)
              }
          }

          getAuth()
      }

  },[navigate,icons])

    return (
      <>
      <div className='Header'>
          <div className='logo'>
              <img src={process.env.react_app_cloud + "/job/default/logo.png"} alt='logo' width="90px"/>
              {icons && <div className='ms-5 d-md-inline d-none'>
                <ul className='list-inline'>
                  <li className='me-3 list-inline-item cursor-pointer' onClick={()=>navigate("/")}>Find Work</li>
                  <li className='me-3 list-inline-item'>My Jobs</li>
                  <li className='me-3 list-inline-item'>Reports</li>
                  <li className='me-3 list-inline-item'>Messages</li>
                </ul>
              </div>}
          </div>
          {icons && <div className='icons'>
              <i className='far fa-question me-3'></i>
              <i className='far fa-comment-dots me-3'></i>
              <i className='far fa-bell me-3'></i>
              <img src={image ? process.env.react_app_cloud +""+ image : null} alt='profile pic' width="40px" onClick={()=>{ navigate("/settings/contact-info")}} style={{borderRadius:"50px"}}/>
          </div>} 
          {icons && <i className='fa fa-bars menu-icon'></i>}
      </div>
      <ToastContainer/>
      </>
      
    )
}

export default Header
