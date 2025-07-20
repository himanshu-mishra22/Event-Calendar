import React, { createContext } from 'react'

const Context = createContext({
    monthIdx:0,
    setMonthIdx: (idx)=>{},
    daySelected: null,
    setDaySelected:(day)=>{},
    showEventForm:false,
    setShowEventForm : ()=> {}
})

export default Context