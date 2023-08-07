import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DefaultImage from "../assets/default-profile.png";
import ProjectCell from "../components/ProjectCell";

const BrowseJobs = ({ child }) => {
  const { userState } = useContext(AuthContext);

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto"
      >
        <div className="w-full mt-8 flex">
          <div className="w-full px-6 pb-12 space-y-4 bg-gray-100 py-4">
            {child}

            <p className="text-xl font-bold pt-8">전체 프로젝트</p>
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
            <ProjectCell border />
          </div>
          <div className="w-64 space-y-4">
            <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col items-center p-6 bg-white">
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
                  <p className="text-xs line-clamp-1 text-gray-600">
                    안녕하세요 남산컴퍼니 / 국제인 대표 장동해입니다.
                  </p>
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
            <div className="w-64 border pb-8 flex-shrink-0 bg-white overflow-hidden rounded-xl">
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
                  <p className="text-sm">웹사이트</p>
                </button>
                <button onClick={() => setSecond(1)} className="flex items-center space-x-2">
                  <div
                    className={`${
                      second === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
                    } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
                  >
                    {second === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
                  </div>
                  <p className="text-sm">모바일 앱</p>
                </button>
                <button onClick={() => setSecond(2)} className="flex items-center space-x-2">
                  <div
                    className={`${
                      second === 2 ? "border-green-600 bg-green-600" : "border-gray-300"
                    } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
                  >
                    {second === 2 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
                  </div>
                  <p className="text-sm">기타 소프트웨어</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
