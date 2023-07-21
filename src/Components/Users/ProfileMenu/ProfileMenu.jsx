import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileMenu() {

    const navigate = useNavigate()  

    return (
        < >
            <div className="col-span-4 border-2 rounded-xl p-3 md:block hidden">
                <h5 className='text-xl mb-2'><b>User Settings</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className='cursor-pointer text-lg mb-2' onClick={()=>navigate("/settings/contact-info")}>Contact Info</li>
                    <li className='cursor-pointer text-lg mb-2' onClick={()=>navigate("/my-profile")}>Profile</li>
                    <li className='cursor-pointer text-lg mb-2'>Profile Settings</li>
                    <li className='cursor-pointer text-lg mb-2'>Password & Security</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Payments</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className='cursor-pointer text-lg mb-2'>Payments</li>
                    <li className='cursor-pointer text-lg mb-2'>Balance</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Notification Settings</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className='cursor-pointer text-lg mb-2'>Manage Notifications</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Manage Account</b></h5>
                <ul className='ml-5'>
                    <li className='cursor-pointer text-lg mb-2'>Delete Account</li>
                    <li className='cursor-pointer text-lg mb-2'>My Reports</li>
                </ul>
            </div>
        </>
    )
}

export default ProfileMenu
