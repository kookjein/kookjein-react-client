import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/authAxios";
import { AuthContext } from "../../context/authContext";
import ProjectCell from "../../components/ProjectCell";
import { useTranslation } from "react-i18next";
import EmptyFile from "../../assets/empty-file.png";
import RightPanel from "./RightPanel";

const MainDeveloper = () => {
  const { userState } = useContext(AuthContext);
  const [projects, setProjects] = useState();
  const [selectedTab, setSelectedTab] = useState("프로젝트 찾기");
  const { i18n } = useTranslation("profile");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  console.log("TODO", lang);

  useEffect(() => {
    axios.get(`/v1/project/all`).then((response) => {
      setProjects(response.data);
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
      <div className="w-full border rounded-xl bg-white shadow-lg">
        <div className="w-full items-center border-b pt-6">
          <h1 className="text-xl font-bold mx-8 mb-3 text-gray-700">대시보드</h1>

          <div className="w-full h-12 space-x-3 px-6 flex items-center">
            <TabButton title={"프로젝트 찾기"} />
            <TabButton title={"진행중"} />
            <TabButton title={"지원 현황"} />
          </div>
        </div>
        <div className="divide-y h-full flex flex-col">
          {selectedTab === "진행중" ? (
            <>
              <Empty />
            </>
          ) : selectedTab === "지원 현황" ? (
            <>
              <ProjectCell />
              <ProjectCell />
              <Empty />
            </>
          ) : (
            projects?.map((project) => <ProjectCell key={project.project_id} project={project} />)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0, minHeight: "calc(100svh - 10rem)" }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-4 pb-24"
      >
        <div className="w-full mt-8 flex">
          <div className="w-full px-6 pb-12 space-y-4 py-4">
            <Dashboard />
          </div>
          <RightPanel selectedTab={selectedTab} />
        </div>
      </div>
    </div>
  );
};

export default MainDeveloper;
