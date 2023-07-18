import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { changePostStatus, deletePost, fetchMyPosts, markAsCompletedPost } from '../../../../Api/FetchMyPosts'
import "./MyPosts.css"
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
        <div className='container'>
            <div className='row mt-5 pt-5 offset-0 offset-lg-0 gap-2 gap-lg-0 my-posts'>
                {
                    postData && postData.length === 0 && <div className='d-flex justify-content-center'>Not Posts Found!</div>
                }
                {
                    postData && postData.map(obj => {
                        return (
                            <div className='post mb-lg-3 mb-0 col-12 col-lg-5 mx-auto border-20 p-2 d-flex align-items-center justify-content-between' key={obj._id}>
                                <div>
                                <h5 className='text-success cursor-pointer' onClick={()=>{localStorage.setItem("client-view-post",obj._id); navigate("/view-post");}}>{obj?.title}</h5>
                                <p>Proposals : {obj?.proposals?.length}</p>
                                <div>Status : {obj.status ? <span className='text-success'>Enabled</span> : <span className='text-danger'>Disabled</span>}</div>
                                </div>
                                <div className='position-relative'>
                                    {!obj?.completed && <><button title={obj?.status ? "Disable" : "Enable"} className={obj?.status ? 'disable-button d-block p-1 ps-2 pe-2 mb-1' : 'enable-button d-block p-1 ps-2 pe-2 mb-1'} onClick={async ()=>setPostData(await changePostStatus(obj._id,id,obj.status))}>{obj?.status ? <i className='fa fa-ban text-danger'></i> : <i className='fa fa-ban text-success'></i>}</button>
                                    <button title='Delete The Post' className='disable-button d-block p-1 ps-2 pe-2 mb-1' onClick={async ()=>await deletePostFun(obj._id,id)}><i className='fa fa-trash text-danger'></i></button>
                                    <button title='Edit The Post' className='edit-button d-block p-1 ps-2 pe-2 mb-1' onClick={()=>{localStorage.setItem("client-edit-post",obj._id); navigate("/post-edit");}}><i className='fa fa-edit text-primary'></i></button>
                                    <button title='Mark As Completed!' className='edit-button d-block p-1 ps-2 pe-2 border-success' onClick={async ()=>await markAsCompleted(obj._id,id)}><i className="fa fa-check text-success"></i></button>
                                    </>}
                                    {
                                        obj?.completed && <div className='d-flex justify-content-center'>
                                            <p className=' text-success'><i className='fa fa-circle-check'></i> Completed</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyPosts
