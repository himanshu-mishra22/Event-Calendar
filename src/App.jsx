import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getMonth } from './utils/utils'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import Month from './components/Month'

function App() {
  // console.table(getMonth(3))
  const [currMonth,setCurrMonth] = useState(getMonth());

  return (
   <>
    <div className='h-screen flex flex-col'>
      <CalendarHeader/>
      <div className='flex flex-1'>
        <Sidebar/>
        <Month month = {currMonth}/>
      </div>
    </div>
   </>
  )
}

export default App
