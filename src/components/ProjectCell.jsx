import React from "react";
import { Link } from "react-router-dom";

const ProjectCell = ({ border }) => {
  const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
  return (
    <div className={`${border ? "border" : "border-b"} w-full p-6 bg-white`}>
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
        <div className="w-1/4 border-r flex items-center justify-center text-sm border-white border-2">
          예상비용 4,000 만원
        </div>
        <div className="w-1/4 border-r flex items-center justify-center text-sm border-white border-2">
          예상기간 120일
        </div>
        <div className="w-1/4 flex items-center justify-center text-sm border-white border-2">마감일정 D-4</div>
        <div className="w-1/4 flex items-center justify-center text-sm border-white border-2">지원자 0</div>
      </div>

      <div className="p-3">
        <div className="text-sm mt-3 line-clamp-3">
          ※ 프로젝트의 진행 방식 - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 - 근무지 :
          서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 - 희망 근무 시작일
          : 8월 1째주 이내 (ASAP) - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다. + 필요인력
          및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의
          가능합니다. + 필요인력 및 월급여 - front-end
        </div>
      </div>
    </div>
  );
};

export default ProjectCell;
