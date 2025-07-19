import React from 'react'

const Day = ({day}) => {
  return (
    <div>{day.format()}</div>
  )
}

export default Day