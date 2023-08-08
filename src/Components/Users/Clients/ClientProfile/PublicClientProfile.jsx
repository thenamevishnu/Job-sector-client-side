import React, { useEffect, useState } from 'react'
import { getUserData } from '../../../../Api/user'
import { errorAlert } from '../../../../Functions/Toasts'
import { fetchMyPosts } from '../../../../Api/FetchMyPosts'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Loading/Loading'

function PublicClientProfile() {

    const id = localStorage.getItem("publicProfileClient")
    const navigate = useNavigate()
    const [userData,setUserData] = useState({})
    const [postData,setPostData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        userData && postData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData,postData])

    useEffect(()=>{
        
        const fetchData = async () => {
            try{
                setUserData(await getUserData(id))
                setPostData(await fetchMyPosts(id))
            }catch(err){
                errorAlert(err.message)
            }
        }
        if(id){
            fetchData()
        }else{
            navigate("/")
        }
    },[id])

    return (
        <>
        {loading ? <Loading/> : <div className='container mx-auto grid grid-cols-12 gap-2 mt-20'>
            <div className='md:col-span-4 col-span-12 text-center'>
                <div className='p-3 border-2 border-gray-400 rounded-lg'>
                <img className='rounded-full mx-auto w-20' src={`${process.env.react_app_cloud + userData?.profile?.image}`} alt='client profile pic'/>
                <p className='mt-2 flex items-center justify-center'><i className='fa fa-user text-gray-400 mr-1'></i> {userData?.profile?.full_name} <img src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='auther pic' width="15em" className='ml-1'/></p>
                <p><i className='fa fa-at text-gray-400'></i> {userData?.profile?.email}</p>
                <p><i className='fa fa-location-dot text-gray-400'></i> {userData?.profile?.country}</p>
                </div>
            </div>
            <div className='md:col-span-8 col-span-12 border-2 border-gray-400 rounded-lg'>
                <div className='grid container grid-cols-12 gap-2 p-2'>
                    {
                        postData ? 
                        postData.map(items => {
                            return(
                                <div className='col-span-12 p-2 shadow-lg border-2 rounded-lg border-gray-400' key={items._id}>
                                    <p className='text-green-700 font-bold cursor-pointer' onClick={()=>{localStorage.setItem("post-id",items._id); navigate("/post-view")}}>{items.title}</p>
                                    <p>{items.description}</p>
                                    <p><span className='font-bold'>Experience Level:</span> <code>{items.experience}</code></p>
                                    <p><span className='font-bold'>Type:</span> <code>{items.jobType}</code></p>
                                    <p><span className='font-bold'>Price Range:</span> <code>{items.jobType === "Fixed Price" ? `$${items.priceRangefrom}-$${items.priceRangeto}` : `$${items.priceRangefrom}-$${items.priceRangeto}/hr`}</code></p>
                                    <p><span className='font-bold'>Posted:</span> <code>{moment(items.posted).fromNow()}</code></p>
                                </div>
                            )
                        })
                        : 
                        ""
                    }
                </div>
            </div>
        </div>}
        </>
    )
}

export default PublicClientProfile
