import React from "react";
import BrowseJobs from "./BrowseJobs";
import ProjectCell from "../components/ProjectCell";
import EmptyFile from "../assets/empty-file.png";
import { Link } from "react-router-dom";

const MainDeveloper = () => {
  const Dashboard = () => (
    <div className="flex space-x-6">
      <div className="w-full border rounded-xl py-6 bg-white">
        <div className="w-full items-center border-b pb-3">
          <h1 className="text-lg font-bold mx-6">내 프로젝트</h1>
        </div>
        <div className="py-4">
          <ProjectCell />
        </div>

        <div className="flex flex-col flex-shrink-0 items-center justify-center space-y-6 py-6">
          <img src={EmptyFile} alt="" className="w-32" />
          <div className="flex flex-col items-center space-y-1">
            <p className="text-lg font-bold">진행중인 프로젝트가 없습니다</p>
            <p className="text-sm">프로젝트를 등록하면 여러 개발자들이 지원할 수 있습니다.</p>
          </div>

          <Link to={"/post-job/flow-1"}>
            <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm">
              프로젝트 등록
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <BrowseJobs child={<Dashboard />} />
    </>
  );
};

export default MainDeveloper;
