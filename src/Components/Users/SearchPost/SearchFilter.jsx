import React, { useState } from 'react'

function SearchFilter({showResult, queries, filters}) {

    const experience = [{id:"entrylevel",text:"Entry Level"},{id:"intermediate",text:"Intermediate"},{id:"expert",text:"Expert"}]
    const jobType = [{id:"hourly",text:"Hourly"},{id:"fixedPrice",text:"Fixed Price"}]
    const proposals = [{id:"lessthan5",text:"0 - 5"},{id:"5to10",text:"5 - 10"},{id:"10to25",text:"10 - 25"},{id:"25to50",text:"25 - 50"},{id:"50plus",text:"50 - 500"}]
    const connections = [{id:"1to6",text:"0 - 6"},{id:"6to10",text:"6 - 10"},{id:"11to25",text:"10 - 25"},{id:"26to50",text:"25 - 50"},{id:"51to100",text:"50 - 100"},{id:"100plus",text:"100 - 500"}]
    
    const [check,setCheck] = useState(queries)
    
    const Filter = (text,field) => {
        if(!check[field]?.includes(text)){
            if(field === "connections" || field === "proposals"){
                check[field]?.shift()
            }
            check[field].push(text)
            setCheck({...check,[field]:check[field]})
            showResult(check)
        }else{
            check[field]?.splice(check[field]?.indexOf(text),1)
            setCheck({...check,[field]:check[field]})
            showResult(check)
        }
    }

    return (
        <div className='col-span-4'>
            <div className='grid grid-cols-12'>

                <div className='col-span-12 text-center text-lg mb-3 p-3'>Filter Options</div>
                <div className='col-span-12 border-2 border-gray-400 rounded-xl p-3'>
                    
                    <div>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-green-700 text-lg font-bold'>Experience Level</h1>
                            <div><i className='fa fa-arrow-down'></i></div>
                        </div>
                        <div className='ml-2'>
                            {
                                experience.length > 0 && experience.map(items => {
                                    return (
                                        
                                            <div className='mt-3' key={items.id}>
                                                <label htmlFor={items.id} onClick={()=>{Filter(items.text,"experience")}} className={check?.experience?.includes(items.text) || filters?.experience?.split(",")?.includes(items.text) ? 'px-1 text-white border-gray-400 mr-1 rounded-md cursor-pointer bg-green-700' : 'px-2.5 border-2 border-gray-400 mr-1 rounded-md cursor-pointer'}>{(check?.experience?.includes(items.text) || filters?.experience?.split(",")?.includes(items.text)) && <i className='fa fa-check'></i>}</label>
                                                <input type='checkbox' id={items.id} className='hidden'/> {items.text}
                                            </div>
                                        
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-green-700 text-lg font-bold'>Job Type</h1>
                            <div><i className='fa fa-arrow-down'></i></div>
                        </div>
                        <div className='ml-2'>
                            {
                                jobType.length > 0 && jobType.map(items => {
                                    return(
                                        
                                            <div className='mt-3' key={items.id}>
                                                <label htmlFor={items.id} onClick={()=>{Filter(items.text,"jobType")}} className={check?.jobType?.includes(items.text) || filters?.jobType?.split(",")?.includes(items.text) ? 'px-1 text-white border-gray-400 mr-1 rounded-md cursor-pointer bg-green-700' : 'px-2.5 border-2 border-gray-400 mr-1 rounded-md cursor-pointer'}>{(check?.jobType?.includes(items.text) || filters?.jobType?.split(",")?.includes(items.text)) && <i className='fa fa-check'></i>}</label>
                                                <input type='checkbox' id={items.id} className='hidden'/> {items.text}
                                            </div>
                                        
                                    )
                                })          
                            }
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-green-700 text-lg font-bold'>Number of proposals</h1>
                            <div><i className='fa fa-arrow-down'></i></div>
                        </div>
                        <div className='ml-2'>
                            {
                                proposals.length > 0 && proposals.map(items => {
                                    return(
                                        
                                            <div className='mt-3' key={items.id}>
                                                <label htmlFor={items.id} onClick={()=>{Filter(items.text,"proposals")}} className={(check?.proposals?.includes(items.text) || filters?.proposals?.split(",")?.includes(items.text)) ? 'px-1 text-white border-gray-400 mr-1 rounded-md cursor-pointer bg-green-700' : 'px-2.5 border-2 border-gray-400 mr-1 rounded-md cursor-pointer'}>{(check?.proposals?.includes(items.text) || filters?.proposals?.split(",")?.includes(items.text)) && <i className='fa fa-check'></i>}</label>
                                                <input type='checkbox' id={items.id} className='hidden'/> {items.text}
                                            </div>
                                        
                                    )
                                })          
                            }
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-green-700 text-lg font-bold'>Connections Needed</h1>
                            <div><i className='fa fa-arrow-down'></i></div>
                        </div>
                        <div className='ml-2'>
                            {
                                connections.length > 0 && connections.map(items => {
                                    return(
                                        
                                            <div className='mt-3'  key={items.id}>
                                                <label htmlFor={items.id} onClick={()=>{Filter(items.text,"connections")}} className={check?.connections?.includes(items.text) || filters?.connections?.split(",")?.includes(items.text) ? 'px-1 text-white border-gray-400 mr-1 rounded-md cursor-pointer bg-green-700' : 'px-2.5 border-2 border-gray-400 mr-1 rounded-md cursor-pointer'}>{(check?.connections?.includes(items.text) || filters?.connections?.split(",")?.includes(items.text)) && <i className='fa fa-check'></i>}</label>
                                                <input type='checkbox' id={items.id} className='hidden'/> {items.text}
                                            </div>
                                        
                                    )
                                })          
                            }
                        </div>
                    </div>

                    {/* <div className='mt-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-green-700 text-lg font-bold'>Country Filter</h1>
                            <div><i className='fa fa-arrow-down'></i></div>
                        </div>
                        <div className='mt-1'>
                            <div className='mt-3'>
                                <select className='outline-none p-2 border-2 border-gray-400 rounded-lg' onChange={(e)=>setCheck({...check,country:e.target.value})}>
                                    {
                                        json && json.map(items => {
                                            return(
                                                <>
                                                    <option  key={items.countryName} value={items.countryName}>{items.countryName}</option>
                                                </>
                                            )
                                        })          
                                    }
                                </select>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default SearchFilter
