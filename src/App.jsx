import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getMonth } from './utils/utils'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import Month from './components/Month'
import Context from './context/Context'
import EventForm from './components/EventForm'

function App() {
  // console.table(getMonth(3))
  const [currMonth,setCurrMonth] = useState(getMonth());
  const {monthIdx,showEventForm}= useContext(Context);

  useEffect(()=>{
    // console.error(monthIdx);
    setCurrMonth(getMonth(monthIdx));
  },[monthIdx])

  return (
   <>
   {showEventForm && <EventForm/>}
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
