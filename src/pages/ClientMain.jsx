import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmptyFile from "../assets/empty-file.png";

const ClientMain = () => {
  const [currentJob, setCurrentJob] = useState(0);

  const ProjectCell = () => {
    const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
    return (
      <div className="w-full border-b p-6">
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
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
      <div style={{ maxWidth: "1000px" }} className="w-full h-full p-4 py-8 pb-24">
        <h1 className="text-2xl font-bold">내 대시보드</h1>

        <div className="h-12 w-full flex justify-end space-x-4">
          <Link to={"/browse-jobs"}>
            <button className="h-9 px-6 text-green-700 rounded hover:brightness-125">전체 프로젝트</button>
          </Link>
          <Link to={"/post-job/flow-1"}>
            <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125">프로젝트 등록</button>
          </Link>
        </div>
        <div className="flex space-x-6">
          <div className="mt-4 w-full border rounded py-6">
            <h1 className="text-lg font-bold mx-6">내 프로젝트</h1>
            <div className="h-12 w-full border-b flex items-center px-6 mt-4 space-x-4">
              <button
                onClick={() => setCurrentJob(0)}
                className="h-full px-1 relative flex items-center justify-center"
              >
                <p className={`text-sm text-gray-600 ${currentJob === 0 && "font-bold"}`}>진행중인 프로젝트</p>
                {currentJob === 0 && <div className="rounded-t-sm h-0.5 w-full bg-green-700 absolute bottom-0"></div>}
              </button>
              <button
                onClick={() => setCurrentJob(1)}
                className="h-full px-1 relative flex items-center justify-center"
              >
                <p className={`text-sm text-gray-600 ${currentJob === 1 && "font-bold"}`}>이전 프로젝트</p>
                {currentJob === 1 && <div className="rounded-t-sm h-0.5 w-full bg-green-700 absolute bottom-0"></div>}
              </button>
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
                <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125">프로젝트 등록</button>
              </Link>
            </div>
          </div>

          <div className="mt-4 w-72 w-64 border rounded flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default ClientMain;
