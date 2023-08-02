import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { errorAlert } from '../../../Functions/Toasts'
import { useNavigate } from 'react-router-dom'
import { changeAvailable, removeSaved } from '../../../Functions/Profile'
import moment from 'moment'
import { isSaved, saveJob } from '../../../Functions/Posts'
import { changeSearchResults } from '../../../Api/user'
import {v4 as uuidv4} from "uuid"

function Index() {

    const {id,type} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})
    const [postData,setPostData] = useState([])
    const [showData,setShowData] = useState("/getLatest")
    const [saved_jobs,setSavedJobs] = useState([])
    const [savedId,setSavedId] = useState([])
    const [searchValue,setSearch] = useState("")
    const [search,setResponses] = useState([])
    const searchContainer = useRef(null)
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
      if(searchContainer?.current){
        searchContainer.current.style.display = "none"
    }
    },[id,showData,type])

    const searchFlow = async (prefix) => {
        setSearch(prefix)
        if(prefix.trim() === ""){
            if(searchContainer?.current){
                searchContainer.current.style.display = "none"
            }
        }else{
            const response = await changeSearchResults(prefix.trim())
            if(response.length <= 0){
                if(searchContainer?.current){
                    searchContainer.current.style.display = "none"
                }
            }else{
                setResponses(response)
                if(searchContainer?.current){
                    searchContainer.current.style.display = "block"
                }
            }
        }
    }

    const showResult = async () => {
        if(searchValue!==""){
            const randomId = uuidv4()
            navigate(`/search?platform=job+sector&searchId=${randomId}&q=${searchValue}&searchTime=${new Date()}`)
        }
    }
     
    return (
        <div className='container grid grid-cols-12 mx-auto text-center mt-20 gap-1'>
            <div className='md:col-span-8 col-span-12 relative'>
                <label className='w-full relative' htmlFor='search'>
                    <input type='text' className='p-2 md:w-6/12 w-11/12  rounded-ss-xl rounded-es-xl outline-none border-2 border-gray-400' name="search" id='search' placeholder='Search for jobs...' value={searchValue} autoComplete='off' onChange={async (e)=>searchFlow(e.target.value)}></input>
                    
                    <i className='fa fa-search p-3 text-white bg-gray-600 rounded-ee-xl rounded-se-xl cursor-pointer' onClick={()=>showResult()}></i>
                </label>
                <section className='md:left-1/4 left-6 max-h-80 overflow-x-hidden overflow-y-scroll hideScrollBar border-2 md:w-6/12 w-11/12 p-3 bg-white absolute rounded-xl shadow-button' ref={searchContainer}>
                {
                     search && search.map(items => {
                            return(
                                <div key={items} className='text-start border-2 mb-0.5 border-gray-200 rounded-xl p-1 whitespace-nowrap overflow-hidden cursor-pointer hover:bg-slate-300' onClick={()=>{setSearch(items); if(searchContainer?.current){
                                    searchContainer.current.style.display = "none"
                                }}}><span className='text-green-700'>{searchValue}</span>{items.slice(searchValue.length)}</div>
                            )
                     })
                }
                </section>
            <div className="mt-3">
                <div className='border-2 border-gray-400 rounded-xl'>
                    <h4 className='text-start p-3 font-bold'>{type === "freelancer" ? "Jobs you might like" : "Job Board"}</h4>
                    <div className='text-start p-3'>
                        {type === "freelancer" && <span className={showData === "/bestMatch/"+id ? 'text-green-700 me-4 cursor-pointer' : 'me-4 cursor-pointer'} onClick={()=>setShowData("/bestMatch/"+id)}>Best Matches</span>}
                        <span className={showData === "/getLatest" ? 'text-green-700 me-4 cursor-pointer' : 'me-4 cursor-pointer'} onClick={()=>setShowData("/getLatest")}>Most Recent</span>
                        <span className={showData === "/getSavedPost/"+id ? 'text-green-700 cursor-pointer' : 'cursor-pointer'} onClick={()=>setShowData("/getSavedPost/"+id)}>Saved Jobs ({userData?.total_saved})</span>
                    </div>
                </div>
                <hr className='mb-3'/>

                {
                    postData?.length === 0 && <div className=' text-lg mt-2'>No Posts Found!</div>
                }
                {
                    postData && postData.map(obj => {
                        return(
                        <div className="cursor-pointer border-2 border-gray-400 rounded-2xl mb-2" key={obj._id}>
                            <div className='flex justify-between'>
                                <div className='p-3'>
                                    <div className='text-green-700 text-start' style={{fontSize:"1.2em",maxWidth:"35em"}} onClick={()=>{localStorage.setItem("post-id",obj._id); navigate("/post-view")}}>{obj.title}</div>
                                </div>
                                {showData === "/getSavedPost/"+id+"" && <div className='p-3'>
                                    <i className='fa fa-trash me-3' title='remove from saved list' onClick={async ()=>{const info = await removeSaved(obj._id,id,savedId); setPostData(info.postData); setUserData({...userData,total_saved:userData?.total_saved - 1})}}></i>
                                </div>}
                                {showData !== "/getSavedPost/"+id+"" && <div className='p-3'>
                                    <i className='far fa-thumbs-down me-3 bg-gray-300 rounded-full p-3 text-green-700'></i>
                                    <i className={isSaved(saved_jobs,obj._id) ? 'fas fa-heart bg-gray-300 rounded-full p-3 text-green-700' : savedId?.includes(obj._id) ? 'fas fa-heart bg-gray-300 rounded-full p-3 text-green-700' : 'far fa-heart bg-gray-300 rounded-full p-3 text-green-700'} onClick={async ()=>{
                                        const saved = await saveJob(obj._id,id,userData); 
                                        console.log(saved);
                                        setUserData({...userData, total_saved: saved}); 
                                        setSavedId([...savedId,obj._id])
                                        }}></i>
                                </div>}
                            </div>
                            <div className='p-3'>
                                <div className='text-start' style={{fontSize:"0.8em"}}>{obj.jobType} - {obj.experience} - Est. Budget: {obj.jobType === "Hourly" ? "$"+obj.priceRangefrom+"-"+obj.priceRangeto+"/hr" : "$"+obj.priceRangefrom+"-"+obj.priceRangeto} - Posted {moment(obj?.posted).fromNow()}</div>
                                <div className='text-start mt-4 overflow-hidden whitespace-pre-wrap'>{obj.description}</div>
                                <div className='mt-4 text-start'>
                                    {
                                        obj.skillsNeed && obj.skillsNeed.map(skill => {
                                            return(
                                                <span key={skill}>
                                                    <span className='rounded-xl bg-gray-300 shadow-tag me-2 p-1 ps-2 pe-2'>{skill}</span>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                                <div className='text-start mt-4'>Total Proposals : {obj.proposals?.length}</div>
                                <div className='text-start mt-1'>Payments - ${obj.auther[0]?.spent} Spent | <i className='fa fa-location-dot'></i> {obj.auther[0]?.profile?.country}</div>
                                <div className='text-start mt-3'>Rating : {obj.auther[0]?.profile?.rating}
                                </div>
                            </div>  
                        </div>
                        )
                    })
                }
    
            </div>
            </div>

            <div className='col-span-4 md:block hidden'>
                <div className='p-3 text-center border-gray-400 border-2 rounded-xl'>
                    <div className='flex justify-center'>
                        <img src={userData?.image && `${process.env.react_app_cloud}/${userData.image}`} alt='profile pic' onClick={()=>navigate("/my-profile")} className='cursor-pointer rounded-full w-32'/>
                    </div>
                    <div className='text-center mt-3'>
                        <div className=' flex items-center justify-center'>{userData?.full_name && userData.full_name} {userData.is_verified && <img className='ms-1 w-4 h-4.5' src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='verification badge'/>}</div>
                    </div>
                    <div className='text-center font-mono mt-1' style={{fontSize:"12px"}}>
                        {userData?.title && userData.title}
                    </div>
                    <div className='mt-3'>{userData?.connections?.count} Connections</div>
                        <hr></hr>
                        <div className='mt-4'>
                            <div className='flex items-center justify-center mb-3'><p className='mr-2'>Availability Badge</p>
                                    {userData.available && <><input onChange={()=>{changeAvailable(!userData.available,id); setUserData({...userData,available:!userData.available})}} checked className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]" type="checkbox" />
                            <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
                                    </>}
                                    {!userData.available && <><input onChange={()=>{changeAvailable(!userData.available,id); setUserData({...userData,available:!userData.available})}} className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]" type="checkbox" />
                            <label className="inline-block pl-[0.15rem] hover:cursor-pointer"></label>
                                    </>}
                                
                            </div>
                                {userData?.available ? <span className='bg-gray-400 rounded-md p-1 ps-2 pe-2'><i className='fa fa-circle text-green-700'></i> Available</span> : <span className='bg-gray-400 rounded-md p-1 ps-2 pe-2'><i className='fa fa-circle text-red-600'></i> UnAvailable</span>}
                        </div>
                </div>
                {type === "freelancer" && <div className='border-2 p-2 mt-1 text-start border-gray-400 rounded-xl'>
                <h4 className=' font-bold p-2 text-lg'>Proposals</h4>
                <span className=' text-green-700 text-sm cursor-pointer hover:text-blue-800 p-2' onClick={()=>navigate("/my-proposals")}>My Proposals</span>
            </div>}
            </div>
            
        </div>
    )
}

export default Index
