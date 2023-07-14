import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { changePostStatus, fetchMyPosts } from '../../../../Api/FetchMyPosts'
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
  
    return (
        <div className='container'>
            <div className='row mt-5 pt-5 offset-0 offset-lg-0 gap-2 gap-lg-0 my-posts'>
                {
                    postData && postData.map(obj => {
                        return (
                            <div className='post mb-lg-3 mb-0 col-12 col-lg-5 mx-auto border-20 p-2 d-flex align-items-center justify-content-between' key={obj._id}>
                                <div>
                                <h5 className='text-success cursor-pointer' onClick={()=>{localStorage.setItem("client-view-post",obj._id); navigate("/view-post");}}>{obj?.title}</h5>
                                <p>Proposals : {obj?.proposals?.length}</p>
                                <div>Status : {obj.status ? <span className='text-success'>Enabled</span> : <span className='text-danger'>Disabled</span>}</div>
                                </div>
                                <div>
                                    <button className={obj?.status ? 'disable-button d-block p-1 ps-2 pe-2 mb-2' : 'enable-button d-block p-1 ps-2 pe-2 mb-2'} onClick={async ()=>setPostData(await changePostStatus(obj._id,id,obj.status))}>{obj?.status ? "Disable" : "Enable"}</button>
                                    <button className='edit-button d-block p-1 ps-2 pe-2' onClick={()=>{localStorage.setItem("client-edit-post",obj._id); navigate("/post-edit");}}>Edit</button>
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
