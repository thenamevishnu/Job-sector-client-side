import React from 'react'

function ModalDesign({action,children,className}) {
    const [modal,showModal] = action
    return (
        <>
            <div className={`${className ? className : " w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12"} p-3 fixed z-10 bg-white border-2 border-gray-300 left-1/2 top-24 rounded-xl shadow-xl`} style={{transform:"translate(-50%,0%)"}}>
                {children}
                <i className='absolute fa fa-close top-0 right-1 text-lg text-red-600 cursor-pointer' onClick={()=>showModal(!modal)}></i>
            </div>
        </>
    )
}

export default ModalDesign
