import React, { useEffect, useState } from 'react'
import "./ProfileSettings.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function ProfileSettings() {

    const navigate = useNavigate()

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
        <>
        <div className='my-profile'>
        <div className='row mx-auto'>
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
                <div className='p-4 buttons'>
                    <button className='outline-button p-1 ps-3 pe-3 me-3' onClick={()=>navigate("/profile")}>Profile Preview</button>
                    <button className='outline-button p-1 ps-3 pe-3' onClick={()=>{navigate("/profile-settings")}}>Profile Preview</button>
                </div>
            </div>
        </div>
        <div className="row mx-auto">
            <div className='col-10 centerfy'>
                <div className='row'>
                <div className='col-4 first-border p-3 mt-3'>
                    <p>ji</p>
                    <p>ji</p>
                    <p>ji</p>
                    <p>ji</p>
                    
                </div>
                <div className='col-8'>
                    <div className="row mx-auto">
                        <div className='ms-3 first-border p-3 col-12 mt-3'>
                            <p>ji</p>
                            <p>ji</p>
                            <p>ji</p>   
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className='ms-3 first-border p-3 col-12 mt-3'>
                            <p>ji</p>
                            <p>ji</p>
                            <p>ji</p>   
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className='ms-3 first-border p-3 col-12 mt-3'>
                            <p>ji</p>
                            <p>ji</p>
                            <p>ji</p>   
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className='ms-3 first-border p-3 col-12 mt-3'>
                            <p>ji</p>
                            <p>ji</p>
                            <p>ji</p>   
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">
                <div className='cirtificates d-flex align-items-center justify-content-evenly p-3'>
                    <div className='cirtificate'>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                    </div>
                    <div className='cirtificate'>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">
                <div className='employments d-flex align-items-center justify-content-evenly p-3'>
                    <div className='history'>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                    </div>
                    <div className='history'>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                        <p>dfgdfgsdfgsdfg</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <ToastContainer />
    </>
         )
}

export default ProfileSettings
