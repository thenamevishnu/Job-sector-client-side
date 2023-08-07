
import { errorAlert, successAlert } from "../Functions/Toasts"
import api_call from "../axios"

export const getUserData = async (id) => {
    try{
        const {data} = await api_call.post("/getUserData",{id},{withCredentials:true})
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
}

export const AddPaymentMethods = async (data,id) => {
    try{
        const body = {
            method:data?.addPayment?.addMethod,
            to:data?.addPayment?.to,
            user_id:id
        }
        const response = await api_call.post(`/addPaymentMethod`,body)
        if(response.data.error){
            errorAlert(response.data.error)
        }else{
            if(response.data.status){
                return true
            }else{
                return false
            }
        }
        
    }catch(err){
        errorAlert(err)
    }
}

export const changeSearchResults = async (prefix) => {
    try{
        if(prefix.length > 0){
            const {data} = await api_call.get(`/getSearchResult/${prefix}`)
            if(data.error){
                errorAlert(data.error)
            }else{
                return data.response
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const changeNotifications = async (id, obj) => {
    try{
        const {data} = await api_call.post(`/postNotification`,{id:id,obj:obj})
        if(data.error){
            errorAlert(data.error)
        }
    }catch(err){
        errorAlert(err)
    }
}

export const deleteAccount = async (id, email, password) => {
    try{
        if(password.trim() === ""){
            errorAlert("Paasword is empty!")
            return false
        }
        const {data} = await api_call.post(`/deleteAccount`,{id:id,email:email,password:password})
        if(data.error){
            errorAlert(data.error)
        }else{
            if(!data.status){
                errorAlert(data.message)
                return false
            }else{
                successAlert(data.message)
                localStorage.clear()
                return true
            }
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getUserReports = async (user_id) => {
    try{
        const {data} = await api_call.get(`/getUserReports/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.reports
        }
    }catch(err){
        errorAlert(err)
    }
}

export const getClientReport = async (user_id) => {
    try{
        const {data} = await api_call.get(`/getClientReport/${user_id}`)
        if(data.error){
            errorAlert(data.error)
        }else{
            return data.reports
        }
    }catch(err){
        errorAlert(err)
    }
}

export const changeTwoStep = async (id , status) => {
    try{
        const {data} = await api_call.post(`/changeTwoStep`,{id,status})
        if(data.error){
            errorAlert(data.error)
        }
    }catch(err){
        errorAlert(err)
    }
}

export const withdrawSuccess = async (id,to) => {
    try{
        const {data} = await api_call.post(`/withdraw`,{id,to})
        if(data.error){
            errorAlert(data.error)
        }else{
            return data
        }
    }catch(err){
        errorAlert(err)
    }
}

export const handleChangePassword = async (user_id, password) => {
    try{
        if(password.oldPassword===""){
            errorAlert("Current Password is required")
        }else if(!(/(?=.*?[a-z])/).test(password.oldPassword)){
            errorAlert("Password should contain lower case!")
        }else if(!(/(?=.*?[A-Z])/).test(password.oldPassword)){
        errorAlert("Password should contain upper case!")
        }else if(!(/(?=.*?[0-9])/).test(password.oldPassword)){
        errorAlert("Password should contain digits!")
        }else if(!(/(?=.*?[\W])/).test(password.oldPassword)){
        errorAlert("Password should contain Special characters!")
        }else if(password?.oldPassword?.length > 16 || password?.oldPassword?.length < 8){
        errorAlert("Password should be 8-16!")
        }else if(password.newPassword===""){
            errorAlert("New Password is required")
        }else if(!(/(?=.*?[a-z])/).test(password.newPassword)){
            errorAlert("New Password should contain lower case!")
        }else if(!(/(?=.*?[A-Z])/).test(password.newPassword)){
        errorAlert("New Password should contain upper case!")
        }else if(!(/(?=.*?[0-9])/).test(password.newPassword)){
        errorAlert("New Password should contain digits!")
        }else if(!(/(?=.*?[\W])/).test(password.newPassword)){
        errorAlert("New Password should contain Special characters!")
        }else if(password?.newPassword?.length > 16 || password?.newPassword?.length < 8){
        errorAlert("New Password should be 8-16!")
        }else if(password.confirmPassword===""){
            errorAlert("Confirm Password is required")
        }else if(password.newPassword !== password.confirmPassword){
            errorAlert("Password does not match!")
        }else{
            const {data} = await api_call.post(`/changePassword`,{user_id, password})
            if(data.error){
                errorAlert(data.error)
            }else{
                if(!data.status){
                    errorAlert(data.message)
                    return false
                }else{
                    successAlert(data.message)
                    return true
                }
            }
            
        }
    }catch(err){
        errorAlert(err)
    }
}

export const contactMessage = async (userData) => {
    try{
        await api_call.post(`/contact`,{userData},)
    }catch(err){
        errorAlert(err)
    }
}

export const userAuth = async (userStorage) => {
    try{
        const {data} = await api_call.post("/auth",{userStorage},{withCredentials:true})
        return data
    }catch(err){
        errorAlert(err)
    }
}