import axios from "axios"

const api_call = axios.create({
    baseURL: process.env.react_app_server
})

api_call.interceptors.request.use(config => {
    const path = config.url.split("/")[1]
    const userAuth = localStorage.getItem("userStorage") ? JSON.parse(localStorage.getItem("userStorage")).token : null
    const adminAuth = localStorage.getItem("adminStorage") ? JSON.parse(localStorage.getItem("adminStorage")).token : null
    const authToken = path === "admin" ? adminAuth : userAuth
    config.headers.Authorization = `Bearer ${authToken}`
    return config
})

export default api_call;