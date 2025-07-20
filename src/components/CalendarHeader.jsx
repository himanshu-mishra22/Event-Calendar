import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import Context from '../context/Context'
import dayjs from 'dayjs';

const CalendarHeader = () => {
    const {monthIdx,setMonthIdx} = useContext(Context);

    const handlePrevMonth = ()=>{
        setMonthIdx(monthIdx-1);
    }
    const handleNextMonth = ()=>{
        setMonthIdx(monthIdx+1);
    }

    const handleToday = () =>{
        setMonthIdx(dayjs().month());
    }

  return (
    <header className='px-4 py-2 flex items-center'>
        <CalendarOutlined style={{fontSize: '20px', color: '#38f'}} className='mr-2 border border-gray-200 p-2 rounded-full' />
        <h1 className='mr-10 text-xl text-gray-500 font-bold'>Calendar</h1>

        <button
        onClick={handleToday}
         className="border border-gray-200 rounded py-2 px-4 mr-5 cursor-pointer">
            Today
        </button>
         <button onClick={handlePrevMonth}>
            <span className='cursor-pointer text-gray-500 mx-2'>
                <LeftOutlined />
            </span>
        </button>
        <button onClick={handleNextMonth}>
            <span className='cursor-pointer text-gray-500 mx-2'>
                <RightOutlined />
            </span>
        </button>

        <h2 className='ml-4 text-xl text-gray-500 font-bold'>
            {dayjs(new Date(dayjs().year(),monthIdx)).format("MMMM YYYY")}
        </h2>
    </header>
  )
}

export default CalendarHeader