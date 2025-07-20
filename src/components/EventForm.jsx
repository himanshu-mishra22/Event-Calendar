import React, { useState, useContext } from 'react';
import { ClockCircleOutlined, CloseCircleOutlined, DragOutlined } from '@ant-design/icons';
import Context from '../context/Context.jsx';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const { setShowEventForm, daySelected } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to save the event here
        console.log({ title, day: daySelected.format("DD-MM-YYYY") });
        setShowEventForm(false);
    }

    return (
        <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-2xl w-full max-w-md'>
                <header className='bg-red-100 px-4 py-2 flex justify-between items-center rounded-t-lg'>
                    <span className='text-gray-500 cursor-grab'>
                        <DragOutlined />
                    </span>
                    <button type="button" onClick={() => setShowEventForm(false)}>
                        <span className='text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full'>
                            <CloseCircleOutlined />
                        </span>
                    </button>
                </header>
                <div className='p-5'>
                    <div className='space-y-6'>
                        <input
                            type="text"
                            name="title"
                            placeholder='Add title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500 transition-colors'
                        />
                        <div className='flex items-center gap-x-3'>
                            <span className='text-gray-400'>
                                <ClockCircleOutlined />
                            </span>
                            <p className='text-gray-700 font-medium'>{daySelected.format("dddd, MMMM DD")}</p>
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end border-t p-3 mt-5'>
                    <button
                        type='submit'
                        className='bg-red-400 hover:bg-red-600 px-6 py-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors'
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}

export default EventForm;