
import { errorAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const latestPost = async () => {
    try{
        const {data} = await api_call.get(`/getLatest`)
        if(data.error)
            errorAlert(data.error)
        else
            return data.postData
    }catch(err){
        errorAlert(err)
    }
}

export const fetchSinglePost = async (id) => {
    try{
        const {data} = await api_call.get(`/get-single-post/${id}`)
        if(data.error)
            errorAlert(data.error)
        else
            return data?.postData[0]
    }catch(err){
        errorAlert(err)
    }
}

export const getSinglePosts = async (post_id) => {
    try{
        const {data} = await api_call.get("/client-post-view/"+post_id)
        if(data.error)
            errorAlert(data.error)
        else
            return data
    }catch(err){
        errorAlert(err)
    }
}

export const getSearchPosts = async (search, filterData) => {
    try{
        const {data} = await api_call.post(`/search`,{search, filterData})
        if(data.error)
            errorAlert(data.error)
        else
            return data.response
    }catch(err){
        errorAlert(err)
    }
}