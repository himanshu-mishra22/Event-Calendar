import React, { useEffect, useMemo, useReducer, useState } from "react";
import Context from "./Context";
import dayjs from "dayjs";
import { RRule } from 'rrule';
import { getMonth } from "../utils/utils.js";

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
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);
  
  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((l) => l.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  const filteredByLabelEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  const allVisibleEvents = useMemo(() => {
    const events = [];
    const month = getMonth(monthIdx);
    const firstDayOfMonth = month[0][0].toDate();
    const lastDayOfMonth = month[month.length - 1][6].endOf('day').toDate();

    filteredByLabelEvents.forEach(event => {
      // console.log(event);
      if (!event.recurrence) {
        events.push(event);
        return;
      }
      const rule = new RRule({
        freq: RRule[event.recurrence.frequency],
        interval: event.recurrence.interval,
        byweekday: event.recurrence.byday?.map(d => RRule[d]),
        dtstart: new Date(event.day),
        until: event.recurrence.until ? new Date(event.recurrence.until) : null,
      });

      rule.between(firstDayOfMonth, lastDayOfMonth).forEach(date => {
        // console.log(date);
        
        events.push({
          ...event,
          day: date.getTime(),
          isOccurrence: true,
        });
      });
    });
    return events;
  }, [filteredByLabelEvents, monthIdx]);


  function updateLabel(label) {
    setLabels(
      labels.map((l) => (l.label === label.label ? label : l))
    );
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
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        allVisibleEvents,
        draggedEvent,
        setDraggedEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
