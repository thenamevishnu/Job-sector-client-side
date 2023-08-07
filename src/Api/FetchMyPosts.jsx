
import { errorAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const fetchMyPosts = async (id) => {
    try{
        const {data} = await api_call.get(`/getMyPost/${id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.posts
        }
    }catch(err){
        errorAlert(err)
    }
}

export const changePostStatus = async (id,user_id,status) => {
    try{
        const {data} = await api_call.post(`/changePostStatus/${id}/${user_id}/${!status}`)
        if(data.error)
            errorAlert(data.error) 
        else
            if(data.status)
                return data.postData
    }catch(err){
        errorAlert(err)
    }
}

export const deletePost = async (post_id,user_id) => {
    try{
        const {data} = await api_call.post(`/delete-post`,{post_id,user_id})
        if(data.error)
            errorAlert(data.error) 
        else
            if(data.status)
                return data.postData
    }catch(err){
        errorAlert(err)
    }
}
 
export const markAsCompletedPost = async (post_id , user_id, amount) => {
    try{
        const {data} = await api_call.post(`/completed-post`,{post_id,user_id,amount})
        if(data.error)
            errorAlert(data.error) 
        else
           return data
    }catch(err){
        errorAlert(err)
    }
}

export const getMyProposals = async (user_id) => {
    try{
        const {data} = await api_call.get(`/getMyProposals/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getMyJobs = async (user_id) => {
    try{
        const {data} = await api_call.get(`/getMyJobs/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
 }