import { ContainerTwoTone } from '@ant-design/icons'
import React, { useState } from 'react'
import Context from './Context'
import dayjs from 'dayjs'

const ContextWrapper = ({childern}) => {
    const  [monthIdx,setMonthIdx] = useState(dayjs().month())
  return (
    <Context.Provider value={{monthIdx,setMonthIdx}}>
        {childern}
    </Context.Provider>
  )
}

export default ContextWrapper