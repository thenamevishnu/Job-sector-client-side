import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchMyPosts } from '../../../Api/Freelancer/FetchMyPosts'

function MyPosts() {
    
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
    <div className='row mt-5'>
        <div className="col-12 mt-5">
            {
                postData && postData.map(obj => {
                    return <h5 key={obj._id}>{JSON.stringify(obj)}</h5>
                })
            }
        </div>
    </div>
  )
}

export default MyPosts
