import React, { useContext, useEffect, useRef } from 'react'
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
    let remoteStream = useRef(new MediaStream());
    let peerConnection = useRef(null);
    const navigate = useNavigate()

    const Servers = {
        iceServers:[
            {
                urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]
            }
        ]
    }

    const createPeerConnection = async (user_id) => {
        peerConnection.current = new RTCPeerConnection(Servers)

        peerConnection.current.onicecandidate = async (event) => {
            if(event.candidate){
                socket.emit("sendMessageToPeer",{type:"candidate",candidate:event.candidate, user_id})
            }
        }   

        if(localStream.current){
            console.log('this world');
            localStream.current.getTracks().forEach(async (track)=>{
                await peerConnection.current.addTrack(track, localStream.current)
            })
        }

        peerConnection.current.ontrack = async (event) => {
            event?.streams[0]?.getTracks().forEach(async track => {
                console.log('Hai world');
                await remoteStream.current.addTrack(track)
            })
        }
    }
    
    const createOffer = async (user_id) => {
        await createPeerConnection(user_id)
        let offer = await peerConnection.current.createOffer()
        await peerConnection.current.setLocalDescription(offer)
        socket.emit("sendMessageToPeer",{type:"offer",offer:offer, user_id})
    }

    const handleUserJoined = async (user_id) => {
        createOffer(user_id)
    }

    const createAnswer = async (user_id, offer) => {
        await createPeerConnection(user_id)
        await peerConnection.current.setRemoteDescription(offer)
        let answer = await peerConnection.current.createAnswer()
        await peerConnection.current.setLocalDescription(answer)
        socket.emit("sendMessageToPeer",{type:"answer",answer:answer, user_id})
    }

    useEffect(()=>{
    
        const userVideo = async () => {

            await socket.emit("join-video-chat", {room_id:room_id, user_id:id})

            localStream.current = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
            if(myVideo.current){
               
                myVideo.current.srcObject = localStream.current
            }
            if (peerConnection.current){
                console.log('this is world');
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
    },[])

    const addAnswer = async (answer) => {
        if(peerConnection.current && !peerConnection.current.currentRemoteDescription){
            await peerConnection.current.setRemoteDescription(answer)
        }
    }

    useEffect(()=>{
        if(!socket){
            navigate("/chats")
        }else{
            socket.on("newUser", (user_id) => handleUserJoined(user_id));
        socket.on("receivedPeerToPeer", (data) => {
            
            if(data.type==="offer"){
                createAnswer(data.user_id, data.offer)
            }
            if(data.type==="answer"){
                addAnswer(data.answer)
            }
            if(data.type==="candidate"){
                if(peerConnection.current){
                    peerConnection.current.addIceCandidate(data.candidate)
                }
            }
        })
        }
    },[])

    return (
        <div className='container grid grid-cols-12 mx-auto mt-20 gap-3 relative'>
            <video autoPlay className='col-span-6 bg-black rounded-lg' width="100%" ref={userVideoSrc}>

            </video>
            <video autoPlay className='col-span-6 bg-black rounded-lg' ref={myVideo}>

            </video>
        </div>
    )
}

export default VideoCall
