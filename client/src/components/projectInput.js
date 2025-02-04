import React, { useState } from 'react'
import { Flex, Input, Select, Button } from 'antd'
import { useSearchParams } from 'react-router-dom'

export default function ProjectInput() {
    const { TextArea } = Input

    const [projectName, setProjectName] = useState('')
    const [projectDetails, setProjectDetails] = useState('')
    
    const handleProjectName = (e) => {
      setProjectName(e.target.value)
    }
  return (
    <div className='lg:mr-[20%] lg:ml-[20%] mr-[10%] ml-[10%]'>
        <Flex vertical gap={32}>
            <Input className='lg:w-[50%] md:w-[100%]' placeholder='What is your project called?' showCount maxLength={50} value={projectName} onChange={handleProjectName}/>
            <TextArea
            showCount
            maxLength={300}
            value={projectDetails}
            placeholder="Additional details about your project (tech stack, results, etc.)"
            style={{
                height: 120,
                resize: 'none',
            }}
            />
        </Flex>
    </div>
  )
}

