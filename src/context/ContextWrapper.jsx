import React, { useEffect, useMemo, useReducer, useState } from "react";
import Context from "./Context";
import dayjs from "dayjs";
import { RRule } from 'rrule';
import { getMonth } from "../utils/utils.js"; // Make sure you have this utility

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
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // This logic creates the dynamic list of labels based on saved events
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

  // Renamed to filteredByLabelEvents for clarity
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
    // Get the very first and last day of the 6-week month view
    const firstDayOfMonth = month[0][0].toDate();
    const lastDayOfMonth = month[month.length - 1][6].endOf('day').toDate();

    filteredByLabelEvents.forEach(event => {
      // If it's a normal, non-recurring event, just add it
      if (!event.recurrence) {
        events.push(event);
        return;
      }

      // It IS a recurring event, so generate its occurrences
      const rule = new RRule({
        freq: RRule[event.recurrence.frequency],
        interval: event.recurrence.interval,
        byweekday: event.recurrence.byday?.map(d => RRule[d]),
        dtstart: new Date(event.day),
        until: event.recurrence.until ? new Date(event.recurrence.until) : null,
      });

      // Get all occurrences that fall between the first and last day of the visible month
      rule.between(firstDayOfMonth, lastDayOfMonth).forEach(date => {
        // Create a "virtual" event for each occurrence
        events.push({
          ...event,
          day: date.getTime(), // CRITICAL: Override the date with the occurrence date
          isOccurrence: true, // Flag to identify this as a virtual event
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
