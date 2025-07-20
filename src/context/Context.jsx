import React, { createContext } from 'react'

const Context = createContext({
    monthIdx:0,
    setMonthIdx: (idx)=>{},
    daySelected: null,
    setDaySelected:(day)=>{},
    showEventForm:false,
    setShowEventForm : ()=> {},
    dispatchCalEvent: ({type,payload}) => {},
    savedEvent:[],
    selectedEvent:null,
    setSelectedEvent:()=>{},
    labels:[],
    setLabels:()=>{},
    updateLabel:()=>{},
    filterEvents:[]
})

export default Context