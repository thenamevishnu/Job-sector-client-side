import axios from "axios"

export const latestPost = async () => {
    const {data} = await axios.get(`${process.env.react_app_server}/getLatest`)
    console.log(data);
    return data.postData
}

export const fetchSinglePost = async (id) => {
    const {data} = await axios.get(`${process.env.react_app_server}/get-single-post/${id}`)
    return data?.postData[0]
}

export const getSearchPosts = async (search, filterData) => {
    const {data} = await axios.post(`${process.env.react_app_server}/search`,{search, filterData})
    return data.response
}