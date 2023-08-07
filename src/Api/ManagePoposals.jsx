
import { errorAlert, successAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const rejectPropsal = async (post_id,user_id) => {
    try{
        const {data} = await api_call.post("/reject-proposals",{post_id:post_id,user_id:user_id},{withCredentials:true})
        if(!data.status){
            errorAlert(data.message)
        }else{
            successAlert(data.message)
        }
        return data.userData
    }catch(err){
        errorAlert(err)
    }
}

export const acceptProposal = async (post_id,user_id) => {
    try{
        const {data} = await api_call.post("/accept-proposals",{post_id:post_id,user_id:user_id},{withCredentials:true})
        if(data.status){
            successAlert(data.message)
        }else{
            errorAlert(data.message)
        }
        return data
    }catch(err){
        errorAlert(err)
    }
}