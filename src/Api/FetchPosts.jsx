import axios from "axios"

export const latestPost = async () => {
    const {data} = await axios.get(`${process.env.react_app_server}/getLatest`)
    console.log(data);
    return data.postData
}