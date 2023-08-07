import React from 'react'

function NotFound() {
    return (
        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
           <img src={process.env.react_app_cloud + "job/default/404.png"} alt='No Page Found!'/>
        </div>
    )
}

export default NotFound
