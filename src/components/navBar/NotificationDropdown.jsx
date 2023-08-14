import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationDropdown = () => {
  const Cell = () => (
    <button className="w-full h-20 bg-sky-900 hover:bg-gray-100 bg-opacity-10 flex items-center px-4">
      <div className="w-12 h-12 rounded-full bg-sky-600 bg-opacity-20 flex items-center justify-center">
        <IoNotificationsOutline className="w-6 h-6 text-sky-600 opacity-70" />
      </div>
    </button>
  );
  return (
    <ul className="bg-white text-black rounded-lg w-96">
      <div className="px-4 text-sm py-2 font-bold">알림</div>
      <div style={{ maxHeight: "24rem" }} className="divide-y divide-gray-300 overflow-y-auto">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className="px-4 text-sm h-8 font-bold border-t"></div>
    </ul>
  );
};

export default NotificationDropdown;
