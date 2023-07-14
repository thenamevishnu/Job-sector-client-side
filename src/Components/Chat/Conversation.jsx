import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessagesByChat, sendMessage } from '../../Api/Chat';

function Conversation({selected}) {
    
    const {id} = useSelector(state => state.user)
    const [message, setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const containerRef = useRef(null)

    const sendNow = async () => {
        if(message.trim().length === 0) return
            const messageData = {
                content: message,
                chat_id:selected?._id,
                sender:id
              }
              await sendMessage(messageData)
              setMessage("")
        }
    
    useEffect(()=>{
        const getData = async () => {
            setMessages(await getMessagesByChat(selected?._id))
        }
        selected && getData()
    },[selected, selected?._id])

    useEffect(()=>{
        if(containerRef?.current){
            containerRef?.current?.scrollTo(0, containerRef.current.scrollHeight);
        }
    },[messages])

    return (
            <div className='col-7 border-20 position-relative'>
                {selected && <div className='chat-head col-12 d-flex justify-content-between p-2'>
                    
                    <div className='d-flex align-items-center'>
                        <img className='profile-pic' src={process.env.react_app_cloud + "/job/default/avatar.png"} alt='profile-pic' width="50px"></img>
                        <div className='ms-2'>
                            {selected?.users[0]?.profile?.full_name}<br></br>
                            <span className='text-success'>Online</span>
                        </div>
                    </div>

                    <div className='p-2'>
                        <i className='fa fa-video p-2'></i>
                    </div>

                </div>}

                {selected && <div ref={containerRef} className='col-12 p-2 scroll-bar-hidden' style={{maxHeight:"67vh",overflowY:"scroll"}}>
                    {messages && messages?.map(obj => {
                        return(
                            <div key={obj?._id} className={obj?.sender?._id === id ? 'mb-3 d-flex justify-content-end' : 'mb-3 d-flex justify-content-start'}>
                                <span className='border-20 p-3 position-relative'>
                                    <div>{obj?.content}</div>
                                    <span className='position-absolute' style={{fontSize:"9px",whiteSpace:"nowrap",right:"10px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>
                                </span>
                            </div>
                        )
                    })
                    
                    }
                </div>}

                {!selected && <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                        Select any chat to continue!
                </div>}

                {selected && <div className='container'>
                    <div className='col-10 mb-3'>
                        <div className='type-message'>
                            <input type='text' className='p-3 me-2 border-20' placeholder='Message...' style={{width:"100%"}} value={message} onChange={(event)=>setMessage(event.target.value)}/>
                            <i className='send-button fa fa-paper-plane p-3 border-20 text-success cursor-pointer' style={{zIndex:"1"}} onClick={()=>sendNow()}></i>
                        </div>
                    </div>
                </div>}
            </div>
    )
}

export default Conversation
