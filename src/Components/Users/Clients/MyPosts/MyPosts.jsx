import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { changePostStatus, deletePost, fetchMyPosts, markAsCompletedPost } from '../../../../Api/FetchMyPosts'
import { useNavigate } from 'react-router-dom'


function MyPosts() {

    const navigate = useNavigate()    
    const {id} = useSelector(state => state.user)
    const [postData,setPostData] = useState([])

    useEffect(()=>{
        const api_call = async () => {
            const allPosts = await fetchMyPosts(id)
            setPostData(allPosts)
        }
        api_call()
    },[id])

    const deletePostFun = async (post_id,user_id) => {
        const stat = window.confirm("Confirm to delete?"); 
        if(stat) 
            setPostData(await deletePost(post_id,user_id))
    }

    const markAsCompleted = async (post_id, user_id) =>{
        const stat = window.confirm("Project Completed?"); 
        if(stat) 
            setPostData(await markAsCompletedPost(post_id,user_id))
    }
  
    return (
        <div className='container grid grid-cols-12 mx-auto mt-20 gap-2'>
                {
                    postData && postData.length === 0 && <div className='col-span-12'>Not Posts Found!</div>
                }
                
                    {
                        postData && postData.map((obj,index) => {
                            return (
                                <div className='col-span-12 md:col-span-6 lg:col-span-4 border-2 border-gray-400 rounded-xl flex items-center justify-between p-2' key={obj._id}>
                                    <div>
                                    <h5 className='text-green-700 cursor-pointer text-lg' onClick={()=>{localStorage.setItem("client-view-post",obj._id); navigate("/view-post");}}>{index+1 + "."}{obj?.title}</h5>
                                    <p>Proposals : {obj?.proposals?.length}</p>
                                    <div>Status : {obj.status ? <span className='text-green-700'>Enabled</span> : <span className='text-red-600'>Disabled</span>}</div>
                                    </div>
                                    <div className='relative'>
                                        {!obj?.completed && <><button title={obj?.status ? "Disable" : "Enable"} className={obj?.status ? 'p-1 ps-2 pe-2 mb-1' : 'p-1 ps-2 pe-2 mb-1'} onClick={async ()=>setPostData(await changePostStatus(obj._id,id,obj.status))}>{obj?.status ? <i className='fa fa-ban text-red-600'></i> : <i className='fa fa-ban text-green-700'></i>}</button>
                                        <button title='Delete The Post' className='p-1 ps-2 pe-2 mb-1' onClick={async ()=>await deletePostFun(obj._id,id)}><i className='fa fa-trash text-red-600'></i></button>
                                        <button title='Edit The Post' className='p-1 ps-2 pe-2 mb-1' onClick={()=>{localStorage.setItem("client-edit-post",obj._id); navigate("/post-edit");}}><i className='fa fa-edit text-blue-700'></i></button>
                                        <button title='Mark As Completed!' className='p-1 ps-2 pe-2' onClick={async ()=>await markAsCompleted(obj._id,id)}><i className="fa fa-check text-green-700"></i></button>
                                        </>}
                                        {
                                            obj?.completed && <div className='flex justify-center'>
                                                <p className=' text-green-700'><i className='fa fa-circle-check'></i> Completed</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
               
        </div>
    )
}

export default MyPosts
