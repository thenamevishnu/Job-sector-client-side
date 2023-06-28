import React, { useEffect, useState } from 'react'
import "./Index.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { errorAlert } from '../../Functions/Toasts'

function Index() {

    const {id} = useSelector(state => state.user)
    const [userData,setUserData] = useState({})


    useEffect(()=>{
        const fetchData = async () => {
          try{
              const {data} = await axios.post(process.env.react_app_server + "/getUserData",{id},{withCredentials:true})
              setUserData(data.profile)
          }catch(err){
              errorAlert(err.message)
          }
      }
      fetchData()
    })

    return (
      <div className='landing-page text-center'>
          <div className="row mx-auto">
              <div className="col-12">
                  <div className="row offset-1 gap-3">
                      <div className="col-7">
                          <label className='search position-relative' htmlFor='search'>
                              <input type='text' className='p-2' name="search" id='search'></input>
                              <button className='search-button position-absolute p-2'><i className='fa fa-search'></i></button>
                          </label>

                          <div className="col-12 border mt-5">
                              sjkdfhlsakdf
                          </div>
                      </div>
                      <div className="col-4 border p-3">
                          <div className='profile-info'>
                              <img src={`${process.env.react_app_cloud}/${userData.image}`} />
                              <div className='text-center mt-3 verified'>
                                  {userData.full_name} {userData.is_verified && <img className='ms-1' src={`${process.env.react_app_cloud}/job/default/verification.png`} />}
                              </div>
                              <div className='text-center fst-italic mt-1' style={{fontSize:"12px"}}>{userData.title}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Index
