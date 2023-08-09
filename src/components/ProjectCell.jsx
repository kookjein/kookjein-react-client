import React from "react";
import { Link } from "react-router-dom";

const ProjectCell = ({ border }) => {
  const Tags = ({ title }) => (
    <div className="text-xs px-3 py-1 rounded-full bg-green-800 bg-opacity-10 text-green-800 hover:bg-opacity-20 cursor-pointer">
      {title}
    </div>
  );
  return (
    <Link to={`/jobs/1`}>
      <button
        className={`${border ? "border" : "border-b"} w-full p-8 bg-white group hover:bg-green-600 hover:bg-opacity-5`}
      >
        <p className="text-lg font-bold group-hover:text-green-700 cursor-pointer text-gray-700 w-full text-left">
          커머스 서비스 플랫폼 개발
        </p>

        <div className="flex space-x-3 mt-6 text-gray-600">
          <div className="text-xs font-bold">예상비용 4,000 만원.</div>
          <div className="text-xs">단기 프로젝트.</div>
          <div className="text-xs">예상기간 120일.</div>
          <div className="text-xs">마감일정 D-4.</div>
          <div className="text-xs">- 등록시간: 1시간전</div>
        </div>

        <div className="text-xs mt-4 line-clamp-4 tracking-tight w-full text-left break-keep">
          ※ 프로젝트의 진행 방식 - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 - 근무지 :
          서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 - 희망 근무 시작일
          : 8월 1째주 이내 (ASAP) - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다. + 필요인력
          및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의
          가능합니다. + 필요인력 및 월급여 - front-end 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의
          가능합니다. + 필요인력 및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시
          지원가능합니다. - 연차 협의 가능합니다. + 필요인력 및 월급여 - front-end
        </div>

        <div className="text-xs w-full text-left mt-6 font-bold text-gray-700">지원자: 0</div>

        <div className="flex space-x-2 mt-6">
          <Tags title="React.js" />
          <Tags title="Javascript" />
          <Tags title="front-end" />
          <Tags title="backend" />
          <Tags title="aws" />
        </div>
      </button>
    </Link>
  );
};

export default ProjectCell;
