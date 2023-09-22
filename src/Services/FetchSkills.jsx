
import { errorAlert } from "./Toasts"
import api_call from "../axios"

export const fetchSkills = async () => {
    try{
        const {data} = await api_call.get(`/getAllUsersSkills`)
        if(data.error){
            errorAlert(data.error)
        }else{
            if(data.status){
                return data?.skills
            }
        }
        
    }catch(err){
        errorAlert(err)
    }
}