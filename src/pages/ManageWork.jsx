import React, { useContext, useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import { useTranslation } from "react-i18next";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import DailyReport from "../components/DailyReport";
import Contracts from "../components/Contracts";
import ChatBg from "../assets/chat-bg.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import { BsChatSquare, BsListUl, BsPaperclip } from "react-icons/bs";
import DefaultImage from "../assets/default-profile.png";
import axios from "../utils/authAxios";
import { AuthContext } from "../utils/authContext";
import moment from "moment";

const ManageWork = ({ newMessage }) => {
  const { t, i18n } = useTranslation("manageWork");
  const { userState } = useContext(AuthContext);
  const { chatId } = useParams();
  const pathname = window.location.pathname;
  const [searchParams] = useSearchParams();
  const roomIdQuery = searchParams.get("room_id");
  const receiverIdQuery = searchParams.get("u");
  const [currentRoomData, setCurrentRoomData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  moment.locale(i18n.language);

  useEffect(() => {
    axios
      .get(`/v1/chat/rooms`)
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("V1/CHAT/ROOMS ERROR : ", e);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (rooms) {
      for (let i = 0; i < rooms.length; i++) {
        if (`${rooms[i].chat_room_id}` === roomIdQuery) {
          setCurrentRoomData(rooms[i]);
        }
      }
    }
    return () => {};
  }, [rooms, roomIdQuery]);

  useEffect(() => {
    var roomsDuplicate = [...rooms];
    for (let i = 0; i < roomsDuplicate.length; i++) {
      if (roomsDuplicate?.[i]?.chat_room_id === newMessage?.chat_room_id) {
        roomsDuplicate[i].chat_message_created_at = newMessage.chat_message_created_at;
        roomsDuplicate[i].chat_message_text = newMessage.chat_message_text;

        roomsDuplicate.sort((a, b) => (a.chat_message_created_at < b.chat_message_created_at ? 1 : -1));
      }
    }

    setRooms(roomsDuplicate);
    return () => {};
    /* eslint-disable */
  }, [newMessage]);
  /* eslint-enable */

  useEffect(() => {
    setLoading(true);
    rooms.sort((a, b) => {
      setLoading(false);
      return a.chat_message_created_at < b.chat_message_created_at ? 1 : -1;
    });
    return () => {};
  }, [rooms]);

  const LeftPanel = () => {
    const [filterString, setFilterString] = useState("");

    const Cell = ({ item }) => {
      const [hasNewMessage, setHasNewMessage] = useState(false);
      const [receiverId, setReceiverId] = useState(receiverIdQuery);

      useEffect(() => {
        for (let i = 0; i < item.participants.length; i++) {
          if (item.participants[i].user_id === userState.user.userId) {
            if (item.participants[i].last_read_at < item.chat_message_created_at) {
              setHasNewMessage(true);
            }
          } else if (item.participants[i].user_id !== userState.user.userId) {
            setReceiverId(item.participants[i].user_id);
          }
        }

        return () => {};
      }, [item]);

      return (
        <Link to={`/manage/chat?room_id=${item.chat_room_id}&u=${receiverId}`} className="w-full relative">
          <span className="text-xs flex-shrink-0 absolute top-3 right-2 text-gray-500">
            {moment(item.chat_message_created_at).fromNow()}
          </span>
          <button
            className={`${
              roomIdQuery === `${item.chat_room_id}` ? "bg-gray-200" : "bg-white hover:bg-gray-100"
            } w-full h-16 flex items-center px-4 space-x-3 transition`}
          >
            <div className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
              {item.participants.map(
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

            <div style={{ width: "75%" }} className="flex flex-col items-start space-y-px">
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className={`${hasNewMessage ? "font-bold" : "text-gray-600"} text-sm w-full text-left`}
              >
                {item.participants.map(
                  (v, index) =>
                    v.user_id !== userState.user.userId && (
                      <span key={v.user_id}>
                        {v?.user_name}
                        {index < item.participants.length - 1 ? ", " : ""}
                      </span>
                    )
                )}
              </p>
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className={`${hasNewMessage ? "text-black" : "text-gray-400"} text-xs text-start`}
              >
                {item.chat_message_text}
              </p>
            </div>
            {hasNewMessage && <div className="w-2.5 h-2.5 bg-blue-400 flex-shrink-0 rounded-full"></div>}
          </button>
        </Link>
      );
    };

    return (
      <div
        style={{ height: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white border-l"
      >
        <div className="border-b w-full h-12 px-4 py-2 flex items-center space-x-2">
          <AiOutlineSearch className="text-gray-500" />
          <input
            className="w-full h-full outline-none bg-transparent"
            placeholder={t("searchPlaceholder")}
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
          />
        </div>
        <div className="py-2 w-full px-3 text-sm font-bold text-gray-500">
          <p>{t("employee")}</p>
        </div>
        {!isLoading &&
          rooms
            // .filter((item) => item.isEmployee)
            .filter((item) => {
              return item.participants[0]?.user_id === userState.user.userId
                ? item.participants[1]?.user_name.includes(filterString)
                : item.participants[0]?.user_name.includes(filterString);
            })
            .map((item, index) => <Cell key={index} item={item} />)}
        {/* <div className="py-2 w-full px-3 text-sm font-bold text-gray-500 border-t">
          <p>{t("all")}</p>
        </div>
        {rooms
          .filter((item) => !item.isEmployee)
          // .filter((item) => item.name.includes(filterString))
          .map((item, index) => (
            <Cell key={index} item={item} />
          ))} */}
      </div>
    );
  };

  const RightPanel = ({ currentRoomData }) => {
    const [requestPressed, setRequestPressed] = useState(false);

    const Cell = ({ title, type, url, newTab, rightButton, leftButton }) => {
      return (
        <Link
          to={url ? url : `/manage/${type}?room_id=${roomIdQuery}&u=${receiverIdQuery}`}
          target={newTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <button
            className={`${
              pathname === `/manage/${type}` ? "bg-gray-200 text-gray-700" : "bg-white hover:bg-gray-100 text-gray-600"
            } w-full h-14 flex items-center px-4 space-x-3 transition border-b justify-between`}
          >
            <div className="space-x-3 items-center flex">
              {leftButton}
              <p className="font-bold text-sm">{title}</p>
            </div>
            {rightButton}
          </button>
        </Link>
      );
    };

    const AssistantSection = () => {
      return (
        <div className="w-full flex-shrink-0 text-sm p-4 py-4">
          <p className="font-bold text-gray-500 text-xs">{t("assistant.title")}</p>

          <div className="w-full text-gray-700 mt-3 text-sm flex flex-col p-2 rounded border">
            <div className="flex items-center space-x-2">
              <img
                alt=""
                src={DefaultImage}
                className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200"
              />
              <div>
                <p className="font-bold">장동해 (Andrew Jang)</p>
                <p className="text-xs">{t("assistant.subtitle")}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setRequestPressed(!requestPressed)}
            className={`${
              requestPressed
                ? "bg-gray-200 text-gray-400 hover:bg-gray-100"
                : "bg-green-700 text-white filter hover:brightness-125"
            } border px-4 py-2 rounded transition font-nanum font-semibold text-sm w-full mt-4`}
          >
            {requestPressed ? t("assistant.button1Cancel") : t("assistant.button1")}
          </button>
          {requestPressed && (
            <div className="text-sm text-green-600 break-keep mt-2 text-center">{t("assistant.response")}</div>
          )}
          <button
            className={`border border-green-700 text-green-700 px-4 py-2 rounded transition font-nanum font-semibold text-sm w-full mt-2`}
          >
            {t("assistant.button2")}
          </button>
        </div>
      );
    };

    const ProfileSection = () => {
      return (
        <div className="flex flex-col items-center space-y-3 group mb-4">
          <Link to={`/user/${receiverIdQuery}`} className="flex flex-col items-center space-y-3">
            <button className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
              <div className="w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center absolute">
                <IoMdOpen className="w-8 h-8" />
              </div>
              <div className="w-full h-full object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
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
            </button>
            <button>
              <p className="text-xl group-hover:underline transition mt-2">
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
            </button>
          </Link>
        </div>
      );
    };

    if (pathname.includes("/chat") || pathname.includes("/report") || pathname.includes("/documents"))
      return (
        <div
          style={{ height: "calc(100vh - 5rem)", color: "#272D37" }}
          className="w-72 flex border-r border-l flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
        >
          <div className="w-full flex flex-col items-center pt-8 h-full">
            <div className="w-full flex flex-col items-center h-full">
              <ProfileSection />
              <div className="w-full mt-4 border-t">
                <Cell type={"chat"} title={t("chat")} newTab={false} leftButton={<BsChatSquare />} />
                <Cell type={"report"} title={t("dailyReport")} newTab={false} leftButton={<BsListUl />} />
                <Cell type={"documents"} title={t("contract")} newTab={false} leftButton={<BsPaperclip />} />
                <AssistantSection />
              </div>
            </div>
          </div>
        </div>
      );
  };

  const StartPanel = () => {
    return (
      <div
        className="w-full border-r flex items-center justify-center"
        style={{ backgroundImage: `url(${ChatBg})`, backgroundRepeat: "repeat" }}
      >
        <div className="select-none rounded-full bg-black bg-opacity-50 px-4 py-1 text-sm text-white">
          Choose the chat room to start
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <Navbar2 light />
      <div style={{ maxWidth: "1480px" }} className="w-full h-full flex">
        <LeftPanel />
        <Routes>
          <Route
            path="/chat"
            element={
              <ChatPanel
                roomId={roomIdQuery}
                currentRoomData={currentRoomData}
                rooms={rooms}
                setRooms={setRooms}
                newMessage={newMessage}
              />
            }
          />
          <Route path="/report" element={<DailyReport chatId={chatId} currentRoomData={currentRoomData} />} />
          <Route path="/documents" element={<Contracts chatId={chatId} currentRoomData={currentRoomData} />} />
          <Route path="/" element={<StartPanel />} />
        </Routes>
        <RightPanel currentRoomData={currentRoomData} />
      </div>
    </div>
  );
};

export default ManageWork;
