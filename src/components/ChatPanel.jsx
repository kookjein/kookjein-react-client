import React, { useState } from "react";
import { MessageBox, Input } from "react-chat-elements";
import "../utils/chat.css";
import ChatBg from "../assets/chat-bg.jpg";
import { IoSend } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import ReactLinkify from "react-linkify";
import DefaultImage from "../assets/default-profile.png";
import { Link } from "react-router-dom";
// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = () => {
  const [inputText, setInputText] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const messagesEndRef = useRef(null);
  const textDecorator = (text) => <span className="text-blue-500 hover:underline cursor-pointer">{text}</span>;
  const SAMPLETEXT =
    "Here is a text type message box Here is a text type www.kookjein.com message box here is a text type message box Here is a text type message box Here is type message box sn";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const scroll = scrollHeight - scrollTop - clientHeight;
    setScrollPosition(scroll);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const Header = () => (
    <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2">
      <Link to="/user/1">
        <button className="flex items-center space-x-2">
          <img alt="" src={DefaultImage} className="w-7 h-7 object-cover flex-shrink-0 rounded-full bg-gray-200" />
          <p>모하메드 알가잘리</p>
        </button>
      </Link>
    </div>
  );

  const TopButton = ({ scrollPosition }) => {
    return (
      <button
        className={`rounded-6px items-center justify-end filter z-20 bg-opacity-75 w-full h-7 text-white border-b space-x-2 font-bold bg-green-700 hover:bg-green-600 px-4 ${
          scrollPosition > 0 ? "flex" : "hidden"
        } transition duration-200`}
        onClick={scrollToBottom}
      >
        <p className="text-sm">Scroll to bottom</p>
        <AiOutlineArrowDown className="w-4 h-4" />
      </button>
    );
  };

  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white flex flex-col relative">
      <Header />
      <div
        onScroll={handleScroll}
        style={{ height: "calc(100vh - 14.4rem)", backgroundImage: `url(${ChatBg})`, backgroundRepeat: "repeat" }}
        className="w-full h-full overflow-y-auto py-6 px-4 pb-12 relative"
      >
        {new Array(19).fill(0).map((item) => (
          <MessageBox
            avatar="true"
            position={"left"}
            type={"text"}
            title={"USERNAME"}
            text={<ReactLinkify textDecorator={textDecorator}>{SAMPLETEXT}</ReactLinkify>}
            date={new Date()}
            replyButton={true}
          />
        ))}
        {new Array(3).fill(0).map((item) => (
          <MessageBox
            position={"right"}
            type={"text"}
            text={<ReactLinkify textDecorator={textDecorator}>{SAMPLETEXT}</ReactLinkify>}
            date={new Date()}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full flex-shrink-0 flex flex-col absolute bottom-0 border-t">
        <TopButton scrollPosition={scrollPosition} />
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메세지 작성..."
          multiline={true}
          autofocus
          onKeyDown={(e) => console.log(e)}
        />
        <div className="flex-shrink-0 px-4 flex justify-end items-end bg-white py-4 absolute right-0 bottom-0">
          <button
            disabled={inputText.replace(/\s/g, "").length === 0}
            className={`${
              inputText.replace(/\s/g, "").length === 0 ? "text-gray-300" : "text-sky-500 hover:text-sky-400 transition"
            }`}
          >
            <IoSend className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
