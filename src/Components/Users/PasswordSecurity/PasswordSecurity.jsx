import React, { useEffect, useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { changeTwoStep, getUserData } from '../../../Services/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'

function PasswordSecurity() {

    const [userData,setUserData] = useState({})
    const {id} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        userData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData])

    useEffect(()=>{
        const fetchData = async () => {
            setUserData(await getUserData(id))
        }
        fetchData()
    },[id])

    const setTwoStep = async (status) => {
        await changeTwoStep(id, status)
    }

    return (
        <>
           <div className=' grid grid-cols-12 mx-auto mt-20 gap-1 px-2 md:px-10'>
                <ProfileMenu active={{passwordSecurity:true}}/>
                    <div className={loading ? "md:col-span-8 col-span-12 md:relative md:border-2 md:border-gray-400 rounded-xl" : "md:col-span-8 col-span-12 md:relative"}>
                    {
                loading ? <Loading/> : <div className='grid grid-cols-12 mx-auto container'>
                            
                            <div className='col-span-12 border-2 border-gray-400 rounded-xl p-3'>
                                <h1 className='text-lg text-green-700 font-bold'>Authentication Options</h1>
                                {userData && userData.profile?.signup_method === "google" ? 
                                    <p className='text-sm mt-3'>You currently use <span className='text-green-700'>Google Sign-in</span> to login. We will only ask for your Job Sector password if we need to verify your identity.</p> 
                                    : <>
                                    <p className='flex items-center mt-3'>Password <i className='inner-circle ml-2 fa fa-pen text-gray-500 cursor-pointer' onClick={()=>navigate("/settings/change-password")}></i></p><p className='text-sm mt-1'>We will only ask for your Job Sector password if we need to verify your identity.</p>
                                    </>
                                }
                            </div>
    
                            <div className='col-span-12 border-2 border-gray-400 rounded-xl p-3 mt-1'>
                                <h1 className='text-lg text-green-700 font-bold'>Two Step Verification</h1> 
                                <p className='text-sm mt-3'>Add an extra layer of security to block unauthorized access and protect your account.</p>
    
                                {userData && userData?.profile?.signup_method !== "google" ? <><div className='font-bold mt-8 text-lg text-green-700 flex items-center'><p className='mr-2'>Email Verification</p>
                                    
                                    {
                                        userData?.twoStep ? 
                                            <>
                                                <label htmlFor='emailVerify1'><span className='px-1 bg-green-700 text-white rounded-lg'><i className='fa fa-check'></i></span></label>
                                                <input type='checkbox' id='emailVerify1' className='hidden' onChange={async ()=>{setTwoStep(!userData?.twoStep); setUserData({...userData,twoStep:!userData?.twoStep})}} checked/>
                                            </>
                                        :   <>
                                                <label htmlFor='emailVerify2'><span className='px-2.5 border-2 border-gray-400 rounded-lg'></span></label>
                                                <input type='checkbox' id='emailVerify2' className='hidden' onChange={async ()=>{setTwoStep(!userData?.twoStep); setUserData({...userData,twoStep:!userData?.twoStep})}}/>
                                            </>
                                    }
                                </div>
                                 <p className='text-sm mt-3'>Receive a six digit code by text message to confirm it’s you.</p>
                                 </> : <>
                                <div className='font-bold mt-8 text-lg text-green-700 flex items-center'><p className='mr-2'>Email Verification</p>
                                    
                                </div>
                                <p className='text-sm mt-3'>You currently use <span className='text-green-700'>Google Sign-in</span> to login.</p> 
                                </>}
                               
                            </div>
    
                        </div>}
                    </div>
    
                </div>
        </>
    )
}

export default PasswordSecurity
