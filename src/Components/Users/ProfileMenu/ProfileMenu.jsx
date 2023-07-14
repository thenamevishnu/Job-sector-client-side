import React from 'react'
import "./ProfileMenu.css"
import { useNavigate } from 'react-router-dom'

function ProfileMenu() {

    const navigate = useNavigate()  

    return (
        <>
        <div className='offset-lg-2 offset-md-1 col-lg-3 col-md-3 col-11 d-none d-md-block left-menu'>
            <div className="left-menu-list p-3">
                <h5><b>User Settings</b></h5>
                <ul className='list-left-menu'>
                    <li className='cursor-pointer' onClick={()=>navigate("/settings/contact-info")}>Contact Info</li>
                    <li className='cursor-pointer' onClick={()=>navigate("/my-profile")}>Profile</li>
                    <li className='cursor-pointer'>Profile Settings</li>
                    <li className='cursor-pointer'>Password & Security</li>
                </ul>
                <h5><b>Payments</b></h5>
                <ul className='list-left-menu'>
                    <li className='cursor-pointer'>Payments</li>
                    <li className='cursor-pointer'>Balance</li>
                </ul>
                <h5><b>Notification Settings</b></h5>
                <ul className='list-left-menu'>
                    <li className='cursor-pointer'>Manage Notifications</li>
                </ul>
                <h5><b>Manage Account</b></h5>
                <ul className='list-left-menu'>
                    <li className='cursor-pointer'>Delete Account</li>
                    <li className='cursor-pointer'>My Reports</li>
                    <li className='cursor-pointer' onClick={()=>{localStorage.removeItem("userStorage"); navigate("/login")}}>Logout</li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default ProfileMenu
