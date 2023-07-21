import React, { useEffect, useState } from 'react'
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
        <div className='container grid grid-cols-12 mt-20 mx-auto'>
            {
                postData && postData.map(obj => {
                    return (
                        <div key={obj?.post_info[0]?._id} className='flex justify-between items-center col-span-12 md:col-span-6 lg:col-span-4 border-2 border-gray-400 rounded-xl p-2'>
                            <div>
                                <h5 className='text-green-700 text-lg'>{obj?.post_info[0].title}</h5>
                                <div>Status : {obj?.my_proposals?.status}</div>
                            </div>
                            <div>
                                <button className=' bg-violet-800 text-white rounded-lg p-1 ps-2 pe-2' onClick={()=>{localStorage.setItem("post-id",obj?.post_info[0]?._id); navigate("/post-view")}}>View Job</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyProposals
