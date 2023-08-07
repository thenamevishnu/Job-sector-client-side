
import { errorAlert, successAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const getAllUsers = async () => {
    try{
        const {data} = await api_call.get(`/admin/getAllUsers`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        } 
    }catch(err){
        errorAlert(err)
    }
}

export const updateBanStatus = async (items) => {
    try{
        const {data} = await api_call.post(`/admin/updateBanStatus`,items)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const updateTickStatus = async (items) => {
    try{
        const {data} = await api_call.post(`/admin/updateTickStatus`,items)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const fetchSearchData = async (key) => {
    try{
        const {data} = await api_call.get(`/admin/fetchSearchData/${key}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const fetchSearchPostData = async (key) => {
    try{
        const {data} = await api_call.get(`/admin/fetchSearchPostData/${key}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getAllPosts = async () => {
    try{
        const {data} = await api_call.get(`/admin/getAllPost`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getAdminData = async (user_id) => {
    try{
        const {data} = await api_call.get(`/admin/getAdminData/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
}

export const payoutManageAdmin = async (items, type, admin_id) => {
    try{
        const {data} = await api_call.post(`/admin/payoutManageAdmin/`,{items,type,admin_id})
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.response
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getDashboard = async (id) => {
    try{
        const {data} = await api_call.get(`/admin/getDashboard/${id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
}

export const sendNotification = async (type, message) => {
    try{
        const {data} = await api_call.post(`/admin/sendNotification`,{type, message})
        if(data.error){
            errorAlert(data.error)
            return false
        }else{
            successAlert("sending...")
            return true
        }
    }catch(err){
        errorAlert(err)
    }
}