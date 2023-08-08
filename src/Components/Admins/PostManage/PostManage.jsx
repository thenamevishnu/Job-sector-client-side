import React, { useEffect, useState } from 'react'
import { fetchSearchPostData, getAllPosts } from '../../../Api/Admin'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'

function PostManage() {

    const [postData,setPostData] = useState([])
    const [search,setSearch] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        postData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[postData])

    useEffect(()=>{
        const fetchData = async () => {
            const response = await getAllPosts()
            setPostData(response)
        }
        fetchData()
    },[])

    const fetchSearch = async (search) => {
        if(!search) 
            setPostData(await getAllPosts())
        else
            setPostData(await fetchSearchPostData(search))
    }

    return (
        <>
            {
                loading ? <Loading/> : <>
                <div className='grid grid-cols-12 mt-20 mb-3'>
                <div className='col-span-12 flex justify-center'>
                    <input className='lg:w-3/12 md:w-5/12 sm:w-7/12 w-10/12 p-2 border-2 border-gray-400 rounded-lg outline-none' placeholder='Search User...' type='text' value={search} onChange={async (e)=>{ setSearch(e.target.value); await fetchSearch(e.target.value)}}/>
                </div>
            </div>
            <table className='table-auto container mx-auto text-center cursor-pointer'>
                <thead>
                    <tr>
                        <th className='border-2 border-gray-400 p-1'>NO:</th>
                        <th className='border-2 border-gray-400 p-1'>NAME</th>
                        <th className='border-2 border-gray-400 p-1'>USERNAME</th>
                        <th className='border-2 border-gray-400 p-1'>TITLE</th>
                        <th className='border-2 border-gray-400 p-1'>LEVEL</th>
                        <th className='border-2 border-gray-400 p-1'>ACTIVE</th>
                        <th className='border-2 border-gray-400 p-1'>COMPLETED</th>
                        <th className='border-2 border-gray-400 p-1'>PROPOSALS</th>
                        <th className='border-2 border-gray-400 p-1'>ACTION</th>
                    </tr>
                </thead>
                {postData && <tbody>
                    {
                       postData.map((items,index) => {
                            return(
                                <>
                                    <tr key={items._id} className=' hover:bg-gray-200'>
                                        <td className='border-2 border-gray-400 p-2'>{index + 1}</td>
                                        <td className='border-2 border-gray-400 p-2'><div className='flex justify-center items-center'>{items.auther[0]?.profile?.full_name} {items.auther[0]?.profile?.is_verified && <img className='ml-1 w-3 h-3.5' alt='verified' src={`${process.env.react_app_cloud}/job/default/verification.jpg`}/>}</div></td>
                                        <td className='border-2 border-gray-400 p-2'>@{items.auther[0]?.profile?.username}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.title}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.experience}</td>
                                        <td className='border-2 border-gray-400 p-2'>{!items.completed && items.status ? "YES" : "NO"}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.completed ? "YES" : "NO"}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.proposals?.length}</td>
                                        <td className='border-2 text-lg border-gray-400 p-2'>
                                            {items.completed && <i className='text-green-800 fa fa-circle-check mr-1'></i>}
                                            {!items.completed && items.status && <i className=' text-sky-800 fa fa-circle-info' onClick={()=>{localStorage.setItem("post-id",items._id); navigate("/post-view")}}></i>}
                                        </td>
                                    </tr>
                                </>
                            )
                       }) 
                    }
                </tbody>}
           </table>
                </>
            }
        </>
    )
}

export default PostManage
