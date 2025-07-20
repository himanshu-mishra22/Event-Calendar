import React from 'react';
import {
  AlignLeftOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Reoccur from './Reoccur.jsx';

const EventFormBody = ({
  title,
  setTitle,
  daySelected,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  desc,
  setDesc,
  recurrence,
  handleRecurrenceChange,
  toggleWeekday,
}) => {
  return (
    <div className="p-5 max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        {/* --- Event Title Input --- */}
        <input
          type="text"
          name="title"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
        />
        {/* --- Date and Time Picker --- */}
        <div className="flex items-center gap-x-3">
          <span className="text-gray-400"><ClockCircleOutlined /></span>
          <p className="text-gray-700 font-medium">
            {daySelected.format("dddd, MMMM DD")}
          </p>
          <div className="ml-auto flex items-center gap-x-2">
            <input type="time" name="fromTime" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="p-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <span>-</span>
            <input type="time" name="toTime" value={toTime} onChange={(e) => setToTime(e.target.value)} className="p-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        {/* --- Description Input --- */}
        <div className="flex items-center gap-x-3">
          <span className="text-gray-400"><AlignLeftOutlined /></span>
          <input type="text" name="desc" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="pt-3 border-0 text-gray-700 text-md pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"/>
        </div>

        {/* --- Render the RecurrencePicker component --- */}
        <Reoccur
            recurrence={recurrence}
            handleRecurrenceChange={handleRecurrenceChange}
            toggleWeekday={toggleWeekday}
        />
      </div>
    </div>
  );
};

export default EventFormBody;
