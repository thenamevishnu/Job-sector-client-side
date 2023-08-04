import axios from "axios"
import { errorAlert, successAlert } from "../Functions/Toasts"

export const getUserData = async (id) => {
    const {data} = await axios.post(process.env.react_app_server + "/getUserData",{id},{withCredentials:true})
    return data
}

export const AddPaymentMethods = async (data,id) => {
    const body = {
        method:data?.addPayment?.addMethod,
        to:data?.addPayment?.to,
        user_id:id
    }
    const resposne = await axios.post(`${process.env.react_app_server}/addPaymentMethod`,body)
    if(resposne.data.status){
        return true
    }else{
        return false
    }
}

export const changeSearchResults = async (prefix) => {
    if(prefix.length > 0){
        const {data} = await axios.get(`${process.env.react_app_server}/getSearchResult/${prefix}`)
        return data.response
    }
}

export const changeNotifications = async (id, obj) => {
    await axios.post(`${process.env.react_app_server}/postNotification`,{id:id,obj:obj})
}

export const deleteAccount = async (id, email, password) => {
    if(password.trim() === ""){
        errorAlert("Paasword is empty!")
        return false
    }
    const {data} = await axios.post(`${process.env.react_app_server}/deleteAccount`,{id:id,email:email,password:password})
    if(!data.status){
        errorAlert(data.message)
        return false
    }else{
        successAlert(data.message)
        localStorage.clear()
        return true
    }
}

export const getUserReports = async (user_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getUserReports/${user_id}`)
    return data.reports
}

export const getClientReport = async (user_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getClientReport/${user_id}`)
    return data.reports
}

export const changeTwoStep = async (id , status) => {
    await axios.post(`${process.env.react_app_server}/changeTwoStep`,{id,status})
}

export const withdrawSuccess = async (id,to) => {
    const {data} = await axios.post(`${process.env.react_app_server}/withdraw`,{id,to})
    return data
}

export const handleChangePassword = async (user_id, password) => {
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
        const {data} = await axios.post(`${process.env.react_app_server}/changePassword`,{user_id, password})
        if(!data.status){
            errorAlert(data.message)
            return false
        }else{
            successAlert(data.message)
            return true
        }
    }
}

export const contactMessage = async (userData) => {
    await axios.post(`${process.env.react_app_server}/contact`,{userData})
}