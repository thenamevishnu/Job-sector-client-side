import axios from "axios"

export const getAllUsers = async () => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/getAllUsers`)
    return data.response
}

export const updateBanStatus = async (items) => {
    const {data} = await axios.post(`${process.env.react_app_server}/admin/updateBanStatus`,items)
    return data.response
}

export const updateTickStatus = async (items) => {
    const {data} = await axios.post(`${process.env.react_app_server}/admin/updateTickStatus`,items)
    return data.response
}

export const fetchSearchData = async (key) => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/fetchSearchData/${key}`)
    return data.response
}

export const fetchSearchPostData = async (key) => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/fetchSearchPostData/${key}`)
    return data.response
}

export const getAllPosts = async () => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/getAllPost`)
    return data.response
}

export const getAdminData = async (user_id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/getAdminData/${user_id}`)
    return data
}

export const payoutManageAdmin = async (items, type, admin_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/admin/payoutManageAdmin/`,{items,type,admin_id})
    return data.response
}

export const getDashboard = async (id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/admin/getDashboard/${id}`)
    return data
}