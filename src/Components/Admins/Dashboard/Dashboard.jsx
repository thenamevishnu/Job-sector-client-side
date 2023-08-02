import React, { useEffect, useState } from 'react'
import { getDashboard } from '../../../Api/Admin'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function Dashboard() {

    const [adminDashboard,setAdminDashboard] = useState({})
    const {admin_id} = useSelector(state => state.admin)

    useEffect(()=>{
        const fetchData = async () => {
            const data = await getDashboard(admin_id)
            setAdminDashboard(data)
        }
        fetchData()
    },[])

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
            text: 'Profit Chart',
          },
        },
      };
      
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const data = {
        labels,
        datasets: [
          {
            label: 'Profit',
            data: Array(labels.length).fill(0),
            backgroundColor: 'rgba(0, 128, 0, 0.5)',
          }
        ],
    };

    adminDashboard?.profitData?.forEach(obj => {
        const findIndex = labels.indexOf(obj.month)
        data.datasets[0].data[findIndex] = obj.amount
    })

    return (
        <>
        {
            adminDashboard && <div className='grid grid-cols-12 container mt-20 gap-3 mx-auto'>
                {
                    Object.entries(adminDashboard).filter(items => items[0]!=="profitData").map(items => {
                        return (
                            <div className='col-span-6 sm:col-span-4 md:col-span-3 text-center py-2 text-lg rounded-lg border-2 border-gray-400 shadow-lg' key={items[0]}>
                                <p>{items[0]}</p>
                                <p>{(items[0] === "ClientSpent" || items[0] === "Profit" || items[0] === "FreelancerBalance") && "$"} {items[1]}</p>
                            </div>
                        )
                    })
                }
                <div className='col-span-12 h-auto'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        }
        </>
    )
}

export default Dashboard
