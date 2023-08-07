import React, { useState } from 'react'
import { sendNotification } from '../../../Api/Admin'
import { useNavigate } from 'react-router-dom'

function Notification() {

    const [broadcastType,setBroadcastType] = useState("broadcast")
    const [broadcast, setBroadcast] = useState("")
    const navigate = useNavigate()

    const handleNotification = async (e) => {
        e.preventDefault()
        const status = await sendNotification(broadcastType, broadcast)
        if(status){
            setTimeout(() => {
                navigate("/admin")
            }, 1400);
        }
    }

    return (
        <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Broadcasting System</h1>
                <form className="mt-6" onSubmit={handleNotification}>
                    <div className="mb-2">
                        <select className='p-2 border-2 border-gray-400 rounded-lg outline-none w-full' onChange={(e) => setBroadcastType(e.target.value)}>
                            <option value="promotional">Promotional</option>
                            <option value="broadcast" selected={true}>Broadcast</option>
                            <option value="account">Account Related</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <textarea type="text" value={broadcast} className='p-2 resize-none border-2 border-gray-400 rounded-lg outline-none w-full' onChange={(e)=>setBroadcast(e.target.value)}/>
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none">
                            Send Broadcast
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Notification
