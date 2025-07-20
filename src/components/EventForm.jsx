import React, { useState, useContext } from "react";
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DragOutlined,
  HighlightOutlined,
  RedoOutlined, // Using a repeat/redo icon for recurrence
} from "@ant-design/icons";
import Context from "../context/Context.jsx";
import { labels } from "../utils/LabelsClass.js";
import EventFormBody from "./EventFormBody.jsx";

const EventForm = () => {
  const { setShowEventForm, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(Context);

  const labelColorMap = {
    indigo: "bg-indigo-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  // --- EXISTING STATE ---
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [desc, setDesc] = useState(selectedEvent ? selectedEvent.desc : "");
  const [label, setLabel] = useState(
    selectedEvent ? labels.find((l) => l === selectedEvent.label) : labels[0]
  );
  const [fromTime, setFromTime] = useState(
    selectedEvent ? selectedEvent.fromTime : "09:00"
  );
  const [toTime, setToTime] = useState(
    selectedEvent ? selectedEvent.toTime : "10:00"
  );

  // --- 1. STATE FOR RECURRENCE ---
  const initialRecurrence = {
    frequency: 'NONE', // Can be NONE, DAILY, WEEKLY, MONTHLY
    interval: 1,
    byday: [], // For weekly: ['MO', 'TU', etc.]
    until: null,
  };
  const [recurrence, setRecurrence] = useState(
      selectedEvent?.recurrence || initialRecurrence
  );

  // --- 2. UPDATE SUBMIT HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      desc,
      label: label,
      day: daySelected.valueOf(), // This is the START date of the event/series
      fromTime,
      toTime,
      id: selectedEvent ? selectedEvent.id : Date.now(),
      // Add the recurrence rule to the payload if it's not 'NONE'
      recurrence: recurrence.frequency !== 'NONE' ? recurrence : null,
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventForm(false);
  };

  const handleRecurrenceChange = (key, value) => {
      setRecurrence(prev => ({...prev, [key]: value}));
  };

  const toggleWeekday = (day) => {
      const currentDays = recurrence.byday;
      const newDays = currentDays.includes(day)
          ? currentDays.filter(d => d !== day)
          : [...currentDays, day];
      handleRecurrenceChange('byday', newDays);
  }

  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <header
          className={`${labelColorMap[label]} px-4 py-2 flex justify-between items-center rounded-t-lg`}
        >
          <span className="text-gray-100 cursor-grab">
            <DragOutlined />
          </span>
          <div className="flex gap-x-3 items-center">
            {selectedEvent && (
              <button
                type="button"
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventForm(false);
                }}
                className="text-gray-100 hover:text-gray-300 cursor-pointer"
              >
                <DeleteOutlined />
              </button>
            )}
            <button type="button" onClick={() => setShowEventForm(false)}>
              <span className="text-gray-100 hover:text-gray-300 cursor-pointer">
                <CloseCircleOutlined />
              </span>
            </button>
          </div>
        </header>

        <EventFormBody
          title={title}
          setTitle={setTitle}
          daySelected={daySelected}
          fromTime={fromTime}
          setFromTime={setFromTime}
          toTime={toTime}
          setToTime={setToTime}
          desc={desc}
          setDesc={setDesc}
          recurrence={recurrence}
          handleRecurrenceChange={handleRecurrenceChange}
          toggleWeekday={toggleWeekday}
        />

        <div className="flex items-center justify-center gap-x-3 py-4 border-t">
          <span className="text-gray-400"><HighlightOutlined /></span>
          {labels.map((l, i) => (
            <span
              key={i}
              onClick={() => setLabel(l)}
              className={`${labelColorMap[l]} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border-2 ${label === l ? 'border-gray-800' : 'border-transparent'}`}
            >
              {label === l && (
                <span className="text-white text-sm"><CheckCircleOutlined /></span>
              )}
            </span>
          ))}
        </div>

        <footer className="flex justify-end p-3 border-t">
          <button
            type="submit"
            className={`${labelColorMap[label]} px-6 py-2 rounded-md text-white font-semibold`}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventForm;
