import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
// import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const ManageWorkDetail = () => {
  // const { t } = useTranslation("developerProfile");
  const { chatId } = useParams();
  const pathname = window.location.pathname;

  const LeftPanel = () => {
    const SecondSection = () => {
      const Cell = ({ title, type, url }) => {
        return (
          <Link to={url ? url : `/manage/${chatId}/${type}`}>
            <button
              className={`${
                pathname === `/manage/${chatId}/${type}`
                  ? "bg-green-800 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-600"
              } w-full h-14 flex items-center px-4 space-x-3 transition border-b`}
            >
              <p className="">{title}</p>
            </button>
          </Link>
        );
      };

      return (
        <div className="space-y-4 w-full flex flex-col items-center">
          <div className="w-full flex items-center px-4 pt-4">
            <Link to="/manage">
              <button>
                <FiArrowLeft className="w-6 h-6" />
              </button>
            </Link>
          </div>
          <div className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden"></div>
          <p className="text-xl">모하메드 알가잘리</p>
          <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
            <p className="">풀스택 개발자</p>
            <p style={{ color: "#0E5034" }} className="font-bold">
              픽톨로지
            </p>
          </div>
          <div className="w-full">
            <Cell type={"chat"} title={"1:1 채팅"} />
            <Cell type={"report"} title={"일일 업무일지"} />
            <Cell type={"documents"} title={"계약서 및 기타서류"} />
            <Cell url="/user/1" type={"profile"} title={"프로필 보기"} />
          </div>
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

  const RightPanel = () => {
    const ChatPanel = () => {
      const [requestPressed, setRequestPressed] = useState(false);
      return (
        <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white flex">
          <div style={{ height: "calc(100vh - 5rem)" }} className="w-full">
            <div style={{ height: "calc(100vh - 13rem)" }} className="w-full h-full overflow-y-auto">
              <div className="h-screen w-full bg-white"></div>
            </div>
            <div className="w-full h-32 flex-shrink-0 px-3 pb-8">
              <textarea style={{ resize: "none" }} className="w-full border p-2 outline-none flex-shrink-1 rounded" />
              <div className="w-full flex justify-end h-8 flex items-center font-bold text-green-800">
                <button className="py-1 hover:text-green-600">보내기</button>
              </div>
            </div>
          </div>
          <div className="w-72 border-l h-full flex-shrink-0 p-4 text-sm">
            <p className="text-lg font-bold text-gray-800">소통에 어려움을 겪으시나요?</p>
            <p className="mt-3 text-gray-800">kookje.in 어시스턴트에게</p>
            <p className="text-grat-800">도움을 요청해 보세요.</p>

            <p className="mt-3 text-gray-800">간단한 번역 요청은 채팅 내에서</p>
            <p className="text-grat-800">요청할 수 있고 통화를 원하시면</p>
            <p className="text-grat-800">아래의 버튼으로 요청하세요.</p>

            <div className="rounded w-full bg-green-800 bg-opacity-10 p-2 text-green-900 mt-5 text-sm">
              <p className="font-bold mt-1">담당 어시스턴트:</p>
              <div className="flex flex-col bg-white p-2 rounded mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                  <p className="font-bold">장동해</p>
                </div>
                <p className="text-xs mt-2">Assistant ID: {chatId}</p>
              </div>
            </div>
            <button
              onClick={() => setRequestPressed(true)}
              className="border text px-4 py-2 rounded hover:opacity-90 transition font-nanum font-semibold text-sm w-full mt-4 text-green-700"
            >
              {requestPressed ? "요청됨" : "어시스턴트 통화 요청"}
            </button>
            {requestPressed && <div className="text-sm text-green-600 break-keep mt-3 text-center">어시스턴트가 등록된 전화번호로 곧 연락드리겠습니다.</div>}
          </div>
        </div>
      );
    };
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

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <Navbar2 light />
      <div style={{ maxWidth: "1480px" }} className="w-full h-full flex shadow">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default ManageWorkDetail;
