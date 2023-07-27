import React from 'react'

function Notification() {
    return (
        <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl border-2 md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">Broadcasting System</h1>
                <form className="mt-6" >
                    <div className="mb-2">
                        <select className='p-2 border-2 border-gray-400 rounded-lg outline-none w-full'>
                            <option value="promotional">Promotional</option>
                            <option value="broadcast">Broadcast</option>
                            <option value="account">Account Related</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <textarea type="text" className='p-2 resize-none border-2 border-gray-400 rounded-lg outline-none w-full' />
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
