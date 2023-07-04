import axios from "axios"
import { errorAlert, successAlert } from "./Toasts"

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
            localStorage.setItem("userStorage",JSON.stringify(data))
            obj.response = {id:data.getUser._id,type:data.getUser.profile.account_type,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image,audio:data.getUser.profile.audio}
            obj.status = true
            successAlert(data.message)
            return obj
        }
    }catch(err){
        errorAlert(err.message)
    }
}