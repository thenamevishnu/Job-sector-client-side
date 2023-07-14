import React, { useEffect, useState } from 'react'
import "./ViewPost.css"
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
        <div className='post-view-client'>
            <div className='container'>
                <div className="row gap-5">
                    <div className="col-12 border-20 p-3">
                    {postData?.title && <div className="row d-flex justify-content-between">
                        <div className="col-8">
                            
                           <div className="col-12">
                                <div className='d-flex justify-content-between'>
                                    <div className='p-3 mb-2'>
                                        <div className='text-success text-start' style={{fontSize:"1.2em",maxWidth:"35em"}}>{postData?.title}</div>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <div className='text-start  mb-2' style={{fontSize:"0.8em"}}>{postData?.jobType} - Est. Budget: ${postData?.priceRange?.from}-{postData?.priceRange?.to} - Posted {moment(postData?.posted).fromNow()}</div>
                                    <p className='text-start mt-4' style={{lineHeight:"2.5"}}>{postData?.description}</p>
                                    <div className='mt-4 mb-5 tags text-start'>
                                        {
                                            postData?.skillsNeed && postData?.skillsNeed.map(value => {
                                                return(
                                                    <span className='tag me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='text-start mt-4 mb-4'>Connections Need : {postData?.connectionsNeed?.from}</div>
                                    <div className='text-start mt-4 mb-4'>Total Proposals : {postData?.proposals?.length}</div>
                                </div>  
                            </div>
                        </div>
                        
                        </div>}
                        {!postData?.title && <div className='text-center fs-5'>Post Disabled or Deleted!</div>}
                    </div>
                    {
                        userData?.length > 0 && <h3>All Users</h3>
                    }
                    {
                        userData && userData.map((obj) => {
                            return(
                                <div className='col-12 mb-2 border-20 p-3 d-flex align-items-center justify-content-between' key={obj._id} >
                                    <div className='profile-info d-flex align-items-center'>
                                        <img className='cursor-pointer' src={`${process.env.react_app_cloud}/${obj?.profile?.image}`} alt='profile-pic' width="80px" style={{borderRadius:"50px"}} onClick={()=>{localStorage.setItem("publicProfile",obj._id); navigate("/profile")}} />
                                        <div className='ms-3' style={{lineHeight:"1.3"}}>
                                            <div>{obj?.profile?.full_name}</div>
                                            <div style={{fontSize:"0.8em"}}>{obj?.profile?.title}</div>
                                            <div style={{fontSize:"0.85em"}}>{obj?.profile?.country}</div>
                                        </div>
                                    </div>
                                    {
                                        obj.my_proposals.find(item => item.post_id === post_id && item.status === "Achieved") ? <div className='d-flex align-items-center cursor-pointer' onClick={()=>navigate("/chats")}><i className='me-2 fa fa-comment fs-3 text-success'></i> Chat Now</div> : <div>
                                        <i className='fa fa-circle-xmark me-3 fs-1 text-danger cursor-pointer' onClick={async ()=>setUserData(await rejectPropsal(post_id,obj._id))}></i>
                                        <i className='fa fa-circle-check fs-1 text-success cursor-pointer' onClick={async ()=>{await createChat(id,obj._id); setUserData(await acceptProposal(post_id,obj._id));}}></i>
                                    </div>
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ViewPost
