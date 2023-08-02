import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { SocketContext } from '../../SocketContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VideoCall() {

    const contextApi = useContext(SocketContext)
    const {id} = useSelector(state=>state.user)
    const {socket} = contextApi?.socket
    const {room_id} = useParams()
    const myVideo = useRef(null)
    const userVideoSrc = useRef(null)
    let localStream=useRef(null);
    let remoteStream = useRef(null);
    let peerConnection = useRef(null);
    
    const navigate = useNavigate()
    
    const Servers = useMemo(()=>{
        return {iceServers:[
            {
                urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]
            }
        ]}
    },[])

    const createPeerConnection = useCallback(async (user_id) => {

        peerConnection.current = new RTCPeerConnection(Servers)

        remoteStream.current = new MediaStream();

        if(remoteStream.current){
            userVideoSrc.current.srcObject = remoteStream.current
        }  

        if(localStream.current){
            localStream.current.getTracks().forEach(async (track)=>{
                await peerConnection.current.addTrack(track, localStream.current);
            })
        }

        peerConnection.current.ontrack = async (event) => {
            event.streams[0].getTracks().forEach(async track => {
                await remoteStream.current.addTrack(track);
                userVideoSrc.current.srcObject = remoteStream.current
            })
        }

        peerConnection.current.onicecandidate = async (event) => {
            if(event.candidate){
                socket.emit("sendMessageToPeer",{type:"candidate",candidate:event.candidate, room_id})
            }
        } 
 
    },[Servers,room_id, socket])
    
    const createOffer = useCallback(async (user_id) => {
        if(!peerConnection.current){
            await createPeerConnection(user_id)
        }
        let offer = await peerConnection.current.createOffer()
        await peerConnection.current?.setLocalDescription(offer)
        socket.emit("sendMessageToPeer",{type:"offer",offer:offer, room_id})
    },[createPeerConnection,room_id,socket])

    const handleUserJoined = useCallback(async (user_id) => {
        await createOffer(user_id)
    },[createOffer])

    const createAnswer = useCallback(async (user_id, offer) => {
        if(!peerConnection.current){
            await createPeerConnection(user_id)
        }
        await peerConnection.current.setRemoteDescription(offer)
        let answer = await peerConnection.current.createAnswer()
        await peerConnection.current?.setLocalDescription(answer)
        socket.emit("sendMessageToPeer",{type:"answer",answer:answer, room_id})
    },[createPeerConnection,room_id,socket])

    useEffect(()=>{
    
        const userVideo = async () => {

            await socket.emit("join-video-chat", {room_id:room_id, user_id:id})

            localStream.current = await navigator.mediaDevices.getUserMedia({video:true, audio:false})

            if(myVideo.current){ 
                myVideo.current.srcObject = localStream.current
            }

            if (peerConnection.current){
                localStream.current.getTracks().forEach(async (track)=>{
                    await peerConnection.current.addTrack(track, localStream.current)
                })
            }
         
            userVideoSrc.current.srcObject = remoteStream.current
        }
        if(!socket)
            navigate("/chats")
        else
            userVideo()

    },[id,navigate,room_id,socket])

    const addAnswer = async (answer) => {
        if(peerConnection.current && !peerConnection.current.currentRemoteDescription){
            await peerConnection.current.setRemoteDescription(answer)
        }
        userVideoSrc.current.srcObject = remoteStream.current
    }

    useEffect(()=>{
        if(!socket){
            navigate("/chats")
        }else{
            socket.on("newUser", async (user_id) => await handleUserJoined(user_id));
            socket.on("receivedPeerToPeer", async (data) => {
            
            if(data.type==="offer"){
                await createAnswer(data.user_id, data.offer)
            }
            if(data.type==="answer"){
                await addAnswer(data.answer)
            }
            if(data.type==="candidate"){
                if(peerConnection.current){
                    await peerConnection.current.addIceCandidate(data.candidate)
                }
            }
        })
        }
    },[createAnswer, handleUserJoined,navigate,socket])

    const toggleCamera = () => {
        const videoTrack = localStream.current.getTracks().find(track => track.kind === "video")
        if(videoTrack.enabled){
            videoTrack.enabled = false
        }else{
            videoTrack.enabled = true
        }
    }

    const toggleMic = () => {
        const audioTrack = localStream.current.getTracks().find(track => track.kind === "audio")
       console.log(localStream.current.getTracks());
        if(audioTrack.enabled){
            audioTrack.enabled = false
        }else{
            audioTrack.enabled = true
        }
    }

    return (
        <div className='grid grid-cols-12 mx-auto gap-3 relative'>
            <video autoPlay className='col-span-12 h-screen w-screen bg-black' ref={userVideoSrc}></video>
            <video autoPlay className='rounded-3xl absolute bottom-2 right-2 w-32 bg-black' ref={myVideo} muted={true}></video>
            <div className='absolute bottom-5 left-1/2 translate-x-[-50%]'>
                    <i className='fas fa-microphone bg-blue-900 px-3 text-white  text-xl py-1.5 rounded-full cursor-pointer' onClick={()=>toggleMic()}></i>
                    <i className='fas fa-video ms-3 bg-blue-900 px-3 text-white  text-xl py-1.5 rounded-full cursor-pointer' onClick={()=>toggleCamera()}></i>
                    <i className='fas fa-phone ms-3 bg-red-700 px-3 text-white  text-xl py-1.5 rounded-full cursor-pointer'></i>

            </div>
        </div>
    )
}

export default VideoCall
