import React from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default-profile.png";

const Notification = ({ item }) => {
  return (
    <Link to={`/manage/chat?room_id=${item.chat_room_id}&u=${item.user.user_id}`} className="w-full">
      <button className="w-full h-14 flex items-center space-x-3 transition bg-white">
        <div className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={item.user.user_img || DefaultImage}
            alt=""
            draggable={false}
            className={`h-full w-full flex object-cover`}
          />
        </div>

        <div style={{ width: "75%" }} className="flex flex-col items-start space-y-px">
          <p
            style={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            className={`text-gray-600 text-sm w-full text-left`}
          >
            {item.user.user_name}
          </p>
          <p
            style={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            className={`text-gray-400 text-xs text-start`}
          >
            {item.chat_message_text}
          </p>
        </div>
      </button>
    </Link>
  );
};

export default Notification;
