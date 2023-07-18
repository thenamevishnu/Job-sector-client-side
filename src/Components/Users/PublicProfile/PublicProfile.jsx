import React, { useEffect, useState } from 'react'
import "./PublicProfile.css"
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { errorAlert } from '../../../Functions/Toasts'
import { useSelector } from 'react-redux';
import { addConnection } from '../../../Functions/Profile';

function PublicProfile() {

    const [userData,setUserData] = useState({})
    const [userId,setUserId] = useState("")
    const {id} = useSelector(state => state.user)

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const id = localStorage.getItem("publicProfile")
                const {data} = await axios.post(process.env.react_app_server + "/getUserData",{id},{withCredentials:true})
                setUserId(data._id)
                setUserData(data.profile)
            }catch(err){
                errorAlert(err.message)
            }
        }
        fetchData()
    },[])


    return (
        <>    
        <div className='public-profile'>
        <div className="row mx-auto">
            <div className='col-10 centerfy'>
                
                <div className='row'>
                    <div className='col-12 col-md-4 first-border p-3 mt-3'>
                        <div className='profile position-relative first-border text-center mb-4'>
                        <div><img className='img' src={ process.env.react_app_cloud + "/" +userData.image} alt='profile-pic' width='150px'/>
                            {
                                id!==userId && <span className='position-absolute bottom-0 end-0 me-3 mb-2 cursor-pointer fs-5' onClick={async ()=>await addConnection(id,userId)} title={`Follow ${userData?.full_name}`}><i className='fa fa-plus'></i></span>
                            }
                        </div>
                            <div className='info mt-3'>
                                <p>{userData.full_name} {userData.is_verified && <img src={process.env.react_app_cloud + 'job/default/verification.png'} alt='verified' width='15px' className='pb-1'></img>}</p>
                                <p><i className='fa fa-location-dot'></i> {userData.country}</p>
                            </div>
                        </div>
                        <div className='position-relative d-flex align-items-center'>
                        <h5 className='fw-bold me-2 theme-green'>Audio Introduction</h5> 
                        </div> 
                        {userData?.audio && <audio controls style={{width:"100%"}}>
                            <source src={process.env.react_app_cloud_audio + "" +userData.audio} />
                        </audio> }
                        <div className='line-height mt-4'>
                            <div className='position-relative d-flex align-items-center'>
                                
                                <h5 className='fw-bold me-2 theme-green'>Hours per week</h5> 
                            </div> 
                            <p>{userData.hoursPerWeek}</p>
                        </div>
                        <div className='line-height mt-5'>
                            <div className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Languages</h5> 
                               
                            </div> 
                            <div>
                                {
                                    userData?.language?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                }
                                {
                                userData?.language && userData.language.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.lang} - {obj.level}</p>
                                    )
                                }) 
                            }</div>
                            
                        </div>
                        <div className='line-height mt-5'>
                            <div className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Education</h5> 
                                
                            </div> 
                            <div>
                                {
                                    userData?.education?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                }
                                {
                                userData?.education && userData.education.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.name}<br /> {obj.subject} <br /> {obj.from} - {obj.to}</p>
                                    )
                                }) 
                            }</div>
                        </div>
                        
                    </div>
                    <div className='col-md-8 col-12'>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                
                                <h5 className='fw-bold me-2 theme-green'>{userData?.title && userData.title}</h5> 
                                <span className='theme-green fs-6 fw-bold'>Hourly: ${userData?.per_hour && userData.per_hour}/hour</span>
                                <p className='mt-4 fst-italic' style={{lineHeight:'2'}}>{userData?.description && userData.description}</p>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <h5 className='fw-bold me-2 theme-green'>Work History</h5> 
                                    {
                                        userData?.work_history?.length === 0 && <div className='fs-6 text-start text-danger mt-3 mb-3'>No work history yet!</div>
                                    }
                                    {
                                        userData?.work_history && userData.work_history.map(obj=>{
                                            return (
                                                <div></div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                               
                                <h5 className='fw-bold me-2 theme-green'>Skills</h5> 
                                <div className='skills text-center mt-4 mb-1'>
                                    {
                                        userData?.skills?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                    }
                                    {
                                        userData.skills && userData.skills.map(value => {
                                            return(
                                                <div key={value} className='position-relative p-1'><div className='skill p-1 ps-2 pe-2 me-2'>{value}</div></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                
                                <h5 className='fw-bold me-2 theme-green mb-3'>My Projects</h5> 
                                <ul className='list-inline'>
                                    {
                                        userData?.my_projects?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                    }
                                    {
                                        userData?.my_projects && userData.my_projects.map((obj) => {
                                            return(
                                                <li className='list-inline-items mb-3' key={obj.name}><i className='fab fa-github'></i>&nbsp;Link : <a href={obj.url} rel="noreferrer" target='_blank' className='default-link'>{obj.name}</a> <br></br>Language : {obj.language}<br></br>Created At : {obj.created_at}<br></br></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">

            <h5 className='fw-bold theme-green ps-3 pt-3'>Certificates</h5> 
                <div className="container">
                <div className="row text-center">
                        {
                            userData?.certificates?.length === 0 && <div className="fs-6 text-start text-danger p-3">Not added yet!</div>
                        }
                        {
                            userData?.certificates && userData.certificates.map((obj,index)=> {
                                return(
                                    <div className='cirtificate col-12 col-lg-6 p-3' key={index}>
                                        <div className='frame p-2' >
                                            <div className='row d-flex align-items-center'>
                                                <div className='col-3'>
                                                    <img src={process.env.react_app_cloud +"job/default/certificate.png"} alt="certificate" width="80em" />
                                                </div>
                                                <div className='col-9 text-start position-relative'>
                                                    <div className='down-trash'>
                                                        <a href={obj.link} target='_blank' rel="noreferrer" title={"Link to "+obj.title+" certificate"}><i className='fa fa-link'></i></a>&nbsp;&nbsp;<i className='fa fa-trash text-danger cursor-pointer'></i>
                                                    </div>
                                                    <p className='fw-bold'>{obj.title}</p>
                                                    <p>Provider: {obj.provider}</p>
                                                    <p>Issued: {obj.issued}</p>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">
            
            <h5 className='fw-bold me-2 theme-green ps-3 pt-3'>Employment History</h5> 
                <div className="container">
                    <div className="row text-center">
                        {
                            userData?.employment_history?.length === 0 && <div className="fs-6 text-start text-danger p-3">Not added yet!</div>
                        }
                        
                        {
                            userData?.employment_history && userData.employment_history.map(obj => {
                                return(
                                    <div className='cirtificate col-12 col-lg-6 p-3' key={obj.title}>
                                        <div className='frame p-2'>
                                            <div className='row d-flex align-items-center'>
                                                <div className='col-3'>
                                                    <img src={process.env.react_app_cloud +"job/default/experience.png"} alt="certificate" width="100em" />
                                                </div>
                                                <div className='col-9 text-start position-relative'>
                                                    <div className='down-trash'>
                                                        <i className='fa fa-trash text-danger cursor-pointer'></i>
                                                    </div>
                                                    <p className='fw-bold'>{obj.title}</p>
                                                    <p>Company: {obj.company}</p>
                                                    <p>{obj.from} - {obj.to}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <ToastContainer />
    </>
         )
}

export default PublicProfile
