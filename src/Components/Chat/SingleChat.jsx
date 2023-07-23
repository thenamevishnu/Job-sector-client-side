import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function SingleChat({messages,id,sendNow,setMessage,message,selected,containerRef,socket}) {
    
    const {image} = useSelector(state => state.user)
    const [isTyping,setIsTyping] = useState(null)

    useEffect(()=>{
        socket.emit("typing",selected?._id)
    },[message,socket,selected?._id])

    setTimeout(() => {
        socket.emit("stop typing",selected._id)
    }, 4000);

    socket.on("typing",()=>setIsTyping(true))
    socket.on("stop typing",()=>setIsTyping(false))

    return (
        <div className='col-span-8 border-2 relative bg-chat-background mt-16'>
            <div className='bg-gray-200 h-14 flex justify-between'>
                
                <div className='flex items-center'>
                    <img className=' rounded-full' src={`${process.env.react_app_cloud}/${selected?.users[0]?.profile?.image}`} alt='profile-pic' width="50px"></img>
                    <div className='ms-2'>
                        <div className='flex items-center'>{selected?.users[0]?.profile?.full_name} {selected?.users[0]?.profile?.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='profile'/>}</div>
                        <span className='text-green-800'>{isTyping ? "Typing..." : "Online"}</span>
                    </div>
                </div>

                <div className='p-2'>
                    <i className='fa fa-video p-2'></i>
                </div>

            </div>

            {selected && <div ref={containerRef} className='overflow-x-hidden overflow-y-scroll h-120 hideScrollBar'>
                {messages && messages?.map(obj => {
                    return(
                        <div key={obj?._id} className={obj?.sender?._id === id ? 'mb-3 flex justify-end mx-3' : 'mb-3 flex justify-start mx-3'}>
                            {obj?.sender?._id !== id && <img src={`${process.env.react_app_cloud}/${obj?.sender?.profile?.image}`} className='rounded-full me-1' alt='profile' width="40px" height="40px"></img>}
                            {obj?.sender?._id === id && <span className='flex items-center me-1 whitespace-nowrap' style={{fontSize:"9px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                            <span className='relative flex items-center px-2 bg-gray-300 rounded-xl'>
                                <div className=''>{obj?.content}</div>
                            </span>
                            {obj?.sender?._id !== id && <span className='flex items-center ms-1 whitespace-nowrap' style={{fontSize:"9px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                            {obj?.sender?._id === id && <img src={`${process.env.react_app_cloud}/${image}`} className='rounded-full ms-1' alt='profile' width="40px" height="40px"></img>}
                        </div>
                    )
                })
                
                }
            </div>}

                <div className='fixed bottom-0 w-8/12'>
                    <form className='flex justify-center' onSubmit={sendNow}>
                        <input type='text' className='p-2 border-2 border-gray-400 rounded-xl w-full outline-none' placeholder='Message...' value={message} onChange={(event)=>setMessage(event.target.value)}/>
                        <i className='fa fa-paper-plane p-2 rounded-se-xl rounded-ee-xl bg-white text-green-800 cursor-pointer absolute right-0 top-1' onClick={(e)=>sendNow("click")}></i>
                    </form>
                </div>
        </div>
    )
}

export default SingleChat
