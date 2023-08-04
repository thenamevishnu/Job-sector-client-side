import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { errorAlert } from '../../../Functions/Toasts'
import { isUri } from 'valid-url'
import ModalDesign from './ModalDesign'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Paypal } from '../Balance/Paypal'

export function HoursPerWeek(props) {

    const {data} = props
    const [modal,showModal] = props.states

    return (
        <ModalDesign action={[modal,showModal]}>
            <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
            <select className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full' onChange={(e)=>{props.sendDataToParant({hoursPerWeek:e.target.value}); showModal(!modal.status)}}>
                <option value="0">Select an option</option>
                <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                <option value="As needed - open to offers">As needed - open to offers</option>
                <option value="None">None</option>
            </select>
        </ModalDesign>
    )
}

export function CompleteProject(props) {

    const {data} = props
    const [modal,showModal] = props.states
    const [amount, setAmount] = useState("")
    const [clientGet,setClientGet] = useState(0)

    const handleForm = async () => {
        
        if(amount === "" || isNaN(amount) || parseFloat(amount) < parseFloat(modal.from) || parseFloat(amount) > parseFloat(modal.to)){
            errorAlert("Enter between $"+parseFloat(modal.from) +" - $"+parseFloat(modal.to))
            console.log(modal.from, amount);
        }else{
            props.callback({update:true,post_id:modal.post_id,user_id:modal.user_id,amount:amount}); 
            showModal(!modal.status)
        }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
            <input type='text' className='w-full rounded-lg p-2 outline-none border-2 border-gray-400' placeholder={`Enter amount to pay! ($${modal.from} - $${modal.to})`} value={amount} onChange={async (e)=>{setAmount(e.target.value); setClientGet(parseFloat((e.target.value) - (e.target.value * 0.02)))}}/>
            <span>They will get: ${clientGet}</span>
            <div className='mt-5 flex justify-end'>
                <button className='text-white bg-green-700 rounded-lg p-1 ps-3 pe-3 me-3' onClick={async ()=>await handleForm()}><i className='fa fa-save'></i> Save</button>
                <button className='text-white bg-red-600 rounded-lg p-1 ps-3 pe-3 me-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </ModalDesign>
    )
}

export function Languages(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const [languages,setLanguages] = useState([])
    const [lang,setLang] = useState({lang:"",level:""})

    useEffect(()=>{
        const getLanguages = async () => {
            const {data} = await axios.get("https://raw.githubusercontent.com/thenamevishnu/languages/main/languages.json")
            setLanguages(data)
        }
        getLanguages()
    })

    return (

        <ModalDesign action={[modal,showModal]}>
            <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
            <div className=''>
                {
                languages && 
                    <select className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full' onChange={(e)=>setLang({...lang,lang:e.target.value})}>
                        <option value="0">Select Language</option>
                        {
                            languages.map(obj => {
                                return(
                                    <option key={obj.nativeName} value={obj.nativeName}>{obj.nativeName}</option>
                                )
                            })
                        }
                    </select>
                }
                <select className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full mt-2' onChange={(e)=>setLang({...lang,level:e.target.value})}>
                    <option value="0">Select Level</option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native or Bilingual">Native</option>
                </select>
            </div>
            <div className='mt-5 flex justify-end'>
                <button className='text-white bg-green-700 rounded-lg p-1 ps-3 pe-3 me-3' onClick={()=>{props.sendDataToParant({language:lang}); showModal(!modal.status)}}><i className='fa fa-save'></i> Save</button>
                <button className='text-white bg-red-600 rounded-lg p-1 ps-3 pe-3 me-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </ModalDesign>
  )
}

