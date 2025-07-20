import React from 'react'
import CreateEvent from './CreateEvent'
import Labels from './Labels'

const Sidebar = () => {
  return (
    <aside className='border p-5 w-48'>
      <CreateEvent/>
      <Labels/>
    </aside>
  )
}

export default Sidebar