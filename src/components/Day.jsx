import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context.jsx";

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { daySelected, setDaySelected, setShowEventForm, savedEvents,setSelectedEvent } =
    useContext(Context);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents]);

  const getDayClass = () => {
    const format = "DD-MM-YY";
    const isSelected =
      daySelected && day.format(format) === daySelected.format(format);
    const isToday = day.format(format) === dayjs().format(format);

    if (isToday) {
      return "bg-red-900 text-red-100 rounded-full w-7 font-bold";
    }
    if (isSelected) {
      return "bg-red-200 text-red-900 rounded-full w-7";
    }
    return "";
  };

  return (
    <button
      onClick={() => setDaySelected(day)}
      className="border border-gray-300 flex flex-col"
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        onClick={() => {
          setDaySelected(day);
          setShowEventForm(true);
        }}
        className="flex-1 cursor-pointer"
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={()=>setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounde mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Day;
