import axios from "axios"

export const fetchSkills = async () => {
    const {data} = await axios.get(`${process.env.react_app_server}/getAllUsersSkills`)
    if(data.status){
        return data?.skills
    }
}