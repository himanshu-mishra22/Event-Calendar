import React, { useState } from 'react'
import Context from './Context'
import dayjs from 'dayjs'

const ContextWrapper = ({children}) => {
    const  [monthIdx,setMonthIdx] = useState(dayjs().month())
    const  [daySelected,setDaySelected] = useState(null)
    const  [showEventForm,setShowEventForm] = useState(false)
  return (
    <Context.Provider value={{monthIdx,setMonthIdx,daySelected,setDaySelected,showEventForm,setShowEventForm}}>
        {children}
    </Context.Provider>
  )
}

export default ContextWrapper