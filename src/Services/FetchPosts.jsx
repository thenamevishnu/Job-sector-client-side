
import { errorAlert, successAlert, warnAlert } from "./Toasts"
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

export const postNewJob = async (post,id) => {

    try{
        const regex = {
            title:/^([\w])+/gm,
            discription:/^([\w])+/gm
        }

        const priceRange = post.priceRange?.split("-")

        if(post.title===""){
            errorAlert("Title is required!")
        }else if(!regex.title.test(post.title)){
            errorAlert("Only words are allowed in title")
        }else if(post.experience === ""){
            errorAlert("Select experience level")
        }else if(post.jobType === ""){
            errorAlert("Select Job Type!")
        }else if(post.priceRange===""){
            errorAlert("Price Range is required!")
        }else if(isNaN(priceRange[0]) || isNaN(priceRange[1])){
            errorAlert("Invalid! Eg: 100-150")
        }else if(post.connectionsNeed === ""){
            errorAlert("Select connections needed!")
        }else if(post.description === ""){
            errorAlert("Description is required!")
        }else if(!regex.discription.test(post.description)){
            errorAlert("Only words are allowed in description!")
        }else if(post.skillsNeed?.length === 0){
            errorAlert("Select skills needed!")
        }else{
            const connectionsNeed = post.connectionsNeed?.split("-")
            const postData = {...post,
                priceRangefrom:parseFloat(priceRange[0]),
                priceRangeto:parseFloat(priceRange[1]),
                connectionsNeedfrom:parseInt(connectionsNeed[0]),
                connectionsNeedto:parseInt(connectionsNeed[1])
            }
            postData.user_id = id
            const {data} =await api_call.post(`/post-job`,{postData},{withCredentials:true})
            if(data.status){
                successAlert("New Job Created!")
                return true
            }else{
                errorAlert("Error happend!")
                return false
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const updateMyPost = async (post, id, post_id) => {
    try{
        const regex = {
            title:/^([\w])+/gm,
            discription:/^([\w])+/gm
        }

        const priceRange = post.priceRange?.split("-")

        if(post.title===""){
            errorAlert("Title is required!")
        }else if(!regex.title.test(post.title)){
            errorAlert("Only words are allowed in title")
        }else if(post.experience === ""){
            errorAlert("Select experience level")
        }else if(post.jobType === ""){
            errorAlert("Select Job Type!")
        }else if(post.priceRange===""){
            errorAlert("Price Range is required!")
        }else if(isNaN(priceRange[0]) || isNaN(priceRange[1])){
            errorAlert("Invalid! Eg: 100-150")
        }else if(post.connectionsNeed === ""){
            errorAlert("Select connections needed!")
        }else if(post.description === ""){
            errorAlert("Description is required!")
        }else if(!regex.discription.test(post.description)){
            errorAlert("Only words are allowed in description!")
        }else if(post.skillsNeed?.length === 0){
            errorAlert("Select skills needed!")
        }else{
            const connectionsNeed = post.connectionsNeed?.split("-")
            const postData = {...post,
                priceRangefrom:parseFloat(priceRange[0]),
                priceRangeto:parseFloat(priceRange[1]),
                connectionsNeedfrom:parseInt(connectionsNeed[0]),
                connectionsNeedto:parseInt(connectionsNeed[1])
            }
            postData.user_id = id
            postData.post_id = post_id
            const {data} =await api_call.post(`/update-job`,{postData},{withCredentials:true})
            if(data.status){
                successAlert("Job Updated!")
                return true
            }else{
                errorAlert("Error happend!")
                return false
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const addSkills = async (value,post) => {
    try{
        const checkArray = post?.skillsNeed?.map(item => item.toLowerCase())
        if(checkArray.includes(value.toLowerCase())){
            errorAlert("Skill already selected!")
        }else{
            if(value!=="0"){
                post.skillsNeed.push(value)
            }
        }
        return post.skillsNeed
    }catch(err){
        errorAlert(err)
    }
}

export const removeSkills = async (value,post) => {
    try{
        const findIndex = post.skillsNeed.find(item => item === value)
        if(findIndex){
            post.skillsNeed.splice(post.skillsNeed.indexOf(findIndex),1)
        }
        return post.skillsNeed
    }catch(err){
        errorAlert(err)
    }
}

export const saveJob = async (post_id, user_id, userData) => {
    try{
        const {data} =await api_call.post(`/saveJobs`,{post_id:post_id,user_id:user_id},{withCredentials:true})
        if(data.status){
            successAlert(data.message)
        }else{
            errorAlert(data.message)
        }
        return data.total
    }catch(err){
        errorAlert(err)
    }
}

export const sendProposal = async (post_id, user_id) => {
    try{
        const {data} =await api_call.post(`/sendProposal`,{post_id:post_id,user_id:user_id},{withCredentials:true})
        if(data.status){
            successAlert(data.message)
        }else{
            if(data.warn){
                warnAlert(data.message)
            }else{
                errorAlert(data.message)
            }
        }
        return data.response
    }catch(err){
        errorAlert(err)
    }
}

export const isSaved = (obj,id) => {
    try{
        const response = obj.find(item => item === id)
        return response
    }catch(err){
        errorAlert(err)
    }
}