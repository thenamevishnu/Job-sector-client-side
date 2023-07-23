import React, { useEffect, useRef, useState } from 'react'
import "./ProfileSettings.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { updateUser } from '../../../Redux/UserSlice/UserSlice'
import {BioData, Certificate, Education, Employment, HoursPerWeek, Languages, Projects, Skills} from '../Modal/Modal'
import { promiseAlert, errorAlert } from '../../../Functions/Toasts'
import { fromChildResponse } from '../../../Functions/FromChild'
import { deleteCertificate, deleteEducation, deleteEmployment, deleteLanguage, deleteProject, deleteSkill } from '../../../Functions/Profile'

function ProfileSettings() {

    const dispatch = useDispatch()

    const stateData = useSelector(state => state.user)
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
            
            formData.append("user_id",stateData.id)
            type==="image" ? formData.append("image",file) : formData.append("audio",file)
            const config = {
                header: {
                    "content-type": "multipart/form-data",
                    id: stateData.id
                },
                withCredentials: true
            }

            const myPromise = new Promise(resolve => {
                setTimeout(async () => {
                    const endPoint = type==="image" ? "/update-profile-pic" : "/update-profile-audio"
                    const {data} = await axios.post(process.env.react_app_server +""+endPoint, formData, config)
                    type==="image" ? promiseComplete({image:file}) : promiseComplete({audio:data.audio})
                    const obj = type==="image" ? {...stateData,image:data.dp,id:stateData.id,email:stateData.email,name:stateData.name,audio:stateData.audio} : {...stateData,image:stateData.image,id:stateData.id,email:stateData.email,name:stateData.name,audio:data.audio}
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
                const {data} = await axios.post(process.env.react_app_server + "/getUserData",{id:stateData.id},{withCredentials:true})
                setUserData(data.profile)
            }catch(err){
                errorAlert(err.message)
            }
        }
        fetchData()
    },[stateData.id])

    const handleDataFromChild = async (data)=> {
        const res = await fromChildResponse(data,stateData.id,{setData,updateData})
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
        
        <div className='container grid grid-cols-12 mx-auto mt-20 gap-1'>

            <div className='md:col-span-4 col-span-12'>
                <div className='text-center mb-1 border-2 rounded-xl border-gray-400 p-2'>
                    <label htmlFor='upload-image' title='Update Image' className='cursor-pointer mt-2 flex justify-center'><img className='w-32 rounded-full' src={showFile.image ? URL.createObjectURL(showFile.image) : process.env.react_app_cloud + "/" +stateData.image} alt='profile-pic'/></label>
                    <input type='file' id='upload-image' accept='.jpeg, .jpg, .png, .webp' name='dp' style={{display:"none"}} onChange={(e)=>setFiles(e.target.files[0],"image")}></input>
                    <div className='mt-3'>
                        <div className='flex justify-center items-center'>{stateData.name} {userData.is_verified && <img src={process.env.react_app_cloud + 'job/default/verification.png'} alt='verified' className='w-4 h-4.5 ms-1'></img>}</div>
                        <div><i className='fa fa-location-dot'></i> {userData.country}</div>
                    </div>
                </div>

                <div className='border-2 border-gray-400 rounded-xl p-2'>
                        
                    <div className='relative flex items-center'>
                        <h5 className='font-bold mr-2 text-green-700 text-lg'>Audio Introduction</h5> 
                        <label htmlFor='audio' className='inner-circle cursor-pointer'>
                            <i className='fa fa-pen' style={{color:'#808080'}}></i>
                            <input className='hidden' type="file" accept='.mp3' name='audio' id='audio' onChange={(e)=>setFiles(e.target.files[0],"audio")}/>
                        </label>
                    </div> 

                    <audio ref={audioRef} controls style={{width:"100%"}}>
                        <source src={showFile.audio ? process.env.react_app_cloud_audio + "" +showFile.audio : process.env.react_app_cloud_audio + "" +stateData.audio} />
                    </audio>

                    <div className='mt-4'>
                        <div className='relative flex items-center'>
                            <h5 className='font-bold me-2 text-green-700 text-lg'>Hours per week</h5> 
                            <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,hoursPerWeek:true,title:"Hours per week"})}>
                                <i className='fa fa-plus' style={{color:'#808080'}}></i>
                            </span>
                        </div> 
                        <p>{updateData.hoursPerWeek ? updateData.hoursPerWeek : userData.hoursPerWeek}</p>
                    </div>

                    <div className='mt-5'>
                        <div className='relative flex items-center mt-4'>
                            <h5 className='font -bold me-2 theme-green text-lg text-green-700'>Languages</h5> 
                            <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,language:true,title:"Languages"})}>
                                <i className='fa fa-pen' style={{color:'#808080'}}></i>
                            </span>
                        </div> 
                    <div>
                            {
                                userData?.language?.length === 0 && <div className='text-sm text-start text-red-600'>Not added yet!</div>
                            }
                            {
                            userData?.language && userData.language.map((obj,index)=>{
                                return (
                                    <p key={index}>{obj.lang} - {obj.level} <i className='fa fa-trash text-red-600 cursor-pointer' title='delete' onClick={async ()=>setUserData({...userData,language:await deleteLanguage({lang:obj.lang,level:obj.level},stateData.id)})}></i></p>
                                )
                            }) 
                        }</div>
                        
                    </div>
                    <div className='mt-5'>
                        <div className='relative flex items-center mt-4'>
                            <h5 className='font-bold me-2 text-green-700 text-lg'>Education</h5> 
                            <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,education:true,title:"Education"})}>
                                <i className='fa fa-pen' style={{color:'#808080'}}></i>
                            </span>
                        </div> 
                        <div>
                            {
                                userData?.education?.length === 0 && <div className='text-sm text-start text-red-600'>Not added yet!</div>
                            }
                            {
                                userData?.education && userData.education.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.name} <i className='fa fa-trash text-danger cursor-pointer' title='delete' onClick={async ()=>setUserData({...userData,education:await deleteEducation({name:obj.name,subject:obj.subject,from:obj.from,to:obj.to},stateData.id)})}></i><br /> {obj.subject} <br /> {obj.from} - {obj.to}</p>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                </div>

            </div>

            <div className='col-span-12 md:col-span-8'>
                <div className="border-2 p-3 rounded-xl border-gray-400">
                    <div className='relative'>
                        <span className='inner-circle cursor-pointer absolute top-2 right-2' onClick={()=>showModal({status:!modal.status,bio:true,title:"Setup/Edit Bio"})}>
                            <i className='fa fa-pen' style={{color:'#808080'}}></i>
                        </span>
                        <h5 className='font-bold me-2 text-green-700 text-lg'>{userData?.title && userData.title}</h5> 
                        <span className='tetx-green-700 fs-6 fw-bold'>Hourly: ${userData?.per_hour && userData.per_hour}/hour</span>
                        <p className='mt-4 whitespace-pre-wrap' style={{lineHeight:'2'}}>{userData?.description && userData.description}</p>
                    </div>
                </div>
                <div className="border-2 rounded-xl border-gray-400 mt-1 p-3">
                    <div className='relative'>
                        <h5 className='font-bold me-2 text-green-700 text-lg'>Work History</h5> 
                            {
                                userData?.work_history?.length === 0 && <div className='text-sm text-start text-red-600 mt-3 mb-3'>No work yet. Once you start getting hired on Upwork, your work with clients will show up here.</div>
                            }
                            {
                                userData?.work_history && userData.work_history.map(obj=>{
                                    return (
                                        <div></div>
                                    )
                                })
                            }
                        
                        <Link className='text-green-700' to="/">Search for jobs <i className='fa fa-link'></i></Link> 
                    </div>
                </div>
                <div className="border-2 rounded-xl border-gray-400 mt-1 p-3">
                    <div className='relative'>
                        <span className='inner-circle cursor-pointer absolute top-1 right-1' onClick={()=>showModal({status:!modal.status,skill:true,title:"Skills"})}>
                            <i className='fa fa-plus' style={{color:'#808080'}}></i>
                        </span>
                        <h5 className='font-bold me-2 text-green-700 text-lg'>Skills</h5> 
                        <div className='text-center mt-4 mb-1 overflow-x-scroll overflow-y-hidden flex skillsBar'>
                            {
                                userData?.skills?.length === 0 && <div className='text-sm text-start text-red-600'>You haven't added skills yet!</div>
                            }
                            {
                                userData.skills && userData.skills.map(value => {
                                    return(
                                        <div key={value} className='relative p-1 pb-3'><div className='p-1 ps-2 pe-2 me-2 bg-gray-300 shadow-tag rounded-3xl'><i className='fa fa-close absolute top-0 right-3 text-white cursor-pointer text-xs bg-red-700 rounded-full p-1 w-3 h-3 flex justify-center items-center' onClick={async ()=>setUserData({...userData,skills:await deleteSkill(value,stateData.id)})}></i>{value}</div></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="border-2 rounded-xl border-gray-400 mt-1 p-3">
                    <div className='relative'>
                        <span className='inner-circle cursor-pointer absolute top-1 right-1' onClick={()=>showModal({status:!modal.status,project:true,title:"Projects"})}>
                            <i className='fa fa-plus' style={{color:'#808080'}}></i>
                        </span>
                        <h5 className='font-bold me-2 text-green-700 text-lg mb-3'>My Projects</h5> 
                        <ul className="ms-2">
                            {
                                userData?.my_projects?.length === 0 && <div className='text-sm text-start text-red-600'>You haven't added Projects yet!</div>
                            }
                            {
                                userData?.my_projects && userData.my_projects.map((obj) => {
                                    return(
                                        <li className='mb-3' key={obj.name}><i className='fab fa-github'></i>&nbsp;Link : <a href={obj.url} rel="noreferrer" target='_blank' className='text-green-700'>{obj.name}</a> <i className='fa fa-trash text-red-600 cursor-pointer' onClick={async ()=>setUserData({...userData,my_projects:await deleteProject(obj,stateData.id)})}></i><br></br>Language : {obj.language}<br></br>Created At : {obj.created_at}<br></br></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <div className='container grid grid-cols-12 mx-auto mt-1'>
            <div className="col-span-12 border-2 border-gray-400 relative rounded-xl p-3">
                <span className='inner-circle cursor-pointer absolute top-3 right-3' onClick={()=>showModal({status:!modal.status,certificate:true,title:"Certificates"})}>
                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                </span>
                <h5 className='font-bold text-green-700 ps-3 pt-3 text-lg mb-2'>Certificates</h5> 
                <div className="grid grid-cols-12 gap-2">
                    {
                        userData?.certificates?.length === 0 && <div className="font-sm text-start col-span-12 text-red-700 p-3">You haven't added certifications yet!</div>
                    }
                    {
                        userData?.certificates && userData.certificates.map((obj,index)=> {
                            return(
                                <div className='lg:col-span-4 sm:col-span-6 col-span-12 border-2 border-gray-400 rounded-xl' key={index}>
                                    <div className='flex items-center relative'>
                                        <div className='col-3'>
                                            <img src={process.env.react_app_cloud +"job/default/certificate.png"} alt="certificate" width="80em" />
                                        </div>
                                        <div>
                                            <div className='absolute right-2 bottom-0'>
                                                <a href={obj.link} target='_blank' rel="noreferrer" title={"Link to "+obj.title+" certificate"}><i className='fa fa-link'></i></a>&nbsp;&nbsp;<i className='fa fa-trash text-red-600 cursor-pointer' onClick={async ()=>setUserData({...userData,certificates:await deleteCertificate(obj,stateData.id)})}></i>
                                            </div>
                                            <p className='font-bold text-lg'>{obj.title}</p>
                                            <p>Provider: {obj.provider}</p>
                                            <p>Issued: {obj.issued}</p>
                                        </div>
                                    </div>  
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

        <div className='container grid grid-cols-12 mx-auto mt-1'>
            <div className="col-span-12 border-2 border-gray-400 relative rounded-xl p-3">
                <span className='inner-circle cursor-pointer absolute top-3 right-3' onClick={()=>showModal({status:!modal.status,employment:true,title:"Employment History"})}>
                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                </span>
                <h5 className='font-bold text-green-700 ps-3 pt-3 text-lg mb-2'>Employment History</h5> 
                <div className="grid grid-cols-12 gap-2">
                    {
                        userData?.employment_history?.length === 0 && <div className="font-sm text-start text-red-700 p-3 col-span-12">You haven't added employment history yet!</div>
                    }
                    {
                        userData?.employment_history && userData.employment_history.map((obj,index)=> {
                            return(
                                <div className='lg:col-span-4 sm:col-span-6 col-span-12 border-2 border-gray-400 rounded-xl' key={index}>
                                    <div className='flex items-center relative'>
                                        <div className='col-3'>
                                            <img src={process.env.react_app_cloud +"job/default/experience.png"} alt="certificate" width="80em" />
                                        </div>
                                        <div>
                                            <div className='absolute right-2 bottom-0'>
                                                <i className='fa fa-trash text-red-600 cursor-pointer' onClick={async ()=>setUserData({...userData,employment_history:await deleteEmployment(obj,stateData.id)})}></i>
                                            </div>
                                            <p className='font-bold text-lg'>{obj.title}</p>
                                            <p>Company: {obj.company}</p>
                                            <p>{obj.from} - {obj.to}</p>
                                        </div>
                                    </div>  
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
         )
}

export default ProfileSettings
