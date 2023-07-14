import React, { useEffect, useState } from 'react'
import "./MyProposals.css"
import { useSelector } from 'react-redux'
import { getMyProposals } from '../../../../Api/FetchMyPosts'
import { useNavigate } from 'react-router-dom'

function MyProposals() {

    const navigate = useNavigate()
    
    const {id} = useSelector(state => state.user)
    const [postData,setPostData] = useState([])

    useEffect(()=>{
        const api_call = async () => {
            const postData = await getMyProposals(id)
            setPostData(postData.postData)
        }
        api_call()
    },[id])


    return (
        <div className='container'>
            <div className='row mt-5 pt-5 offset-0 offset-lg-0 gap-2 gap-lg-0 my-proposals'>
                {
                    postData && postData.map(obj => {
                        return (
                            <div key={obj?.post_info[0]?._id} className='post mb-lg-3 mb-0 col-12 col-lg-5 mx-auto border-20 p-2 d-flex justify-content-between align-items-center'>
                                <div>
                                    <h5 className='text-success'>{obj?.post_info[0].title}</h5>
                                    <div>Status : {obj?.my_proposals?.status}</div>
                                </div>
                                <div>
                                    <button className='info-button p-1 ps-2 pe-2' onClick={()=>{localStorage.setItem("post-id",obj?.post_info[0]?._id); navigate("/post-view")}}>View Job</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyProposals
