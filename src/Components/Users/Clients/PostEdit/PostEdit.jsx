import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSkills, removeSkills, updateMyPost } from '../../../../Functions/Posts'
import { ToastContainer } from 'react-toastify'
import { fetchSinglePost } from '../../../../Api/FetchPosts'
import { fetchSkills } from '../../../../Api/FetchSkills'

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
    useEffect(()=>{
        const fetchPostData = async () => {
            const posts = await fetchSinglePost(post_id)
            setPost({
                title:posts.title,
                experience:posts.experience,
                jobType:posts.jobType,
                priceRange:posts.priceRange.from+"-"+posts.priceRange.to,
                connectionsNeed:posts.connectionsNeed.from+"-"+posts.connectionsNeed.to,
                description:posts.description,
                skillsNeed:posts.skillsNeed
            })
            setAllSkills(await fetchSkills())
        }
        fetchPostData()
    },[post_id])

    return (
        <div className='post-job'>
            <div className='container'>
                <h2 className='text-center mt-3'>Edit a job</h2>
                <div className='form mt-5 text-center'>
                    <input type='text' className='mb-3 p-2' placeholder='Title' name='title' value={post?.title} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                    <select className='p-2 mb-3' name='experience' value={post?.experience} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                    <select className='p-2 mb-3' name='jobType'  value={post?.jobType} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Job Type</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Fixed Price">Fixed Price</option>
                    </select>
                    <input type='text' className='mb-3 p-2' placeholder='Price Range ($)- Eg: 100-150' name='priceRange'  value={post.priceRange} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                    <select className='p-2 mb-3' name='connectionsNeed'  value={post?.connectionsNeed} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Connections Needed</option>
                        <option value="1-5">1 to 5</option>
                        <option value="6-10">6 to 10</option>
                        <option value="11-25">11 to 25</option>
                        <option value="26-50">26 to 50</option>
                        <option value="51-100">51 to 100</option>
                        <option value="100-500">100+ Connections</option>
                    </select>
                    <textarea type='text' className='mb-3 p-2' placeholder='Description about the job!' name='description'  value={post?.description} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></textarea>
                    {/* <select className='p-2 mb-1' name='skillsNeed' onChange={async (e)=>setPost({...post,skillsNeed:await addSkills(e.target.value,post)})}>
                        <option value="0">Select Skills Needed</option>
                        <option value="React">React</option>
                        <option value="Nodejs">Nodejs</option>
                        <option value="CSS">CSS</option>
                    </select> */}
                    <input type='text' className='p-2 mb-1' list='showSkills' value={skill} onChange={(e)=>setSkill((e.target.value).replace(/\b\w/g, (match) => match.toUpperCase()))} placeholder='Add Keywords!'/> 
                                    <div style={{overflowX:"auto",overflowY:"hidden"}}>
                                    {skill && <div key={skill} className='d-inline keywords p-1 position-relative'>
                                            <span className='list p-1' style={{fontSize:"12px"}}>{skill} <i className='fa fa-plus text-success cursor-pointer' title='add to keyword' onClick={async (e)=>{setPost({...post,skillsNeed:await addSkills(skill.replace(/\b\w/g, (match) => match.toUpperCase()),post)}); setSkill("")}}></i></span>
                                    </div>}   </div>
                        {
                            post?.skillsNeed && post?.skillsNeed.map(value => {
                                return (
                                    <div key={value} className='d-inline keywords p-1 position-relative'>
                                            <span className='list p-1' style={{fontSize:"12px"}}>{value} <i className='fa fa-close text-danger cursor-pointer' title='remove' onClick={async ()=>setPost({...post,skillsNeed:await removeSkills(value,post)})}></i></span>
                                    </div>
                                )
                            })
                        }
                    <datalist id='showSkills'>
                        {
                            AllSkills && AllSkills.map(value => {
                                return(
                                    <option value={value} key={value}>{value}</option>
                                )
                            })
                        }
                    </datalist>        
                   
                    <button className='button p-2 ps-3 pe-3 mt-4 mb-4' onClick={async ()=>{await updateMyPost(post,id,post_id) && setTimeout(()=>{navigate("/")},2000)}}><i className='fa fa-pen'></i> Edit Now</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default PostEdit