export function Education(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const [education,setEducation] = useState({name:"",subject:"",from:"",to:""})
    const [selectedYear,setSelected] = useState({from:null,to:null})
    const thisYear = new Date().getFullYear()
    const yearList = []
    let k=0
    const check = selectedYear.from ? selectedYear.from : 1900
    for(let i=thisYear;i>=check;i--){
        yearList[k++] = i
    }

    const handleSubmit = async () => {
        const reg = {
            name: /^([A-Za-z])([a-zA-Z\s+.']){1,255}$/gm,
            subject: /^([a-zA-Z])([a-zA-Z\s/.]){1,255}/gm
        }

        if(education.name===""){
            errorAlert("College or school name required!")
        }else if(!reg.name.test(education.name)){
            errorAlert("Only letters and space allowed in name!")
        }else if(education.subject===""){
            errorAlert("Subject or field is required!")
        }else if(!reg.subject.test(education.subject)){
            errorAlert("Only letters and space allowed in sub!")
        }else if(education.from===""){
            errorAlert("From year required!")
        }else if(education.to===""){
            errorAlert("To year required!")
        }else{
            props.sendDataToParant({education:education}) 
            showModal(!modal.status)
        }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <div>
                <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                <input type='text' name='name' className='mb-2 w-full p-2 outline-none border-2 border-gray-400 rounded-lg' placeholder='school / college' value={education.name} onChange={(e)=>setEducation({...education,name:e.target.value})}></input>
                <input type='text' name='subject' className='mb-2 w-full p-2 outline-none border-2 border-gray-400 rounded-lg' placeholder='subject / field' value={education.subject} onChange={(e)=>setEducation({...education,subject:e.target.value})}></input>
                <select name="from_year" className='w-full mb-2 p-2 outline-none border-2 border-gray-400 rounded-lg' onChange={(e)=>{setEducation({...education,from:e.target.value}); setSelected({...selectedYear,from:e.target.value})}}>
                    <option value="0">Select from year</option>
                    {
                        yearList.map(year => {
                            return (
                                <option key={"1"+year} value={year}>{year}</option>
                            )
                        })
                    }
                </select>
                {selectedYear.from && 
                <select name="to_year" className='w-full mb-2 p-2 outline-none border-2 border-gray-400 rounded-lg' onChange={(e)=>setEducation({...education,to:e.target.value})}>
                    <option value="0">Select to year</option>
                    <option value="Present">Present</option>
                    {
                        yearList.map(year => {
                            return (
                                <option key={"2"+year} value={year}>{year}</option>
                            )
                        })
                    }
                </select>}
                <div className='flex justify-end mt-5'>
                    <button className='bg-green-700 text-white rounded-lg p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='bg-green-700 text-white rounded-lg p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </ModalDesign>
    )
}

export function BioData(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const userData = props.user
    const [bio,setBio] = useState({title:userData.title,per_hour:userData.per_hour,description:userData.description})

    const handleSubmit = async () => {
        const reg = {
            title: /^([A-Za-z])([a-zA-Z0-9\s+.]){1,255}$/gm,
            description: /^([a-zA-Z])([a-zA-Z\s/.,]){1,255}/gm
        }

        if(bio.title===""){
            errorAlert("Title is required!")
        }else if(!reg.title.test(bio.title)){
            errorAlert("Only letters and space allowed in title!")
        }else if(bio.per_hour===""){
            errorAlert("Per hour cost is required!")
        }else if(bio.per_hour < 0.1 || bio.per_hour > 100 || isNaN(bio.per_hour)){
            errorAlert("Per hour should be $0.1 - $100!")
        }else if(bio.description===""){
            errorAlert("Description is required!")
        }else if(!reg.description.test(bio.description)){
            errorAlert("Only letters and space allowed in desc!")
        }else{
            props.sendDataToParant({bio:bio}) 
            showModal(!modal.status)
        }
    }

    return (

        <ModalDesign action={[modal,showModal]}>
            <div>
                <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                <input type='text' className="w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2" name='title' placeholder='What is your field ? eg: Full stack developer' value={bio.title} onChange={(e)=>setBio({...bio,title:e.target.value})}></input>
                <input type='text' className="w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2" name='per_hour' placeholder='Your cost per hour? rg: 10' value={bio.per_hour} onChange={(e)=>setBio({...bio,per_hour:e.target.value})}></input>
                <textarea className="w-full border-2 border-gray-400 rounded-lg p-2 resize-none outline-none" type='text' name='description' placeholder='About yourself?' value={bio.description} onChange={(e)=>setBio({...bio,description:e.target.value})}></textarea>
                <div className='flex justify-end mt-5'>
                    <button className='bg-green-700 text-white rounded-lg p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='bg-red-600 text-white rounded-lg p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </ModalDesign>
  )
}

export function Skills(props) {

    const {data} = props
    const [modal,showModal] = props.states
    const [skills,setSkills] = useState({skills:""})

    const reg = /^([a-zA-Z0-9])([a-zA-Z-_\s+0-9]){1,80}$/gm

    const skillSubmit = async () => {
        if(skills.skills === ""){
            errorAlert("Skill is required!")
        }else if(!reg.test(skills.skills)){
            errorAlert("Only characters , _ and -")
        }else{
            props.sendDataToParant({skill:skills}) 
            showModal(!modal.status)
        }
    }

    return (

            <ModalDesign action={[modal,showModal]}>
                <div>
                    <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                    <input type='text' className='w-full outline-none border-2 border-gray-400 rounded-lg p-2' name='skill' placeholder='Enter skill' value={skills.skills} onChange={(e)=>{setSkills({skills:e.target.value})}}></input>
                    <div className='flex justify-end mt-4'>
                        <button className='bg-green-700 text-white rounded-lg p-1 ps-3 pe-3 me-3' onClick={skillSubmit}><i className='fa fa-save'></i> Save</button>
                        <button className='bg-red-600 text-white rounded-lg ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                    </div>
                </div>
            </ModalDesign>
    )
}

export function Projects(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const [project,setProject] = useState({name:"",url:"",owner:"",language:"",created_at:""})

    const handleSubmit = async () => {

        const isGitUrl = (link) => {
            if(!isUri(link)){
                return false
            }
            const url = new URL(link)
            if(url?.origin){
                if(url.origin === "https://github.com"){
                    return url.pathname
                }else{
                    return false
                }
            }else{
                return false
            }
        }

        if(project.url === ""){
            errorAlert("Repo link is required!")
        }else if(!isGitUrl(project.url)){
            errorAlert("Enter a valid github repo link!")
        }else{
            const {data} = await axios.get(`https://api.github.com/repos${isGitUrl(project.url)}`)
            console.log(data);
            project.url = `https://github.com/${data.full_name}`
            project.owner = data.owner.login
            project.language = data.language
            project.created_at = (new Date(data.created_at)).toUTCString()
            project.name = data.name
            props.sendDataToParant({project:project}) 
            showModal(!modal.status)
        }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <div>
                <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                <input type='text' className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none' name='repo' placeholder='Paste your github repository link' value={project.url} onChange={(e)=>setProject({...project,url:e.target.value})}></input>
                <div className='flex justify-end mt-5'>
                    <button className='bg-green-700 rounded-lg text-white p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='bg-red-600 text0-white rounded-lg text-white p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </ModalDesign>
  )
}

export function Employment(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const [employment,setEmployment] = useState({company:"",title:"",description:"",from:"",to:""})
    const [selectedYear,setSelected] = useState({from:null,to:null})
    const thisYear = new Date().getFullYear()
    const yearList = []
    let k=0
    const check = selectedYear.from ? selectedYear.from : 1900
    for(let i=thisYear;i>=check;i--){
        yearList[k++] = i
    }

    const handleSubmit = async () => {
        const reg = {
            company: /^([A-Za-z])([a-zA-Z\s+.']){1,255}$/gm,
            title: /^([A-Za-z])([a-zA-Z\s+.']){1,255}$/gm,
            description: /^([a-zA-Z])([a-zA-Z\s/.]){1,255}/gm
        }

        if(employment.company===""){
            errorAlert("Company name required!")
        }else if(!reg.company.test(employment.company)){
            errorAlert("Only letters and space allowed in company!")
        }else if(employment.title===""){
            errorAlert("Title is required!")
        }else if(!reg.title.test(employment.title)){
            errorAlert("Only letters and space allowed in title!")
        }else if(employment.description===""){
            errorAlert("Description is required!")
        }else if(!reg.description.test(employment.description)){
            errorAlert("Only letters and space allowed in desc!")
        }else if(employment.from===""){
            errorAlert("From year required!")
        }else if(employment.to===""){
            errorAlert("To year required!")
        }else{
            props.sendDataToParant({employment:employment}) 
            showModal(!modal.status)
        }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <div>
                <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                <input type='text' className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' name='company' placeholder='Company' value={employment.company} onChange={(e)=>setEmployment({...employment,company:e.target.value})}></input>
                <input type='text' className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' name='title' placeholder='Title' value={employment.title} onChange={(e)=>setEmployment({...employment,title:e.target.value})} ></input>
                <select className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' name="from_year" onChange={(e)=>{setEmployment({...employment,from:e.target.value}); setSelected({...selectedYear,from:e.target.value})}} >
                    <option value="0">Select from year</option>
                    {
                        yearList.map(year => {
                            return (
                                <option key={"1"+year} value={year}>{year}</option>
                            )
                        })
                    }
                </select>
                {selectedYear.from && <select name="to_year" className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' onChange={(e)=>setEmployment({...employment,to:e.target.value})}>
                    <option value="0">Select to year</option>
                    <option value="Present">Present</option>
                    {
                        yearList.map(year => {
                            return (
                                <option key={"2"+year} value={year}>{year}</option>
                            )
                        })
                    }
                </select>}
                <textarea type='text' name='description' placeholder='Enter description' className='w-full border-2 border-gray-400 resize-none rounded-lg p-2 outline-none mb-2' value={employment.description} onChange={(e)=>setEmployment({...employment,description:e.target.value})}></textarea>
                <div className='flex justify-end mt-5'>
                    <button className='rounded-lg bg-green-700 text-white p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='rounded-lg bg-red-600 text-white p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </ModalDesign>
    )
}

export function Certificate(props){
    
    const {data} = props
    const [modal,showModal] = props.states
    const [certificate,setCertificate] = useState({provider:"",title:"",description:"",issued:"",link:""})

    const handleSubmit = async () => {
        const reg = {
            provider: /^([A-Za-z])([a-zA-Z\s+.']){1,255}$/gm,
            title: /^([A-Za-z])([a-zA-Z\s+.']){1,255}$/gm,
            description: /^([a-zA-Z])([a-zA-Z\s/.]){1,255}/gm
        }

        if(certificate.provider===""){
            errorAlert("Provider name required!")
        }else if(!reg.provider.test(certificate.provider)){
            errorAlert("Only letters and space allowed in company!")
        }else if(certificate.title===""){
            errorAlert("Title is required!")
        }else if(!reg.title.test(certificate.title)){
            errorAlert("Only letters and space allowed in title!")
        }else if(certificate.description===""){
            errorAlert("Description is required!")
        }else if(!reg.description.test(certificate.description)){
            errorAlert("Only letters and space allowed in desc!")
        }else if(certificate.issued===""){
            errorAlert("Issued date required!")
        }else if(certificate.link===""){
            errorAlert("Link to certificate is required!")
        }else if(!isUri(certificate.link)){
            errorAlert("Enter a valid url!")
        }else{
            props.sendDataToParant({certificate:certificate}) 
            showModal(!modal.status)
        }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <div>
                <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
                <input className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' type='text' name='provider' placeholder='Certificate provider' value={certificate.provider} onChange={(e)=>setCertificate({...certificate,provider:e.target.value})}></input>
                <input className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' type='text' name='title' placeholder='Title' value={certificate.title} onChange={(e)=>setCertificate({...certificate,title:e.target.value})}></input>
                <textarea className='w-full border-2 resize-none border-gray-400 rounded-lg p-2 outline-none mb-2' type='text' name='description' placeholder='Enter description' value={certificate.description} onChange={(e)=>setCertificate({...certificate,description:e.target.value})}></textarea>
                <input className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' type='date' name='issued' placeholder='DD-MM-YYYY' value={certificate.issued}  onChange={(e)=>setCertificate({...certificate,issued:e.target.value})}></input>
                <input className='w-full border-2 border-gray-400 rounded-lg p-2 outline-none mb-2' type='text' name='link' placeholder='Link to certificate' value={certificate.link}  onChange={(e)=>setCertificate({...certificate,link:e.target.value})}></input>
                <div className='flex justify-end mt-5'>
                    <button className='rounded-lg bg-green-700 text-white p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='rounded-lg bg-red-600 text-white p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </ModalDesign>
    )
}

export function AddPaymentMethod(props) {

    const {data} = props
    const [modal,showModal] = props.states
    const [enterData,setData] = useState({addMethod:"",to:""})

    const handleSubmit = async () => {
        if(!enterData.addMethod || enterData.addMethod === "0"){
            errorAlert("Select a method!")
        }
        if(enterData.addMethod === "Paypal"){
            const emailReg = /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm
            if(!emailReg.test(enterData.to)){
                errorAlert("Enter valid email address")
            }else{
                props.sendDataToParant({addPayment:enterData})
                showModal(!modal.status)
            }
        }
        // if(enterData.addMethod === "Crypto"){
        //     const emailReg = /^([\w\W])([\w\W])+@([a-zA-Z0-9]){3,6}.([a-zA-Z0-9]){2,3}$/gm
        //     if(!emailReg.test(enterData.to)){
        //         errorAlert("Enter valid email address")
        //     }else{
        //         showModal(!modal.status)
        //     }
        // }
    }

    return (
        <ModalDesign action={[modal,showModal]}>
            <h3 className='text-green-700 text-lg text-center mb-3'>{data.title}</h3>
            <select className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full' value={enterData.addMethod} onChange={(e)=>{setData({...enterData,addMethod:e.target.value})}}>
                <option value="0">Select Method</option>
                <option value="Paypal">Paypal</option>
                {/* <option value="Crypto">Crypto Currency</option> */}
            </select>
            {
                enterData.addMethod !== "Paypal" ? null : <input type='text' className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full mt-2' placeholder='Enter Paypal Email' value={enterData.to} onChange={(e)=>setData({...enterData,to:e.target.value})}/>
                // : <input type='text' className='outline-none border-2 border-gray-400 rounded-lg p-2 w-full mt-2' placeholder='Enter BTC Address' value={enterData.to} onChange={(e)=>setData({...enterData,to:e.target.value})}/>
            }
            <div className='flex justify-end mt-5'>
                <button className='rounded-lg bg-green-700 text-white p-1 ps-3 pe-3 me-3' onClick={()=>handleSubmit()}><i className='fa fa-save'></i> Save</button>
                <button className='rounded-lg bg-red-600 text-white p-1 ps-3 pe-3' onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </ModalDesign>
    )
}

export function PaypalPay(props){
    
    const [modal,showModal] = props.states
    const [amount,setAmount] = useState(100)

    return (

        <ModalDesign action={[modal,showModal]}>
            <div className='p-5'>
                <input type='number' className='border-2 border-gray-400 rounded-lg outline-none w-full p-2' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                <span className='text-red-600 text-sm'>{amount < 5 && "Enter minimum $5"}</span>
                {amount >= 5 && <div className='mb-5'></div>}
                <PayPalScriptProvider
                    options={{
                        "clientId": process.env.react_app_paypal,
                        components: "buttons",
                        currency: "USD",
                        disableFunding:"card"
                }}>
                    <Paypal
                        currency={"USD"}
                        amount={amount < 5 ? 5 : amount}
                        showSpinner={false}
                        getSuccess={props.getSuccess}
                        action={[modal,showModal]}
                    /> 
                </PayPalScriptProvider>
            </div>
        </ModalDesign>

    )
}

export function OnPaid() {
    
    return(
        <div className='w-11/12 z-50 sm:w-9/12 md:w-7/12 lg:w-5/12 p-3 fixed bg-transparant left-1/2 top-24 rounded-xl shadow-xl ' style={{transform:"translate(-50%,0%)"}}>
            <img alt='on paid pop up' src={`${process.env.react_app_cloud}/job/default/paid.gif`}/>
        </div>
    )
}