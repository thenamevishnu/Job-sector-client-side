import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { errorAlert } from '../../../Services/Toasts'
import { updateUser } from '../../../Redux/UserSlice/UserSlice';
import { userAuth } from '../../../Services/user';

function Header({icons}){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {image,type} = useSelector(state => state.user)
    const [toggleProfile,setToggleProfile] = useState(false)
    const [navToggle,setNavToggle] = useState(false)
    const [navToggle2,setNavToggle2] = useState(false)
    useEffect(()=>{
        
        if(icons){
            const userStorage = localStorage.getItem("userStorage")

            if(!userStorage) navigate("/login")

            const getAuth = async () => {
                try{
                    const data = await userAuth(userStorage)
                    if(!data.status){
                        localStorage.removeItem("userStorage")
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
        <nav className="bg-gray-50 fixed top-0 w-full z-50 shadow-sm border-0 shadow-gray-600">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
            {icons && <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            
            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none" aria-controls="mobile-menu" aria-expanded="false" onClick={()=>setNavToggle(!navToggle)}>
                <span className="sr-only">Open main menu</span>
                
                {!navToggle && <svg className="block h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>}
                
                {navToggle && <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>}
            </button>
            </div>}
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex flex-shrink-0 items-center">
                <img className="w-12 cursor-pointer" src={process.env.react_app_cloud + "/job/default/logo.png"} alt="JobSector"/>
            </div>
            {!icons && <div className='text-lg uppercase font-bold'>Job Sector</div>}
            {icons && <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-2 whitespace-nowrap">
                
                <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" aria-current="page" onClick={()=>navigate("/")}>Find Work</span>
                {type === "client" ? <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/my-posts")}>My Posts</span> : <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/my-proposals")}>Proposals</span>}
                <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/reports")}>Reports</span>
                <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/chats")}>Messages</span>
                
                </div>
            </div>}
            </div>
            {icons && <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <div className='text-xl'>
                {type === "client" && <i className='far fa-plus border-2 rounded-full p-1 px-2 text-sm font-extrabold mr-3 cursor-pointer' title='post new job' onClick={()=>navigate("/post-job")}></i>}
                {/* <i className='far fa-question mr-3 cursor-pointer' title='Help'></i> */}
                <i className='far fa-comment cursor-pointer' title='Contact' onClick={()=>navigate("/contact")}></i>
                {/* <i className='far fa-bell mr-3 cursor-pointer' title='Notification'></i> */}
                </div>

            <div className="relative ml-3">
                <div>
                <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={()=>setToggleProfile(!toggleProfile)}>
                    <span className="sr-only">Open user menu</span>
                    <img title='Profile' className="h-8 w-8 rounded-full" src={image && process.env.react_app_cloud + image} alt="sdfsdf"/>
                </button>
                </div>
    
            
                {toggleProfile && <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black border-2 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                
                <span className="block px-4 hidden md:block py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabIndex="-1" onClick={()=>navigate("/settings/contact-info")}>Settings</span>
                <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabIndex="-1" onClick={()=>{localStorage.removeItem("userStorage"); dispatch(updateUser({})); navigate("/login"); }}>Sign out</span>
                </div>}

            </div>
            </div>}
        </div>
        </div>
    
        
        {navToggle && <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
        
        <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" aria-current="page" onClick={()=>navigate("/")}>Find Work</span>
                {type === "client" ? <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/my-posts")}>My Posts</span> : <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/my-proposals")}>Proposals    </span>}
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/reports")}>Reports</span>
                <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/chats")}>Messages</span>
                <span className="text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer md:hidden block" onClick={()=>setNavToggle2(!navToggle2)}>Menu <i className={navToggle2 ? "fa fa-chevron-up ms-2" : "fa fa-chevron-down ms-2"}></i></span>
        </div>
        </div>}

        {navToggle2 && <div className="md:hidden px-5" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
        
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" aria-current="page" onClick={()=>navigate("/settings/contact-info")}>Contact Info</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/my-profile")}>Profile</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/password-security")}>Password & Security</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/payments")}>Payments</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/balance")}>Balance</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/notifications")}>Manage Notifications</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/delete-account")}>Delete Account</span>
            <span className="block text-black hover:bg-gray-400 hover:text-white rounded-md px-2 py-2 text-sm font-medium cursor-pointer" onClick={()=>navigate("/settings/reports")}>My Reports</span>
        </div>
        </div>}
    </nav>
    )
}

export default Header
