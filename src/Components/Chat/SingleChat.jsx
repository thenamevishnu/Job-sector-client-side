import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function SingleChat({messages,id,sendNow,setMessage,message,selected,containerRef,socket}) {
    
    const {image} = useSelector(state => state.user)
    const [isTyping,setIsTyping] = useState(null)

    useEffect(()=>{
        socket.emit("typing",selected?._id)
    },[message,socket])

    setTimeout(() => {
        socket.emit("stop typing",selected._id)
    }, 4000);

    socket.on("typing",()=>setIsTyping(true))
    socket.on("stop typing",()=>setIsTyping(false))

    return (
        <div className='col-7 col-lg-8 border-20 position-relative'>
            <div className='chat-head col-12 d-flex justify-content-between p-2'>
                
                <div className='d-flex align-items-center'>
                    <i className='fa fa-circle-arrow-left me-2 fw-600 color-gray cursor-pointer back-icon'></i><img className='profile-pic' src={`${process.env.react_app_cloud}/${selected?.users[0]?.profile?.image}`} alt='profile-pic' width="50px"></img>
                    <div className='ms-2'>
                        {selected?.users[0]?.profile?.full_name}<br></br>
                        <span className='text-success'>{isTyping ? "Typing..." : "Online"}</span>
                    </div>
                </div>

                <div className='p-2'>
                    <i className='fa fa-video p-2'></i>
                </div>

            </div>

            {selected && <div ref={containerRef} className='messages col-12 p-2 scroll-bar-hidden'>
                {messages && messages?.map(obj => {
                    return(
                        <div key={obj?._id} className={obj?.sender?._id === id ? 'mb-3 d-flex justify-content-end' : 'mb-3 d-flex justify-content-start'}>
                            {obj?.sender?._id !== id && <img src={`${process.env.react_app_cloud}/${obj?.sender?.profile?.image}`} className='rounded-pill me-1' alt='profile' width="40px" height="40px"></img>}
                            {obj?.sender?._id === id && <span className='d-flex align-items-center me-1' style={{fontSize:"9px",whiteSpace:"nowrap"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                            <span className='position-relative message-box d-flex align-items-center px-2'>
                                <div className=''>{obj?.content}</div>
                            </span>
                            {obj?.sender?._id !== id && <span className='d-flex align-items-center ms-1' style={{fontSize:"9px",whiteSpace:"nowrap"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                            {obj?.sender?._id === id && <img src={`${process.env.react_app_cloud}/${image}`} className='rounded-pill ms-1' alt='profile' width="40px" height="40px"></img>}
                        </div>
                    )
                })
                
                }
            </div>}

            <div className='container'>
                <div className='col-10 mb-3'>
                    <form className='type-message'  onSubmit={sendNow}>
                        <input type='text' className='p-3 me-2 border-20' placeholder='Message...' style={{width:"100%"}} value={message} onChange={(event)=>setMessage(event.target.value)}/>
                        <i className='send-button fa fa-paper-plane p-3 border-20 text-success cursor-pointer' style={{zIndex:"1"}} onClick={(e)=>sendNow("click")}></i>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SingleChat
