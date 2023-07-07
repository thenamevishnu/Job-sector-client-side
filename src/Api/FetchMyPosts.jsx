import axios from "axios"

export const fetchMyPosts = async (id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getMyPost/${id}`)
    return data.posts
}

export const changePostStatus = async (id,user_id,status) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changePostStatus/${id}/${user_id}/${!status}`)
    if(data.status) return data.postData
}

export const getMyProposals = async (user_id) => {
   const {data} = await axios.get(`${process.env.react_app_server}/getMyProposals/${user_id}`)
   return data
}