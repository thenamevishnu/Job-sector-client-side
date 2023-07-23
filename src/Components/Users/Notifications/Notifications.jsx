import React, { useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import {useSelector} from "react-redux"

function Notifications() {

    const {type} = useSelector(state => state.user)
    const [check,setCheck] = useState({})

    return (
        <div className='container grid grid-cols-12 mx-auto gap-2 mt-20'>
            <ProfileMenu active={{manageNotification:true}}/>
            <div className="col-span-12 md:col-span-8 border-2 border-gray-400 rounded-lg p-3">
                <h1 className='text-green-700 font-bold mb-3 text-lg'>Promotional Messages</h1>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>Yes
                </div>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>No
                </div>

                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Broadcast Messages</h1>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>Yes
                </div>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>No
                </div>

                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Account Related tifications</h1>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>Yes
                </div>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>No
                </div>
               
                <h1 className='text-green-700 font-bold mb-3 mt-3 text-lg'>Proposal Related</h1>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>Yes
                </div>
                <div className='flex items-center'>
                    <lable className="inner-check me-2">
                        <input type='checkbox' className='hidden'/>
                    </lable>No
                </div>
                  
            </div>
        </div>
    )
}

export default Notifications