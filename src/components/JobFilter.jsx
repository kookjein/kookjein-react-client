import React, { useState } from "react";

const JobFilter = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  return (
    <div className="w-64 border pb-8 flex-shrink-0 bg-white overflow-hidden rounded-xl shadow-lg">
      <div className="w-full h-12 bg-green-700 flex items-center px-6 text-white">
        <p>프로젝트 필터</p>
      </div>
      <div className="space-y-3 p-6">
        <p className="text-lg font-bold">프로젝트 방식</p>
        <button onClick={() => setFirst(0)} className="flex items-center space-x-2">
          <div
            className={`${
              first === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {first === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">전체</p>
        </button>
        <button onClick={() => setFirst(1)} className="flex items-center space-x-2">
          <div
            className={`${
              first === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {first === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">단기 계약</p>
        </button>
        <button onClick={() => setFirst(2)} className="flex items-center space-x-2">
          <div
            className={`${
              first === 2 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {first === 2 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">인력 구인</p>
        </button>
      </div>
      <div className="space-y-3 px-6">
        <p className="text-lg font-bold mt-3">프로젝트 카테고리</p>
        <button onClick={() => setSecond(0)} className="flex items-center space-x-2">
          <div
            className={`${
              second === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {second === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">전체</p>
        </button>
        <button onClick={() => setSecond(1)} className="flex items-center space-x-2">
          <div
            className={`${
              second === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {second === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">웹사이트</p>
        </button>
        <button onClick={() => setSecond(2)} className="flex items-center space-x-2">
          <div
            className={`${
              second === 2 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {second === 2 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">모바일 앱</p>
        </button>
        <button onClick={() => setSecond(3)} className="flex items-center space-x-2">
          <div
            className={`${
              second === 3 ? "border-green-600 bg-green-600" : "border-gray-300"
            } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
          >
            {second === 3 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
          </div>
          <p className="text-sm">기타 소프트웨어</p>
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
