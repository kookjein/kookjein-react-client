import React, { useContext, useState } from "react";
import { MessageBox, Input } from "react-chat-elements";
import "../utils/chat.css";
import ChatBg from "../assets/chat-bg.jpg";
import { IoSend } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import ReactLinkify from "react-linkify";
import DefaultImage from "../assets/default-profile.png";
import { Link } from "react-router-dom";
import { WebsocketContext } from "../utils/websocketContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
import { useTranslation } from "react-i18next";
import "moment/locale/ko";

// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = ({ roomId }) => {
  const { t, i18n } = useTranslation("manageWork");
  const { wsRef } = useContext(WebsocketContext);
  const { userState } = useContext(AuthContext);
  const inputRef = useRef(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const messagesEndRef = useRef(null);
  moment.locale(i18n.language);

  const textDecorator = (text) => <span className="text-blue-500 hover:underline cursor-pointer">{text}</span>;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    setScrollPosition(-scrollTop);
  };

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  useEffect(() => {
    const sendReadStatus = () => {
      if (wsRef.current) {
        wsRef.current.send(
          JSON.stringify({
            read: {
              user_id: userState.user.userId,
              chat_room_id: 1,
              chat_last_read_at: 0, // LAST CHAT MESSAGE TIMESTAMP
            },
          })
        );
      }
    };
    sendReadStatus();
    return () => {};
  }, [roomId, userState.user.userId, wsRef]);

  // // ===== WHEN WEBSOCKET IS OPEN ===== //
  // useEffect(() => {
  //   if (wsRef.current) {
  //     wsRef.current.onmessage = (e) => {
  //       console.log(e);
  //       // const newRawMessage = JSON.parse(eval(e.data));
  //       // sentMessage(
  //       //   newRawMessage,
  //       //   chatRooms,
  //       //   setChatRooms,
  //       //   setTotalMessages,
  //       //   userStorage,
  //       //   currentChatPageId,
  //       //   ws
  //       // );
  //       // setNewMessageResponse(newRawMessage);
  //     };
  //   }
  //   return () => {};
  // }, [wsRef.current]);

  useEffect(() => {
    axios
      .get(`/v1/chat/messages`, { params: { room_id: 1, created_at: moment().valueOf(), count: 20 } })
      .then((response) => {
        setRoomMessages(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/EMPLOYEES ERROR : ", e);
      });

    return () => {};
  }, []);

  const sendMessage = (text) => {
    inputRef.current.value = "";
    if (wsRef.current || inputRef.current?.value.replace(/\s/g, "").length !== 0) {
      wsRef.current.send(
        JSON.stringify({
          message: {
            chat_message_id: uuidv4(),
            chat_message_text: text,
            chat_message_created_at: moment().valueOf(),
            chat_room_id: null,
            chat_participants: [userState.user.userId, 2],
            user: {
              user_id: userState.user.userId,
              user_name: userState.user.userName,
              user_img: userState.user.userImage,
            },
          },
        })
      );
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (e.ctrlKey || e.metaKey) {
        inputRef.current.value += "\r\n";
      } else if (!e.shiftKey) {
        e.preventDefault();
        sendMessage(inputRef.current?.value);
      }
    }
  };

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
    useEffect(() => {
      console.log(scrollPosition);

      return () => {};
    }, [scrollPosition]);

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
        className="w-full h-full overflow-y-auto py-6 px-4 pb-8 relative flex flex-col-reverse"
      >
        <div ref={messagesEndRef} />
        {roomMessages.map((item, index) => (
          <div>
            <MessageBox
              key={item.chat_message_id}
              avatar="true"
              position={item.user_id === userState.user.userId ? "right" : "left"}
              type={"text"}
              title={"USERNAME"}
              text={<ReactLinkify textDecorator={textDecorator}>{item.chat_message_text}</ReactLinkify>}
              date
              dateString={moment(item.chat_message_created_at).fromNow()}
              replyButton={true}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex-shrink-0 flex flex-col absolute bottom-0 border-t">
        <TopButton scrollPosition={scrollPosition} />
        <Input
          referance={inputRef}
          placeholder={t("inputPlaceholder")}
          multiline={true}
          autofocus
          onKeyDown={handleKeypress}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex-shrink-0 px-4 flex justify-end items-end bg-white py-4 absolute right-0 bottom-0">
          <button
            onClick={() => sendMessage(inputRef.current?.value)}
            disabled={inputValue.replace(/\s/g, "").length === 0}
            className={`${
              inputValue.replace(/\s/g, "").length === 0
                ? "text-gray-300"
                : "text-sky-500 hover:text-sky-400 transition"
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
