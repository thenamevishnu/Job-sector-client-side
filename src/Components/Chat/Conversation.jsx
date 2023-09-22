import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Landing from './Landing';
import SingleChat from './SingleChat';
import { getMessagesByChat, sendMessage, setUnreadMessage } from '../../Services/Chat';

function Conversation ({selected,refreshList,socket,goback}) {
    
    const {id} = useSelector(state => state.user)
    const [message, setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const containerRef = useRef(null)
    const [changeList,setChangeList] = refreshList
    const [dataLoaded,setDataLoaded] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isTyping,setIsTyping] = useState(false)
    const selectedChat = useRef(null)

    let timer = useRef(null)
    
    useEffect(()=>{
        dataLoaded && setTimeout(() => {
            setLoading(false)
        }, 2000);
    },[dataLoaded])
    
    useEffect(()=>{
        const getData = async () => {
            setMessages(await getMessagesByChat(selected?._id))
            setDataLoaded((prev) => !prev)
            socket?.emit("join_chat",selected?._id)
            selectedChat.current = selected
        }
        selected && getData()
    },[selected])

    useEffect(()=>{
        dataLoaded && message!== "" && socket.emit("typing",selectedChat.current?._id)
        timer.current = setTimeout(() => {
            socket.emit("stoptyping",selectedChat.current?._id)
        }, 2000)
        return()=>{
            clearTimeout(timer.current)
        }
    },[message])

    socket.on("typing",(room)=>setIsTyping(true))
    socket.on("stoptyping",(room)=>setIsTyping(false))
    
    const sendNow = async (e) => {
        if(e !== "click"){
            e.preventDefault()
        }
        if(message.trim().length === 0) return
            const messageData = {
                content: message,
                chat_id:selectedChat.current?._id,
                sender:id
            }
            const response = await sendMessage(messageData)
            socket?.emit("new_message",response)
            clearTimeout(timer.current)
            socket.emit("stoptyping",selectedChat.current?._id)
            setMessages([...messages,response])
            setMessage("")
            setChangeList(response)
    }

    useEffect(()=>{ 
        socket.on("receive_message",async (receivedData)=>{ 
            if(selectedChat.current?._id === receivedData.chat_id._id){ 
                setMessages((messages) => [...messages,receivedData])
            }else{
                await setUnreadMessage(receivedData.sender._id, receivedData.chat_id._id)
                //notification
            }
            setChangeList(receivedData)
        })
    },[socket])

    useEffect(()=>{
        socket.emit("setup",id)
    },[])

    useEffect(()=>{
        if(containerRef.current)
            containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    },[messages,loading])

    return (
        <>
            {!selected && <Landing/>}
            {selected && <SingleChat typeAction={[isTyping,setIsTyping]} selectedChat={selectedChat} socket={socket} goback={goback} messages={messages} id={id} sendNow={sendNow} message={message} setMessage={setMessage} selected={selected} containerRef={containerRef} loading={loading}/>}
        </>
    )
}

export default Conversation
