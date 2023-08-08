import React from "react";
import ProjectCell from "../components/ProjectCell";
import JobFilter from "../components/JobFilter";

const BrowseJobs = () => {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto px-8 pb-12"
      >
        <p className="text-2xl font-bold mt-8">프로젝트 찾기</p>
        <div className="w-full mt-8 flex space-x-6">
          <div className="w-full pb-12 space-y-4 bg-gray-100">
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
          </div>
          <div className="w-64 space-y-4">
            <JobFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
