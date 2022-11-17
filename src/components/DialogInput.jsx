import React from "react";

/**
 * @requires label : String
 * @requires value
 * @requires onChange : Function
 */

export const DialogInput = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-0 ">
      <label className="text-sm text-white font-medium mb-0">{label}</label>
      <input
        type="text"
        className="bg-gray-200 rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
