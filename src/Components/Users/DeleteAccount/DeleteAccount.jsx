import React, { useEffect, useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, getUserData } from '../../../Services/user'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { updateUser } from '../../../Redux/UserSlice/UserSlice'

function DeleteAccount() {

    const {email,id} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})
    const [check,setCheck] = useState({})
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        userData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData])

    useEffect(()=>{
        const getData = async () => {
            setUserData(await getUserData(id))
        }
        getData()
    },[id])

    useEffect(()=>{
        if(userData?.profile?.signup_method==="google"){
            setPassword(process.env.react_app_googleAuthKey)
        }
    },[userData])

    const clearRedux = () => {
        dispatch(updateUser({
            id:"",
            name:"",
            email:"",
            image:"",
            audio:"",
            type:"",
            chat_manage:false,
            pdf:"",
            country:""
        }))
        navigate("/login")
    }

    return (
        <>
        <div className=' grid grid-cols-12 mx-auto mt-20 gap-1 px-2 md:px-10'>
            <ProfileMenu active={{deleteAccount:true}}/>
            <div className={loading ? 'md:col-span-8 col-span-12 md:border-2 md:border-gray-400 rounded-xl p-3 md:relative' : 'md:col-span-8 col-span-12 border-2 border-gray-400 rounded-xl p-3 md:relative'}>
            {loading ? <Loading/> : <>
            <h1 className='text-lg text-green-700 font-bold'><i className='fa fa-trash'></i> Account Deletion</h1>
                <h2 className='mt-8'>I want to close my account</h2>
                <ul className='mt-4'>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input1' className={check?.id === 1 ? 'bg-green-700 inner-check me-2 cursor-pointer' : 'inner-check me-2 cursor-pointer'} onClick={()=>setCheck({id:1,reason:'I have created a second account'})}><input type='check' className='hidden' id="input1"></input></label> I have created a second account</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input2' className={check?.id === 2 ? 'bg-green-700 inner-check me-2 cursor-pointer' : 'inner-check me-2 cursor-pointer'} onClick={()=>setCheck({id:2,reason:'I don’t understand how to use job sector'})}><input type='check' className='hidden' id="input2"></input></label> I don’t understand how to use job sector</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input3' className={check?.id === 3 ? 'bg-green-700 inner-check me-2 cursor-pointer' : 'inner-check me-2 cursor-pointer'} onClick={()=>setCheck({id:3,reason:`I don’t find job sector useful`})}><input type='check' className='hidden' id="input3"></input></label> I don't find job sector useful</li>
                    <li className='flex items-center ms-5 mb-2'><label htmlFor='input4' className={check?.id === 4 ? 'bg-green-700 inner-check me-2 cursor-pointer' : 'inner-check me-2 cursor-pointer'} onClick={()=>setCheck({id:4,reason:'I get too many email from job sector'})}><input type='check' className='hidden' id="input4"></input></label> I get too many email from job sector</li>
                    <li className='flex items-center ms-5'><label htmlFor='input5' className={check?.id === 5 ? 'bg-green-700 inner-check me-2 cursor-pointer' : 'inner-check me-2 cursor-pointer'} onClick={()=>setCheck({id:5,reason:'Other'})}><input type='check' className='hidden' id="input5"></input></label> Other</li>
                </ul>
                {check?.reason && userData?.profile.signup_method !== "google" && <div>
                    <input type='password' className='p-2 border-2 ml-5 mt-5 border-gray-400 rounded-lg outline-none' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>}
                {userData?.profile?.signup_method === "google" && <div>
                    <input type='text' hidden className='p-2 border-2 ml-5 mt-5 border-gray-400 rounded-lg outline-none' placeholder='Enter password' value={process.env.react_app_googleAuthKey} />
                </div>}
                {check?.reason && <button className='mt-8 ml-5 bg-green-700 outline-none text-white p-1 px-2 rounded-lg hover:bg-green-900 shadow-button active:shadow-none' onClick={async ()=>await deleteAccount(id, email, password) && clearRedux()}>Confirm To Delete</button>}
           
        
            </>}
            </div>
            </div>
        </>
    )
}

export default DeleteAccount
