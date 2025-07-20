import React, { useEffect, useReducer, useState } from "react";
import Context from "./Context";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evnt) => (evnt.id === payload.id ? payload : evnt));
    case "delete":
      return state.filter((evnt) => evnt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = ({ children }) => {
  const [monthIdx, setMonthIdx] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);
  return (
    <Context.Provider
      value={{
        monthIdx,
        setMonthIdx,
        daySelected,
        setDaySelected,
        showEventForm,
        setShowEventForm,
        savedEvents,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
