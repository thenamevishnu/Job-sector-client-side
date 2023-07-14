import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useSelector } from 'react-redux'
import { getAllChatList } from '../../Api/Chat'
import Conversation from './Conversation'

function Chat() {
    
    const {id} = useSelector(state => state.user)

    
    const [chatList,setChatList] = useState([])
    const [chatSelected,selectedChat] = useState(null)

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
    },[id])

    return (
        <div className='chat-app'>
            <div className='container'>
                <div className='row offset-1'>
                    <div className='col-12'>
                       
                        <div className='row gap-2'>

                            <div className='col-4 left border-20 p-2'>
                                <div className='col-12 p-2 search'>
                                    <input type='text' />
                                </div>
                                <div className='users mt-3 p-2'>
                                    {
                                        chatList && chatList.map(obj => {
                                            return (
                                                <div className='user mb-2 p-2 d-flex justify-content-between position-relative border-20' key={obj._id} onClick={()=>selectedChat(obj)}>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <img src={`${process.env.react_app_cloud}/${obj?.users[0]?.profile?.image}`} alt='pic of opponent' width="50px" className='rounded-pill'/>
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
                                </div>
                            </div>

                           <Conversation selected={chatSelected}/>

                        </div>

                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Chat
