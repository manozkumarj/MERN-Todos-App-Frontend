import React from "react";

const Loader = ({ size, borderWidth, lightThemeColor, darkThemeColor }) => {
  return (
    <div
      className={`inline-block ${size} mr-3 animate-spin rounded-full ${borderWidth} border-solid border-current border-e-transparent align-[-0.125em] ${lightThemeColor} motion-reduce:animate-[spin_1.5s_linear_infinite] dark:${darkThemeColor}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
