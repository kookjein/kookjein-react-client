import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const JobPostComplete = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-8 py-12">
      <AiFillCheckCircle className="w-24 h-24 text-green-600" />
      <p className="text-2xl font-bold">프로젝트가 등록되었습니다.</p>
      <Link to={`/`}>
        <button className="px-12 flex items-center justify-center h-10 bg-gray-800 text-white rounded hover:brightness-125 transition border flex-shrink-0">
          확인
        </button>
      </Link>
    </div>
  );
};

export default JobPostComplete;
