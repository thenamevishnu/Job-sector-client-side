import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { warnAlert } from '../../../Functions/Toasts';

function SignupType() {

    const [selected,setSelected] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
      const userStorage = localStorage.getItem("userStorage")
      if(userStorage) navigate("/")
    },[navigate])

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-3xl">
                <div className="grid sm:grid-cols-2 xm:grid-cols-1 gap-4 mx-auto text-center">
                <div className='relative shadow-2xl p-4 rounded-lg border flex items-center cursor-pointer' onClick={()=>{
                      localStorage.setItem("type","client")
                      setSelected({client:true})
                  }}>
                      {(selected?.client || localStorage.getItem("type")==="client") && <span className='fa fa-circle-check text-green-800 absolute top-2 end-2'></span>}
                      <img src="../resume.png" alt="resume" className="whitespace-nowrap rounded-full w-24"/>
                      <h5 className="text-lg">I am a client, hiring for a project</h5>
                  </div>

                  <div className='relative shadow-2xl p-4 rounded-lg border flex items-center cursor-pointer' onClick={()=>{
                      localStorage.setItem("type","freelancer")
                      setSelected({freelancer:true})
                  }}>
                      {(selected?.freelancer || localStorage.getItem("type")==="freelancer") && <span className='fa fa-circle-check text-green-800 absolute top-2 end-2'></span>}
                      <img src="../job.png" alt="resume" className='whitespace-nowrap rounded-full w-24'/>
                      <h5 className="text-lg">I am a freelancer looking for works</h5>
                  </div>
                </div>
                <div className="mt-8">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800" onClick={()=>{
                          if(localStorage.getItem("type")){
                              navigate("/signup")
                          }else{
                              warnAlert("Select Account Type!")
                          }
                      }}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default SignupType
