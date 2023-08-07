import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../SocketContext'

function SingleChat({messages,id,sendNow,setMessage,message,selected,containerRef,socket,goback}) {
    
    const {image} = useSelector(state => state.user)
    // const [isTyping,setIsTyping] = useState(null)
    const navigate = useNavigate()
    const {setSocket} = useContext(SocketContext)
    const [showchat,setShowChat] = goback
    
    // useEffect(()=>{
    //     socket.emit("typing",selected?._id)
    // },[message,socket,selected?._id])

    // setTimeout(() => {
    //     socket.emit("stop typing",selected._id)
    // }, 4000);

    // socket.on("typing",()=>setIsTyping(true))
    // socket.on("stop typing",()=>setIsTyping(false))

    return (
        <div className='md:col-span-8 col-span-12 border-2 bg-chat-background mt-16'>
            <div className='bg-gray-200 h-14 flex justify-between'>
                
                <div className='flex items-center'>
                    <i className='fa fa-arrow-left cursor-pointer md:hidden block mx-2' onClick={()=>setShowChat({...showchat,list:!showchat.list,conv:!showchat.conv})}></i>
                    <img className=' rounded-full' src={`${process.env.react_app_cloud}/${selected?.users[0]?.profile?.image}`} alt='profile-pic' width="50px"></img>
                    <div className='ms-2'>
                        <div className='flex items-center'>{selected?.users[0]?.profile?.full_name} {selected?.users[0]?.profile?.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='profile'/>}</div>
                        <span className='text-green-800'>Online</span>
                    </div>
                </div>

                <div className='p-2'>
                    <i className='fa fa-video p-2 cursor-pointer' onClick={()=>{
                        setSocket({socket,room_id:selected._id})
                        navigate("/chats/video/"+selected?._id);
                    }}></i>
                </div>

            </div>

            {selected && <div ref={containerRef} className='overflow-x-hidden overflow-y-scroll h-120 hideScrollBar'>
                {messages && messages?.map(obj => {
                    return(
                        <div key={obj?._id} className={obj?.sender?._id === id ? 'mb-3 mt-2 flex justify-end mx-3' : 'mb-3 mt-2 flex justify-start mx-3'}>

                            {obj?.sender?._id === id && <span className='flex items-center me-1 whitespace-nowrap text-white' style={{fontSize:"9px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                            <span className='relative flex items-center bg-gray-300 rounded-xl'>
                            {obj?.sender?._id !== id && <img src={`${process.env.react_app_cloud}/${obj?.sender?.profile?.image}`} className='rounded-full w-8 md:me-1 me-0 sm:block hidden' alt='profile'></img>}<div className="lg:max-w-lg md:max-w-sm max-w-xs break-words px-2">{obj?.content}</div>{obj?.sender?._id === id && <img src={`${process.env.react_app_cloud}/${image}`} className='rounded-full w-8 md:ms-1 ms-0 sm:block hidden' alt='profile'></img>}
                            </span>
                            {obj?.sender?._id !== id && <span className='flex items-center ms-1 whitespace-nowrap text-white' style={{fontSize:"9px"}}>{(new Date(obj?.updatedAt)).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:true})}</span>}
                        </div>
                    )
                })
                
                }
            </div>}

                <div className='flex justify-center bottom-0 w-full'>
                    <form className='absolute bottom-0 md:w-8/12 w-full px-2' onSubmit={sendNow}>
                        <input type='text' className='p-2 border-2 border-gray-400 rounded-xl w-full outline-none' placeholder='Message...' value={message} onChange={(event)=>setMessage(event.target.value)}/>
                        <i className='fa fa-paper-plane p-2 rounded-se-xl rounded-ee-xl bg-white text-green-800 cursor-pointer absolute right-2 top-2' onClick={(e)=>sendNow("click")}></i>
                    </form>
                </div>
        </div>
    )
}

export default SingleChat
