
import { errorAlert } from "./Toasts"
import api_call from "../axios"

export const fromChildResponse = async (data,id,{setData,updateData}) =>   {
    if(data.hoursPerWeek){
        try{
            if(data.hoursPerWeek !== ""){
                setData({hoursPerWeek:data.hoursPerWeek})
                await api_call.post("/changeProfileData",{id,hoursPerWeek:data.hoursPerWeek},{withCredentials:true})
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.language){
        try{
            if(data?.language?.lang && data?.language?.level){
                const response = await api_call.post("/changeProfileData",{id,language:data.language},{withCredentials:true})
                if(!response.data.status){
                    errorAlert(response.data.message)
                }else{
                    return {status:"language",language:response.data.languages}
                }
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.education){
        try{
            const response = await api_call.post("/changeProfileData",{id,education:data.education},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"education",educations:response.data.educations}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.bio){
        try{
            const response = await api_call.post("/changeProfileData",{id,bio:data.bio},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"bio",bio:response.data.bio}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.skill){
        try{
            const response = await api_call.post("/changeProfileData",{id,skill:data.skill},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"skill",skill:response.data.skills}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.project){
        try{
            const response = await api_call.post("/changeProfileData",{id,project:data.project},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"project",projects:response.data.projects}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.employment){
        try{
            const response = await api_call.post("/changeProfileData",{id,employment:data.employment},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"employment",employment:response.data.employments}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

    if(data.certificate){
        try{
            const response = await api_call.post("/changeProfileData",{id,certificate:data.certificate},{withCredentials:true})
            if(!response.data.status){
                errorAlert(response.data.message)
            }else{
                return {status:"certificate",certificate:response.data.certificates}
            }
        }catch(err){
            errorAlert(err.message)
        }
    }

}