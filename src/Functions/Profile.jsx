import axios from "axios"

export const deleteLanguage = async (obj,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteLanguage:true,obj:obj,id:id})
    if(data.status){
        return data.languages
    }
}

export const deleteEducation = async (obj,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteEducation:true,obj:obj,id:id})
    if(data.status){
        return data.educations
    }
}

export const deleteSkill = async (value,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteSkill:true,value:value,id:id})
    if(data.status){
        return data.skills
    }
}

export const deleteProject = async (obj,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteProject:true,obj:obj,id:id})
    if(data.status){
        return data.projects
    }
}

export const deleteEmployment = async (obj,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteEmployment:true,obj:obj,id:id})
    if(data.status){
        return data.employments
    }
}

export const deleteCertificate = async (obj,id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changeProfileData`,{deleteCertificate:true,obj:obj,id:id})
    if(data.status){
        return data.certificates
    }
}