
import { errorAlert, successAlert } from "./Toasts"
import api_call from "../axios"

export const getUserData = async (id) => {
    try{
        const {data} = await api_call.post("/getUserData",{id})
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

export const setRateUser = async (user, user_id, rate) => {
    try{
        const {data} = await api_call.post("/rateUser",{user,user_id, rate})
        if(data.error){
            errorAlert(data.error)
            return false
        }else{
            return true
        }
    }catch(err){
        errorAlert(err)
    }
}

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