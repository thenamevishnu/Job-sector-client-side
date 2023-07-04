import axios from "axios"
import { errorAlert, successAlert } from "./Toasts"

export const handleSubmit = async (userData, userObject,setCanShow, setUserData) => {
        
    try{

        const regex = {
            full_name : /^([A-Za-z])([A-Za-z\s]){3,11}$/gm,
            username : /^([_a-z])([a-z0-9]){3,11}$/gm,
            email : /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm,
            email2 : /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm,
            password : /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\W]).{8,16}$/gm
        }

        const obj = {}
            
        userData.account_type = localStorage.getItem("type")
        
        if(userObject){
            userData.full_name = userObject.name.slice(0,12)
            userData.username = (userObject.email.split("@"))[0].replace(/[^\w]/gi,"").slice(0,12)
            userData.password = process.env.react_app_googleAuthKey
            userData.confirmPassword = process.env.react_app_googleAuthKey
            userData.email = userObject.email
            userData.signup_method = "google"
            setUserData({full_name:"",username:"",country:userData.country,email:"",password:"",confirmPassword:"",otp:""})
        }

        if(userData.full_name===""){
            errorAlert("Name is required")
        }else if(!regex.full_name.test(userData.full_name)){
             errorAlert("Name: Only allowed characters and space")
        }else if(userData.username===""){
             errorAlert("UserName is required")
        }else if(!regex.username.test(userData.username)){
             errorAlert("Username: Only allowed lower case and underscore")
        }else if(userData.email===""){
             errorAlert("Email is required")
        }else if(!regex.email.test(userData.email)){
             errorAlert("Invalid email format")
        }else if(userData.password===""){
             errorAlert("Password is required")
        }else if(!(/(?=.*?[a-z])/).test(userData.password)){
             errorAlert("Password should contain lower case!")
        }else if(!(/(?=.*?[A-Z])/).test(userData.password)){
            errorAlert("Password should contain upper case!")
        }else if(!(/(?=.*?[0-9])/).test(userData.password)){
            errorAlert("Password should contain digits!")
        }else if(!(/(?=.*?[\W])/).test(userData.password)){
            errorAlert("Password should contain Special characters!")
        }else if(userData.password?.length > 16 || userData.password?.length < 8){
            errorAlert("Password should be 8-16!")
        }else if(userData.confirmPassword===""){
             errorAlert("Confirm password is required")
        }else if(userData.password!==userData.confirmPassword){
             errorAlert("Password does not match")
        }else{

            const {data} = await axios.post(process.env.react_app_server + "/signup" ,{userData},{withCredentials:true})

            if(!data.status){
                errorAlert(data.message)
                obj.setUserObject = null
                return obj
            }else{
                if(userObject){
                    const userData = {}
                    userData.email = userObject.email
                    userData.password = process.env.react_app_googleAuthKey
                    const {data} = await axios.post(process.env.react_app_server + "/login" ,{userData},{withCredentials:true})
                    if(!data.status){
                        errorAlert(data.message)
                        obj.setUserObject = null
                        return obj
                    }else{
                        localStorage.setItem("userStorage",JSON.stringify(data))
                        obj.response = {id:data.getUser._id,type:data.getUser.profile.account_type,name:data.getUser.profile.full_name,email:data.getUser.profile.email,image:data.getUser.profile.image}
                        obj.status = true
                        obj.update = true
                        obj.text = data.message
                        return obj
                    }
                }else{
                    if(data.status==="sent"){
                        setCanShow(true)
                        successAlert(data.message)
                    }else{
                        if(data.status==="error"){
                            errorAlert(data.message)
                        }else{
                            if(data.status==='invalid'){
                                errorAlert(data.message)
                                setUserData({...userData,otp:""})
                            }else{
                                obj.status = true
                                obj.message = "Registration successful"
                                return obj
                            }
                           
                        }
                    }
                    
                }
            }
        }
    }catch(err){
        errorAlert(err.message)
    }
}