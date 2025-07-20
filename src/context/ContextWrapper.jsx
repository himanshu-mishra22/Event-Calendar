import React, { useEffect, useMemo, useReducer, useState } from "react";
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
  const [labels,setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filterEvents = useMemo(()=>{
    return savedEvents.filter(e => labels.filter(l => l.checked)
    .map(l =>l.label )
    .includes(e.label))
  } ,[savedEvents,labels])

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prev)=>{
      return [...new Set(savedEvents.map(evt=>evt.label))].map(label => {
        const currLabel = prev.find(l => l.label === label)
        return {
          label,
          checked: currLabel ? currLabel.checked: true
        };
      })
    })
  }, [savedEvents]);

  function updateLabel(label){
    setLabels(labels.map((l) =>(l.label === label.label ? label : l)))
  }



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
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filterEvents
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
