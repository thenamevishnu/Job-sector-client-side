import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useSelector } from 'react-redux'
import { chatListSearch, getAllChatList } from '../../Api/Chat'
import Conversation from './Conversation'
// import Landing from './Landing'
import io from "socket.io-client"

let socket = io(process.env.react_app_server)

function Chat() {
    
    const {id} = useSelector(state => state.user)

    const [chatList,setChatList] = useState([])
    const [chatSelected,selectedChat] = useState(null)
    const [changeList,setChangeList] = useState(null)

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
        // if ('Notification' in window && Notification.permission !== 'denied') {
        //     Notification.requestPermission().then(permission => {});
        // }
    },[changeList,id])

    return (
        <div className='chat-app'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                       
                        <div className='row'>

                            <div className='col-5 col-lg-4 left border-20 p-2'>
                                <div className='col-12 p-2 search'>
                                    <input type='text' placeholder='Search name...' onChange={async (e)=>{ const regex = new RegExp(e.target.value,"i"); setChatList(await chatListSearch(id,regex))}}/>
                                </div>
                                <div className='users mt-3 p-2'>
                                    {
                                        chatList && chatList.map((obj) => {
                                            return (
                                                <div className='user mb-2 p-2 d-flex justify-content-between position-relative border-20 cursor-pointer' key={obj._id} onClick={async ()=>{selectedChat(obj);}}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='position-relative'>
                                                            <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image}`} alt='pic of opponent' width="50px" className='rounded-pill'/>
                                                        {obj?.[obj?.users[0]?._id] === 0 || obj?.[obj?.users[0]?._id] === undefined ? "" : <div className='position-absolute bg-success rounded-pill d-flex justify-content-center align-items-center top-0 end-0 text-white' style={{width:"18px",height:"18px",fontSize:"12px"}}> {obj?.[obj?.users[0]?._id]} </div>}
                                                        </div>
                                                        <div className='ms-2'>
                                                            <div>{obj?.users[0]?.profile?.full_name}</div>
                                                            <div style={{fontSize:"0.73em"}}>{obj?.lastMessage?.length > 10 ? obj?.lastMessage?.substring(0,10)+"..." : obj?.lastMessage}</div>
                                                        </div>
                                                    </div>
                                                    <div className='position-absolute' style={{top:"2px",right:"10px"}}>
                                                        {(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        chatList && chatList.length === 0 && <div className='user mb-2 p-2 d-flex justify-content-center position-relative border-20'>
                                        No Users Found!
                                    </div>
                                     }
                                </div>
                            </div>
                            <Conversation socket={socket} selected={chatSelected} refreshList={[changeList,setChangeList]}/>

                        </div>

                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Chat
