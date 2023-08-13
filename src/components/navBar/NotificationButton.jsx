import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationDropdown from "./NotificationDropdown";
import { useOnOutsideClick } from "../../utils/useOnOutsideClick";

const NotificationButton = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { innerBorderRef } = useOnOutsideClick(() => setDropdownVisibility(false));

  const Dropdown = ({ button, dropdown }) => {
    return (
      <div className="relative flex">
        {button}
        {dropdownVisibility && (
          <article
            ref={innerBorderRef}
            className={`absolute top-10 -right-2 sm:right-0 shadow-xl rounded-lg ring-1 ring-gray-200 bg-white`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const Button = () => (
    <button
      onClick={() => setDropdownVisibility(!dropdownVisibility)}
      className="relative w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded transition"
    >
      <IoNotificationsOutline className="w-6 h-6 text-gray-500" />
      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 ring-2 ring-white rounded-full"></div>
    </button>
  );

  return <Dropdown button={<Button />} dropdown={<NotificationDropdown />} />;
};

export default NotificationButton;
