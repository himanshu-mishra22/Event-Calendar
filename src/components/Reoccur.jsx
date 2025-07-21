import React from 'react';
import { RedoOutlined } from "@ant-design/icons";

const Reoccur = ({ recurrence, handleRecurrenceChange, toggleWeekday }) => {
  return (
    <div className="border-t pt-4 space-y-4">
      <div className="flex items-center gap-x-3">
        <span className="text-gray-400"><RedoOutlined /></span>
        <select
          name="frequency"
          value={recurrence.frequency}
          onChange={(e) => handleRecurrenceChange('frequency', e.target.value)}
          className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="NONE">Does not repeat</option>
          <option value="DAILY">Interval</option>
        </select>
      </div>
      {recurrence.frequency === 'WEEKLY' && (
        <div className="pl-8 flex justify-between items-center">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
            <button
              key={day}
              type="button"
              onClick={() => toggleWeekday(day)}
              className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${recurrence.byday.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {day}
            </button>
          ))}
        </div>
      )}
      {recurrence.frequency !== 'NONE' && (
        <div className="pl-8 flex items-center gap-x-2">
          <p className="text-gray-600">Repeat every</p>
          <input
            type="number"
            name="interval"
            min="1"
            value={recurrence.interval}
            onChange={(e) => handleRecurrenceChange('interval', parseInt(e.target.value))}
            className="w-16 p-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-600">{recurrence.frequency.toLowerCase().replace('ly', '')}(s)</p>
        </div>
      )}
    </div>
  );
};

export default Reoccur;
