import React from 'react'

function Footer() {
  return (
    <div className='px-2 md:px-10'>
        <div className='mt-10 bg-gray-300 rounded-xl mx-auto px-5'>
            <div className='grid grid-cols-12 text-center p-3 m-3 '>
                <div className="md:col-span-3 col-span-6 mt-5">
                    <p>About US</p>
                    <p>Contact US</p>
                </div>
                <div className="md:col-span-3 col-span-6 mt-5">
                    <p>Community</p>
                    <p>About Job Sector</p>
                </div>
                <div className="md:col-span-3 col-span-6 mt-5">
                    <p>Term Of Service</p>
                    <p>Privacy Policy</p>
                </div>
                <div className="md:col-span-3 col-span-6 mt-5">
                    <p>Feedback</p>
                    <p>Help</p>
                </div>
            </div>

            <div className='container grid grid-cols-12 mx-auto mt-10'>
                <div className='md:col-span-6 col-span-12 text-2xl md:text-start text-center mb-3'>
                Follow : <i className='fab fa-instagram fs-3 me-2'></i>
                    <i className='fab fa-whatsapp fs-3 me-2'></i>
                    <i className='fab fa-twitter fs-3 me-2'></i>
                    <i className='fab fa-linkedin fs-3 me-2'></i>
                </div>
                <div className='md:col-span-6 col-span-12 md:text-right text-center'>
                    <i className='fa fa-location-dot'></i> India / Kerala
                </div>
            </div>
            <hr></hr>
            <div className='mt-3 text-center'>
                 <i className='fa fa-copyright'></i> 2022 - 2023 | Job Sector 
            </div>
        </div>
    </div>
    
  )
}

export default Footer
