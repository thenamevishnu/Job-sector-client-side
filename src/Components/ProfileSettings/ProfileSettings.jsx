import React, { useEffect, useRef, useState } from 'react'
import "./ProfileSettings.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { updateUser } from '../../Redux/UserSlice/UserSlice'
import Modal from '../Modal/Modal'

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

    const promiseAlert = async (message) => {
        toast.promise(message, {
            pending: 'Uploading...',
            success: "Upload successful!",
            error: 'Upload Faild!!',
            position: "top-center",
        });
    } 

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

    const handleDataFromChild = async (data) =>   {
        if(data.hoursPerWeek){
            try{
                setData({hoursPerWeek:data.hoursPerWeek})
                await axios.post(process.env.react_app_server + "/changeProfileData",{id,hoursPerWeek:data.hoursPerWeek},{withCredentials:true})
            }catch(err){
                errorAlert(err.message)
            }
        }
    }

    return (
        <>
        {modal.status && <Modal data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />}
        <div className='my-profile'>
        <div className="row mx-auto">
            <div className='col-10 centerfy'>
                
                <div className='row'>
                    <div className='col-12 col-md-4 first-border p-3 mt-3'>
                        <div className='profile first-border text-center mb-4'>
                        <label htmlFor='upload-image' title='Update Image' className='profile-pic cursor-pointer mt-2'><img src={showFile.image ? URL.createObjectURL(showFile.image) : process.env.react_app_cloud + "/" +image} alt='profile-pic' width='150px'/></label>
                        <input type='file' id='upload-image' accept='.jpeg, .jpg, .png, .webp' name='dp' style={{display:"none"}} onChange={(e)=>setFiles(e.target.files[0],"image")}></input>
                            <div className='info mt-3'>
                                <p>{name} {userData.is_verified && <img src={process.env.react_app_cloud + 'job/default/verification.png'} alt='verified' width='20px' className='pb-1'></img>}</p>
                                <p><i className='fa fa-location-dot'></i> {userData.country}</p>
                                <p>place</p>
                            </div>
                        </div>
                        <p className='position-relative d-flex align-items-center'>
                        <h5 className='fw-bold me-2 theme-green'>Audio Introduction</h5> 
                            <label htmlFor='audio' className='inner-circle cursor-pointer'>
                                <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                <input type="file" accept='.mp3' name='audio' id='audio' onChange={(e)=>setFiles(e.target.files[0],"audio")} style={{display:'none'}}/>
                            </label>
                        </p> 
                        <audio ref={audioRef} controls style={{width:"100%"}}>
                            <source src={showFile.audio ? process.env.react_app_cloud_audio + "" +showFile.audio : process.env.react_app_cloud_audio + "" +audio} />
                        </audio>
                        <div className='line-height mt-4'>
                            <p className='position-relative d-flex align-items-center'>
                                <h5 className='fw-bold me-2 theme-green'>Hours per week</h5> 
                                <span className='inner-circle cursor-pointer' onClick={()=>showModal({status:!modal.status,title:"Hours per week"})}>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                            </p> 
                            <p>{updateData.hoursPerWeek ? updateData.hoursPerWeek : userData.hoursPerWeek}</p>
                        </div>
                        <div className='line-height mt-5'>
                            <p className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Languages</h5> 
                                <span className='inner-circle cursor-pointer'>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>&nbsp;&nbsp;
                                <span className='inner-circle cursor-pointer'>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                            </p> 
                            <p>Malayalam : Native</p>
                            <p>English : Communication</p>
                        </div>
                        <div className='line-height mt-5'>
                            <p className='position-relative d-flex align-items-center mt-4'>
                                <h5 className='fw-bold me-2 theme-green'>Education</h5> 
                                <span className='inner-circle cursor-pointer'>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>&nbsp;&nbsp;
                                <span className='inner-circle cursor-pointer'>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                            </p> 
                            <p>
                                <p>KGPTC WESTHILL</p>
                                <p>Electrical & Electronics</p>
                            </p>
                        </div>
                        
                    </div>
                    <div className='col-md-8 col-12'>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer'>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green'>Full Stack Developer</h5> 
                                <span className='theme-green fs-6 fw-bold'>Hourly: $10/hour</span>
                                <p className='mt-4 fst-italic' style={{lineHeight:'2'}}>I’m a developer with experience in building websites for small and medium sized businesses. Whether you’re trying to win work, list your services or even create a whole online store – I can help!<br></br> I’m experienced in HTML and CSS3, PHP, jQuery, MySQL Regular communication is really important to me, so let’s keep in touch!</p>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer'>
                                    <i className='fa fa-pen' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green'>Work History</h5> 
                                <p className='mt-4 fst-italic' style={{lineHeight:'2'}}>No work yet. Once you start getting hired on Upwork, your work with clients will show up here.</p>
                                <Link className='default-link' to="/">Search for jobs <i className='fa fa-link'></i></Link> 
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer'>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green'>Skills</h5> 
                                <div className='skills text-center mt-4 mb-1'>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Web-development</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>React</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Responsive</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Web-development</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>React</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Responsive</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Web-development</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>React</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Responsive</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Web-development</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>React</div>
                                    <div className='skill p-1 ps-2 pe-2 me-2'>Responsive</div>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className='ms-md-3 ms-0 first-border p-3 col-12 mt-3 position-relative'>
                                <span className='inner-circle inner-circle-right cursor-pointer'>
                                    <i className='fa fa-plus' style={{color:'#808080'}}></i>
                                </span>
                                <h5 className='fw-bold me-2 theme-green mb-3'>My Projects</h5> 
                                <ul className='list-inline'>
                                    <li className='list-inline-items'><i className='fab fa-github'></i>&nbsp;<a href='/' target='_blank' className='default-link'>Project 1<i className='fa fa-link'></i></a></li>
                                    <li className='list-inline-items'><i className='fab fa-github'></i>&nbsp;<a href='/' target='_blank' className='default-link'>Project 2<i className='fa fa-link'></i></a></li>
                                    <li className='list-inline-items'><i className='fab fa-github'></i>&nbsp;<a href='/' target='_blank' className='default-link'>Project 3<i className='fa fa-link'></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">
            <span className='inner-circle inner-circle-right cursor-pointer'>
                <i className='fa fa-plus' style={{color:'#808080'}}></i>
            </span>
            <h5 className='fw-bold me-2 theme-green ps-3 pt-3'>Certificates</h5> 
                <div className="container">
                <div className="row text-center">
                    <div className='cirtificate col-12 col-lg-6 p-3'>
                        
                        <div className='frame p-2'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3'>
                                    <img src={process.env.react_app_cloud +"job/default/certificate.png"} alt="certificate" width="80em" />
                                </div>
                                <div className='col-9 text-start position-relative'>
                                    <div className='down-trash'>
                                        <i className='fa fa-download'></i>&nbsp;&nbsp;<i className='fa fa-trash'></i>
                                    </div>
                                    <p className='fw-bold'>FULL STACK DEVELOPER</p>
                                    <p>Provider: Brototype</p>
                                    <p>Issued: 23/06/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cirtificate col-12 col-lg-6 p-3'>
                      
                        <div className='frame p-2'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3'>
                                    <img src={process.env.react_app_cloud +"job/default/certificate.png"} alt="certificate" width="80em" />
                                </div>
                                <div className='col-9 text-start position-relative'>
                                    <div className='down-trash'>
                                        <i className='fa fa-download'></i>&nbsp;&nbsp;<i className='fa fa-trash'></i>
                                    </div>
                                    <p className='fw-bold'>FULL STACK DEVELOPER</p>
                                    <p>Provider: Brototype</p>
                                    <p>Issued: 23/06/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>

        <div className='row mx-auto mt-3'>
            <div className="col-10 first-border centerfy">
            <span className='inner-circle inner-circle-right cursor-pointer'>
                <i className='fa fa-plus' style={{color:'#808080'}}></i>
            </span>
            <h5 className='fw-bold me-2 theme-green ps-3 pt-3'>Employment History</h5> 
                <div className="container">
                <div className="row text-center">
                    <div className='cirtificate col-12 col-lg-6 p-3'>
                        
                        <div className='frame p-2'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3'>
                                    <img src={process.env.react_app_cloud +"job/default/experience.png"} alt="certificate" width="100em" />
                                </div>
                                <div className='col-9 text-start position-relative'>
                                    <div className='down-trash'>
                                        <i className='fa fa-trash'></i>
                                    </div>
                                    <p className='fw-bold'>FULL STACK DEVELOPER</p>
                                    <p>Provider: Brototype</p>
                                    <p>Issued: 23/06/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cirtificate col-12 col-lg-6 p-3'>
                      
                        <div className='frame p-2'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3'>
                                    <img src={process.env.react_app_cloud +"job/default/experience.png"} alt="certificate" width="100em" />
                                </div>
                                <div className='col-9 text-start position-relative'>
                                    <div className='down-trash'>
                                        <i className='fa fa-trash'></i>
                                    </div>
                                    <p className='fw-bold'>FULL STACK DEVELOPER</p>
                                    <p>Provider: Brototype</p>
                                    <p>Issued: 23/06/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
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
