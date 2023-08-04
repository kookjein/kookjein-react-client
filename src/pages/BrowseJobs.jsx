import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";

const BrowseJobs = () => {
  const { userState } = useContext(AuthContext);

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();

  const ProjectCell = () => {
    const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
    return (
      <div className="w-full p-6 border-b bg-white border rounded-xl">
        <div className="flex justify-between">
          <Link to={`/jobs/1`}>
            <p className="text-xl font-bold text-green-700 hover:underline cursor-pointer">
              020 커머스 서비스 플랫폼 개발
            </p>
          </Link>
          <div className="flex space-x-1">
            <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">단기 프로젝트</div>
            <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">인력 구인</div>
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <Tags title="React.js" />
          <Tags title="Javascript" />
          <Tags title="front-end" />
          <Tags title="backend" />
          <Tags title="aws" />
        </div>

        <div className="w-full h-10 bg-gray-100 mt-3 rounded flex overflow-hidden">
          <div className="w-1/3 border-r flex items-center justify-center text-sm border-white border-2">
            예상비용 4,000 만원
          </div>
          <div className="w-1/3 border-r flex items-center justify-center text-sm border-white border-2">
            예상기간 120일
          </div>
          <div className="w-1/3 flex items-center justify-center text-sm border-white border-2">마감일정 D-4</div>
        </div>

        <div className="p-3">
          <div className="text-sm mt-3 line-clamp-3">
            ※ 프로젝트의 진행 방식 - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 - 근무지 :
            서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 - 희망 근무
            시작일 : 8월 1째주 이내 (ASAP) - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다. +
            필요인력 및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차
            협의 가능합니다. + 필요인력 및 월급여 - front-end
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto"
      >
        <div className="w-full mt-8 flex">
          <div className="w-full px-6 pb-12 space-y-4 bg-gray-100 py-4">
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
            <ProjectCell />
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
            <div className="w-64 border pb-8 flex-shrink-0 bg-white rounded overflow-hidden rounded-xl">
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
