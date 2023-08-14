import React from "react";
import ProjectCell from "../components/ProjectCell";
import JobFilter from "../components/JobFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const BrowseJobs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_item");

  const clearSearch = () => {
    navigate("/browse-jobs");
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-8 pb-12"
      >
        <p className="text-2xl font-bold mt-8">프로젝트 찾기</p>
        {searchQuery && (
          <div className="flex mt-4 items-center text-sm space-x-4 text-gray-600">
            <p>검색중:</p>
            <div className="px-3 h-7 bg-white rounded-full shadow flex items-center space-x-3">
              <p className="text-sm">{searchQuery}</p>
              <button onClick={clearSearch} className="text-gray-500 hover:text-red-500">
                <IoMdClose />
              </button>
            </div>
          </div>
        )}

        <div className="w-full mt-6 flex space-x-6">
          <div className="w-full pb-12 space-y-4 rounded-lg shadow-lg overflow-hidden">
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
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
