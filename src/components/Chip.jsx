import React from "react";

export default function Chip({ children, className }) {
  return (
    <span
      className={
        className
          ? className
          : "bg-gray-700 text-white  rounded-md px-2 py-1 text-sm font-bold"
      }
    >
      {children}
    </span>
  );
}
