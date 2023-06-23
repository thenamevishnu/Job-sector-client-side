import React from 'react'
import "./Modal.css"

function Modal(props) {

    const {data} = props
    const [modal,showModal] = props.states

  return (

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(false)}></i>
            <h3>{data.title}</h3>
            <select className='box' onChange={(e)=>props.sendDataToParant({hoursPerWeek:e.target.value})}>
                <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                <option value="As needed - open to offers">As needed - open to offers</option>
                <option value="None">None</option>
            </select>
        </div>
   
  )
}

export default Modal
