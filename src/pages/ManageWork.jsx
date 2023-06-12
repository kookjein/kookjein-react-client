import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
// import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";

const ManageWork = () => {
  // const { t } = useTranslation("developerProfile");
  const location = useLocation();
  const { chatId } = useParams();
  const pathname = window.location.pathname;
  const [selectedTab, setSelectedTab] = useState(location.state ? location.state.tabStatus : 0);

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

  const changeTab = () => {
    selectedTab === 0 ? setSelectedTab(1) : setSelectedTab(0);
  };

  const LeftPanel = () => {
    const FirstSection = () => {
      const Cell = () => {
        return (
          <Link to={`/manage/0/chat`} state={{ tabStatus: selectedTab }}>
            <button className="w-full h-16 flex items-center px-4 space-x-3 hover:bg-gray-100 transition">
              <DefaultProfile />
              <div className="flex flex-col items-start w-full space-y-1">
                <p className="text-gray-600 text-sm">모하메드 알가잘리</p>
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
        <>
          <div className="w-full h-12 flex border-b">
            <button onClick={() => changeTab()} className="w-full flex items-center justify-center text-sm relative">
              {selectedTab === 0 && <div className="w-full h-1 bg-green-700 absolute bottom-0 rounded-full"></div>}
              <p className={`${selectedTab === 0 ? "text-green-700 font-bold" : "text-regular text-black"}`}>직원(1)</p>
            </button>
            <button onClick={() => changeTab()} className="w-full flex items-center justify-center text-sm relative">
              {selectedTab === 1 && <div className="w-full h-1 bg-green-700 absolute bottom-0 rounded-full"></div>}
              <p className={`${selectedTab === 1 ? "text-green-700 font-bold" : "text-regular text-black"}`}>메세지</p>
            </button>
          </div>
          <div className="h-2 w-full flex items-center px-4 text-xl font-bold text-green-900"></div>
          <Cell />
          <Cell />
          <Cell />
        </>
      );
    };

    return (
      <div
        style={{ height: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
      >
        <FirstSection />
      </div>
    );
  };

  const MiddlePanel = () => {
    if (pathname.includes("/chat")) return <ChatPanel />;
    else if (pathname.includes("/report"))
      return (
        <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
          DAILY REPORT ID : {chatId}
        </div>
      );
    else if (pathname.includes("/documents"))
      return (
        <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
          DOCUMENT ID : {chatId}
        </div>
      );
    return (
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
        Chat ID : {chatId}
      </div>
    );
  };

  const RightPanel = () => {
    const [requestPressed, setRequestPressed] = useState(false);

    const SecondSection = () => {
      const Cell = ({ title, type, url, newTab }) => {
        return (
          <Link
            to={url ? url : `/manage/${chatId}/${type}`}
            target={newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            <button
              className={`${
                pathname === `/manage/${chatId}/${type}`
                  ? "bg-green-800 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-600"
              } w-full h-12 flex items-center px-4 space-x-3 transition border-b`}
            >
              <p className="font-bold text-sm">{title}</p>
            </button>
          </Link>
        );
      };

      const AssistantSection = () => {
        return (
          <div className="w-full flex-shrink-0 text-sm bg-green-700 bg-opacity-20 p-4 py-6">
            <p className="font-bold text-gray-800">소통에 어려움을 겪으시나요?</p>
            <p className="mt-3 text-gray-800">어시스턴트에게 도움을 요청해 보세요.</p>

            <div className="rounded w-full bg-green-800 p-2 text-white mt-5 text-sm">
              <p className="font-bold mt-1">담당 어시스턴트:</p>
              <div className="flex flex-col bg-white p-2 rounded mt-2 text-black">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                  <p className="font-bold">장동해</p>
                </div>
                <p className="text-xs mt-2">Assistant ID: {chatId}</p>
              </div>
            </div>
            <button
              onClick={() => setRequestPressed(true)}
              className="border text px-4 py-2 rounded hover:bg-green-100 transition font-nanum font-semibold text-sm w-full mt-4 text-green-700 bg-white"
            >
              {requestPressed ? "요청됨" : "어시스턴트 통화 요청"}
            </button>
            {requestPressed && (
              <div className="text-sm text-green-600 break-keep mt-3 text-center">
                어시스턴트가 등록된 전화번호로 곧 연락드리겠습니다.
              </div>
            )}
          </div>
        );
      };

      const ProfileSection = () => {
        return (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0"></div>
            <p className="text-xl">모하메드 알가잘리</p>
            <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
              <p className="">풀스택 개발자</p>
              <p style={{ color: "#0E5034" }} className="font-bold">
                픽톨로지
              </p>
            </div>
          </div>
        );
      };

      return (
        <div className="w-full flex flex-col items-center pt-8 border-l h-full">
          <ProfileSection />
          <div className="w-full mt-4">
            <Cell type={"chat"} title={"1:1 채팅"} newTab={false} />
            <Cell type={"report"} title={"일일 업무일지"} newTab={false} />
            <Cell type={"documents"} title={"계약서 및 기타서류"} newTab={false} />
            <Cell url="/user/1" type={"profile"} title={"프로필 보기"} newTab={true} />
          </div>
          <AssistantSection />
        </div>
      );
    };

    return (
      <div
        style={{ height: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
      >
        <SecondSection />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <Navbar2 light />
      <div style={{ maxWidth: "1480px" }} className="w-full h-full flex shadow">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default ManageWork;
