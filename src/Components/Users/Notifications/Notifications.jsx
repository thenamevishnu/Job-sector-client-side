import React, { useEffect, useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import {useSelector} from "react-redux"
import { changeNotifications, getUserData } from '../../../Services/user'
import Loading from '../../Loading/Loading'

function Notifications() {

    const {id} = useSelector(state => state.user)
    const [check,setCheck] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        check && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[check])

    useEffect(()=>{
        const getNotification = async () => {
            const user = await getUserData(id)    
            setCheck(user.notifications)
        }
        getNotification()
    },[id])

    const changeNotification = async () => {
        await changeNotifications(id,check)
    }

    return (
        <>
        <div className=' grid grid-cols-12 mx-auto gap-1 mt-20 px-2 md:px-10'>
            <ProfileMenu active={{manageNotification:true}}/>
            <div className={loading ? "col-span-12 md:col-span-8 md:border-2 md:border-gray-400 rounded-xl p-3 md:relative" : "col-span-12 md:col-span-8 border-2 border-gray-400 rounded-xl p-3 md:relative"}>
            {loading ? <Loading/> : <>
            <h1 className='text-green-700 font-bold mb-3 text-lg'>Promotional Messages</h1>
                <div className='flex items-center'>
                    <label className={check?.promotional ? "bg-green-700 inner-check me-2" : "inner-check me-2"} onClick={()=>{setCheck({...check,promotional:true}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>Yes
                </div>
                <div className='flex items-center'>
                    <label className={!check?.promotional ? "bg-green-700 inner-check me-2" : "inner-check me-2"}  onClick={()=>{setCheck({...check,promotional:false}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>No
                </div>

                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Broadcast Messages</h1>
                <div className='flex items-center'>
                    <label className={check?.broadcast ? "bg-green-700 inner-check me-2" : "inner-check me-2"} onClick={()=>{setCheck({...check,broadcast:true}); changeNotification()}}>
                        <input type='radio' className='hidden' />
                    </label>Yes
                </div>
                <div className='flex items-center'>
                    <label className={!check?.broadcast ? "bg-green-700 inner-check me-2" : "inner-check me-2"} onClick={()=>{setCheck({...check,broadcast:false}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>No
                </div>

                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Account Related tifications</h1>
                <div className='flex items-center'>
                    <label className={check?.account ? "bg-green-700 inner-check me-2" : "inner-check me-2"}  onClick={()=>{setCheck({...check,account:true}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>Yes
                </div>
                <div className='flex items-center'>
                    <label className={!check?.account ? "bg-green-700 inner-check me-2" : "inner-check me-2"}  onClick={()=>{setCheck({...check,account:false}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>No
                </div>
               
                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Proposal Related</h1>
                <div className='flex items-center'>
                    <label className={check?.proposals ? "bg-green-700 inner-check me-2" : "inner-check me-2"} onClick={()=>{setCheck({...check,proposals:true}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>Yes
                </div>
                <div className='flex items-center'>
                    <label className={!check?.proposals ? "bg-green-700 inner-check me-2" : "inner-check me-2"} onClick={()=>{setCheck({...check,proposals:false}); changeNotification()}}>
                        <input type='radio' className='hidden'/>
                    </label>No
                </div>
            </>}
            </div>
        </div>
        </>
    )
}

export default Notifications