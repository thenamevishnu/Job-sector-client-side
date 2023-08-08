import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSkills, removeSkills, updateMyPost } from '../../../../Functions/Posts'
import { fetchSinglePost } from '../../../../Api/FetchPosts'
import { fetchSkills } from '../../../../Api/FetchSkills'
import Loading from '../../../Loading/Loading'

function PostEdit() {
    const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const post_id = localStorage.getItem("client-edit-post")
    const [post,setPost] = useState({
        title:"",
        experience:"",
        jobType:"",
        priceRange:"",
        connectionsNeed:"",
        description:"",
        skillsNeed:[]
    })
    const [AllSkills, setAllSkills] = useState([])
    const [skill,setSkill] = useState("")
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        post_id && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[post_id])

    useEffect(()=>{
        const fetchPostData = async () => {
            const posts = await fetchSinglePost(post_id)
            setPost({
                title:posts.title,
                experience:posts.experience,
                jobType:posts.jobType,
                priceRange:posts.priceRangefrom+"-"+posts.priceRangeto,
                connectionsNeed:posts.connectionsNeedfrom+"-"+posts.connectionsNeedto,
                description:posts.description,
                skillsNeed:posts.skillsNeed
            })
            setAllSkills(await fetchSkills())
        }
        fetchPostData()
    },[post_id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(await updateMyPost(post, id, post_id)){
            setTimeout(() => navigate("/"),2000);
        }
    }

    return (
        <>
        {loading ? <Loading/> : <div className="relative flex flex-col justify-center min-h-screen mt-4 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">edit job</h1>
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
                                <option value="0-6">0 to 6</option>
                                <option value="6-10">6 to 10</option>
                                <option value="10-25">10 to 25</option>
                                <option value="26-50">25 to 50</option>
                                <option value="50-100">50 to 100</option>
                                <option value="100-500">100 - 500</option>
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
                            <i className='fa fa-pen'></i> Edit Job
                        </button>
                    </div>
                </form>
            
            </div>
        </div>}
        </>
    )
}

export default PostEdit
