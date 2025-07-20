import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context.jsx";

const Day = ({ day, rowIdx }) => {
  // Using more vibrant colors for better visibility
  const labelColorMap = {
    indigo: "bg-indigo-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  const [dayEvents, setDayEvents] = useState([]);
  // 1. Get allVisibleEvents from context instead of filterEvents
  const {
    daySelected,
    setDaySelected,
    setShowEventForm,
    allVisibleEvents, // Use the new array with all occurrences
    setSelectedEvent,
  } = useContext(Context);

  // 2. Filter allVisibleEvents to find events for this specific day
  useEffect(() => {
    const events = allVisibleEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [allVisibleEvents, day]); // Depend on allVisibleEvents and the current day

  // 3. Improved styling logic to prioritize selected day
  const getDayClass = () => {
    const format = "DD-MM-YY";
    const isSelected =
      daySelected && day.format(format) === daySelected.format(format);
    const isToday = day.format(format) === dayjs().format(format);

    if (isSelected) {
      // Selected style takes priority
      return "bg-blue-500 text-white rounded-full w-7 font-bold";
    }
    if (isToday) {
      return "bg-gray-200 text-gray-800 rounded-full w-7";
    }
    return "";
  };

  return (
    // 4. Changed from <button> to <div> for better structure
    <div
      className="border border-gray-200 flex flex-col cursor-pointer"
      onClick={() => {
        setDaySelected(day);
        setShowEventForm(true);
        setSelectedEvent(null); // Ensure we're creating a new event
      }}
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening a new event form
              setSelectedEvent(evt);
              setShowEventForm(true);
            }}
            // Fixed typo: rounde -> rounded
            className={`${
              labelColorMap[evt.label]
            } p-1 mr-1 text-white text-xs rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
