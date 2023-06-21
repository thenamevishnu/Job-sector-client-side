import React, { useEffect, useState } from 'react'
import "./SignupType.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function SignupType() {

    const [selected,setSelected] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
      const userStorage = localStorage.getItem("userStorage")
      if(userStorage) navigate("/")
    },[navigate])

    const errorAlert = async (message) => {
      toast.error(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
  }

    return (
        <div className='SignupType'>
            <div className='container'>
                <h2 className='text-center mt-3'>Join as a client or freelancer</h2>
                <div className='row mt-5 gap-md-0 d-flex justify-content-around'>
                  <div className='col-1'></div>
                  <div className='client p-4 col-md-4 col-8' onClick={()=>{
                      localStorage.setItem("type","client")
                      setSelected({client:true})
                  }}>
                      {(selected?.client || localStorage.getItem("type")==="client") && <span className='fa fa-circle-check text-success position-absolute' style={{right:"10px",top:"10px"}}></span>}
                      <img src="../resume.png" alt="resume" width="50px" style={{whiteSpace:"nowrap"}}/>
                      <h5>I am a client, hiring<br></br>for a project</h5>
                  </div>
                  <div className='col-md-2 col-1'></div>
                  <div className='freelancer p-4 col-md-4 col-8 mt-3 mt-md-0' onClick={()=>{
                      localStorage.setItem("type","freelancer")
                      setSelected({freelancer:true})
                  }}>
                      {(selected?.freelancer || localStorage.getItem("type")==="freelancer") && <span className='fa fa-circle-check text-success position-absolute' style={{right:"10px",top:"10px"}}></span>}
                      <img src="../job.png" alt="resume" width="50px" style={{whiteSpace:"nowrap"}}/>
                      <h5>I am a freelancer,<br></br>looking for works</h5>
                  </div>
                  <div className='col-md-1 col-0'></div>
                </div>
                <div className='mt-4 mt-md-5 text-center'>
                      <button className='button p-2 ps-3 ps-md-4 pe-3 pe-md-4' onClick={()=>{
                          if(localStorage.getItem("type")){
                            navigate("/signup")
                          }else{
                            errorAlert("Please select account type!")
                          }
                      }}>Continue</button>
                </div>
                <div className='text-center mt-3 mb-3'>Already have an account? <Link to="/login" className='default-link'>Login</Link></div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SignupType
