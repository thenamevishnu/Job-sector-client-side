import axios from "axios"
import { errorAlert } from "./Toasts"

export const googleAuth = async (userObject) => {

    try{
        
        const userData = {}
        userData.email = userObject.email
        userData.password = process.env.react_app_googleAuthKey

        const {data} = await axios.post(process.env.react_app_server + "/login" ,{userData},{withCredentials:true})
    
        if(!data.status){
            errorAlert(data.message)
        }else{
            const obj = {}
            obj.data = data
            obj.message = data.message
            obj.response = {id:data.getUser._id,country:data.getUser.profile.country,type:data.getUser.profile.account_type,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image,audio:data.getUser.profile.audio}
            obj.status = true
            return obj
        }
    }catch(err){
        errorAlert(err.message)
    }
}