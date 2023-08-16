import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ProjectCell from "../../components/ProjectCell";
import EmptyFile from "../../assets/empty-file.png";
import RightPanel from "./RightPanel";
import axios from "../../utils/authAxios";

const MainClient = () => {
  const [selectedTab, setSelectedTab] = useState("진행중");
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios.get(`/v1/project/owner`).then((response) => {
      setProjects(response.data);
    });
  }, []);

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

        <Link to="/post-job/flow-1">
          <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm">
            프로젝트 등록
          </button>
        </Link>
      </div>
    );

    return (
      <div className="flex space-x-6">
        <div className="w-full border rounded-xl bg-white shadow-lg">
          <div className="w-full items-center border-b">
            <div className="flex justify-between w-full px-8 pt-6">
              <h1 className="text-xl font-bold mb-3 text-gray-700">대시보드</h1>
              <Link to="/post-job/flow-1">
                <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm">
                  프로젝트 등록
                </button>
              </Link>
            </div>

            <div className="w-full h-12 space-x-3 px-6 flex items-center">
              <TabButton title={"진행중"} />
              <TabButton title={"내 프로젝트"} />
            </div>
          </div>
          <div className="flex flex-col divide-y">
            {selectedTab === "진행중" ? (
              <></>
            ) : (
              <>
                {projects?.map((project) => (
                  <ProjectCell key={project.project_id} project={project} />
                ))}
              </>
            )}
          </div>

          <Empty />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0, minHeight: 'calc(100svh - 10rem)' }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-4 pb-24"
      >
        <div className="w-full mt-8 flex">
          <div className="w-full px-6 pb-12 space-y-4 py-4">
            <Dashboard />
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default MainClient;
