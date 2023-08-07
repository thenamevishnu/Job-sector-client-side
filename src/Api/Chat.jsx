
import { errorAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const createChat = async (client, freelancer, post_id) => {
    try{
        const {data} = await api_call.post(`/chats`,{client:client,freelancer:freelancer,post_id:post_id},{withCredentials:true})
        if(data.status){
            return true
        }else{
            if(data.error){
                errorAlert(data.error)
                return false
            }else{
                errorAlert(data.message)
                return false
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getAllChatList = async (user_id) => {
    try{
        const {data} = await api_call.get(`/getChatList/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.list
        }
    }catch(err){
        errorAlert(err)
    }
}

export const sendMessage = async (messageData) => {
    try{
        const {data} = await api_call.post(`/chat/send-message`,{messageData})
        return data.message
    }catch(err){
        errorAlert(err)
    }
}

export const getMessagesByChat = async (chat_id) => {
    try{
        const {data} = await api_call.get(`/chat/get-all-messages/${chat_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.messages
        }
    }catch(err){
        errorAlert(err)
    }
}

export const setUnreadMessage = async (receiver,chat,setZero=false) => {
    try{
        const {data} = await api_call.post(`/chat/unreadMessage`,{chat,receiver,setZero})
        return data.unread
    }catch(err){
        errorAlert(err)
    }
}

export const chatListSearch = async (id,regex) => {
    try{
        const {data} = await api_call.get(`/getChatList/${id}`)
        const lists = data.list.map(obj => {
            return{
                ...obj,users: obj.users.filter(item => item._id !== id)
            }
        })
        const result = lists.filter((item) => regex.test(item?.users[0]?.profile?.full_name))
        return result
    }catch(err){
        errorAlert(err)
    }
}