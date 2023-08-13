import React from "react";

const NotificationDropdown = () => {
  const Cell = () => <div className="w-full h-24 bg-white hover:bg-green-700 hover:bg-opacity-5"></div>;
  return (
    <ul className="bg-white text-black rounded-lg w-96 divide-y">
      <div className="px-4 text-sm py-2 font-bold">알림</div>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </ul>
  );
};

export default NotificationDropdown;
