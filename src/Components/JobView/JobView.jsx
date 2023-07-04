import React, { useEffect, useState } from 'react'
import "./JobView.css"
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { saveJob, sendProposal } from '../../Functions/Posts'
import moment from "moment"

function JobView() {
    
    // const navigate = useNavigate()
    const {id} = useSelector(state => state.user)
    const [postInfo,setPostInfo] = useState({})
    const [related,setRelated] = useState([])
    const [refresh,setRefresh] = useState(false)

    useEffect(() => {
        const post_id = localStorage.getItem("post-id")
        const getSinglePost = async () => {
            const {data} = await axios.get(process.env.react_app_server + "/get-single-post/"+post_id)
            setPostInfo(data.postData[0])
            setRelated(data.related)
        }
        getSinglePost()
    },[])

    useEffect(() => {
        const post_id = localStorage.getItem("post-id")
        const getSinglePost = async () => {
            const {data} = await axios.get(process.env.react_app_server + "/get-single-post/"+post_id)
            setPostInfo(data.postData[0])
            setRelated(data.related)
        }
        getSinglePost()
        window.scrollTo(0, 0)
    },[refresh])

    return (
        <div className='post-view'>
            <div className='container'>
                <div className="row gap-5">
                    <div className="col-12 border-20 p-3">
                    {!postInfo?.title && <div className='text-center'>Post Not Found!</div>}
                    {postInfo?.title && <div className="row d-flex justify-content-between">
                        <div className="col-8">
                            
                           <div className="col-12">
                                <div className='d-flex justify-content-between'>
                                    <div className='p-3 mb-2'>
                                        <div className='text-success text-start' style={{fontSize:"1.2em",maxWidth:"35em"}}>{postInfo?.title}</div>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <div className='text-start  mb-2' style={{fontSize:"0.8em"}}>{postInfo?.jobType} - Est. Budget: ${postInfo?.priceRange?.from}-{postInfo?.priceRange?.to} - Posted {moment(postInfo?.posted).fromNow()}</div>
                                    <p className='text-start mt-4' style={{lineHeight:"2.5"}}>{postInfo?.description}</p>
                                    <div className='mt-4 mb-5 tags text-start'>
                                        {
                                            postInfo?.skillsNeed && postInfo?.skillsNeed.map(value => {
                                                return(
                                                    <span className='tag me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='text-start mt-4 mb-4'>Total Proposals : {postInfo?.proposals?.length}</div>
                                    <div className='text-start mt-1'>Payments - ${postInfo?.auther && postInfo?.auther[0]?.spent} Spent | <i className='fa fa-location-dot'></i> {postInfo?.auther && postInfo?.auther[0]?.profile?.country}</div>
                                    <div className='text-start mt-3'>Rating : {postInfo?.auther && postInfo?.auther[0]?.profile?.rating}</div>
                                </div>  
                            </div>
                        </div>
                        <div className="col-3 text-center">
                           <div className='auther-info border-20 p-2 text-center'>
                                <img src={postInfo && `${process.env.react_app_cloud}/${postInfo?.auther[0]?.profile?.image}`} alt='auther pic' width="90em" style={{borderRadius:"50px"}}/>
                                <div className='d-flex align-items-center justify-content-center mt-2'>
                                    <span>{postInfo && postInfo?.auther[0]?.profile?.full_name}</span>&nbsp;{postInfo?.auther[0]?.profile?.is_verified && <img src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='auther pic' width="15em" />}
                                </div>
                                <div>
                                    <span className='fst-italic' style={{fontSize:"12px"}}>{postInfo && postInfo?.auther[0]?.profile?.title}</span>
                                </div>
                           </div>
                           <button className='apply-job mt-4 p-2 fw-bold' onClick={async ()=>{setPostInfo({...postInfo,proposals:await sendProposal(postInfo._id,id)})}}><i className='far fa-paper-plane'></i> SEND PROPOSAL</button>
                           <button className='save-job mt-3 p-2 fw-bold' onClick={()=>saveJob(postInfo._id,id)}><i className='far fa-heart'></i> SAVE JOB</button>
                        </div>
                        </div>}
                    </div>

                    <div className="col-12 border-20 p-3">
                        <h4 className='fw-bold'>RELATED POSTS</h4>
                        <hr />
                        {
                            related && related.map(relatedPost => {
                                return(
                                    <div className="col-12 border-20 mb-2" key={relatedPost._id}>
                                        <div className='d-flex justify-content-between'>
                                            <div className='p-3 mb-2'>
                                                <div className='text-success text-start cursor-pointer' style={{fontSize:"1.2em",maxWidth:"35em"}} onClick={()=>{localStorage.setItem("post-id",relatedPost._id); setRefresh(!refresh); }}>{relatedPost?.title}</div>
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <div className='text-start  mb-2' style={{fontSize:"0.8em"}}>{relatedPost?.jobType} - {relatedPost?.experience} - Est. Budget: ${relatedPost?.priceRange?.from}-{relatedPost?.priceRange?.to} - Posted {moment(relatedPost?.posted).fromNow()}</div>
                                            <p className='text-start mt-4' style={{lineHeight:"2.5"}}>{relatedPost?.description}</p>
                                            <div className='mt-4 mb-5 tags text-start'>
                                                {
                                                    relatedPost?.skillsNeed.map(value => {
                                                        return(
                                                            <span className='tag me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='text-start mt-4 mb-4'>Total Proposals : {relatedPost?.proposals?.length}</div>
                                            <div className='text-start mt-1'>Payment verified - ${relatedPost?.auther[0]?.spent} Spent | <i className='fa fa-location-dot'></i> India</div>
                                            <div className='text-start mt-3'>Rating : {relatedPost?.auther[0]?.profile?.rating}</div>
                                        </div>  
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobView
