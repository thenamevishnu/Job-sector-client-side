import React, { useEffect, useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { getUserData } from '../../../Api/user'
import { useSelector } from 'react-redux'

function Payments() {

    const [userData,setUserData] = useState({})
    const {id} = useSelector(state => state.user)

    useEffect(()=>{
        const fetchData = async () => {
            setUserData(await getUserData(id))
        }
        fetchData()
    },[id])

    return (
        <>
            <div className='container grid grid-cols-12 mx-auto mt-20 gap-1'>
            <ProfileMenu active={{payments:true}}/>
                <div className="md:col-span-8 col-span-12 border-2 border-gray-400 rounded-xl ">

                    <div className='container mx-auto grid grid-cols-12 p-3 gap-2'>
                        <h1 className="whitespace-nowrap text-lg font-bold text-green-700">All Transactions</h1>
                        {userData?.transactions?.length > 0 ? userData?.transactions.map(item => {
                            return (
                                <div className='col-span-12 border-2 border-gray-400 rounded-lg p-2' key={item?.time}>
                                    <p>Amount : ${item?.amount}</p>
                                    <p>Status : {item?.status}</p>
                                    <p>Time : {item?.time}</p>
                                </div>
                            )
                        }) : <h1 className='col-span-12 text-center mt-10 text-red-600 text-lg'>No Transactions Found!</h1>}

                    </div>

                </div>

            </div>
        </>
    )
}

export default Payments
