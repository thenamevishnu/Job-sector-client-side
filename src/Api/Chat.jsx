import axios from "axios"
import { errorAlert } from "../Functions/Toasts"

export const createChat = async (client, freelancer, post_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/chats`,{client:client,freelancer:freelancer,post_id:post_id},{withCredentials:true})
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
    return data.message
}

export const getMessagesByChat = async (chat_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/chat/get-all-messages/${chat_id}`)
    return data.messages
}

export const setUnreadMessage = async (receiver,chat,setZero=false) => {
    const {data} = await axios.post(`${process.env.react_app_server}/chat/unreadMessage`,{chat,receiver,setZero})
    console.log(data);
    return data.unread
}

export const chatListSearch = async (id,regex) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getChatList/${id}`)
    const lists = data.list.map(obj => {
        return{
            ...obj,users: obj.users.filter(item => item._id !== id)
        }
    })
    const result = lists.filter((item) => regex.test(item?.users[0]?.profile?.full_name))
    return result
}