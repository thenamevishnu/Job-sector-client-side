import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessagesByChat, sendMessage } from '../../Api/Chat';
import io from "socket.io-client"

let socket = io(process.env.react_app_server)

function Conversation ({selected,refreshList}) {
    
    const {id} = useSelector(state => state.user)
    const [message, setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const containerRef = useRef(null)
    const [changeList,setChangeList] = refreshList

    const sendNow = async (e) => {
        e.preventDefault()
        if(message.trim().length === 0) return
            const messageData = {
                content: message,
                chat_id:selected?._id,
                sender:id
            }
            dataChange()
            const response = await sendMessage(messageData)
            socket?.emit("new_message",response)
            setMessages([...messages,response])
            setMessage("")
    }

    const dataChange = useCallback(() => {
        setChangeList(!changeList)
    },[setChangeList,changeList])
    
    useEffect(()=>{
        socket.on("receive_message",(receivedData)=>{
            dataChange()
            if(!selected || selected?._id !== receivedData.chat_id._id){  
                // if ('Notification' in window && Notification.permission === 'granted') {
                //     new Notification(`${receivedData?.sender?.profile?.full_name} -> ${name}`, {
                //       body: receivedData?.content,
                //       icon: 'path/to/notification-icon.png' 
                //     });
                //   }   
            }else{
                setMessages([...messages,receivedData])
            }
            
        })
    },[selected,dataChange,messages])

    useEffect(()=>{
        socket.emit("setup",id)
    },[id])
    
    useEffect(()=>{
        const getData = async () => {
            setMessages(await getMessagesByChat(selected?._id))
            socket?.emit("join_chat",selected?._id)
        }
        getData()
    },[selected, selected?._id])

    useEffect(()=>{
        if(containerRef?.current){
            containerRef?.current?.scrollTo(0, containerRef.current.scrollHeight);
        }
    },[messages])

    return (
            <div className='col-7 border-20 position-relative'>
                <div className='chat-head col-12 d-flex justify-content-between p-2'>
                    
                    <div className='d-flex align-items-center'>
                        <img className='profile-pic' src={`${process.env.react_app_cloud}/${selected?.users[0]?.profile?.image}`} alt='profile-pic' width="50px"></img>
                        <div className='ms-2'>
                            {selected?.users[0]?.profile?.full_name}<br></br>
                            <span className='text-success'>Online</span>
                        </div>
                    </div>

                    <div className='p-2'>
                        <i className='fa fa-video p-2'></i>
                    </div>

                </div>

                {selected && <div ref={containerRef} className='col-12 p-2 scroll-bar-hidden' style={{maxHeight:"67vh",overflowY:"scroll"}}>
                    {messages && messages?.map(obj => {
                        return(
                            <div key={obj?._id} className={obj?.sender?._id === id ? 'mb-3 d-flex justify-content-end' : 'mb-3 d-flex justify-content-start'}>
                                <span className='border-20 p-3 position-relative' style={{maxWidth:"25vw",wordBreak:"break-all"}}>
                                    <div>{obj?.content}</div>
                                    <span className='position-absolute' style={{fontSize:"9px",whiteSpace:"nowrap",right:"10px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>
                                </span>
                            </div>
                        )
                    })
                    
                    }
                </div>}

                <div className='container'>
                    <div className='col-10 mb-3'>
                        <form className='type-message'  onSubmit={sendNow}>
                            <input type='text' className='p-3 me-2 border-20' placeholder='Message...' style={{width:"100%"}} value={message} onChange={(event)=>setMessage(event.target.value)}/>
                            <i className='send-button fa fa-paper-plane p-3 border-20 text-success cursor-pointer' style={{zIndex:"1"}}></i>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default Conversation
