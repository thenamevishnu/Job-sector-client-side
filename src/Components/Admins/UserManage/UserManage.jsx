import React, { useEffect, useState } from 'react'
import { fetchSearchData, getAllUsers, updateBanStatus, updateTickStatus } from '../../../Api/Admin'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading'

function UserManage() {

    const [userData,setUserData] = useState([])
    const [search,setSearch] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        userData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData])

    useEffect(()=>{
        const fetchData = async () => {
            setUserData(await getAllUsers())
        }
        fetchData()
    },[])

    const handleBlock = async (items) => {
        const response = await updateBanStatus(items)
        if(search)
            setUserData(await fetchSearchData(search))
        else
            setUserData(response)
    }

    const handleTick = async (items) => {
        const response = await updateTickStatus(items)
        if(search)
            setUserData(await fetchSearchData(search))
        else
            setUserData(response)
    }

    const fetchSearch = async (search) => {
        if(!search) 
            setUserData(await getAllUsers())
        else
            setUserData(await fetchSearchData(search))
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
                        <th className='border-2 border-gray-400 p-1'>FIELD</th>
                        <th className='border-2 border-gray-400 p-1'>TYPE</th>
                        <th className='border-2 border-gray-400 p-1'>BALANCE</th>
                        <th className='border-2 border-gray-400 p-1'>EARNING</th>
                        <th className='border-2 border-gray-400 p-1'>SPENT</th>
                        <th className='border-2 border-gray-400 p-1'>ACTION</th>
                    </tr>
                </thead>
                {userData && <tbody>
                    {
                       userData.map((items,index) => {
                            return(
                             
                                    <tr key={items._id} className={items.banned ? 'text-red-600 hover:bg-gray-200' : ' hover:bg-gray-200'}>
                                        <td className='border-2 border-gray-400 p-2'>{index + 1}</td>
                                        <td className='border-2 border-gray-400 p-2'><div className='flex justify-center items-center'>{items.name} {items.verified && <img className='ml-1 w-3 h-3.5' src={`${process.env.react_app_cloud}/job/default/verification.jpg`} alt='verified'/>}</div></td>
                                        <td className='border-2 border-gray-400 p-2'>{items.title}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.type}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.balance}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.type === "client" ? "-" : "+$"+items.balance}</td>
                                        <td className='border-2 border-gray-400 p-2'>{items.type === "client" ? "-$"+items.spent : "-"}</td>
                                        <td className='border-2 text-lg border-gray-400 p-2'>
                                            <i className={items.banned ? "text-green-600 fa fa-ban" : "fa fa-ban text-red-600"} title={items.banned ? "unblock" : "block"} onClick={async ()=>await handleBlock(items)}></i>&nbsp;
                                            <i className='text-blue-800 fa fa-circle-check' onClick={async ()=>await handleTick(items)}></i>&nbsp; 
                                            <i className=' text-sky-800 fa fa-circle-info' onClick={()=>{localStorage.setItem("publicProfile",items._id); navigate("/profile")}}></i>
                                        </td>
                                    </tr>
                               
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

export default UserManage
