import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import Context from '../context/Context'

const CreateEvent = () => {
  const {setShowEventForm} = useContext(Context);
  return (
    <button
    onClick={()=>setShowEventForm(true)}
    className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
        <PlusCircleOutlined style={{fontSize:"24px"}}/>
        <span className='pl-3 pr-7'>Create</span>
    </button>
  )
}

export default CreateEvent