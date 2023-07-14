import React, { useEffect, useRef, useState } from 'react'
import "./ProfileSettings.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { updateUser } from '../../../Redux/UserSlice/UserSlice'
import {BioData, Certificate, Education, Employment, HoursPerWeek, Languages, Projects, Skills} from '../Modal/Modal'
import { promiseAlert, errorAlert } from '../../../Functions/Toasts'
import { fromChildResponse } from '../../../Functions/FromChild'
import { deleteCertificate, deleteEducation, deleteEmployment, deleteLanguage, deleteProject, deleteSkill } from '../../../Functions/Profile'

function ProfileSettings() {

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const {image,name,id,email,audio} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})
    const [showFile,setFile] = useState({})
    const [updateData,setData] = useState({})
    const [promiseCheck,promiseComplete] = useState({})
    const [modal, showModal] = useState({})
    const audioRef = useRef(null)
    
    useEffect(()=>{
        setFile(promiseCheck)
    },[promiseCheck])

    useEffect(()=>{
        if(audioRef.current){
            audioRef.current.load()
        }
    },[showFile])

    const setFiles = async (file,type) => {
        try{

            const formData = new FormData()
            
            formData.append("user_id",id)
            type==="image" ? formData.append("image",file) : formData.append("audio",file)
            const config = {
                header: {
                    "content-type": "multipart/form-data",
                    id: id
                },
                withCredentials: true
            }

            const myPromise = new Promise(resolve => {
                setTimeout(async () => {
                    const endPoint = type==="image" ? "/update-profile-pic" : "/update-profile-audio"
                    const {data} = await axios.post(process.env.react_app_server +""+endPoint, formData, config)
                    type==="image" ? promiseComplete({image:file}) : promiseComplete({audio:data.audio})
                    const obj = type==="image" ? {image:data.dp,id:id,email:email,name:name,audio:audio} : {image:image,id:id,email:email,name:name,audio:data.audio}
                    dispatch(updateUser(obj))
                    resolve(data)
                }, 1500);
            })

            promiseAlert(myPromise)

        }catch(err){
            errorAlert(err.message)
        }
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

    const handleDataFromChild = async (data)=> {
        const res = await fromChildResponse(data,id,{setData,updateData})
        if(res){
            if(res.language){
                setUserData({...userData,language:res.language})
            }else if(res.educations){
                setUserData({...userData,education:res.educations})
            }else if(res.bio){
                setUserData({...userData,title:res.bio.title,per_hour:res.bio.per_hour,description:res.bio.description})
            }else if(res.skill){
                setUserData({...userData,skills:res.skill})
            }else if(res.projects){
                setUserData({...userData,my_projects:res.projects})
            }else if(res.employment){
                setUserData({...userData,employment_history:res.employment})
            }else if(res.certificate){
                setUserData({...userData,certificates:res.certificate})
            }
        }
    }

    return (
        <>
        {modal.hoursPerWeek && <HoursPerWeek data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        {modal.language && <Languages data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        {modal.education && <Education data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}    
        {modal.bio && <BioData data={modal} user={userData} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}    
        {modal.skill && <Skills data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        {modal.project && <Projects data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        {modal.employment && <Employment data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        {modal.certificate && <Certificate data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}    
        <div className='my-profile'>
        <div className="row mx-auto">
            <div className='col-10 centerfy'>
                
                <div className='row'>
                    <div className='col-12 col-md-4 first-border p-3 mt-3'>
                        <div className='profile first-border text-center mb-4'>
                        <label htmlFor='upload-image' title='Update Image' className='profile-pic cursor-pointer mt-2'><img src={showFile.image ? URL.createObjectURL(showFile.image) : process.env.react_app_cloud + "/" +image} alt='profile-pic' width='150px'/></label>
                        <input type='file' id='upload-image' accept='.jpeg, .jpg, .png, .webp' name='dp' style={{display:"none"}} onChange={(e)=>setFiles(e.target.files[0],"image")}></input>
                            <div className='info mt-3'>
                                <p>{name} {userData.is_verified && <img src={process.env.react_app_cloud + 'job/default/verification.png'} alt='verified' width='15px' className='pb-1'></img>}</p>
                                <p><i className='fa fa-location-dot'></i> {userData.country}</p>
                                <p>place</p>
                            </div>
                        </div>
                        <div className='position-relative d-flex align-items-center'>
                        <h5 className='fw-bold me-2 theme-green'>Audio Introduction</h5> 
                            <label htmlFor='audio' className='inner-circle cursor-pointer'>
                                <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                <input type="file" accept='.mp3' name='audio' id='audio' onChange={(e)=>setFiles(e.target.files[0],"audio")} style={{display:'none'}}/>
                            </label>
                        </div> 
                        <audio ref={audioRef} controls style={{width:"100%"}}>
                            <source src={showFile.audio ? process.env.react_app_cloud_audio + "" +showFile.audio : process.env.react_app_cloud_audio + "" +audio} />
                        </audio>
                        <div className='line-height mt-4'>
                            <div className='position-relative d-flex align-items-center'>
                                
                                <h5 className='fw-bold me-2 theme-green'>Hours per week</h5> 
                                <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,hoursPerWeek:true,title:"Hours per week"})}>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>
                            </div> 
                            <p>{updateData.hoursPerWeek ? updateData.hoursPerWeek : userData.hoursPerWeek}</p>
                        </div>
                        <div className='line-height mt-5'>
                            <div className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Languages</h5> 
                                <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,language:true,title:"Languages"})}>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                            </div> 
                            <div>
                                {
                                    userData?.language?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                }
                                {
                                userData?.language && userData.language.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.lang} - {obj.level} <i className='fa fa-trash text-danger cursor-pointer' title='delete' onClick={async ()=>setUserData({...userData,language:await deleteLanguage({lang:obj.lang,level:obj.level},id)})}></i></p>
                                    )
                                }) 
                            }</div>
                            
                        </div>
                        <div className='line-height mt-5'>
                            <div className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Education</h5> 
                                <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,education:true,title:"Education"})}>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                            </div> 
                            <div>
                                {
                                    userData?.education?.length === 0 && <div className='fs-6 text-start text-danger'>Not added yet!</div>
                                }
                                {
                                userData?.education && userData.education.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.name} <i className='fa fa-trash text-danger cursor-pointer' title='delete' onClick={async ()=>setUserData({...userData,education:await deleteEducation({name:obj.name,subject:obj.subject,from:obj.from,to:obj.to},id)})}></i><br /> {obj.subject} <br /> {obj.from} - {obj.to}</p>
                                    )
                                }) 
                            }</div>
                        </div>
                        
                    </div>
                    <div className='col-md-8 col-12'>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer' onClick={()=>showModal({status:!modal.status,bio:true,title:"Setup/Edit Bio"})}>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green'>{userData?.title && userData.title}</h5> 
                                <span className='theme-green fs-6 fw-bold'>Hourly: ${userData?.per_hour && userData.per_hour}/hour</span>
                                <p className='mt-4 fst-italic' style={{lineHeight:'2'}}>{userData?.description && userData.description}</p>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <h5 className='fw-bold me-2 theme-green'>Work History</h5> 
                                    {
                                        userData?.work_history?.length === 0 && <div className='fs-6 text-start text-danger mt-3 mb-3'>No work yet. Once you start getting hired on Upwork, your work with clients will show up here.</div>
                                    }
                                    {
                                        userData?.work_history && userData.work_history.map(obj=>{
                                            return (
                                                <div></div>
                                            )
                                        })
                                    }
                                
                                <Link className='default-link' to="/">Search for jobs <i className='fa fa-link'></i></Link> 
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer' onClick={()=>showModal({status:!modal.status,skill:true,title:"Skills"})}>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green'>Skills</h5> 
                                <div className='skills text-center mt-4 mb-1'>
                                    {
                                        userData?.skills?.length === 0 && <div className='fs-6 text-start text-danger'>You haven't added skills yet!</div>
                                    }
                                    {
                                        userData.skills && userData.skills.map(value => {
                                            return(
                                                <div key={value} className='position-relative p-1'><div className='skill p-1 ps-2 pe-2 me-2'><i className='fa fa-close align-close' onClick={async ()=>setUserData({...userData,skills:await deleteSkill(value,id)})}></i>{value}</div></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer' onClick={()=>showModal({status:!modal.status,project:true,title:"Projects"})}>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green mb-3'>My Projects</h5> 
                                <ul className='list-inline'>
                                    {
                                        userData?.my_projects?.length === 0 && <div className='fs-6 text-start text-danger'>You haven't added Projects yet!</div>
                                    }
                                    {
                                        userData?.my_projects && userData.my_projects.map((obj) => {
                                            return(
                                                <li className='list-inline-items mb-3' key={obj.name}><i className='fab fa-github'></i>&nbsp;Link : <a href={obj.url} rel="noreferrer" target='_blank' className='default-link'>{obj.name}</a> <i className='fa fa-trash text-danger cursor-pointer' onClick={async ()=>setUserData({...userData,my_projects:await deleteProject(obj,id)})}></i><br></br>Language : {obj.language}<br></br>Created At : {obj.created_at}<br></br></li>
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
            <span className='inner-circle inner-circle-right cursor-pointer' onClick={()=>showModal({status:!modal.status,certificate:true,title:"Certificates"})}>
                <i className='fa fa-plus' style={{color:'#808080'}}></i>
            </span>
            <h5 className='fw-bold theme-green ps-3 pt-3'>Certificates</h5> 
                <div className="container">
                <div className="row text-center">
                        {
                            userData?.certificates?.length === 0 && <div className="fs-6 text-start text-danger p-3">You haven't added certifications yet!</div>
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
                                                        <a href={obj.link} target='_blank' rel="noreferrer" title={"Link to "+obj.title+" certificate"}><i className='fa fa-link'></i></a>&nbsp;&nbsp;<i className='fa fa-trash text-danger cursor-pointer' onClick={async ()=>setUserData({...userData,certificates:await deleteCertificate(obj,id)})}></i>
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
            <span className='inner-circle inner-circle-right cursor-pointer' onClick={()=>showModal({status:!modal.status,employment:true,title:"Employment History"})}>
                <i className='fa fa-plus' style={{color:'#808080'}}></i>
            </span>
            <h5 className='fw-bold me-2 theme-green ps-3 pt-3'>Employment History</h5> 
                <div className="container">
                    <div className="row text-center">
                        {
                            userData?.employment_history?.length === 0 && <div className="fs-6 text-start text-danger p-3">You haven't added employment history yet!</div>
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
                                                        <i className='fa fa-trash text-danger cursor-pointer' onClick={async ()=>setUserData({...userData,employment_history:await deleteEmployment(obj,id)})}></i>
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

export default ProfileSettings
