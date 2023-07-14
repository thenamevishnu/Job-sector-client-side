import React from 'react'
import "./ContactInfo.css"
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { useSelector } from 'react-redux'

function ContactInfo() {

    const {name,email,id} = useSelector(state => state.user)

  return (
      <div className='row contact-info'>
            <ProfileMenu />
            <h3 className='fw-bold text-success d-block d-md-none'>Contact Info</h3>
            <div className='col-lg-5 col-md-7 col-10 centerfy'>
               
            <div className='row gap-3'>
            <div className='col-12 right-col p-3 position-relative'>

                    <span className='inner-circle cursor-pointer'><i className='fa fa-pen' style={{color:'#808080'}}></i></span>

                    <h4>UserID</h4>
                    <code className='text-dark'>{id}</code>
                    
                    <h4 className='mt-3'>Name</h4>
                    <code className='text-dark'>{name}</code>
                    
                    <h4 className='mt-3'>UserID</h4>
                    <code className='text-dark'>{email}</code>

                    </div>
                    <div className='col-12 right-col p-3 position-relative'>
                    <span className='inner-circle cursor-pointer'><i className='fa fa-pen' style={{color:'#808080'}}></i></span>
                    <h3>Location</h3>

                    <h4 className='mt-3'>Time Zone</h4>
                    <code className='text-dark'>erwrwsfasdfasdfgadfg</code>

                    <h4 className='mt-3'>Address</h4>
                    <code className='text-dark'>erwrwsfasdfasdfgadfg</code>

                    <h4 className='mt-3'>Phone Number</h4>
                    <code className='text-dark'>erwrwsfasdfasdfgadfg</code>

                    </div>
               
            </div>  
            </div>

      </div>
  )
}

export default ContactInfo
