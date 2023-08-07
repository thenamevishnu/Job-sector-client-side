
import api_call from "../axios"
import { errorAlert, successAlert } from "./Toasts"

export const sendForgotLink = async (email) => {
    try{
        const email_reg = /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm
        if(!email_reg.test(email)){
            errorAlert("Invalid email format")
        }else{
            const {data} = await api_call.get(`/getUserDataByEmail/${email}`)
            if(data.error){
                errorAlert(data.error)
            }else{
                if(!data.status){
                    errorAlert(data.message)
                }else{
                    const obj = {}
                    obj.key = data.key
                    obj.email = email
                    localStorage.setItem("resetKey",JSON.stringify(obj))
                    successAlert(data.message)
                }
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const resetPassword = async (password) => {
    try{
        if(password.newPassword===""){
            errorAlert("New Password is required!")
        }else if(!(/(?=.*?[a-z])/).test(password.newPassword)){
            errorAlert("Password should contain lower case!")
        }else if(!(/(?=.*?[A-Z])/).test(password.newPassword)){
            errorAlert("Password should contain upper case!")
        }else if(!(/(?=.*?[0-9])/).test(password.newPassword)){
            errorAlert("Password should contain digits!")
        }else if(!(/(?=.*?[\W])/).test(password.newPassword)){
            errorAlert("Password should contain Special characters!")
        }else if(password.newPassword?.length > 16 ||password.newPassword?.length < 8){
            errorAlert("Password should be 8-16!")
        }else if(password.confirmPassword !== password.newPassword){
            errorAlert("Password does not match")
        }else{
            const response = JSON.parse(localStorage.getItem("resetKey"))
            const {data} = await api_call.post(`/resetPassword/${response.email}`,{newPassword:password.newPassword},{withCredentials:true})
            if(data.error){
                errorAlert(data.error)
            }else{
                if(data.status){
                    successAlert(data.message)
                    return true
                }else{
                    errorAlert(data.message)
                }
            }
            
        }
    }catch(err){
        errorAlert(err)
    }
}