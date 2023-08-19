import React, { useState } from "react";

const Dropdown = ({ button, dropdown }) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setDropdownVisibility(true)}
      onMouseLeave={() => setDropdownVisibility(false)}
    >
      {button}
      {dropdownVisibility && (
        <article
          className={`${
            dropdownVisibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
          } absolute top-9 -right-2 sm:-right-6 shadow-xl rounded-lg ring-1 ring-gray-200 bg-white`}
        >
          {dropdown}
        </article>
      )}
    </div>
  );
};

export default Dropdown;
