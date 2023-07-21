import axios from "axios"

const instance = axios.create({
    baseURL: process.env.react_app_server
})

export default instance;