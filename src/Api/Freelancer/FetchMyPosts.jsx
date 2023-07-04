import axios from "axios"

export const fetchMyPosts = async (id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/getMyPost/${id}`)
    return data.posts
}