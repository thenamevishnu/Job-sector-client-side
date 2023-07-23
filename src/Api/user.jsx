import axios from "axios"

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