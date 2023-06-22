import React, { useEffect, useState } from 'react'
import "./PublicProfile.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function PublicProfile() {

    const {image,name,id} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})
    
    const errorAlert = async (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    } 

    useEffect(()=>{
       
        const fetchData = async () => {
            try{
                const {data} = await axios.post(process.env.react_app_server + "/getUserData",{id},{withCredentials:true})
                setUserData(data.profile)
            }catch(err){
                errorAlert(err.message)
            }
        }
        fetchData()
    },[id])

    return (
        <div className='row mx-auto public-profile'>
            <div className="col-10 first-border centerfy d-flex justify-content-between">
                <div className='profile d-flex align-items-center'>
                    <div className='pic'>
                        <img src={image} alt='profile-pic' width='150px'/>
                    </div>
                    <div className='info'>
                        <p>{name} {userData.is_verified && <img src={process.env.react_app_cloud + 'default/verification.png'} alt='verified' width='20px' className='pb-1'></img>}</p>
                        <p><i className='fa fa-location-dot'></i> {userData.country}</p>
                        <p>place</p>
                    </div>
                </div>
            </div>
            
            <ToastContainer />
        </div>
    )
}

export default PublicProfile
