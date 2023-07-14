import axios from "axios"
import { errorAlert } from "../Functions/Toasts"

export const createChat = async (client, freelancer) => {
    const {data} = await axios.post(`${process.env.react_app_server}/chats`,{client:client,freelancer:freelancer},{withCredentials:true})
    if(data.status){
        return true
    }else{
        errorAlert(data.message)
        return false
    }
}

export const getAllChatList = async (user_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getChatList/${user_id}`)
    return data.list
}

export const sendMessage = async (messageData) => {
    const {data} = await axios.post(`${process.env.react_app_server}/chat/send-message`,{messageData})
}

export const getMessagesByChat = async (chat_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/chat/get-all-messages/${chat_id}`)
    return data.messages
}