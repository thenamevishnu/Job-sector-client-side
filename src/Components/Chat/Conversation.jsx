import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessagesByChat, sendMessage, setUnreadMessage } from '../../Api/Chat';
import Landing from './Landing';
import SingleChat from './SingleChat';

function Conversation ({selected,refreshList,socket,goback, unread}) {
    
    const {id} = useSelector(state => state.user)
    const [message, setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const containerRef = useRef(null)
    const [changeList,setChangeList] = refreshList
    const [unreading,setUnread] = unread
    
    useEffect(()=>{
        const getData = async () => {
            setMessages(await getMessagesByChat(selected?._id))
            socket?.emit("join_chat",selected?._id)
        }
        selected && getData()
    },[socket,selected?._id])
    
    const sendNow = async (e) => {
        if(e !== "click"){
            e.preventDefault()
        }
        if(message.trim().length === 0) return
            const messageData = {
                content: message,
                chat_id:selected?._id,
                sender:id
            }
            const response = await sendMessage(messageData)
            socket?.emit("new_message",response)
            setMessages([...messages,response])
            setMessage("")
            dataChange()
    }

    const dataChange = useCallback(async () => {
        setChangeList(!changeList)
    },[setChangeList,changeList])

    useEffect(()=>{ 
        socket.on("receive_message",async (receivedData)=>{
            if(selected?._id === receivedData.chat_id._id){ 
                setMessages([...messages,receivedData])
            }else{
                const unreads = await setUnreadMessage(receivedData.sender._id, receivedData.chat_id._id)
                console.log(unread);
                setUnread(unreads)
                //notification
            }
            dataChange()
        })
    },[socket,messages,dataChange,selected?._id])

    useEffect(()=>{
        socket.emit("setup",id)
    },[id,socket])

    useEffect(()=>{
        if(containerRef?.current)
            containerRef?.current?.scrollTo(0, containerRef.current.scrollHeight);
    },[messages])

    return (
        <>
            {!selected && <Landing/>}
            {selected && <SingleChat socket={socket} goback={goback} messages={messages} id={id} sendNow={sendNow} message={message} setMessage={setMessage} selected={selected} containerRef={containerRef}/>}
        </>
    )
}

export default Conversation
