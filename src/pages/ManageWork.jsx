import React, { useContext, useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
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

const ManageWork = () => {
  const { t } = useTranslation("manageWork");
  const { userState } = useContext(AuthContext);
  const { chatId } = useParams();
  const pathname = window.location.pathname;

  const TESTARRAY = [
    { id: 0, name: "모하메드", hasNotification: true, isEmployee: false },
    { id: 1, name: "세린", isEmployee: false },
    { id: 2, name: "김준석", isEmployee: true },
  ];

  const LeftPanel = () => {
    const [filterString, setFilterString] = useState("");
    const [rooms, setRooms] = useState([]);

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

    const Cell = ({ item }) => {
      return (
        <Link to={`/manage/${item.chat_room_id}/chat`} className="w-full">
          <button
            className={`${
              pathname.includes(`/manage/${item.chat_room_id}`) ? "bg-gray-200" : "bg-white hover:bg-gray-100"
            } w-full h-16 flex items-center px-4 space-x-3 transition`}
          >
            <img alt="" src={DefaultImage} className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200" />
            <div className="flex flex-col items-start w-full space-y-px">
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                className={`${
                  item.hasNotification ? "font-bold font-black" : "text-gray-600"
                } text-sm w-full text-left`}
              >
                {item.participants.map((v) => v.user_id !== userState.user.userId && v.user_name)}
              </p>
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                className={`${item.hasNotification ? "text-black" : "text-gray-400"} text-xs text-start`}
              >
                {item.chat_message_text}
              </p>
            </div>
            {item.hasNotification && <div className="w-2.5 h-2.5 bg-blue-400 flex-shrink-0 rounded-full"></div>}
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
        {rooms
          // .filter((item) => item.isEmployee)
          // .filter((item) => {
          //   item.participants.map((v) => v.user_id !== userState.user.userId && v.user_name).includes("김");
          // })
          .map((item, index) => (
            <Cell key={index} item={item} />
          ))}
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

  const MiddlePanel = () => {
    if (pathname.includes("/chat")) return <ChatPanel />;
    else if (pathname.includes("/report")) return <DailyReport chatId={chatId} />;
    else if (pathname.includes("/documents")) return <Contracts chatId={chatId} />;
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

  const RightPanel = () => {
    const [requestPressed, setRequestPressed] = useState(false);

    const Cell = ({ title, type, url, newTab, rightButton, leftButton }) => {
      return (
        <Link
          to={url ? url : `/manage/${chatId}/${type}`}
          target={newTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <button
            className={`${
              pathname === `/manage/${chatId}/${type}`
                ? "bg-gray-200 text-gray-700"
                : "bg-white hover:bg-gray-100 text-gray-600"
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

          <div className="rounded w-full text-gray-700 mt-3 text-sm flex flex-col p-2 rounded mt-2 border">
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
        <div className="flex flex-col items-center space-y-3 group">
          <Link to="/user/1" className="flex flex-col items-center space-y-3">
            <button className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
              <div className="w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center absolute">
                <IoMdOpen className="w-8 h-8" />
              </div>
              <img
                alt=""
                src={DefaultImage}
                className="w-full h-full object-cover flex-shrink-0 rounded-full bg-gray-200"
              />
            </button>
            <button>
              <p className="text-xl group-hover:underline transition">모하메드 알가잘리</p>
            </button>
          </Link>
          <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
            <p className="">풀스택 개발자</p>
            <p style={{ color: "#0E5034" }} className="font-bold">
              픽톨로지
            </p>
          </div>
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

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <Navbar2 light />
      <div style={{ maxWidth: "1480px" }} className="w-full h-full flex">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default ManageWork;
