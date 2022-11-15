import React from "react";

/**
 * @requires label : String
 * @requires value
 * @requires onChange : Function
 */

export const DialogInput = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-md font-medium">{label}</label>
      <input
        type="text"
        className="bg-gray-200 rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
