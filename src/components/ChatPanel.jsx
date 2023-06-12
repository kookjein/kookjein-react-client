import React from "react";
import { MessageBox } from "react-chat-elements";
import "../utils/chat.css";
// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = () => {
  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white flex">
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full">
        <div style={{ height: "calc(100vh - 11rem)" }} className="w-full h-full overflow-y-auto py-6 px-4 bg-green-100">
          {new Array(19).fill(0).map((item) => (
            <MessageBox
              position={"left"}
              type={"text"}
              title={"USER NAME"}
              text="Here is a text type message box"
              // notch={false}
              date={new Date()}
            />
          ))}
        </div>
        <div className="w-full h-24 flex-shrink-0 flex">
          <textarea
            placeholder="메세지 작성..."
            style={{ resize: "none" }}
            className="w-full p-2 outline-none flex-shrink-1 bg-red-100"
          />
          <button className="py-1 hover:text-green-600 flex-shrink-0 px-4">보내기</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
