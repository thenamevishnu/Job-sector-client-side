import axios from "axios"
import { errorAlert, successAlert, warnAlert } from "./Toasts"

export const postNewJob = async (post,id) => {

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
        const {data} = await axios.post(`${process.env.react_app_server}/post-job`,{postData},{withCredentials:true})
        if(data.status){
            successAlert("New Job Created!")
            return true
        }else{
            errorAlert("Error happend!")
            return false
        }
    }
}

export const updateMyPost = async (post, id, post_id) => {
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
        const {data} = await axios.post(`${process.env.react_app_server}/update-job`,{postData},{withCredentials:true})
        if(data.status){
            successAlert("Job Updated!")
            return true
        }else{
            errorAlert("Error happend!")
            return false
        }
    }
}

export const addSkills = async (value,post) => {
    const checkArray = post?.skillsNeed?.map(item => item.toLowerCase())
    if(checkArray.includes(value.toLowerCase())){
        errorAlert("Skill already selected!")
    }else{
        if(value!=="0"){
            post.skillsNeed.push(value)
        }
    }
    return post.skillsNeed
}

export const removeSkills = async (value,post) => {
    const findIndex = post.skillsNeed.find(item => item === value)
    if(findIndex){
        post.skillsNeed.splice(post.skillsNeed.indexOf(findIndex),1)
    }
    return post.skillsNeed
}

export const saveJob = async (post_id, user_id, userData) => {
    const {data} = await axios.post(`${process.env.react_app_server}/saveJobs`,{post_id:post_id,user_id:user_id},{withCredentials:true})
    if(data.status){
        successAlert(data.message)
    }else{
        errorAlert(data.message)
    }
    return data.total
}

export const sendProposal = async (post_id, user_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/sendProposal`,{post_id:post_id,user_id:user_id},{withCredentials:true})
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
}

export const isSaved = (obj,id) => {
    const response = obj.find(item => item === id)
    return response
}