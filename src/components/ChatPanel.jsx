import React, { useState } from "react";
import { MessageBox, Input } from "react-chat-elements";
import "../utils/chat.css";
import ChatBg from "../assets/chat-bg.jpg";
import { IoSend } from "react-icons/io5";
// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = () => {
  const [inputText, setInputText] = useState("");
  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white flex flex-col relative">
      <div
        style={{ height: "calc(100vh - 11rem)", backgroundImage: `url(${ChatBg})`, backgroundRepeat: "repeat" }}
        className="w-full h-full overflow-y-auto py-6 px-4 pb-24"
      >
        {new Array(19).fill(0).map((item) => (
          <MessageBox
            avatar="true"
            position={"left"}
            type={"text"}
            title={"USER NAME"}
            text="Here is a text type message box Here is a text type message box Here is a text type message box Here is a text type message box Here is a text type message box"
            // notch={false}
            date={new Date()}
            replyButton={true}
          />
        ))}
        {new Array(3).fill(0).map((item) => (
          <MessageBox
            position={"right"}
            type={"text"}
            // title={"USER NAME"}
            text="Here is a text type message box Here is a text type message box Here is a text type message box Here is a text type message box"
            // notch={false}
            date={new Date()}
          />
        ))}
      </div>
      <div className="w-full flex-shrink-0 flex absolute bottom-0 border-t">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메세지 작성..."
          multiline={true}
          autofocus
          onKeyDown={(e) => console.log(e)}
        />
        <div style={{ width: "8.1%" }} className="flex-shrink-0 px-4 flex justify-end items-end bg-white py-4">
          <button
            disabled={inputText.replace(/\s/g, "").length === 0}
            className={`${
              inputText.replace(/\s/g, "").length === 0
                ? "text-gray-300"
                : "text-green-700 hover:text-green-600 transition"
            }`}
          >
            <IoSend className="w-6 h-6 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
