import React, { useEffect, useState } from 'react'
import "./Chat.css"
import io from "socket.io-client"
import { useSelector } from 'react-redux'

function Chat() {

    const room = "job"
    const {name,id} = useSelector(state => state.user)

    const socket = io.connect(process.env.react_app_server)

    socket.emit("join_room",room)

    const [message, setMessage] = useState("")

    const sendMessage = async () => {
        const messageData = {
            room: room,
            user_id:id,
            author: name,
            message: message,
            time: new Date().getHours() + ':' + new Date().getMinutes()
          };
          await socket.emit('sendMessage', messageData);
    }

    useEffect(()=>{
        socket.on("receivedMessage",(data)=>{
            console.log(data);
        })
    },[socket])

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
                                <div className='users'>
                                    
                                </div>
                            </div>

                            <div className='col-7 border-20 position-relative'>
                                <div className='chat-head col-12 d-flex justify-content-between p-2'>
                                    
                                    <div className='d-flex align-items-center'>
                                        <img className='profile-pic' src={process.env.react_app_cloud + "/job/default/avatar.png"} alt='profile-pic' width="50px"></img>
                                        <div className='ms-2'>
                                            Vishnu MK<br></br>
                                            <span className='text-success'>Online</span>
                                        </div>
                                    </div>

                                    <div className='p-2'>
                                        <i className='fa fa-video p-2'></i>
                                    </div>

                                </div>

                                <div className='col-12 p-2'>
                                        <div className='border-20 p-3 w-25'>
                                            fghsdfghsfgh
                                        </div>
                                        <div className='border-20 p-3'>
                                            fgjldfkglhkjfdgklj
                                        </div>
                                        <div className='border-20 p-3'>
                                            fgjldfkglhkjfdgklj
                                        </div>
                                </div>

                                <div className='container'>
                                    <div className='col-10 mb-3'>
                                        <div className='type-message'>
                                            <input type='text' className='p-2 me-2 border-20' placeholder='Message...' style={{width:"100%"}} value={message} onChange={(event)=>setMessage(event.target.value)}/>
                                            <i className='send-button fa fa-paper-plane p-2 border-20 text-success cursor-pointer' style={{zIndex:"1"}} onClick={sendMessage}></i>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Chat
