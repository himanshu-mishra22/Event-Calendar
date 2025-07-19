import dayjs from 'dayjs'
import React from 'react'

const Day = ({day,rowIdx}) => {
    const currentDate = () => {
        return day.format("DD-MM-YY") == dayjs().format("DD-MM-YY") ? 'bg-red-100 text-red-900 rounded-full w-7' : '';
    }

  return (
    <div className='border border-gray-300 flex flex-col'>
        <header className='flex flex-col items-center'>
            {rowIdx == 0 && (
                <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
            )}
            <p className={`text-sm p-1 my-1 text-center ${currentDate()}`}>{day.format('DD')}</p>
        </header>
    </div>
  )
}

export default Day