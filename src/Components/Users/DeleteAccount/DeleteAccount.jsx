import React from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

function DeleteAccount() {
    return (
        <div className='container grid grid-cols-12 mx-auto mt-20 gap-1'>
            <ProfileMenu active={{deleteAccount:true}}/>
            <div className='md:col-span-8 col-span-12 border-2 border-gray-400 rounded-lg p-3'>
                <h1 className='text-lg text-green-700 font-bold'><i className='fa fa-trash'></i> Account Deletion</h1>
                <h2 className='mt-8'>I want to close my account</h2>
                <ul className='mt-4'>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input1' className='inner-check me-2'><input type='check' className='hidden' id="input1"></input></label>  I have created a second account</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input2' className='inner-check me-2'><input type='check' className='hidden' id="input2"></input></label> I don’t understand how to use job sector</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input3' className='inner-check me-2'><input type='check' className='hidden' id="input3"></input></label> I don't find job sector useful</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input4' className='inner-check me-2'><input type='check' className='hidden' id="input4"></input></label> I get too many email from job sector</li>
                    <li className='flex items-center ms-5'><label htmlFor='input5' className='inner-check me-2'><input type='check' className='hidden' id="input5"></input></label> Other</li>
                </ul>
                <div>
                    <input type='text' className='p-2 border-2 ml-5 mt-5 border-gray-400 rounded-lg outline-none' placeholder='Enter password' />
                </div>
                <button className='mt-8 ml-5 bg-green-700 outline-none text-white p-1 px-2 rounded-lg hover:bg-green-900 shadow-button active:shadow-none'>Confirm To Delete</button>
            </div>
        </div>
    )
}

export default DeleteAccount
