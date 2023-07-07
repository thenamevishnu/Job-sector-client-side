import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import "./PostJob.css"
import { useSelector } from 'react-redux'
import { addSkills, postNewJob, removeSkills } from '../../Functions/Posts'
import { useNavigate } from 'react-router-dom'

function PostJob() {

    const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const [post,setPost] = useState({
        title:"",
        experience:"",
        jobType:"",
        priceRange:"",
        connectionsNeed:"",
        description:"",
        skillsNeed:[]
    })



    return (
        <div className='post-job'>
            <div className='container'>
                <h2 className='text-center mt-3'>Post a job</h2>
                <div className='form mt-5 text-center'>
                    <input type='text' className='mb-3 p-2' placeholder='Title' name='title' value={post.title} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                    <select className='p-2 mb-3' name='experience' value={post.experience} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                    <select className='p-2 mb-3' name='jobType'  value={post.jobType} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Job Type</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Fixed Price">Fixed Price</option>
                    </select>
                    <input type='text' className='mb-3 p-2' placeholder='Price Range ($)- Eg: 100-150' name='priceRange'  value={post.priceRange} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></input>
                    <select className='p-2 mb-3' name='connectionsNeed'  value={post.connectionsNeed} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}>
                        <option value="0">Select Connections Needed</option>
                        <option value="1-5">1 to 5</option>
                        <option value="6-10">6 to 10</option>
                        <option value="11-25">11 to 25</option>
                        <option value="26-50">26 to 50</option>
                        <option value="51-100">51 to 100</option>
                        <option value="100-500">100+ Connections</option>
                    </select>
                    <textarea type='text' className='mb-3 p-2' placeholder='Description about the job!' name='description'  value={post.description} onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})}></textarea>
                    <select className='p-2 mb-1' name='skillsNeed' onChange={async (e)=>setPost({...post,skillsNeed:await addSkills(e.target.value,post)})}>
                        <option value="0">Select Skills Needed</option>
                        <option value="React">React</option>
                        <option value="Nodejs">Nodejs</option>
                        <option value="CSS">CSS</option>
                    </select>
                    
                        {
                            post?.skillsNeed && post.skillsNeed.map(value => {
                                return (
                                    <div key={value} className='d-inline keywords p-1 position-relative'>
                                            <span className='list p-1' style={{fontSize:"12px"}}>{value} <i className='fa fa-close text-danger cursor-pointer' onClick={async ()=>setPost({...post,skillsNeed:await removeSkills(value,post)})}></i></span>
                                    </div>
                                )
                            })
                        }
                   
                    <button className='button p-2 ps-3 pe-3 mt-4 mb-4' onClick={async ()=>{await postNewJob(post,id) && navigate("/")}}><i className='fa fa-paper-plane'></i> Post Now</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default PostJob
