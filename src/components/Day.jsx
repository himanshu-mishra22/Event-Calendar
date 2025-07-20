import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context.jsx";

const Day = ({ day, rowIdx }) => {

  const labelColorMap = {
    indigo: "bg-indigo-300",
    gray: "bg-gray-300",
    green: "bg-green-300",
    blue: "bg-blue-300",
    red: "bg-red-300",
    purple: "bg-purple-300",
};

  const [dayEvents, setDayEvents] = useState([]);
  const { daySelected, setDaySelected, setShowEventForm,filterEvents,setSelectedEvent } =
    useContext(Context);

  useEffect(() => {
    const events = filterEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filterEvents]);

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
            className={`${labelColorMap[evt.label]} p-1 mr-3 text-gray-600 text-sm rounde mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Day;
