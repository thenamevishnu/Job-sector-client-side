import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import api_call from '../../../axios'
import Loading from '../../Loading/Loading'
import Footer from '../Footer/Footer'
import { saveJob, sendProposal } from '../../../Services/FetchPosts'

function JobView() {
    
    const navigate = useNavigate()
    const {id,type} = useSelector(state => state.user)
    const [postInfo,setPostInfo] = useState({})
    const [related,setRelated] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        postInfo && related && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[postInfo,related])

    useEffect(() => {
        const post_id = localStorage.getItem("post-id")
        const getSinglePost = async () => {
            const {data} = await api_call.get("/get-single-post/"+post_id)
            setPostInfo(data.postData[0])
            setRelated(data.related)
        }
        getSinglePost()
    },[])

    useEffect(() => {
        const post_id = localStorage.getItem("post-id")
        const getSinglePost = async () => {
            const {data} = await api_call.get("/get-single-post/"+post_id)
            setPostInfo(data.postData[0])
            setRelated(data.related)
        }
        getSinglePost()
        window.scrollTo(0, 0)
    },[refresh])


    return (
        <>
            {loading ? <Loading/> : <div className='px-2 md:px-10'>
            <div className=' grid grid-cols-12 relative mx-auto mt-20 border-2 border-gray-400 rounded-xl'>
                {!postInfo?.title && <div className='text-center text-lg col-span-12'>Post Disabled or Deleted!</div>}

                {postInfo?.title && <div className="col-span-12">
                    <div className='grid grid-cols-12'>
                        <div className="lg:col-span-9 md:col-span-8 col-span-12 p-4">
                            
                            <div className='text-green-700 text-start mb-1' style={{fontSize:"1.2em"}}>{postInfo?.title}</div>
                            <div className='text-start  mb-2' style={{fontSize:"0.8em"}}>{postInfo?.jobType} - Est. Budget: ${postInfo?.priceRangefrom}-{postInfo?.priceRangeto} - Posted {moment(postInfo?.posted).fromNow()}</div>
                            <p className='text-start mt-4 whitespace-pre-wrap'>{postInfo?.description}</p> 
                            <div className='mt-4 mb-5 tags text-start'>
                                {
                                    postInfo?.skillsNeed && postInfo?.skillsNeed.map(value => {
                                        return(
                                            <span className='shadow-tag bg-gray-300 rounded-xl me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                        )
                                    })
                                }
                            </div>
                            
                            <div className='text-start mt-4 mb-4'>Connections Need : {postInfo?.connectionsNeedfrom}</div>
                            <div className='text-start mt-4 mb-4'>Total Proposals : {postInfo?.proposals?.length}</div>
                            <div className='text-start mt-1'>Payments - ${postInfo?.auther && postInfo?.auther[0]?.spent} Spent | <i className='fa fa-location-dot'></i> {postInfo?.auther && postInfo?.auther[0]?.profile?.country}</div>
                            {console.log(postInfo?.auther)}
                            <div className='text-start mt-3'>Rating : {postInfo?.auther && postInfo?.auther[0]?.profile?.avgRating}/5</div>
                            
                        </div>

                        <div className="lg:col-span-3 md:col-span-4 col-span-12 p-3">
                            <div className='border-2 border-gray-400 rounded-xl p-2'>
                                <div className='flex justify-center'>
                                    <img className='rounded-full cursor-pointer w-28 h-28 object-contain bg-gray-200 border-2' src={postInfo && `${process.env.react_app_cloud}/${postInfo?.auther[0]?.profile?.image}`} alt='auther pic' width="90em" onClick={()=>{localStorage.setItem("publicProfileClient",postInfo?.auther[0]?._id); navigate("/client-profile")}}/>
                                </div>
                                <div className='flex items-center justify-center mt-2'>
                                    <span>{postInfo && postInfo?.auther[0]?.profile?.full_name}</span>&nbsp;{postInfo?.auther[0]?.profile?.is_verified && <img src={`${process.env.react_app_cloud}/job/default/verification.png`} alt='auther pic' width="15em"/>}
                                </div>
                                <div className='text-center'>
                                    <span className='text-sm'><i className='fa fa-location-dot'></i> {postInfo && postInfo?.auther[0]?.profile?.country}</span>
                                </div>
                            </div>
                            {type === "freelancer" && <button className='p-2 bg-green-700 text-white w-full rounded-lg mt-3' onClick={async ()=>{setPostInfo({...postInfo,proposals:await sendProposal(postInfo._id,id)})}}><i className='far fa-paper-plane'></i> SEND PROPOSAL</button>}
                            <button className='p-2 border-2 text-green-700 border-green-700 w-full rounded-lg mt-3' onClick={()=>saveJob(postInfo._id,id)}><i className='far fa-heart'></i> SAVE JOB</button>
                        </div>
                    </div>
                </div>
                }

            </div>

            <div className=' grid grid-cols-12 mx-auto'>
                { related?.length > 0 && <div className="col-span-12">
                    <h4 className='font-bold text-xl underline my-5'>RELATED POSTS</h4>
                    {
                        related && related.map(relatedPost => {
                            return(
                                <div className="border-2 border-gray-400 p-3 rounded-xl mb-1" key={relatedPost._id}>
                                    <div className='text-green-700 text-start cursor-pointer' style={{fontSize:"1.2em"}} onClick={()=>{localStorage.setItem("post-id",relatedPost._id); setRefresh(!refresh); }}>{relatedPost?.title}</div>
                                    <div className='text-start  mb-2' style={{fontSize:"0.8em"}}>{relatedPost?.jobType} - {relatedPost?.experience} - Est. Budget: ${relatedPost?.priceRange?.from}-{relatedPost?.priceRange?.to} - Posted {moment(relatedPost?.posted).fromNow()}</div>
                                    <p className='text-start mt-4'>{relatedPost?.description}</p>
                                        <div className='mt-4 mb-5 tags text-start'>
                                            {
                                                relatedPost?.skillsNeed.map(value => {
                                                    return(
                                                        <span className='shadow-tag bg-gray-300 rounded-xl me-2 p-1 ps-2 pe-2' key={value}>{value}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    <div className='text-start mt-4 mb-4'>Total Proposals : {relatedPost?.proposals?.length}</div>
                                    <div className='text-start mt-1'>Payment verified - ${relatedPost?.auther[0]?.spent} Spent | <i className='fa fa-location-dot'></i> India</div>
                                    <div className='text-start mt-3'>Rating : {relatedPost?.auther[0]?.profile?.avgRating}/5</div>
                                </div>  
                            )
                        })
                }
                </div>
                }
            </div>
           
            </div>}
            {loading | !postInfo?.title ? "" : <Footer />}
        </>
        
    )
}

export default JobView
