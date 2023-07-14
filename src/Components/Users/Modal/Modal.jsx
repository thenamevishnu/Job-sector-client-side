import React, { useEffect, useState } from 'react'
import "./Modal.css"
import axios from 'axios'
import { errorAlert } from '../../../Functions/Toasts'
import { isUri } from 'valid-url'

export function HoursPerWeek(props) {

    const {data} = props
    const [modal,showModal] = props.states

  return (

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <select className='box' onChange={(e)=>{props.sendDataToParant({hoursPerWeek:e.target.value}); showModal(!modal.status)}}>
                <option value="0">Select an option</option>
                <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                <option value="As needed - open to offers">As needed - open to offers</option>
                <option value="None">None</option>
            </select>
        </div>
   
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

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='languages mt-5 '>
                {languages && <select className='select-language me-5' onChange={(e)=>setLang({...lang,lang:e.target.value})}><option value="0">Select Language</option>
                    {
                        languages.map(obj => {
                            return(
                                <option key={obj.name} value={obj.name}>{obj.name} ({obj.nativeName})</option>
                            )
                        })
                    }
                </select>}
                <select className='select-level' onChange={(e)=>setLang({...lang,level:e.target.value})}><option value="0">Select Level</option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native or Bilingual">Native</option>
                </select>
            </div>
            <div className='button-position mt-5'>
            <button className='save-button p-1 ps-3 pe-3 me-3' onClick={()=>{props.sendDataToParant({language:lang}); showModal(!modal.status)}}><i className='fa fa-save'></i> Save</button>
            <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </div>
   
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

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='education text-center mt-4'>
            <input type='text' name='name' placeholder='school / college' value={education.name} onChange={(e)=>setEducation({...education,name:e.target.value})}></input>
            <input type='text' name='subject' placeholder='subject / field' className='mt-2' value={education.subject} onChange={(e)=>setEducation({...education,subject:e.target.value})}></input>
                <select name="from_year" onChange={(e)=>{setEducation({...education,from:e.target.value}); setSelected({...selectedYear,from:e.target.value})}}  className='mt-2'>
                    <option value="0">Select from year</option>
                    {
                        yearList.map(year => {
                            return (
                                <option key={"1"+year} value={year}>{year}</option>
                            )
                        })
                    }
                </select>
                {selectedYear.from && <select name="to_year" onChange={(e)=>setEducation({...education,to:e.target.value})} className='mt-2'>
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
            </div>
            <div className='button-position mt-5'>
            <button className='save-button p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
            <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </div>
   
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

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='education text-center mt-4'>
            <input type='text' name='title' placeholder='What is your field ? eg: Full stack developer' value={bio.title} onChange={(e)=>setBio({...bio,title:e.target.value})}></input>
            <input type='text' name='per_hour' placeholder='Your cost per hour? rg: 10' className='mt-2' value={bio.per_hour} onChange={(e)=>setBio({...bio,per_hour:e.target.value})}></input>
            <textarea type='text' name='description' placeholder='About yourself?' className='mt-2' value={bio.description} onChange={(e)=>setBio({...bio,description:e.target.value})}></textarea>
            </div>
            <div className='button-position mt-5'>
            <button className='save-button p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
            <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </div>
   
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

            <div className='pop-up p-4'>
                <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
                <h3>{data.title}</h3>
                <div className='education text-center mt-4'>
                    <input type='text' name='skill' placeholder='Enter skill' value={skills.skills} onChange={(e)=>{setSkills({skills:e.target.value})}}></input>
                    <button className='save-button p-1 ps-3 pe-3 me-3 mt-4' onClick={skillSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
    
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

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='education text-center mt-4'>
                <input type='text' name='repo' placeholder='Paste your github repository link' value={project.url} onChange={(e)=>setProject({...project,url:e.target.value})}></input>
                <div className='button-position mt-5'>
                    <button className='save-button p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
                    <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
                </div>
            </div>
        </div>
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

        <div className='pop-up p-4'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='education text-center mt-4'>
            <input type='text' name='company' placeholder='Company' value={employment.company} onChange={(e)=>setEmployment({...employment,company:e.target.value})}></input>
            <input type='text' name='title' placeholder='Title' value={employment.title} onChange={(e)=>setEmployment({...employment,title:e.target.value})} className='mt-2'></input>
            <select name="from_year" onChange={(e)=>{setEmployment({...employment,from:e.target.value}); setSelected({...selectedYear,from:e.target.value})}} className='mt-2'>
                <option value="0">Select from year</option>
                {
                    yearList.map(year => {
                        return (
                            <option key={"1"+year} value={year}>{year}</option>
                        )
                    })
                }
            </select>
            {selectedYear.from && <select name="to_year" onChange={(e)=>setEmployment({...employment,to:e.target.value})} className='mt-2'>
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
            <textarea type='text' name='description' placeholder='Enter description' className='mt-2' value={employment.description} onChange={(e)=>setEmployment({...employment,description:e.target.value})}></textarea>
            </div>
            <div className='button-position mt-5'>
            <button className='save-button p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
            <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </div>
   
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

        <div className='pop-up p-4 mt-3'>
            <i className='fa fa-close close' onClick={()=>showModal(!modal.status)}></i>
            <h3>{data.title}</h3>
            <div className='education text-center mt-4'>
            <input type='text' name='provider' placeholder='Certificate provider' value={certificate.provider} onChange={(e)=>setCertificate({...certificate,provider:e.target.value})}></input>
            <input type='text' name='title' placeholder='Title' value={certificate.title} onChange={(e)=>setCertificate({...certificate,title:e.target.value})} className='mt-2'></input>
            <textarea type='text' name='description' placeholder='Enter description' className='mt-2' value={certificate.description} onChange={(e)=>setCertificate({...certificate,description:e.target.value})}></textarea>
            <input type='date' name='issued' placeholder='DD-MM-YYYY' value={certificate.issued}  onChange={(e)=>setCertificate({...certificate,issued:e.target.value})} className='mt-2'></input>
            <input type='text' name='link' placeholder='Link to certificate' value={certificate.link}  onChange={(e)=>setCertificate({...certificate,link:e.target.value})} className='mt-2'></input>
            </div>
            <div className='button-position mt-5'>
            <button className='save-button p-1 ps-3 pe-3 me-3' onClick={handleSubmit}><i className='fa fa-save'></i> Save</button>
            <button className='save-button p-1 ps-3 pe-3' style={{backgroundColor:"rgba(255, 0, 0, 0.681)"}} onClick={()=>showModal(!modal.status)}><i className='fa fa-close'></i> Cancel</button>
            </div>
        </div>
   
  )
}