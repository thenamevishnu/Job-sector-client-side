import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div className='footer ms-3 mb-3 me-3 p-3 mt-5'>
        <div className='row text-center mx-auto mt-4 mb-5'>
            <div className="col-2"></div>
            <div className="col-2">
                <p>About US</p>
                <p>Contact US</p>
            </div>
            <div className="col-2">
                <p>Community</p>
                <p>About Job Sector</p>
            </div>
            <div className="col-2">
                <p>Term Of Service</p>
                <p>Privacy Policy</p>
            </div>
            <div className="col-2">
                <p>Feedback</p>
                <p>Help</p>
            </div>
            <div className="col-2"></div>
            </div>
           
            <div className='d-flex justify-content-around'>
                <div>
                Follow : <i className='fab fa-instagram fs-3 me-2'></i>
                    <i className='fab fa-whatsapp fs-3 me-2'></i>
                    <i className='fab fa-twitter fs-3 me-2'></i>
                    <i className='fab fa-linkedin fs-3 me-2'></i>
                </div>
                <div className=''>
                    <i className='fa fa-location-dot'></i> India / Kerala
                </div>
            </div>
            <hr></hr>
            <div className='mt-3 text-center'>
                 <i className='fa fa-copyright'></i> 2022 - 2023 | Job Sector 
            </div>
    </div>
  )
}

export default Footer
