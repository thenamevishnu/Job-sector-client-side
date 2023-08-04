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
                         chatList && chatList.map((obj) => {
                             return (
                                 <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' key={obj._id} onClick={async ()=>{obj?.users[0]?.profile?.full_name ? selectedChat(obj) : errorAlert("Deleted Account!");}}>
                                     <div className='flex items-center'>
                                         <div className='relative'>
                                             <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image ? obj?.users[0]?.profile?.image : 'job/default/deleted.jpg'}`} alt='pic of opponent' className="rounded-full w-12"/>
                                             {obj?.[obj?.users[0]?._id] === 0 || obj?.[obj?.users[0]?._id] === undefined ? "" : <div className='absolute bg-green-600 rounded-full flex justify-center items-center top-0 end-0 text-white'> {obj?.[obj?.users[0]?._id]} </div>}
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
                     {
                         chatList && chatList.length === 0 && <div className='border-2 rounded-lg p-2 text-center'>
                         No Users Found!
                         </div>
                     }
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
                     
                     {
                         chatList && chatList.map((obj) => {
                             return (
                                 <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' key={obj._id} onClick={async ()=>{obj?.users[0]?.profile?.full_name ? selectedChat(obj) : errorAlert("Deleted Account!"); window.innerWidth <= 768 && setShowChat({...showchat,list:!showchat.list,conv:!showchat.conv})}}>
                                     <div className='flex items-center'>
                                         <div className='relative'>
                                             <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image ? obj?.users[0]?.profile?.image : 'job/default/deleted.jpg'}`} alt='pic of opponent' className="rounded-full w-12"/>
                                             {obj?.[obj?.users[0]?._id] === 0 || obj?.[obj?.users[0]?._id] === undefined ? "" : <div className='absolute bg-green-600 rounded-full flex justify-center items-center top-0 end-0 text-white'> {obj?.[obj?.users[0]?._id]} </div>}
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
                     {
                         chatList && chatList.length === 0 && <div className='border-2 rounded-lg p-2 text-center'>
                         No Users Found!
                         </div>
                     }
                 </div>
 
             </div>}
             
             {showchat.conv && <Conversation socket={socket} goback={[showchat,setShowChat]} selected={chatSelected} refreshList={[changeList,setChangeList]}/>}
 
         </div>
        </>
    )
}

export default Chat
