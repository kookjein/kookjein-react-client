import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../utils/authContext";

const WorkPost = () => {
  // const { t } = useTranslation("developerProfile");
  const { chatId } = useParams();
  // const pathname = window.location.pathname;
  const { userState } = useContext(AuthContext);
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
    const Cell = () => {
      const Title = ({ title, text }) => (
        <div className="flex space-x-2">
          <div className="text-xs w-12 text-left flex-shrink-0 tracking-tight">{title}</div>
          <p
            style={{
              width: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
            className="text-gray-500 text-xs text-start"
          >
            {text}
          </p>
        </div>
      );
      return (
        <Link to={"/work-post/1"} className="w-full relative">
          <div className="absolute top-4 right-3 h-5 flex text-xs space-x-1 items-center">
            <p className="text-green-600 h-full flex items-center rounded font-bold">지원자 7명</p>
            <div
              style={{ fontSize: "1px" }}
              className="h-4 w-4 flex items-center justify-center font-bold bg-red-500 rounded-full text-white"
            >
              N
            </div>
          </div>
          <button className="w-full flex px-4 py-4 space-x-3 hover:bg-gray-100 transition border-b">
            <div className="flex flex-col items-start w-full space-y-2">
              <p className="text-gray-600 text-sm font-bold">iOS Swift 개발자</p>
              <Title title="등록일" text="2023.4.25" />
              <Title title="테크스택" text="Swift, Kotlin, Firebase" />
              <Title title="모집인원" text="2명" />
            </div>
          </button>
        </Link>
      );
    };
    return (
      <div
        style={{ height: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
      >
        <div className="w-full px-4 py-3 border-b">
          <div className="flex space-x-3 items-center mb-3">
            <DefaultProfile />
            <div>
              <p className="text-sm">{userState.user.userName}</p>
              {/* <p className="text-xs text-gray-500">Company · Title</p>{" "} */}
              <button
                style={{ fontSize: "11px" }}
                className="px-2 py-1 bg-gray-200 text-xs rounded text-green-700 hover:bg-gray-300"
              >
                + Register company
              </button>
            </div>
          </div>
          <Link to="/work-post/register">
            <button className="w-full h-10 rounded bg-green-700 filter hover:brightness-125 text-white text-sm flex items-center justify-center space-x-1">
              <AiOutlinePlus className="text-white w-4 h-4" />
              <p>새 구인글 등록</p>
            </button>
          </Link>
        </div>
        <Cell />
        <Cell />
        <Cell />
      </div>
    );
  };

  const PostPanel = () => {
    return (
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
        Post ID : {chatId}
      </div>
    );
  };

  const RegisterPanel = () => {
    const Title = ({ title, subtitle }) => (
      <div>
        <p className="font-bold text-sm text-gray-600">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    );
    return (
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white p-6 space-y-4">
        <p className="text-lg font-bold text-green-700">Post a Job</p>
        <Title title="Project Title" subtitle="One liner explaining your project" />
        <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-600" />
        <Title title="Project description and scope" />
        <textarea style={{ resize: "none" }} className="w-1/2 h-32 rounded border border-gray-300 mb-4 p-2 outline-green-600" />
        <Title title="Project URL (if any)" />
        <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-600" />
        <Title title="Project category" />
        <Title title="Project status" />
        <Title
          title="Project timeline"
          subtitle="Let us know when you want to start, when you expect the project to be done and milestones in between if any"
        />
        <Title title="Number of developers hiring" />
        <Title title="Skills required" subtitle="Tech-stack / programming languages / frameworks / tools etc." />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div style={{ maxWidth: "1480px" }} className="w-full h-full flex shadow">
        <LeftPanel />
        <Routes>
          <Route path="/register" element={<RegisterPanel />} />
          <Route path="/:postId" element={<PostPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default WorkPost;
