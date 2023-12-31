import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { errorAlert } from '../../../Services/Toasts'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addConnection, getUserData } from '../../../Services/user';
import Loading from '../../Loading/Loading';

function PublicProfile() {

    const [userData,setUserData] = useState({})
    const [userId,setUserId] = useState("")
    const {id} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        userData && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[userData])

    useEffect(()=>{
        const id = localStorage.getItem("publicProfile")
        const fetchData = async () => {
            try{
                const {data} = await getUserData(id)
                setUserId(data._id)
                setUserData(data.profile)
            }catch(err){
                errorAlert(err.message)
            }
        }
        if(id){
            fetchData()
        }else{
            navigate("/")
        }
    },[navigate])

    const downloadPdf = async (fileUrl) => {

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = new Date().getTime() +".pdf"; 

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
        errorAlert("Error!")
        }
    };


    return (
        <>
        {loading ? <Loading/> : <>    
        <div className=' grid grid-cols-12 mx-auto mt-20 gap-1 px-2 md:px-10'>

            <div className='md:col-span-4 col-span-12'>
                <div className='text-center mb-1 border-2 rounded-xl border-gray-400 p-2 relative'>
                    <div className='flex justify-center'>
                        <img className='w-28 h-28 object-contain bg-gray-200 border-2 rounded-full' src={process.env.react_app_cloud + "/" + userData.image} alt='profile-pic'/>
                    </div>
                    {
                        id!==userId && <span className='absolute bottom-1 end-1 text-white p-2 rounded-full w-8 flex justify-center items-center h-8 bg-blue-900 me-3 mb-2 cursor-pointer fs-5' onClick={async ()=>await addConnection(id,userId)} title={`Follow ${userData?.full_name}`}><i className='fa fa-plus'></i></span>
                    }
                    <div className='info mt-3'>
                        <div className='flex items-center justify-center'>{userData.full_name} {userData.is_verified && <img src={process.env.react_app_cloud + 'job/default/verification.png'} alt='verified' className='w-4 h-4.5 ms-1'></img>}</div>
                        <p className='text-sm'>Level: {userData.experience}</p>
                        <p><i className='fa fa-location-dot'></i> {userData.country}</p>
                    </div>
                </div>

                <div className='border-2 border-gray-400 rounded-xl p-2'>
                        
                    <div className='relative flex items-center'>
                        <h5 className='font-bold mr-2 text-green-700 text-lg'>Audio Introduction</h5> 
                    </div> 

                    <audio controls style={{width:"100%"}}>
                        <source src={process.env.react_app_cloud_audio + "" + userData.audio} />
                    </audio>


                    <div className='mt-4'>
                        <div className='relative flex items-center'>
                            <h5 className='font-bold me-2 text-green-700 text-lg'>Resume</h5> 
                        </div> 
                        {userData?.pdf ? <span onClick={async ()=>await downloadPdf(`${process.env.react_app_cloud_audio}${userData?.pdf}`)}>View Resume<i className='fa fa-link'></i></span> : <div className='text-sm text-start text-red-600'>Not added yet!</div>}
                    </div>

                    <div className='mt-4'>
                        <div className='relative flex items-center'>
                            <h5 className='font-bold me-2 text-green-700 text-lg'>Hours per week</h5> 
                        </div> 
                        <p>{userData.hoursPerWeek}</p>
                    </div>

                    <div className='mt-5'>
                        <div className='relative flex items-center mt-4'>
                            <h5 className='font -bold me-2 theme-green text-lg text-green-700'>Languages</h5> 
                        </div> 
                    <div>
                            {
                                userData?.language?.length === 0 && <div className='text-sm text-start text-red-600'>Not added yet!</div>
                            }
                            {
                            userData?.language && userData.language.map((obj,index)=>{
                                return (
                                    <p key={index}>{obj.lang} - {obj.level}</p>
                                )
                            }) 
                        }</div>
                        
                    </div>
                    <div className='mt-5'>
                        <div className='relative flex items-center mt-4'>
                            <h5 className='font-bold me-2 text-green-700 text-lg'>Education</h5> 
                        </div> 
                        <div>
                            {
                                userData?.education?.length === 0 && <div className='text-sm text-start text-red-600'>Not added yet!</div>
                            }
                            {
                                userData?.education && userData.education.map((obj,index)=>{
                                    return (
                                        <p key={index}>{obj.name} <br /> {obj.subject} <br /> {obj.from} - {obj.to}</p>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                </div>

            </div>

            <div className='md:col-span-8 col-span-12'>
                <div className="border-2 p-3 rounded-xl border-gray-400">
                    <div className='relative'>
                        <h5 className='font-bold me-2 text-green-700 text-lg'>{userData?.title && userData.title}</h5> 
                        <span className='theme-green fs-6 fw-bold'>Hourly: ${userData?.per_hour && userData.per_hour}/hour</span>
                        <p className='mt-4 fst-italic' style={{lineHeight:'2'}}>{userData?.description && userData.description}</p>
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
                    </div>
                </div>
                <div className="border-2 rounded-xl border-gray-400 mt-1 p-3">
                    <div className='relative'>
                        <h5 className='font-bold me-2 text-green-700 text-lg'>Skills</h5> 
                        <div className='text-center mt-4 mb-1 overflow-x-scroll overflow-y-hidden flex skillsBar'>
                            {
                                userData?.skills?.length === 0 && <div className='text-sm text-start text-red-600'>You haven't added skills yet!</div>
                            }
                            {
                                userData.skills && userData.skills.map(value => {
                                    return(
                                        <div key={value} className='relative p-1 pb-3'><div className='p-1 ps-2 pe-2 me-2 bg-gray-300 shadow-tag rounded-3xl'>{value}</div></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="border-2 rounded-xl border-gray-400 mt-1 p-3">
                    <div className='relative'>
                        <h5 className='font-bold me-2 text-green-700 text-lg mb-3'>My Projects</h5> 
                        <ul className="ms-2">
                            {
                                userData?.my_projects?.length === 0 && <div className='text-sm text-start text-red-600'>You haven't added Projects yet!</div>
                            }
                            {
                                userData?.my_projects && userData.my_projects.map((obj) => {
                                    return(
                                        <li className='mb-3' key={obj.name}><i className='fab fa-github'></i>&nbsp;Link : <a href={obj.url} rel="noreferrer" target='_blank' className='text-green-700'>{obj.name}</a> <br></br>Language : {obj.language}<br></br>Created At : {obj.created_at}<br></br></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

            </div>

            <div className=' grid grid-cols-12 mx-auto mt-1 px-2 md:px-10'>
            <div className="col-span-12 border-2 border-gray-400 relative rounded-xl p-3">
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
                                            <p className='font-bold'>{obj.title}</p>
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

            <div className=' grid grid-cols-12 mx-auto mt-1 px-2 md:px-10 mb-5'>
            <div className="col-span-12 border-2 border-gray-400 relative rounded-xl p-3">
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
                                            <p className='font-bold'>{obj.title}</p>
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
                </>}
        </>
         )
}

export default PublicProfile
