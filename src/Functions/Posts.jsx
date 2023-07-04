import axios from "axios"
import { errorAlert, successAlert } from "./Toasts"

export const postNewJob = async (post,id) => {

    const regex = {
        title:/^([a-zA-Z])([a-zA-Z0-9\s]){4,79}$/gm,
    }

    const priceRange = post.priceRange?.split("-")

    if(post.title===""){
        errorAlert("Title is required!")
    }else if(!regex.title.test(post.title)){
        errorAlert("Only letters and numbers allowed in title")
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
    }else if(post.description.length < 10){
        errorAlert("Need atleast 10 characters!")
    }else if(post.skillsNeed?.length === 0){
        errorAlert("Select skills needed!")
    }else{
        const connectionsNeed = post.connectionsNeed?.split("-")
        const postData = {...post,priceRange:{
            from:parseFloat(priceRange[0]),to:parseFloat(priceRange[1])
        },connectionsNeed:{
            from:parseInt(connectionsNeed[0]),to:parseInt(connectionsNeed[1])
        }}
        postData.user_id = id
        const {data} = await axios.post(`${process.env.react_app_server}/post-job`,{postData},{withCredentials:true})
        if(data.status){
            return true
        }else{
            return false
        }
    }
}

export const addSkills = async (value,post) => {
    if(post.skillsNeed.includes(value)){
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

export const saveJob = async (post_id, user_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/saveJobs`,{post_id:post_id,user_id:user_id},{withCredentials:true})
    if(data.status){
        successAlert(data.message)
    }else{
        errorAlert(data.message)
    }
}

export const sendProposal = async (post_id, user_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/sendProposal`,{post_id:post_id,user_id:user_id},{withCredentials:true})
    if(data.status){
        successAlert(data.message)
    }else{
        errorAlert(data.message)
    }
    return data.response
}


// export const timeFormat = (timeStamp) => {
//     const time = new Date(timeStamp)
//     const year = time.getFullYear()
//     const month = time.getMonth() + 1 < 10 ? "0"+(time.getMonth() + 1) : time.getMonth() + 1
//     const day = time.getDate() < 10 ? "0"+time.getDate() : time.getDate()
//     const hour = time.getHours() < 10 ? "0"+time.getHours()  : time.getHours() 
//     const minute = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()
//     const second = time.getSeconds() < 10 ? "0"+time.getSeconds() : time.getSeconds()
//     return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
// }