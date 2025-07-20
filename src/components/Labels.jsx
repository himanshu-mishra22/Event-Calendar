import React, { useContext } from "react";
import Context from "../context/Context";

const Labels = () => {
  const { labels,updateLabel } = useContext(Context);
  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: l, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={()=>updateLabel({label:l,checked:!checked})}
            className={`form-checkbox h-5 2-5 text-${l}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{l}</span>
        </label>
      ))}
    </>
  );
};

export default Labels;
