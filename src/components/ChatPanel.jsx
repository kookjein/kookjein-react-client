import React, { useContext, useState } from "react";
import { MessageBox, Input } from "react-chat-elements";
import "../utils/chat.css";
import { IoSend } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import ReactLinkify from "react-linkify";
import DefaultImage from "../assets/default-profile.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WebsocketContext } from "../context/websocketContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import axios from "../utils/authAxios";
import { useTranslation } from "react-i18next";
import "moment/locale/ko";
// DOCS - https://detaysoft.github.io/docs-react-chat-elements/

const ChatPanel = ({ currentRoomData, rooms, setRooms, newMessage }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("chatPage");
  const lang = i18n.language.includes("en") ? "en" : "ko";

  const [searchParams] = useSearchParams();
  const receiverIdQuery = searchParams.get("u");
  const roomIdQuery = searchParams.get("room_id");

  const { wsRef } = useContext(WebsocketContext);
  const { userState } = useContext(AuthContext);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [roomMessages, setRoomMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [participantsData, setParticipantsData] = useState([]);
  const [firstMessageTimestamp, setFirstMessageTimestamp] = useState(moment().valueOf());
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
  }, [roomIdQuery]);

  useEffect(() => {
    const currentTime = moment().valueOf();
    const sendReadStatus = () => {
      if (wsRef.current && roomIdQuery) {
        wsRef.current.send(
          JSON.stringify({
            read: {
              user_id: userState.user.userId,
              chat_room_id: roomIdQuery,
              chat_last_read_at: currentTime, // LAST CHAT MESSAGE TIMESTAMP
            },
          })
        );
      }
    };
    sendReadStatus();

    var roomsDuplicate = [...rooms];
    for (let i = 0; i < roomsDuplicate.length; i++) {
      if (`${roomsDuplicate[i].chat_room_id}` === roomIdQuery) {
        for (let j = 0; j < roomsDuplicate[i].participants.length; j++) {
          if (roomsDuplicate[i].participants[j].user_id === userState.user.userId) {
            roomsDuplicate[i].participants[j].last_read_at = currentTime;
          }
        }

        roomsDuplicate.sort((a, b) => {
          return a.chat_message_created_at < b.chat_message_created_at ? 1 : -1;
        });
        setRooms(roomsDuplicate);
      }
    }
    return () => {};
    /* eslint-disable */
  }, [roomIdQuery, userState.user.userId, wsRef, newMessage, setRooms]);
  /* eslint-enable */

  useEffect(() => {
    if (newMessage && roomIdQuery === `${newMessage.chat_room_id}`) {
      newMessage.user_id = newMessage.user.user_id;
      setRoomMessages((previousMessage) => [newMessage, ...previousMessage]);
    }
    return () => {};
  }, [newMessage, roomIdQuery]);

  useEffect(() => {
    const getInitialMessages = () => {
      axios
        .get(`/v1/chat/messages`, { params: { room_id: roomIdQuery, created_at: moment().valueOf(), count: 25 } })
        .then((response) => {
          setRoomMessages(response.data);
          setFirstMessageTimestamp(response.data[response.data.length - 1].chat_message_created_at);
        })
        .catch((e) => {
          console.log("V1/CHAT/MESSAGES INITIAL ERROR : ", e);
        });
    };
    if (roomIdQuery) {
      getInitialMessages();
    }
    return () => {
      setFirstMessageTimestamp(moment().valueOf());
    };
  }, [roomIdQuery]);

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
  }, [roomIdQuery, currentRoomData]);

  const getMessages = () => {
    axios
      .get(`/v1/chat/messages`, { params: { room_id: roomIdQuery, created_at: firstMessageTimestamp, count: 25 } })
      .then((response) => {
        setRoomMessages([...roomMessages, ...response.data]);
        setFirstMessageTimestamp(response.data[response.data.length - 1]?.chat_message_created_at || 0);
      })
      .catch((e) => {
        console.log("V1/CHAT/MESSAGES ERROR : ", e);
      });
  };

  const sendMessage = (text) => {
    const currentTime = moment().valueOf();
    if (wsRef.current || inputRef.current?.value.replace(/\s/g, "").length !== 0) {
      wsRef.current.send(
        JSON.stringify({
          message: {
            chat_message_id: uuidv4(),
            chat_message_text: { [userState.user.userLanguage]: text },
            chat_message_created_at: currentTime,
            chat_room_id: roomIdQuery || null,
            chat_participants: [userState.user.userId, receiverIdQuery],
            user: {
              user_id: userState.user.userId,
              user_name: userState.user.userName,
              user_img: userState.user.userImage,
            },
          },
        })
      );

      var roomsDuplicate = [...rooms];
      for (let i = 0; i < rooms.length; i++) {
        if (`${rooms[i].chat_room_id}` === roomIdQuery) {
          roomsDuplicate[i].chat_message_created_at = currentTime;
          // roomsDuplicate[i].chat_message_text[lang] = text;

          for (let j = 0; j < roomsDuplicate[i].participants.length; j++) {
            if (roomsDuplicate[i].participants[j].user_id === userState.user.userId) {
              roomsDuplicate[i].participants[j].last_read_at = currentTime;
            }
          }

          roomsDuplicate.sort((a, b) => {
            return a.chat_message_created_at < b.chat_message_created_at ? 1 : -1;
          });
          setRooms(roomsDuplicate);
        }
      }
    }
    inputRef.current.value = "";
    setInputValue("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (inputValue.replace(/\s/g, "").length !== 0) {
      if (e.keyCode === 13) {
        if (e.ctrlKey || e.metaKey) {
          inputRef.current.value += "\r\n";
        } else if (!e.shiftKey) {
          e.preventDefault();
          sendMessage(inputRef.current?.value);
        }
      }
    } else {
      if (e.keyCode === 13) {
        if (e.ctrlKey || e.metaKey) {
          inputRef.current.value += "\r\n";
        } else if (!e.shiftKey) {
          e.preventDefault();
        }
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
                {index < currentRoomData.participants.length - 1 && currentRoomData.participants.length > 2 ? ", " : ""}
              </span>
            )
        )}
      </p>
    </div>
  );

  const TopButton = ({ scrollPosition }) => {
    return (
      <div className={`items-center justify-end z-20 px-4 ${scrollPosition > 0 ? "flex" : "hidden"}`}>
        <button
          onClick={scrollToBottom}
          className="flex items-center justify-center bg-green-700 text-white shadow-lg bg-opacity-75 w-12 h-12 rounded-full mb-2 border filter hover:brightness-125"
        >
          <AiOutlineArrowDown className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div style={{ height: "calc(100svh - 4rem)" }} className="w-screen sm:w-full bg-white flex flex-col relative">
      <Header />
      <div
        onScroll={handleScroll}
        style={{ height: "calc(100svh - 13rem)" }}
        className="w-full h-full overflow-y-auto py-6 px-4 pb-8 relative flex flex-col-reverse bg-gray-100"
      >
        <div ref={messagesEndRef} />
        {roomMessages.map((item, index) => {
          var dayChanged = false;
          var isFirstMessage = false;
          if (index < roomMessages.length - 1 && roomMessages[index + 1].user_id === roomMessages[index].user_id) {
            isFirstMessage = false;
          } else {
            isFirstMessage = true;
          }
          if (
            index < roomMessages.length - 1 &&
            !moment(roomMessages[index + 1].chat_message_created_at).isSame(
              moment(roomMessages[index].chat_message_created_at),
              "day"
            )
          ) {
            dayChanged = true;
          } else {
            dayChanged = false;
          }
          return (
            <div key={item.chat_message_id} style={{ marginTop: isFirstMessage && "10px" }}>
              {dayChanged && (
                <div className="w-full flex justify-center my-6 cursor-default">
                  <div className="px-4 text-sm bg-white rounded-lg border py-1 text-blue-500">
                    {moment(item.chat_message_created_at).format("YYYY, Mo Do")}
                  </div>
                </div>
              )}
              <MessageBox
                avatar={isFirstMessage && participantsData[item.user_id]?.user_img}
                title={isFirstMessage && participantsData[item.user_id]?.user_name}
                onTitleClick={() => navigate(`/user/${item.user_id}`)}
                position={item.user_id === userState.user.userId ? "right" : "left"}
                type={"text"}
                notch={false}
                text={
                  <ReactLinkify textDecorator={textDecorator}>
                    <span
                      style={{ maxWidth: "100%", overflowWrap: "anywhere", whiteSpace: "pre-line" }}
                      className="break-keep cursor-default"
                    >
                      {item.chat_message_text[lang]}
                    </span>
                  </ReactLinkify>
                }
                date
                dateString={moment(item.chat_message_created_at).fromNow()}
              />
            </div>
          );
        })}
        {firstMessageTimestamp === 0 || roomMessages.length < 25 ? (
          <div
            className="px-3 py-1 text-blue-500 font-bold rounded-lg text-sm flex items-center justify-center"
            onClick={getMessages}
          >
            {t("firstMessage")}
          </div>
        ) : (
          <button
            className="px-3 py-1 bg-white text-blue-500 font-bold shadow rounded-lg text-sm hover:bg-gray-50"
            onClick={getMessages}
          >
            {t("loadMore")}
          </button>
        )}
      </div>
      <div className="w-full flex-shrink-0 flex flex-col absolute bottom-0">
        <TopButton scrollPosition={scrollPosition} />
        <Input
          referance={inputRef}
          placeholder={t("inputPlaceholder")}
          className="border-t"
          multiline={true}
          autofocus
          onKeyDown={handleKeypress}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex-shrink-0 px-4 flex justify-end items-end py-4 absolute right-0 bottom-0">
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
