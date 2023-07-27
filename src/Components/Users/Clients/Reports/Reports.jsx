import React, { useEffect, useState } from 'react'
import ProfileMenu from '../../ProfileMenu/ProfileMenu'
import { getClientReport } from '../../../../Api/user'
import { useSelector } from 'react-redux'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function Reports() {

    const {id} = useSelector(state => state.user)
    const [reports,setReports] = useState({})

    useEffect(()=>{
        const getReports = async () => {
            const repo = await getClientReport(id)
            console.log(repo);
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
            text: 'Spent Chart',
          },
        },
      };
      
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const data = {
        labels,
        datasets: [
          {
            label: 'Spent',
            data: Array(labels.length).fill(0),
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          }
        ],
    };

    reports?.project_cost?.forEach(obj => {
        const findIndex = labels.indexOf(obj.month)
        data.datasets[0].data[findIndex] = obj.cost
    })

    return (
        <div className='container grid grid-cols-12 mx-auto mt-20 gap-1'>
            <ProfileMenu active={{myReports:true}}/>
            <div className='md:col-span-8 col-span-12 rounded-xl border-2 border-gray-400'>
                <div className='container grid grid-cols-12 max-auto p-3 gap-1'>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 text-lg text-center rounded-lg border-2 border-violet-800 p-3 text-violet-800'>
                        <p className='mb-3'>Total Posts</p>
                        <p>{reports && reports?.total_post}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 text-lg text-center rounded-lg border-2 border-yellow-500 p-3 text-yellow-500'>
                        <p className='mb-3'>Enabled Posts</p>
                        <p>{reports && reports?.enabled}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 text-lg text-center rounded-lg border-2 border-blue-900 p-3 text-blue-900'>
                        <p className='mb-3'>Disabled Posts</p>
                        <p>{reports && reports?.disabled}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 text-lg text-center rounded-lg border-2 border-green-800 p-3 text-green-800'>
                        <p className='mb-3'>Completed Jobs</p>
                        <p>{reports && reports?.completed}</p>
                    </div>
                    <div className='col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 text-lg text-center rounded-lg border-2 border-red-600 p-3 text-red-600'>
                        <p className='mb-3'>Total Spent</p>
                        <p>{reports && `-$${reports?.spent}`}</p>
                    </div>

                    <div className='col-span-12 h-auto'>
                        <Bar options={options} data={data} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reports
