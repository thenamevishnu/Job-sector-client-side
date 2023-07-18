import axios from "axios"

export const fetchMyPosts = async (id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getMyPost/${id}`)
    return data.posts
}

export const changePostStatus = async (id,user_id,status) => {
    const {data} = await axios.post(`${process.env.react_app_server}/changePostStatus/${id}/${user_id}/${!status}`)
    if(data.status) return data.postData
}

export const deletePost = async (post_id,user_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/delete-post`,{post_id,user_id})
    if(data.status) return data.postData
}
 
export const markAsCompletedPost = async (post_id , user_id) => {
    const {data} = await axios.post(`${process.env.react_app_server}/completed-post`,{post_id,user_id})
    if(data.status) return data.postData
}

export const getMyProposals = async (user_id) => {
   const {data} = await axios.get(`${process.env.react_app_server}/getMyProposals/${user_id}`)
   return data
}