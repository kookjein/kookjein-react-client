import React, { useEffect } from "react";
import ProjectCell from "../components/ProjectCell";
import EmptyFile from "../assets/empty-file.png";
import { Link } from "react-router-dom";
import axios from "../utils/authAxios";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import DefaultImage from "../assets/default-profile.png";
import JobFilter from "../components/JobFilter";
import { BiLinkExternal } from "react-icons/bi";

const MainDeveloper = () => {
  const { userState } = useContext(AuthContext);
  const [, setMyInfo] = useState();
  const [selectedTab, setSelectedTab] = useState("진행중");

  useEffect(() => {
    axios
      .get(`/v1/user/`, { params: { user_id: userState.user.userId } })
      .then((response) => {
        console.log(response.data);
        setMyInfo(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/ ERROR : ", e);
      });
  }, [userState]);

  const Dashboard = () => {
    const TabButton = ({ title }) => (
      <button
        onClick={() => setSelectedTab(title)}
        className={`${
          selectedTab === title ? "text-black" : "text-gray-400"
        } px-6 flex items-center justify-center h-full relative hover:bg-gray-100 transition`}
      >
        <p className="text-sm font-bold">{title}</p>
        {selectedTab === title && <div className="h-0.5 rounded-full w-full bg-green-600 absolute bottom-0" />}
      </button>
    );

    const Empty = () => (
      <div className="flex flex-col flex-shrink-0 items-center justify-center space-y-6 py-16">
        <img src={EmptyFile} alt="" className="w-32" />
        <div className="flex flex-col items-center space-y-1">
          <p className="text-lg font-bold">진행중인 프로젝트가 없습니다</p>
          <p className="text-sm">프로젝트를 등록하면 여러 개발자들이 지원할 수 있습니다.</p>
        </div>

        <button
          onClick={() => setSelectedTab("프로젝트 찾기")}
          className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm"
        >
          프로젝트 찾기
        </button>
      </div>
    );
    return (
      <div className="flex space-x-6">
        <div className="w-full border rounded-xl py-6 bg-white shadow-lg">
          <div className="w-full items-center border-b">
            <h1 className="text-xl font-bold mx-8 mb-3 text-gray-700">대시보드</h1>

            <div className="w-full h-12 space-x-3 px-6 flex items-center">
              <TabButton title={"진행중"} />
              <TabButton title={"지원 현황"} />
              <TabButton title={"프로젝트 찾기"} />
            </div>
          </div>
          <div className="">
            {selectedTab === "진행중" ? (
              <></>
            ) : selectedTab === "지원 현황" ? (
              <>
                <ProjectCell />
                <ProjectCell />
              </>
            ) : (
              <>
                <ProjectCell />
                <ProjectCell />
                <ProjectCell />
                <ProjectCell />
                <ProjectCell />
                <ProjectCell />
              </>
            )}
          </div>

          <Empty />
        </div>
      </div>
    );
  };

  const DeveloperHelp = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col p-6 bg-white shadow-lg space-y-4 text-gray-600">
      <p className="text-xs">
        Make sure to join Kookjein's Discord server when you apply for projects to get full support from our team.
      </p>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Kookjein's Discord Server</p>
          <BiLinkExternal />
        </div>
      </a>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Download DEV Manual</p>
          <BiLinkExternal />
        </div>
      </a>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Help Center</p>
          <BiLinkExternal />
        </div>
      </a>
    </div>
  );

  const MyProfileSummary = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col items-center p-6 bg-white shadow-lg">
      <Link to={`/user/${userState.user.userId}`}>
        <div className="flex flex-col items-center group">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={DefaultImage}
            alt=""
            draggable={false}
            className="w-16 h-16 bg-gray-100 rounded-full mb-4"
          />
          <p className="text-lg group-hover:text-green-600 group-hover:underline">Andrew Jang</p>
          <p className="text-xs line-clamp-1 text-gray-600">안녕하세요 남산컴퍼니 / 국제인 대표 장동해입니다.</p>
        </div>
        <div className="w-full mt-6 text-sm text-green-700 font-bold">
          <p>프로필을 완료하세요</p>
          <div className="flex items-center space-x-3">
            <div className="w-full h-1 rounded-full bg-gray-300">
              <div className="w-1/2 h-full bg-green-700"></div>
            </div>
            <p className="text-xs font-normal text-gray-600">50%</p>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto px-4 pb-24"
      >
        <div className="w-full mt-8 flex">
          <div className="w-full px-6 pb-12 space-y-4  py-4">
            <Dashboard />
          </div>
          <div className="w-64 space-y-4 flex-shrink-0">
            <MyProfileSummary />
            <DeveloperHelp />
            {selectedTab === "프로젝트 찾기" && <JobFilter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDeveloper;
