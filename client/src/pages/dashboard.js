import { React, useState, useEffect } from 'react'
import { Flex, Input, Button } from 'antd'
import { Select } from 'antd'
import axios from 'axios'
import ProjectInput from '../components/projectInput'

export default function Dashboard() {
        
    const { TextArea } = Input
    const userID = "John" // fetch properly later
    const degrees = [
        {
            value: '1',
            label: "Bachelor's Degree"
        },
        {
            value: '2',
            label: "Master's Degree"
        },
        {
            value: '3',
            label: "PhD"
        },
        {
            value: '4',
            label: "Associate's"
        },
        {
            value: '5',
            label: "Diploma"
        }
    ]


    const [userInfo, setUserInfo] = useState({
        name: 'Hardcoded',
        institution: '',
        degree: '',
        major: '',
        projects: [],
        experience: [],
    })

    const updateName = (e) => {
        setUserInfo({ ... userInfo,
            name: e.target.value
        })
    }

    const updateMajor = (e) => { 
        setUserInfo({ ... userInfo,
            major: e.target.value
        })
    }

    const updateDegree = (e) => { 
        setUserInfo({ ... userInfo,
            degree: e.target.value
        })
    }

    const updateInstitution = (e) => {
        setUserInfo({ ... userInfo,
            institution: e.target.value
        })
    }

    const updateProjects = (e, projectID) => { 
        setUserInfo({ ... userInfo,
            projects: [...userInfo.projects, {
                projectID: projectID,
                projectTitle: "",
                projectDescription: ""
            }]
        })
    }

    const updateExperience = (e) => { 
        setUserInfo({ ... userInfo,
            institution: e.target.value
        })
    }

    const sendUserInfo = async () => {
        try {
            console.log(userInfo)
            const response = await axios.post(`http://localhost:5000/setUserInfo/${userID}`, userInfo)
            console.log(response)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const [projectCount, setProjectCount] = useState([1])
    
    const addProject = () => {
        console.log('adding project')
        console.log(projectCount)
        setProjectCount([...projectCount, projectCount[projectCount.length -1 ]+1])

    }
    

    const heading_style = 'text-4xl ml-[20%] mb-5'
  return (
    <div>   
        <div className='lg:mr-[20%] lg:ml-[20%] mr-[10%] ml-[10%]'>
            <Input className='lg:w-[50%] md:w-[100%]' placeholder='What is your full name?' showCount maxLength={50} onBlur={updateName}/>
        </div>
        <p className={heading_style}>Education</p>
        <div className='lg:mr-[20%] lg:ml-[20%] mr-[10%] ml-[10%]'>
            <Input className='lg:w-[50%] md:w-[100%]' placeholder='What institution are you attending?' onBlur={updateInstitution} showCount maxLength={50}/>
            <Input className='lg:w-[50%] md:w-[100%]' placeholder='What is your major?' onBlur={updateMajor} showCount maxLength={50}/>
            <Select
                className='lg:w-[50%] md:w-[100%]'
                showSearch
                onBlur={updateDegree}
                placeholder="Select your highest degree"
                filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={degrees}
            />
        </div>

        <p className={heading_style}>Projects</p>
        
        {projectCount.map((projectID) => { return <ProjectInput key={projectID} onBlur={(e) => {updateProjects(e, projectID)}}></ProjectInput>})}
        <Button onClick={addProject}>Add project</Button>

        <p className={heading_style}>Experience</p>
        <div className='lg:mr-[20%] lg:ml-[20%] mr-[10%] ml-[10%]'>
            <Flex vertical gap={32}>
                <Input className='lg:w-[50%] md:w-[100%]' placeholder='What company did you work at?' showCount maxLength={50}/>
                <Input className='lg:w-[50%] md:w-[100%]' placeholder='What was your role?' showCount maxLength={50}/>
                <TextArea
                showCount
                maxLength={300}

                placeholder="Additional details about this experience (tech stack, results, etc.)"
                style={{
                    height: 120,
                    resize: 'none',
                }}
                />
            </Flex>
            {/* <p className='text-1xl'>Add another project +</p> */}
        </div>
        <Button onClick={sendUserInfo}>Save</Button>
    </div>
  )
}

