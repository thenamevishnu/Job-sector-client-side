import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSearchPosts } from '../../../Api/FetchPosts'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { changeSearchResults, getUserData } from '../../../Api/user'
import { isSaved, saveJob } from '../../../Functions/Posts'
import SearchFilter from './SearchFilter'
import {v4 as uuidv4} from "uuid"
import Loading from '../../Loading/Loading'

function SearchPost() {
    
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const [postData,setPostData] = useState([])
    const query = new URLSearchParams(location.search)
    const search = query.get("q")
    const experience = query.get("experience")
    const proposals = query.get("proposals")
    const connections = query.get("connections")
    const jobType = query.get("jobType")
    const sort = query.get("sort")
    const [savedId,setSavedId] = useState([])
    const [userData,setUserData] = useState({})
    const [saved_jobs,setSavedJobs] = useState([])
    const [searchValue,setSearch] = useState(""+search+"")
    const searchContainer = useRef(null)
    const [searchData,setResponses] = useState([])
    const [filter,setFilter] = useState({experience:experience?.split(",") ?? [],jobType:jobType?.split(",") ?? [],proposals:proposals?.split(",") ?? [],connections:connections?.split(",") ?? [],sort:sort ?? "rel"})
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
            if(searchContainer.current){
                searchContainer.current.style.display = "none"
            }
        }, 1000);
    },[])

    useEffect(()=>{
        const fetchData = async () => {
            const obj = {experience: experience , proposals:proposals , connections:connections , jobType:jobType , sort: sort}
            setFilter(obj)
            setPostData(await getSearchPosts(search, obj))
            const user = await getUserData(id)
            setUserData(user)
            setSavedJobs(user.saved_jobs)
            if(searchContainer.current){
                searchContainer.current.style.display = "none"
            }
        }
        fetchData()
    },[search,id, connections, jobType, proposals, experience, sort])

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

    const showResult = async (filters=null) => {
        if(searchValue!==""){
            const randomId = uuidv4()
            if(filters){
                let queryBuild = ""
                if(filters?.experience?.length>0){
                    queryBuild+="experience="+filters.experience.toString()
                }
                if(filters?.sort?.length>0){
                    queryBuild+="&sort="+filters.sort
                }
                if(filters?.jobType?.length>0){
                    queryBuild+="&jobType="+filters.jobType.toString()
                }
                if(filters?.connections?.length>0){
                    queryBuild+="&connections="+filters.connections.toString()
                }
                if(filters?.proposals?.length>0){
                    queryBuild+="&proposals="+filters.proposals.toString()
                }
                navigate(`/search?platform=job+sector&searchId=${randomId}&q=${searchValue}&searchTime=${new Date()}&${queryBuild}`)
            }else{
                navigate(`/search?platform=job+sector&searchId=${randomId}&q=${searchValue}&searchTime=${new Date()}`)
            }
        }
    }

    return (
        <>
        {loading ? <Loading/> :<>
            <div className='container grid mx-auto grid-cols-12 mt-20'>
                {filter && <SearchFilter showResult={showResult} queries={filter} filters={{experience, jobType, proposals, connections}}/>}
                <div className='col-span-8 p-3 relative'>
                    <div className='flex justify-between'>
                        <label className='w-8/12 relative' htmlFor='search'>
                            <input type='text' className='p-2 mb-2 w-8/12 rounded-ss-xl rounded-es-xl outline-none border-2 border-gray-400' name="search" id='search' placeholder='Search for jobs...' value={searchValue} autoComplete='off' onChange={async (e)=>searchFlow(e.target.value)}></input>
                            
                            <i className='fa fa-search p-3.5 text-white bg-gray-600 rounded-ee-xl rounded-se-xl cursor-pointer' onClick={()=>showResult()}></i>
                        </label>
                        <select className='border-2 mb-2 w-4/12 border-gray-400 rounded-lg outline-none' onChange={async (e) => {await showResult({...filter,sort:e.target.value})}}>
                            <option value="0">Sort</option>
                            <option value="latest" defaultValue={sort==="latest" ? true : false}>Posted Time Latest</option>
                            <option value="oldest" defaultValue={sort==="oldest" ? true : false}>Posted Time Oldest</option>
                            <option value="proposalsLow" defaultValue={sort==="proposalsLow" ? true : false}>Proposals Low-High</option>
                            <option value="proposalsHigh" defaultValue={sort==="proposalsHigh" ? true : false}>Proposals High-Low</option>
                            <option value="connectionsLow" defaultValue={sort==="connectionsLow" ? true : false}>Connection Needed Low-High</option>
                            <option value="connectionsHigh" defaultValue={sort==="connectionsHigh" ? true : false}>Connection Needed High-Low</option>
                        </select>
                    </div>
                    <section className={searchData.length > 0 && `md:right-1/2 left-6 max-h-80 overflow-x-hidden overflow-y-scroll hideScrollBar border-2 md:w-8/12 w-11/12 p-3 bg-white border-gray-400 absolute rounded-xl shadow-button`} ref={searchContainer}>
                    {
                        searchData?.length !== 0 && searchData.map(items => {
                                return(
                                    <div key={items} className='text-start mb-0.5 p-2 rounded-xl whitespace-nowrap overflow-hidden cursor-pointer hover:shadow-button hover:bg-gray-100' onClick={()=>{setSearch(items); if(searchContainer?.current){
                                        searchContainer.current.style.display = "none"
                                    }}}><span className='text-green-700'>{searchValue}</span>{items.slice(searchValue.length)}</div>
                                )
                        })
                    }
                    </section>
                    {
                        postData?.length > 0 ? postData.map(obj => {
                            return(
                            <div className="cursor-pointer border-2 border-gray-400 rounded-2xl mb-2" key={obj._id}>
                                <div className='flex justify-between'>
                                    <div className='p-3'>
                                        <div className='text-green-700 text-start' style={{fontSize:"1.2em",maxWidth:"35em"}} onClick={()=>{localStorage.setItem("post-id",obj._id); navigate("/post-view")}}>{obj.title}</div>
                                    </div>
                                    <div className='p-3'>
                                        <i className='far fa-thumbs-down me-3 bg-gray-300 rounded-full p-3 text-green-700'></i>
                                        <i className={isSaved(saved_jobs,obj._id) ? 'fas fa-heart bg-gray-300 rounded-full p-3 text-green-700' : savedId?.includes(obj._id) ? 'fas fa-heart bg-gray-300 rounded-full p-3 text-green-700' : 'far fa-heart bg-gray-300 rounded-full p-3 text-green-700'} onClick={async ()=>{
                                            const saved = await saveJob(obj._id,id,userData); 
                                            setUserData({...userData, total_saved: saved}); 
                                            setSavedId([...savedId,obj._id])
                                            }}></i>
                                    </div>
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
                                    <div className='text-start mt-3'>Rating : {obj.auther[0]?.profile?.avgRating}/5
                                    </div>
                                </div>  
                            </div>
                            )
                        }) : <div className='col-span-12 border-2 border-gray-400 p-3 rounded-lg text-center text-lg'>No Posts Found!</div>
                    }
                </div>
            </div>
        </>}
        </>
    )
}

export default SearchPost
