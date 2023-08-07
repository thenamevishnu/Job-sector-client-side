
import api_call from "../axios"
import { errorAlert, successAlert } from "./Toasts"

export const deleteLanguage = async (obj,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteLanguage:true,obj:obj,id:id})
        if(data.status){
            return data.languages
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteEducation = async (obj,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteEducation:true,obj:obj,id:id})
        if(data.status){
            return data.educations
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteSkill = async (value,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteSkill:true,value:value,id:id})
        if(data.status){
            return data.skills
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteProject = async (obj,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteProject:true,obj:obj,id:id})
        if(data.status){
            return data.projects
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteEmployment = async (obj,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteEmployment:true,obj:obj,id:id})
        if(data.status){
            return data.employments
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteCertificate = async (obj,id) => {
    try{
        const {data} = await api_call.post(`/changeProfileData`,{deleteCertificate:true,obj:obj,id:id})
        if(data.status){
            return data.certificates
        }
    }catch(err){
        errorAlert(err)
    }
}

export const changeAvailable = async (checkStatus,id) => {
    try{
        await api_call.post(`/changeProfileData`,{checkStatus:true,value:checkStatus,id:id})
    }catch(err){
        errorAlert(err.message)
    }
}

export const removeSaved = async (post_id,user_id,savedId) => {
    try{
        const {data} = await api_call.post(`/removeSaved/${user_id}/${post_id}`)
        savedId.splice(savedId.indexOf(post_id),1)
        return {postData:data.postData,savedId:savedId}
    }catch(err){
        errorAlert(err.message)
    }
}

export const addConnection = async (follower, to) => {
    try{
        const {data} = await api_call.post(`/addConnection`,{follower:follower,to:to})
        if(data.status){
            successAlert(data.message)
        }else{
            errorAlert(data.message)
        }
    }catch(err){
        errorAlert(err.message)
    }
}