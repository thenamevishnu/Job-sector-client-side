import React from 'react'
import Chat from '../../Components/Chat/Chat'
import Header from "../../Components/Users/Header/Header"

function ChatPage() {
  return (
    <div>
        <Header icons={true}/>
        <Chat />
    </div>
  )
}

export default ChatPage
