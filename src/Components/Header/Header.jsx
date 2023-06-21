import React, { useEffect } from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Header({icons}) {

    const navigate = useNavigate()

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
              <img src={process.env.react_app_cloud + "default/logo.png"} alt='logo' width="90px"/>
              {icons && <div className='ms-5'>
                <ul className='list-inline'>
                  <li className='me-3 list-inline-item'>Find Work</li>
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
              <img src={JSON.parse(localStorage.getItem("userStorage")) ? JSON.parse(localStorage.getItem("userStorage")).getUser.profile.image : null} alt='profile pic' width="50px" onClick={()=>{localStorage.removeItem("userStorage"); navigate("/login")}}/>
          </div>} 
          {icons && <i className='fa fa-bars menu-icon'></i>}
      </div>
      <ToastContainer/>
      </>
      
    )
}

export default Header
