import React from 'react'
import VideoCall from '../../Components/VideoCall/VideoCall'
import Header from '../../Components/Users/Header/Header'

function VideoCallPage() {
    return (
        <div>
            <Header icons={true}/>
            <VideoCall/>
        </div>
    )
}

export default VideoCallPage