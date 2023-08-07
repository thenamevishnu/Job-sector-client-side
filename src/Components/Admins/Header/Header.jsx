import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorAlert } from '../../../Functions/Toasts'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Header(){

    const navigate = useNavigate()
    const {admin_name} = useSelector(state => state.admin)
    const [toggleProfile,setToggleProfile] = useState(false)
    const [navToggle,setNavToggle] = useState(false)
    
    useEffect(()=>{
        
        const adminStorage = localStorage.getItem("adminStorage")
        
        if(!adminStorage) navigate("/admin/login")

          const getAuth = async () => {
              try{
                  const {data} = await axios.post(process.env.react_app_server + "/admin/auth",{adminStorage},{withCredentials:true})
                  if(!data.status){
                        localStorage.removeItem("adminStorage")
                        navigate("/admin/login")
                  }
              }catch(err){
                  errorAlert(err.message)
              }
          }
          getAuth()

      },[navigate])

    return (
        <nav className="bg-gray-50 fixed top-0 w-full z-10 shadow-sm border-0 shadow-gray-600">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center ">
            
            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none" aria-controls="mobile-menu" aria-expanded="false" onClick={()=>setNavToggle(!navToggle)}>
                <span className="sr-only">Open main menu</span>
                
                {!navToggle && <svg className="block h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>}
                
                {navToggle && <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>}
            </button>
            </div>
            <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-shrink-0 items-center">
                <img className="w-12 cursor-pointer" src={process.env.react_app_cloud + "/job/default/logo.png"} alt="JobSector"/>
            </div>
          
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div className="relative ml-3">
                <div>
                <button type="button" className="flex rounded-fulltext-sm focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={()=>setToggleProfile(!toggleProfile)}>
                    <span className="sr-only">Open user menu</span>
                    {admin_name} <img src={`${process.env.react_app_cloud}/job/default/avatar.png`} alt='avatar' className='ml-1 w-6'/>
                </button>
                </div>
    
            
                {toggleProfile && <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black border-2 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabIndex="-1" onClick={()=>{localStorage.removeItem("adminStorage"); navigate("/admin/login")}}>Sign out</span>
                </div>}

            </div>
            </div>
        </div>
        </div>
    
        
        {navToggle && <div className="text-center border-2 bg-gray-200" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-lg font-medium cursor-pointer" aria-current="page" onClick={()=>navigate("/admin")}>Dashboard</span>
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-lg font-medium cursor-pointer" onClick={()=>navigate("/admin/user_management")}>User Management</span>
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-lg font-medium cursor-pointer" onClick={()=>navigate("/admin/post_management")}>Post Management</span>
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-lg font-medium cursor-pointer" onClick={()=>navigate("/admin/notify")}>Notify / Broadcast</span>
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-lg font-medium cursor-pointer" onClick={()=>navigate("/admin/payouts")}>Payout Approval</span>
            
            </div>
        </div>}
    </nav>
    )
}

export default Header
