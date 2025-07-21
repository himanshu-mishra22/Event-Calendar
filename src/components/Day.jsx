import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context.jsx";

const Day = ({ day, rowIdx }) => {
  const labelColorMap = {
    indigo: "bg-indigo-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  const [dayEvents, setDayEvents] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    daySelected,
    setDaySelected,
    setShowEventForm,
    allVisibleEvents,
    setSelectedEvent,
    dispatchCalEvent,
    draggedEvent,
    setDraggedEvent,
  } = useContext(Context);

  useEffect(() => {
    const events = allVisibleEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [allVisibleEvents, day]);

  const getDayClass = () => {
    const format = "DD-MM-YY";
    const isSelected = daySelected && day.format(format) === daySelected.format(format);
    const isToday = day.format(format) === dayjs().format(format);
    if (isSelected) return "bg-blue-500 text-white rounded-full w-7 font-bold";
    if (isToday) return "bg-gray-200 text-gray-800 rounded-full w-7";
    return "";
  };

  const handleDragStart = (e, evt) => {
    if (evt.isOccurrence) {
        e.preventDefault();
        return;
    }
    setDraggedEvent(evt);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!draggedEvent) return;

    const updatedEvent = {
      ...draggedEvent,
      day: day.valueOf(),
    };

    dispatchCalEvent({ type: "update", payload: updatedEvent });
    setDraggedEvent(null); 
  };

  return (
    <div
      className={`border border-gray-200 flex flex-col cursor-pointer transition-colors ${isDragOver ? 'bg-gray-100' : ''}`}
      onClick={() => {
        setDaySelected(day);
        setShowEventForm(true);
        setSelectedEvent(null);
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 px-1">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            draggable={!evt.isOccurrence} 
            onDragStart={(e) => handleDragStart(e, evt)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(evt);
              setShowEventForm(true);
            }}
            className={`${labelColorMap[evt.label]} p-1 mr-1 text-white text-xs rounded mb-1 truncate ${!evt.isOccurrence ? 'cursor-grab' : 'cursor-not-allowed'}`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
