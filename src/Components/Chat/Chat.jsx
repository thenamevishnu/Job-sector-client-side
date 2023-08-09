import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { chatListSearch, getAllChatList } from '../../Api/Chat'
import Conversation from './Conversation'
import io from "socket.io-client"
import { errorAlert } from '../../Functions/Toasts'

let socket = io(process.env.react_app_server)

function Chat() {
    
    const {id} = useSelector(state => state.user)

    const [chatList,setChatList] = useState([])
    const [chatSelected,selectedChat] = useState(null)
    const [changeList,setChangeList] = useState(null)
    const [showchat,setShowChat] = useState({list:true,conv:false})
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        chatList && setTimeout(() => {
            setLoading(false)
        }, 2000);
    },[chatList])

    useEffect(()=>{
       const fetchData = async () => {
            const userLists = await getAllChatList(id)
            const lists = userLists.map(obj => {
                return{
                    ...obj,users: obj.users.filter(item => item._id !== id)
                }
            })
            setChatList(lists)
       }
       fetchData()
    },[changeList,id])

    return (
        <>
        <div className="md:grid hidden grid-cols-12 h-screen">
            
            <div className="md:col-span-4 mt-16 border-2">
                 
                 <div className='fixed bottom-0 w-4/12 z-10 px-2'>
                     <input type='text' placeholder='Search name...' className='p-2 md:block hidden w-full outline-none border-2 rounded-lg border-gray-400' onChange={async (e)=>{ const regex = new RegExp(e.target.value,"i"); setChatList(await chatListSearch(id,regex))}}/>
                 </div>
                 <div className='p-2 overflow-x-hidden overflow-y-scroll hideScrollBar mb-10'>
                     
                    {
                    loading ? <div className='overflow-x-hidden overflow-y-scroll hideScrollBar rounded-xl'>
                        {
                            [1,2,3,4,5].map(item => {
                                return(
                                    <div key={item} className='flex relative justify-between mt-2 px-3 items-center bg-gray-300 dark:bg-gray-400 animate-pulse rounded-xl w-full h-16'>
                                        <div className='flex items-center bg-gray-400'>
                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-full h-12 w-12 mr-2'></div>
                                            <div>
                                                <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-4 w-36'></div>
                                                <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-3 w-26 mt-2'></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div> : chatList && chatList.length === 0 ? <div className='border-2 rounded-lg p-2 text-center'>
                        No Users Found!
                        </div>
                    : <>{

                        chatList && chatList.map((obj) => {
                            return (
                                <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' key={obj._id} onClick={async ()=>{obj?.users[0]?.profile?.full_name ? selectedChat(obj) : errorAlert("Deleted Account!");}}>
                                    <div className='flex items-center'>
                                        <div className='relative'>
                                            <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image ? obj?.users[0]?.profile?.image : 'job/default/deleted.jpg'}`} alt='pic of opponent' className="rounded-full w-12"/>
                                            {/* {obj?.[obj?.users[0]?._id] === 0 || obj?.[obj?.users[0]?._id] === undefined ? "" : <div className='absolute bg-green-600 rounded-full flex justify-center items-center top-0 end-0 text-white'> {obj?.[obj?.users[0]?._id]} </div>} */}
                                        </div>
                                        {!obj?.users[0]?.profile?.full_name && <div className='ms-2'>
                                            <div className='flex items-center'>Deleted Account</div>
                                        </div>}
                                        {obj?.users[0]?.profile?.full_name && <div className='ms-2'>
                                            <div className='flex items-center'>{obj?.users[0]?.profile?.full_name} {obj?.users[0]?.profile?.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='profile'/>}</div>
                                            <div style={{fontSize:"0.73em"}}>{obj?.lastMessage?.length > 10 ? obj?.lastMessage?.substring(0,10)+"..." : obj?.lastMessage}</div>
                                        </div>}
                                    </div>
                                    {obj?.users[0]?.profile?.full_name && <div className='absolute top-2 right-4'>
                                        {(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}
                                    </div>}
                                </div>
                            )
                        })                        

                    }
                    </>}
                 </div>
 
             </div>
             
            <Conversation socket={socket} goback={[showchat,setShowChat]} selected={chatSelected} refreshList={[changeList,setChangeList]}/>
 
         </div>
        
                     {/* //mobile */}

         <div className="grid md:hidden grid-cols-12 h-screen">
            
            {showchat.list && <div className="col-span-12 mt-16 border-2">
                 
                 <div className='fixed bottom-0 w-full z-10 px-2'>
                     <input type='text' placeholder='Search name...' className='p-2 w-full outline-none border-2 rounded-lg border-gray-400' onChange={async (e)=>{ const regex = new RegExp(e.target.value,"i"); setChatList(await chatListSearch(id,regex))}}/>
                 </div>
                 <div className='p-2 overflow-x-hidden overflow-y-scroll hideScrollBar mb-10'>
                     
                     {loading ? <div className='overflow-x-hidden overflow-y-scroll hideScrollBar rounded-xl'>
                        {
                            [1,2,3,4,5].map(item => {
                                return(
                                    <div key={item} className='flex relative justify-between mt-2 px-3 items-center bg-gray-300 dark:bg-gray-400 animate-pulse rounded-xl w-full h-16'>
                                        <div className='flex items-center bg-gray-400'>
                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-full h-12 w-12 mr-2'></div>
                                            <div>
                                                <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-4 w-36'></div>
                                                <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-3 w-26 mt-2'></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div> : chatList && chatList.length === 0 ? <div className='border-2 rounded-lg p-2 text-center'>
                        No Users Found!
                        </div>
                    : <>{
                         chatList && chatList.map((obj) => {
                             return (
                                 <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' key={obj._id} onClick={async ()=>{obj?.users[0]?.profile?.full_name ? selectedChat(obj) : errorAlert("Deleted Account!"); (window.innerWidth <= 768 && obj?.users[0]?.profile?.full_name) && setShowChat({...showchat,list:!showchat.list,conv:!showchat.conv})}}>
                                     <div className='flex items-center'>
                                         <div className='relative'>
                                             <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image ? obj?.users[0]?.profile?.image : 'job/default/deleted.jpg'}`} alt='pic of opponent' className="rounded-full w-12"/>
                                             {/* {obj?.[obj?.users[0]?._id] === 0 || obj?.[obj?.users[0]?._id] === undefined ? "" : <div className='absolute bg-green-600 rounded-full flex justify-center items-center top-0 end-0 text-white'> {obj?.[obj?.users[0]?._id]} </div>} */}
                                         </div>
                                         {!obj?.users[0]?.profile?.full_name && <div className='ms-2'>
                                             <div className='flex items-center'>Deleted Account</div>
                                         </div>}
                                         {obj?.users[0]?.profile?.full_name && <div className='ms-2'>
                                             <div className='flex items-center'>{obj?.users[0]?.profile?.full_name} {obj?.users[0]?.profile?.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='profile'/>}</div>
                                             <div style={{fontSize:"0.73em"}}>{obj?.lastMessage?.length > 10 ? obj?.lastMessage?.substring(0,10)+"..." : obj?.lastMessage}</div>
                                         </div>}
                                     </div>
                                     {obj?.users[0]?.profile?.full_name && <div className='absolute top-2 right-4'>
                                         {(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}
                                     </div>}
                                 </div>
                             )
                         })
                     }</>
                        }
                 </div>
 
             </div>}
             
             {showchat.conv && <Conversation socket={socket} goback={[showchat,setShowChat]} selected={chatSelected} refreshList={[changeList,setChangeList]}/>}
 
         </div>
        </>
    )
}

export default Chat
