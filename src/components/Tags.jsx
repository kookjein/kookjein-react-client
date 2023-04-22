import React from "react";

const Tags = ({ item, size, shadow }) => {
  return (
    <button
      style={{ color: "#272D37" }}
      className={`py-1 px-2 rounded-lg hover:bg-gray-200 bg-gray-100 transition hover:shadow flex-shrink-0 ${
        size === "sm" ? "text-xs" : "text-sm"
      } ${shadow && "shadow-lg"}`}
    >
      {item}
    </button>
  );
};

export default Tags;
