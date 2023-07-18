import React, { useEffect, useState } from 'react'
import "./Index.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { errorAlert } from '../../../Functions/Toasts'
import { Link, useNavigate } from 'react-router-dom'
import { changeAvailable, removeSaved } from '../../../Functions/Profile'
import moment from 'moment'
import { isSaved, saveJob } from '../../../Functions/Posts'

function Index() {

    const {id,type} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})
    const [postData,setPostData] = useState([])
    const [showData,setShowData] = useState("/getLatest")
    const [saved_jobs,setSavedJobs] = useState([])
    const [savedId,setSavedId] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response1 = await axios.post(process.env.react_app_server + "/getUserData",{id},{withCredentials:true})
                const response2 = await axios.get(process.env.react_app_server + showData)
                console.log(response2.data);
                response1.data.profile.total_saved = response1?.data?.saved_jobs?.length
                setUserData(response1.data.profile)
                setSavedJobs(response1.data.saved_jobs)
                setPostData(response2.data.postData)
            }catch(err){
                errorAlert(err.message)
            }
      }
      fetchData()
    },[id,showData,type])
    
    return (
        <div className='landing-page text-center'>
            <div className="row mx-auto">
                <div className="col-12">
                    <div className="row offset-1 gap-3">
                        <div className="col-7">
                            <label className='search position-relative' htmlFor='search'>
                                <input type='text' className='p-2' name="search" id='search' placeholder='Search for jobs...'></input>
                                <button className='search-button position-absolute p-2'><i className='fa fa-search'></i></button>
                            </label>

                            <div className="col-12 border-20 mt-5">
                              
                                <div className="row">
                                    <h4 className='text-start p-3 fw-bold'>{type === "freelancer" ? "Jobs you might like" : "Job Board"}</h4>
                                    <div className='text-start p-3'>
                                        {type === "freelancer" && <span className={showData === "/bestMatch/"+id ? 'text-success me-4 cursor-pointer' : 'me-4 cursor-pointer'} onClick={()=>setShowData("/bestMatch/"+id)}>Best Matches</span>}
                                        <span className={showData === "/getLatest" ? 'text-success me-4 cursor-pointer' : 'me-4 cursor-pointer'} onClick={()=>setShowData("/getLatest")}>Most Recent</span>
                                        <span className={showData === "/getSavedPost/"+id ? 'text-success cursor-pointer' : 'cursor-pointer'} onClick={()=>setShowData("/getSavedPost/"+id)}>Saved Jobs ({userData?.total_saved})</span>
                                    </div>
                                    <hr/>

                                    {
                                        postData?.length === 0 && <div className='fs-5'>No Posts Found!</div>
                                    }
                                    {
                                        postData && postData.map(obj => {
                                           return(
                                            <div className="col-12 cursor-pointer jobs-bg border-20 mb-2" key={obj._id}>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='p-3'>
                                                        <div className='text-success text-start' style={{fontSize:"1.2em",maxWidth:"35em"}} onClick={()=>{localStorage.setItem("post-id",obj._id); navigate("/post-view")}}>{obj.title}</div>
                                                    </div>
                                                    {showData === "/getSavedPost/"+id+"" && <div className='p-3'>
                                                        <i className='fa fa-trash me-3' title='remove from saved list' onClick={async ()=>{const info = await removeSaved(obj._id,id,savedId); setPostData(info.postData); setUserData({...userData,total_saved:userData?.total_saved - 1})}}></i>
                                                    </div>}
                                                    {showData !== "/getSavedPost/"+id+"" && <div className='p-3'>
                                                        <i className='far fa-thumbs-down me-3'></i>
                                                        <i className={isSaved(saved_jobs,obj._id) ? 'fas fa-heart' : savedId?.includes(obj._id) ? 'fas fa-heart' : 'far fa-heart'} onClick={async ()=>{
                                                            const saved = await saveJob(obj._id,id,userData); 
                                                            setUserData({...userData, total_saved: saved.total}); 
                                                            setSavedId([...savedId,obj._id])
                                                            }}></i>
                                                    </div>}
                                                </div>
                                                <div className='p-3'>
                                                    <div className='text-start' style={{fontSize:"0.8em"}}>{obj.jobType} - {obj.experience} - Est. Budget: {obj.jobType === "Hourly" ? "$"+obj.priceRange.from+"-"+obj.priceRange.to+"/hr" : "$"+obj.priceRange.from+"-"+obj.priceRange.to} - Posted {moment(obj?.posted).fromNow()}</div>
                                                    <div className='text-start mt-4' style={{overflow:'hidden'}}>{obj.description}</div>
                                                    <div className='mt-4 tags text-start'>
                                                        {
                                                            obj.skillsNeed && obj.skillsNeed.map(skill => {
                                                                return(
                                                                    <span key={skill}>
                                                                        <span className='tag me-2 p-1 ps-2 pe-2'>{skill}</span>
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className='text-start mt-4'>Total Proposals : {obj.proposals?.length}</div>
                                                    <div className='text-start mt-1'>Payments - ${obj.auther[0]?.profile?.spent} Spent | <i className='fa fa-location-dot'></i> {obj.auther[0]?.profile?.country}</div>
                                                    <div className='text-start mt-3'>Rating : {obj.auther[0]?.profile?.rating}
                                                    </div>
                                                </div>  
                                            </div>
                                           )
                                        })
                                    }
                        
                                </div>

                            </div>
                        </div>

                        <div className="col-4">
                            
                            <div className='col-12 border-20 p-3 mb-3'>
                                <div className='profile-info'>
                                    <img src={userData?.image && `${process.env.react_app_cloud}/${userData.image}`} alt='profile pic' onClick={()=>navigate("/my-profile")} className='cursor-pointer'/>
                                    <div className='text-center mt-3 verified'>
                                    {userData?.full_name && userData.full_name} {userData.is_verified && <img className='ms-1' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='verification badge'/>}
                                    </div>
                                    <div className='text-center fst-italic mt-1' style={{fontSize:"12px"}}>{userData?.title && userData.title}</div>
                                    <div className='mt-3'>{userData?.connections?.count} Connections</div>
                                    <hr></hr>
                                    <div className='availability mt-4'>
                                        <div className='button d-flex align-items-center justify-content-center mb-3'>Availability Badge 
                                            <label className="toggle-button ms-2">
                                                {userData.available && <input type="checkbox" onChange={()=>{changeAvailable(!userData.available,id); setUserData({...userData,available:!userData.available})}} checked/>}
                                                {!userData.available && <input type="checkbox" onChange={()=>{changeAvailable(!userData.available,id); setUserData({...userData,available:!userData.available})}}/>}
                                                    <span className="slider"></span>
                                            </label> 
                                        </div>
                                        {userData?.available ? <span className='status border-20 p-1 ps-2 pe-2'><i className='fa fa-circle text-success'></i> Available</span> : <span className='status border-20 p-1 ps-2 pe-2'><i className='fa fa-circle text-danger'></i> UnAvailable</span>}
                                    </div>
                                </div>
                            </div>
                            {type === "freelancer" && <div className='my-proposals border-20 p-2 text-start'>
                                <h4 className='fw-bold p-2'>Proposals</h4>
                                <Link className='default-link p-2' to="/my-proposals" onClick={()=>navigate("/my-proposals")}>My Proposals</Link>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
