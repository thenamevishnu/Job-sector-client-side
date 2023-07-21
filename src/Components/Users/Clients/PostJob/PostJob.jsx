import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addSkills, postNewJob, removeSkills } from '../../../../Functions/Posts'
import { useNavigate } from 'react-router-dom'
import { fetchSkills } from '../../../../Api/FetchSkills'

function PostJob() {

    const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const [skill,setSkill] = useState("")
    const [post,setPost] = useState({
        title:"",
        experience:"",
        jobType:"",
        priceRange:"",
        connectionsNeed:"",
        description:"",
        skillsNeed:[]
    })

    const [AllSkills,setAllSkills] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            setAllSkills(await fetchSkills())
        }
        fetchData()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(await postNewJob(post,id)){
            setTimeout(()=>navigate("/"),2000)
        } 
        
    }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen mt-4 overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Post New job</h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none'  placeholder='Title' name='title' value={post.title} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                        </div>
                        <div className="mb-2">
                            <select className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' name='experience' value={post.experience} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                                <option value="0">Select Experience Level</option>
                                <option value="Entry Level">Entry Level</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <select className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' name='jobType'  value={post.jobType} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                                <option value="0">Select Job Type</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Fixed Price">Fixed Price</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Price Range ($)- Eg: 100-150' name='priceRange'  value={post.priceRange} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                        </div>
                        <div className='mb-2'>
                            <select className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' name='connectionsNeed'  value={post.connectionsNeed} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                                <option value="0">Select Connections Needed</option>
                                <option value="1-5">1 to 5</option>
                                <option value="6-10">6 to 10</option>
                                <option value="11-25">11 to 25</option>
                                <option value="26-50">26 to 50</option>
                                <option value="51-100">51 to 100</option>
                                <option value="100-500">100+ Connections</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <textarea type='text' className='block resize-none w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' placeholder='Description about the job!' name='description'  value={post.description} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></textarea>
                        </div>
                        <div className='mb-2'>
                            <input type='text' className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border border-green-400 rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none' list='showSkills' value={skill} onChange={(e)=>setSkill((e.target.value).replace(/\b\w/g, (match) => match.toUpperCase()))} placeholder='Add Keywords!'/> 
                        </div>

                        <div>
                                    {skill && <div key={skill} className='inline p-1 relative'>
                                            <span className='p-1' style={{fontSize:"12px"}}>{skill} <i className='fa fa-plus text-green-700 cursor-pointer' title='add to keyword' onClick={async (e)=>{setPost({...post,skillsNeed:await addSkills(skill.replace(/\b\w/g, (match) => match.toUpperCase()),post)}); setSkill("")}}></i></span>
                                    </div>}   </div>
                        <div className='overflow-y-hidden overflow-x-scroll whitespace-nowrap skillsBar p-3'>
                        {
                            post?.skillsNeed && post?.skillsNeed.map(value => {
                                return (
                                    <div key={value} className='inline p-1 relative shadow-tag rounded-xl me-2 bg-gray-200'>
                                            <span className='p-1' style={{fontSize:"12px"}}>{value} <i className='fa fa-close text-red-600 cursor-pointer' title='remove' onClick={async ()=>setPost({...post,skillsNeed:await removeSkills(value,post)})}></i></span>
                                    </div>
                                )
                            })
                        }
                        </div>
                    <datalist id='showSkills'>
                        {
                            AllSkills && AllSkills.map(value => {
                                return(
                                    <option value={value} key={value}>{value}</option>
                                )
                            })
                        }
                    </datalist> 
                        <div className="mt-6">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                                <i className='fa fa-paper-plane'></i> Post Job
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </>
        
    )
}

export default PostJob
