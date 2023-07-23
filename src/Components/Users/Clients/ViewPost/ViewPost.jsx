import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { acceptProposal, rejectPropsal } from '../../../../Api/ManagePoposals'
import { useSelector } from 'react-redux'
import { createChat } from '../../../../Api/Chat'

function ViewPost() {

    const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const [postData,setPostData] = useState({})
    const [userData,setUserData] = useState([])
    const post_id = localStorage.getItem("client-view-post")
    useEffect(() => {
        const getSinglePost = async () => {
            const {data} = await axios.get(process.env.react_app_server + "/client-post-view/"+post_id)
            setPostData(data.postData)
            setUserData(data.userData)
        }
        getSinglePost()
    },[post_id])

    return (
        <>
        <div className='container grid grid-cols-12 border-2 border-gray-400 mx-auto mt-20 rounded-xl'>
            {
                !postData?.title && <div className='text-center col-span-12'>Post Disabled or Deleted!</div>
            } 
            {
                postData?.title && 
                    <div className="p-3 col-span-12">
                        <div className='mb-2'>
                            <div className='text-green-700 text-start' style={{fontSize:"1.2em",maxWidth:"35em"}}>{postData?.title}</div>
                        </div>
                        <div>
                            <div className='text-start mb-2' style={{fontSize:"0.8em"}}>{postData?.jobType} - Est. Budget: ${postData?.priceRange?.from}-{postData?.priceRange?.to} - Posted {moment(postData?.posted).fromNow()}</div>
                        </div>
                        <p className='text-start mt-4 whitespace-pre-wrap' style={{lineHeight:"2.5"}}>{postData?.description}</p>
                        <div className='mt-4 mb-5 text-start'>
                            {
                                postData?.skillsNeed && postData?.skillsNeed.map(value => {
                                    return(
                                        <span className='shadow-tag rounded-xl bg-gray-300 me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                    )
                                })
                            }
                        </div>  
                        <div className='text-start mt-4 mb-4'>Connections Need : {postData?.connectionsNeed?.from}</div>
                        <div className='text-start mt-4 mb-4'>Total Proposals : {postData?.proposals?.length}</div>    
                    </div>
                }
        </div>
        
        <div className='container grid grid-cols-12 mx-auto mt-1 rounded-xl px-0 p-2'>
        {
                userData?.length > 0 && <h3 className='p-2 px-0 col-span-12 text-green-700 text-lg mb-2 uppercase'>Proposals list</h3>
            }
                    {
                        userData && userData.map((obj) => {
                            return(
                                <div className='lg:col-span-4 md:col-span-6 col-span-12 flex justify-between border-2 border-gray-400 rounded-xl p-2' key={obj._id} >
                                    <div className='flex items-center'>
                                        <img className='cursor-pointer rounded-full' src={`${process.env.react_app_cloud}/${obj?.profile?.image}`} alt='profile-pic' width="80px" onClick={()=>{localStorage.setItem("publicProfile",obj._id); navigate("/profile")}} />
                                        <div className='ms-3' style={{lineHeight:"1.3"}}>
                                            <div className='flex items-center'>{obj?.profile?.full_name} {obj?.profile?.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='profile'/>}</div>
                                            <div style={{fontSize:"0.8em"}}>{obj?.profile?.title}</div>
                                            <div style={{fontSize:"0.85em"}}>{obj?.profile?.country}</div>
                                        </div>
                                    </div>
                                    {
                                        obj.my_proposals.find(item => item.post_id === post_id && item.status === "Achieved") ? <div className='flex items-center cursor-pointer' onClick={()=>navigate("/chats")}><i className='me-2 fa fa-comment fs-3 text-green-700'></i> Chat Now</div> : <div className='flex items-center'>
                                        <i className='fa fa-circle-xmark me-3 fs-1 text-red-600 cursor-pointer text-3xl' onClick={async ()=>setUserData(await rejectPropsal(post_id,obj._id))}></i>
                                        <i className='fa fa-circle-check fs-1 text-green-700 cursor-pointer text-3xl' onClick={async ()=>{await createChat(id,obj._id); setUserData(await acceptProposal(post_id,obj._id));}}></i>
                                    </div>
                                    }
                                </div>
                            )
                        })
                    }
        </div>
        </>
    )
}

export default ViewPost
