import React, { useState, useContext } from "react";
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DragOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import Context from "../context/Context.jsx";
import { labels } from "../utils/LabelsClass.js";

const EventForm = () => {
  const { setShowEventForm, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(Context);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [desc, setDesc] = useState(selectedEvent ? selectedEvent.desc : "");
  const [label, setLabel] = useState(
    selectedEvent ? labels.find((l) => l === selectedEvent.label) : labels[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      desc,
      label: label,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if(selectedEvent){
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    }else{
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventForm(false);
  };

  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <header
          className={`bg-${label}-500 px-4 py-2 flex justify-between items-center rounded-t-lg`}
        >
          <span className="text-gray-100 cursor-grab">
            <DragOutlined />
          </span>
          <div className="flex gap-2">
            {selectedEvent && (
              <span
              onClick={()=>{
                dispatchCalEvent({type:"delete",payload:selectedEvent})
                setShowEventForm(false)
            }}
               className="text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2  cursor-pointer">
                <DeleteOutlined />
              </span>
            )}
            <button type="button" onClick={() => setShowEventForm(false)}>
            <span className="text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full cursor-pointer">
              <CloseCircleOutlined />
            </span>
          </button>
          </div>
        </header>
        <div className="p-5">
          <div className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-700 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500 transition-colors"
            />
            <div className="flex items-center gap-x-3">
              <span className="text-gray-400">
                <ClockCircleOutlined />
              </span>
              <p className="text-gray-700 font-medium">
                {daySelected.format("dddd, MMMM DD")}
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <span className="text-gray-400">
                <AlignLeftOutlined />
              </span>
              <input
                type="text"
                name="title"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className="pt-3 border-0 text-gray-700 text-md pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-3">
          <span className="text-gray-400">
            <HighlightOutlined />
          </span>
          {labels.map((l, i) => (
            <span
              key={i}
              onClick={() => setLabel(l)}
              className={`bg-${l}-900 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
            >
              {/* {l} */}
              {label === l && (
                <span className="text-white text-sm">
                  <CheckCircleOutlined />
                </span>
              )}
            </span>
          ))}
        </div>

        <footer className="flex justify-end p-3 mt-5">
          <button
            onClick={handleSubmit}
            type="submit"
            className={`bg-${label}-400 hover:bg-${label}-600 px-6 py-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${label}-500 transition-colors`}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventForm;
