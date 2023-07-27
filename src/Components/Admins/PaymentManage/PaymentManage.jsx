import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAdminData, payoutManageAdmin } from '../../../Api/Admin'
import { useNavigate } from 'react-router-dom'

function PaymentManage() {

    const [payouts,setPayouts] = useState([])

    const {admin_id} = useSelector(state => state.user)

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            const admin = await getAdminData(admin_id)
            setPayouts(admin.response)
        }
        fetchData()
    },[admin_id])

    const payoutManage = async (items, type) => {
        setPayouts(await payoutManageAdmin(items, type, admin_id))
    }

    return (
        <div className='container grid grid-cols-12 mt-20 mx-auto gap-1'>
            {
                payouts && payouts.map(items => {
                    return (
                        <>
                            <div className='md:col-span-6 col-span-12 p-3 border-2 border-gray-400 rounded-lg flex justify-between'>
                                <div>
                                    <p>Amount : ${items.amount}</p>
                                    <p>Status : {items.status}</p>
                                    <p>UserID : <span className='text-green-700 cursor-pointer' onClick={()=>{localStorage.setItem("publicProfile",items.user_id); navigate("/profile")}}>{items.user_id}</span></p>
                                    <p>Email : {items.to}</p>
                                </div>
                                <div className='flex items-center'>
                                    {items.status === "Paid" ? "Paid" : items.status === "Rejected" ? "Rejected" : <><i className='fa fa-circle-check mr-2 text-2xl text-green-700 cursor-pointer' title="accept" onClick={()=>{payoutManage(items,true)}}></i><i className='fa fa-circle-xmark text-2xl text-red-600 cursor-pointer' title="reject" onClick={()=>payoutManage(items,false)}></i></>}
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default PaymentManage
