import dayjs from 'dayjs'
import React, { useContext } from 'react'
import Context from '../context/Context.jsx'

const Day = ({ day, rowIdx }) => {
    const { daySelected, setDaySelected } = useContext(Context);
    const getDayClass = () => {
        const format = "DD-MM-YY";
        const isSelected = daySelected && day.format(format) === daySelected.format(format);
        const isToday = day.format(format) === dayjs().format(format);

        if (isToday) {
            return 'bg-red-900 text-red-100 rounded-full w-7 font-bold'; 
        }
        if (isSelected) {
            return 'bg-red-200 text-red-900 rounded-full w-7'; 
        }
        return '';
    };

    return (
        <button
            onClick={() => setDaySelected(day)}
            className='border border-gray-300 flex flex-col'
        >
            <header className='flex flex-col items-center'>
                {rowIdx === 0 && (
                    <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center ${getDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
        </button>
    )
}

export default Day;