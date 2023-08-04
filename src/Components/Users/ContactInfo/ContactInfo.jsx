import React from 'react' 
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { useSelector } from 'react-redux'

function ContactInfo() {

    const {name,email,id,country} = useSelector(state => state.user)

  return (
      <div className='container grid grid-cols-12 mx-auto gap-2 mt-20'>
          <ProfileMenu active={{contactInfo:true}}/>
                
                  <div className='md:col-span-8 col-span-12'>
                      <div className='relative border-2 border-gray-400 p-3 mb-2 rounded-xl'>

                          <h3 className=' font-bold text-green-700 block text-xl mb-2'>Contact Info</h3>  
                          <div className='ml-5'>
                                <h4 className='mb-2'>UserID:</h4>
                                <code className='text-black ml-2'>{id}</code>
                            
                                <h4 className='mt-5 mb-2'>Name:</h4>
                                <code className='text-black ml-2'>{name}</code>
                            
                                <h4 className='mt-5 mb-2'>Email:</h4>
                                <code className='text-black ml-2'>{email}</code>
                          </div>

                      </div>
                      <div className='p-3 border-2 border-gray-400 rounded-xl relative'>
                          <h3 className="text-green-700 font-bold text-xl">Location</h3>

                          <div className='ml-5'>
                                <h4 className='mt-3'>Time Zone</h4>
                                <code className='text-black ml-2'>{Intl.DateTimeFormat().resolvedOptions().timeZone}</code>

                                <h4 className='mt-3'>Country</h4>
                                <code className='text-black ml-2'>{country}</code>
                          </div>

                      </div>
                
                  </div>  
              </div>
  )
}

export default ContactInfo
