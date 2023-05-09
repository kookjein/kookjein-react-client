import React from "react";
import Navbar2 from "../components/Navbar2";
// import { useTranslation } from "react-i18next";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ManageWork = () => {
  // const { t } = useTranslation("developerProfile");

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
    const FirstSection = () => {
      const Cell = () => {
        return (
          <Link to={`/manage/0/chat`}>
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
          <div className="h-16 w-full flex items-center px-4 text-xl font-bold text-green-900">개발자 리스트 (1)</div>
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

  const RightPanel = () => {
    return (
      <div
        style={{ height: "calc(100vh - 5rem)" }}
        className="w-full h-screen bg-white flex flex-col items-center justify-center"
      >
        <img src={Logo} alt="" className="w-24 h-24 opacity-30 -mt-24" />
        <p className="text-green-900 opacity-40 mt-4">kookje.in 에서 뛰어난 개발자와 매칭하고</p>
        <p className="text-green-900 opacity-40 mt-1">소통과 일일 업무일지를 관리할 수 있습니다</p>
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

export default ManageWork;
