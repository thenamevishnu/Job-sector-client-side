import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileMenu({active}){

    const navigate = useNavigate() 
    const [menu,showMenu] = useState(false)

    return (
        <>
            <div className="col-span-4 border-2 border-gray-400 rounded-xl p-3 md:block hidden">
                <h5 className='text-xl mb-2'><b>User Settings</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className={active?.contactInfo ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/contact-info")}>Contact Info</li>
                    <li className='cursor-pointer text-lg mb-2' onClick={()=>navigate("/my-profile")}>Profile</li>
                    {/* <li className={active?.profileSettings ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'}>Profile Settings</li> */}
                    <li className={active?.passwordSecurity ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/password-security")}>Password & Security</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Payments</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className={active?.payments ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/payments")}>Payments</li>
                    <li className={active?.balance ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/balance")}>Balance</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Notification Settings</b></h5>
                <ul className='ml-5 mb-2'>
                    <li className={active?.manageNotification ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/notifications")}>Manage Notifications</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Manage Account</b></h5>
                <ul className='ml-5'>
                    <li className={active?.deleteAccount ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/delete-account")}>Delete Account</li>
                    <li className={active?.myReports ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/reports")}>My Reports</li>
                </ul>
            </div>

            {menu ? <div className="col-span-12 text-center border-2 z-10 border-gray-400 rounded-xl p-3 bg-white md:hidden block absolute left-1/2 translate-x-[-50%] w-full overflow-x-hidden overflow-y-scroll h-[50vh] hideScrollBar">
                <div className='mb-3 bg-white'>
                    <span className='text-center cursor-pointer p-1 px-2 bg-green-700 rounded-lg text-white' onClick={()=>showMenu(!menu)}><i className='fa fa-arrow-up'></i></span>
                </div>
                <h5 className='text-xl mb-2'><b>User Settings</b></h5>
                <ul className='mb-2'>
                    <li className={active?.contactInfo ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/contact-info")}>Contact Info</li>
                    <li className='cursor-pointer text-lg mb-2' onClick={()=>navigate("/my-profile")}>Profile</li>
                    {/* <li className={active?.profileSettings ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'}>Profile Settings</li> */}
                    <li className={active?.passwordSecurity ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/password-security")}>Password & Security</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Payments</b></h5>
                <ul className='mb-2'>
                    <li className={active?.payments ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/payments")}>Payments</li>
                    <li className={active?.balance ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/balance")}>Balance</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Notification Settings</b></h5>
                <ul className='mb-2'>
                    <li className={active?.manageNotification ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/notifications")}>Manage Notifications</li>
                </ul>
                <h5 className='text-xl mb-2'><b>Manage Account</b></h5>
                <ul>
                    <li className={active?.deleteAccount ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/delete-account")}>Delete Account</li>
                    <li className={active?.myReports ? 'text-green-600 cursor-pointer text-lg mb-2' : 'cursor-pointer text-lg mb-2'} onClick={()=>navigate("/settings/reports")}>My Reports</li>
                </ul>
            </div> : <>
            <div className="col-span-12 mx-auto md:hidden block">
                    <span className='text-center cursor-pointer transition duration-1000 ease-linear p-1 px-2 bg-green-700 rounded-lg text-white' onClick={()=>showMenu(!menu)}><i className='fa fa-arrow-down'></i></span>
                </div>
            </>}
        </>
    )
}

export default ProfileMenu
