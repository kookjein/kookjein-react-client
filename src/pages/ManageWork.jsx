import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
// import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import DailyReport from "../components/DailyReport";
import Contracts from "../components/Contracts";
import ChatBg from "../assets/chat-bg.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import { BsChatSquare, BsListUl, BsPaperclip } from "react-icons/bs";

const ManageWork = () => {
  // const { t } = useTranslation("developerProfile");

  const { chatId } = useParams();
  const pathname = window.location.pathname;

  const TESTARRAY = [
    { id: 0, name: "모하메드" },
    { id: 1, name: "세린" },
    { id: 2, name: "김준석F" },
  ];

  const DefaultProfile = ({ small }) => (
    <div
      className={`${
        small ? "w-7 h-7" : "w-10 h-10"
      } rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center`}
    >
      <div className={`${small ? "w-3.5 h-3.5" : "w-4 h-4"} rounded-full bg-gray-400 -mt-1 opacity-75`} />
      <div className={`${small ? "-bottom-5" : "-bottom-4"} absolute w-7 h-7 rounded-full bg-gray-400 opacity-75`} />
    </div>
  );

  const LeftPanel = () => {
    const [filterString, setFilterString] = useState("");
    const Cell = ({ item }) => {
      return (
        <Link to={`/manage/${item.id}/chat`}>
          <button
            className={`${
              pathname.includes(`/manage/${item.id}`) ? "bg-gray-200" : "bg-white hover:bg-gray-100"
            } w-full h-16 flex items-center px-4 space-x-3 transition`}
          >
            <DefaultProfile />
            <div className="flex flex-col items-start w-full space-y-px">
              <p className="text-gray-600 text-sm">{item.name}</p>
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                className="text-gray-400 text-xs text-start"
              >
                안녕하세요 저는 알가잘리입니다. 안녕하세요 저는 알가잘리입니다.
              </p>
            </div>
            <div className="w-2.5 h-2.5 bg-green-700 flex-shrink-0 rounded-full"></div>
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
            placeholder="Search user"
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
          />
        </div>
        {TESTARRAY.filter((item) => item.name.includes(filterString)).map((item, index) => (
          <Cell key={index} item={item} />
        ))}
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
          <p className="font-bold text-gray-500 text-xs">소통 보조 담당 어시스턴트</p>

          <div className="rounded w-full text-gray-700 mt-3 text-sm flex flex-col p-2 rounded mt-2 border">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-bold">장동해 (Andrew Jang)</p>
                <p className="text-xs">어시스턴트 at 국제인</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setRequestPressed(!requestPressed)}
            className={`${
              requestPressed ? "bg-gray-200 text-gray-400 hover:bg-gray-100" : "bg-green-700 text-white filter hover:brightness-125"
            } border text px-4 py-2 rounded transition font-nanum font-semibold text-sm w-full mt-4`}
          >
            {requestPressed ? "초대 취소하기" : "어시스턴트 초대"}
          </button>
          {requestPressed && (
            <div className="text-sm text-green-600 break-keep mt-3 text-center">
              어시스턴트가 채팅방에 초대되었습니다.
            </div>
          )}
        </div>
      );
    };

    const ProfileSection = () => {
      return (
        <div className="flex flex-col items-center space-y-3 group">
          <Link to="/user/1" className="flex flex-col items-center space-y-3">
            <button className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center">
                <IoMdOpen className="w-8 h-8" />
              </div>
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
                <Cell type={"chat"} title={"1:1 채팅"} newTab={false} leftButton={<BsChatSquare />} />
                <Cell type={"report"} title={"일일 업무일지"} newTab={false} leftButton={<BsListUl />} />
                <Cell type={"documents"} title={"계약서 및 기타서류"} newTab={false} leftButton={<BsPaperclip />} />
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
