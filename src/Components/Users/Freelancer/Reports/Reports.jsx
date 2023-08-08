import React, { useEffect, useState } from 'react'
import ProfileMenu from '../../ProfileMenu/ProfileMenu'
import { getUserReports } from '../../../../Api/user'
import { useSelector } from 'react-redux'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loading from '../../../Loading/Loading';

function Reports() {

    const {id} = useSelector(state => state.user)
    const [reports,setReports] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        reports && setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[reports])

    useEffect(()=>{
        const getReports = async () => {
            const repo = await getUserReports(id)
            setReports(repo)
        }
        getReports()
    },[id])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Earnings Chart',
          },
        },
      };
      
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const data = {
        labels,
        datasets: [
          {
            label: 'Earnings',
            data: Array(labels.length).fill(0),
            backgroundColor: 'rgba(0,128,0,0.8)',
          }
        ],
    };

    reports[0]?.project_cost.forEach(obj => {
        const findIndex = labels.indexOf(obj.month)
        data.datasets[0].data[findIndex] = obj.cost
    })

    return (
        <>
        {loading ? <Loading/> : <div className='container grid grid-cols-12 mx-auto mt-20 gap-1'>
            <ProfileMenu active={{myReports:true}}/>
            <div className='md:col-span-8 col-span-12 rounded-xl border-2 border-gray-400'>
                <div className='container grid grid-cols-12 max-auto p-3 gap-1'>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-violet-800 p-3 text-violet-800'>
                        <p className='mb-3'>Total Proposals</p>
                        <p>{reports && reports[0]?.proposals}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-yellow-500 p-3 text-yellow-500'>
                        <p className='mb-3'>Pending Proposals</p>
                        <p>{reports && reports[0]?.pending_proposals}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-blue-900 p-3 text-blue-900'>
                        <p className='mb-3'>Achieved Proposals</p>
                        <p>{reports && reports[0]?.achieved_proposals}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-green-800 p-3 text-green-800'>
                        <p className='mb-3'>Completed Proposals</p>
                        <p>{reports && reports[0]?.completed_proposals}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-red-800 p-3 text-red-800'>
                        <p className='mb-3'>Rejected Proposals</p>
                        <p>{reports && reports[0]?.rejected_jobs}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-orange-600 p-3 text-orange-600'>
                        <p className='mb-3'>Work History</p>
                        <p>{reports && reports[0]?.work_history}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-teal-600 p-3 text-teal-600'>
                        <p className='mb-3'>Saved Jobs</p>
                        <p>{reports && reports[0]?.saved_jobs}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 text-lg text-center rounded-lg border-2 border-green-600 p-3 text-green-600'>
                        <p className='mb-3'>Earnings</p>
                        <p>{reports && `+$${reports[0]?.balance}`}</p>
                    </div>


                   <div className='col-span-12'>
                            <Bar options={options} data={data} />
                   </div>

                </div>
            </div>
        </div>}
        </>
    )
}

export default Reports
