import React, { useContext, useState } from "react";
import { MessageBox, Input } from "react-chat-elements";
import "../utils/chat.css";
import ChatBg from "../assets/chat-bg.jpg";
import { IoSend } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import ReactLinkify from "react-linkify";
import DefaultImage from "../assets/default-profile.png";
import { useNavigate } from "react-router-dom";
import { WebsocketContext } from "../utils/websocketContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
import { useTranslation } from "react-i18next";
import "moment/locale/ko";
// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = ({ roomId, currentRoomData }) => {
  const { t, i18n } = useTranslation("manageWork");
  const { wsRef } = useContext(WebsocketContext);
  const { userState } = useContext(AuthContext);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const [roomMessages, setRoomMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [participantsData, setParticipantsData] = useState([]);
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
      .get(`/v1/chat/messages`, { params: { room_id: roomId, created_at: moment().valueOf(), count: 20 } })
      .then((response) => {
        setRoomMessages(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/EMPLOYEES ERROR : ", e);
      });

    return () => {};
  }, [roomId]);

  useEffect(() => {
    var participantsArray = [];
    for (let i = 0; i < currentRoomData.participants?.length; i++) {
      participantsArray[currentRoomData.participants?.[i]?.user_id] = {
        user_name: currentRoomData.participants?.[i]?.user_name,
        user_img: currentRoomData.participants?.[i]?.user_img,
      };
    }
    setParticipantsData(participantsArray);

    return () => {};
  }, [roomId, currentRoomData]);

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
    <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2 cursor-default">
      <div className="w-7 h-7 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
        {currentRoomData.participants?.map(
          (v, index) =>
            v.user_id !== userState.user.userId && (
              <img
                key={v.user_id}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = DefaultImage;
                }}
                src={v.user_img || DefaultImage}
                alt=""
                draggable={false}
                className={`${index > 1 ? "h-full w-1/2" : "h-full w-full"} flex object-cover`}
              />
            )
        )}
      </div>
      <p>
        {currentRoomData.participants?.map(
          (v, index) =>
            v.user_id !== userState.user.userId && (
              <span key={v.user_id}>
                {v.user_name}
                {index < currentRoomData.participants.length - 1 ? ", " : ""}
              </span>
            )
        )}
      </p>
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
        className="w-full h-full overflow-y-auto py-6 px-4 pb-8 relative flex flex-col-reverse"
      >
        <div ref={messagesEndRef} />
        {roomMessages.map((item, index) => {
          var isFirstMessage = false;
          if (index < roomMessages.length - 1 && roomMessages[index + 1].user_id === roomMessages[index].user_id) {
            isFirstMessage = false;
          } else {
            isFirstMessage = true;
          }
          return (
            <div key={item.chat_message_id} style={{ marginTop: isFirstMessage && "10px" }}>
              <MessageBox
                avatar={isFirstMessage && participantsData[item.user_id].user_img}
                title={isFirstMessage && participantsData[item.user_id].user_name}
                onTitleClick={() => navigate(`/user/${item.user_id}`)}
                position={item.user_id === userState.user.userId ? "right" : "left"}
                type={"text"}
                text={<ReactLinkify textDecorator={textDecorator}>{item.chat_message_text}</ReactLinkify>}
                date
                dateString={moment(item.chat_message_created_at).fromNow()}
                replyButton={true}
              />
            </div>
          );
        })}
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
