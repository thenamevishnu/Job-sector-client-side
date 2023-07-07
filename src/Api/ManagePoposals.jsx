import axios from "axios"
import { errorAlert, successAlert } from "../Functions/Toasts"

export const rejectPropsal = async (post_id,user_id) => {
    const {data} = await axios.post(process.env.react_app_server + "/reject-proposals",{post_id:post_id,user_id:user_id},{withCredentials:true})
    if(!data.status){
        errorAlert(data.message)
    }else{
        successAlert(data.message)
    }
    return data.userData
}

export const acceptProposal = async (post_id,user_id) => {
    const {data} = await axios.post(process.env.react_app_server + "/accept-proposals",{post_id:post_id,user_id:user_id},{withCredentials:true})
    if(data.status){
        successAlert(data.message)
    }else{
        errorAlert(data.message)
    }
    return data.userData
}