import React, { createContext } from 'react'

const Context = createContext({
    monthIdx:0,
    setMonthIdx: (idx)=>{}
})

export default Context