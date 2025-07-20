import React, { useState } from 'react'
import Context from './Context'
import dayjs from 'dayjs'

const ContextWrapper = ({children}) => {
    const  [monthIdx,setMonthIdx] = useState(dayjs().month())
  return (
    <Context.Provider value={{monthIdx,setMonthIdx}}>
        {children}
    </Context.Provider>
  )
}

export default ContextWrapper