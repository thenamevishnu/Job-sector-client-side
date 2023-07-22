import React, { useEffect, useState } from 'react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { useSelector } from 'react-redux'
import { AddPaymentMethods, getUserData } from '../../../Api/user'
import { AddPaymentMethod, PaypalPay } from '../Modal/Modal'

function Balance() {

    const {id,type} = useSelector(state => state.user)
    const [modal,showModal] = useState({})
    const [userData,setUserData] = useState({})
    const [method, setMethods] = useState([])
   
    useEffect(()=>{
        const fetchData = async () => {
            setUserData(await getUserData(id))
        }
        fetchData()
    },[id])

    useEffect(()=>{
        const getWithdrawalOptions = async () => {
          const newArray = []
            for(let key in userData?.withdrawal_methods){
                newArray.push(key)
            }
            setMethods(newArray)
        }
        userData && getWithdrawalOptions()
    },[userData])

    const handleDataFromChild = async (data) => {
        if(data.addPayment){
            const response = await AddPaymentMethods(data,id)
            if(response){
                  setUserData({...userData,withdrawal_methods:{[data.addPayment.addMethod]:{to: data?.addPayment?.addMethod}}})
            }
        }
        if(data.amountPaid){
            setUserData({...userData,balance:parseFloat(userData.balance) + parseFloat(data.amountPaid),transactions:data.transactions})
        }
    }

    return (
      <>
      {modal.paypal && <PaypalPay data={modal} states={[modal, showModal]} getSuccess={handleDataFromChild}/>}
      {modal.addMethod && <AddPaymentMethod data={modal} states={[modal, showModal]} sendDataToParant={handleDataFromChild} />} 
      <div className='container grid grid-cols-12 mx-auto gap-2 mt-20'>
          <ProfileMenu active={{balance:true}}/>
              
            <div className='md:col-span-8 col-span-12'>
                {
                    type === "client" && <><div className='relative border-2 border-gray-400 p-3 mb-2 rounded-xl'>

                        <h3 className='font-bold text-green-700 block text-xl mb-2'>Available Fund</h3>  
                        <div className='flex justify-between items-center mt-10'>
                            <div>Available : ${userData && userData.balance}</div>
                            
                              <button className='text-white bg-green-700 rounded-lg p-1 px-2' onClick={()=>showModal({status:!modal.status,paypal:true})}><i className='fa fa-dollar'></i> Add Fund</button>
                           
                        </div>
                    </div>

                    <div className='p-3 border-2 border-gray-400 rounded-xl relative'>
                        <h3 className="text-green-700 font-bold text-xl">Last Payment Details</h3>

                    <div className='mx-4 mt-3'>
                        
                        <div className='container mx-auto grid grid-cols-12'>
                            {userData?.transactions?.length > 0 ? <div className='col-span-12 border-2 rounded-xl p-3 border-gray-400'>
                                <p>Amount : ${userData?.transactions[userData.transactions.length - 1]?.amount}</p>
                                <p>Pay_ID : {userData?.transactions[userData.transactions.length - 1]?.pay_id}</p>
                                <p>Time : {userData?.transactions[userData.transactions.length - 1]?.time}</p>
                            </div> : <p className='col-span-12 mt-4 text-red-600 text-sm'>There is no transactions found!</p>}
                        </div>
                          
                    </div>

                </div></>
                }
                {
                    type === "freelancer" && <><div className='relative border-2 border-gray-400 p-3 mb-2 rounded-xl'>

                        <h3 className='font-bold text-green-700 block text-xl mb-2'>Withdrawable Fund</h3>  
                        <div className='flex justify-between items-center mt-10'>
                            <div>Withdrawable : ${userData && userData.balance}</div>
                            <div><button className='text-white bg-green-700 rounded-lg p-1 px-2'><i className='fa fa-dollar'></i> Payout</button></div>
                        </div>
                    </div>
                    
                    <div className='p-3 border-2 border-gray-400 rounded-xl relative'>
                        <span className='absolute top-3 end-3 bg-green-700 rounded-lg text-white p-1 px-2'><button  onClick={()=>showModal({status:!modal.status,addMethod:true,title:"Add Payment Method"})}><i className='fa fa-plus'></i> Add Method</button></span>
                        <h3 className="text-green-700 font-bold text-xl">Withdrawal Methods</h3>

                    <div className='mx-4 mt-8'>
                        
                        <div className='container mx-auto grid grid-cols-12'>
                            {method?.length > 0 ?
                                
                                  method.map(item => {
                                      return(
                                        <button className='col-span-2 p-1 px-2 border-2 rounded-lg border-green-700 text-green-700 hover:text-white hover:bg-green-700 font-bold uppercase' key={item}><i className={item === "Paypal" ? 'fab fa-paypal' : ""}></i> {item}</button>
                                      )
                                  })
                                
                           : <p className='col-span-12 text-red-600 text-sm'>Withdrawal methods not added yet!</p>}
                        </div>
                       
                    </div>

                </div>
                
                <div className='p-3 border-2 border-gray-400 rounded-xl relative mt-2'>
                        <h3 className="text-green-700 font-bold text-xl">Last Withdrawal</h3>

                    <div className='mx-4 mt-8'>
                        
                        <div className='container mx-auto grid grid-cols-12'>
                        {userData?.transactions?.length > 0 ? <div className='col-span-12 border-2 rounded-xl p-3 border-gray-400'>
                                <p>Amount : ${userData?.transactions[0]?.amount}</p>
                                <p>Pay_ID : ${userData?.transactions[0]?.pay_id}</p>
                                <p>Time : ${userData?.transactions[0]?.time}</p>
                            </div> : <p className='col-span-12 mt-4 text-red-600 text-sm'>There is no transactions found!</p>}
                        </div>
                       
                    </div>

                </div></>
                }
            </div>  
        </div></>
    )
}

export default Balance
