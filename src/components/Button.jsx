import React from "react";

export default function Button({ children, onClick, className }) {
  const [styles, setStyles] = React.useState(
    "bg-primary hover:bg-primary_hover transition-colors ease-in-out duration-150 w-fit px-16 py-3 text-white font-semibold text-xl rounded"
  );

  return (
    <button
      onClick={() => onClick()}
      className={className ? className : styles}
    >
      {children}
    </button>
  );
}
