import React from "react";
import RightPanel from "./RightPanel";
import { GoMilestone } from "react-icons/go";

const ContractFlow3 = () => {
  const DateTag = () => (
    <div className="flex mb-6">
      <div className="py-1 rounded-r-full bg-gray-200 text-sm font-bold flex items-center justify-center text-gray-600 w-32">
        8월 8일
      </div>
    </div>
  );

  const EventCell = ({ title }) => (
    <div className="px-6 flex items-center space-x-4">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        <GoMilestone className="text-purple-400 w-5 h-5" />
      </div>
      <p className="font-bold font-gray-600">{title}</p>
    </div>
  );

  const MilestoneCell = ({ order }) => (
    <div className="flex items-center space-x-4">
      <p className="font-bold text-xs mt-4">{order}</p>
      <div className="w-full space-y-1">
        <p className="text-xs font-bold text-gray-600">마일스톤 제목</p>
        <div className="w-full h-9 rounded outline-green-600 flex items-center">메인페이지 UI 완료 및 수정</div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">마감일</p>
        <div className="w-36 h-9 rounded outline-green-600 flex items-center">2023.09.23</div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">지급 금액</p>
        <div className="w-36 h-9 rounded outline-green-600 flex items-center">330 만원</div>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-8 flex space-x-4">
      <div className="w-full pb-12 bg-white py-6 h-full rounded-lg border shadow-lg">
        <DateTag />

        <EventCell title="마일스톤이 등록 되었습니다." />
        <div className="mt-8 space-y-6 px-12 mb-8">
          <MilestoneCell order={1} />
          <MilestoneCell order={2} />
        </div>

        <DateTag />
        <EventCell title="마일스톤 #1의 에스크로 결제 완료" />
        <div className="mt-8 space-y-6 px-12 mb-8">
          <MilestoneCell order={1} />
        </div>

        <DateTag />
        <EventCell title="개발자 승인 대기중 (3일 안에 승인이 안나면 자동환불 처리됩니다.)" />
        <div className="mt-8 space-y-6 px-12 mb-8"></div>

        <DateTag />
        <EventCell title="개발자 승인 완료 / 프로젝트 시작" />

        <div className="mt-8 space-y-6 px-12 mb-8"></div>

        <DateTag />
        <EventCell title="개발자가 프로젝트를 제출했습니다. / 프로젝트 승인 대기중" />

        <div className="mt-8 space-y-6 px-12 mb-8"></div>

        <DateTag />
        <EventCell title="프로젝트 승인 완료 / 마일스톤 #2의 에스크로 결제 완료" />
      </div>
      <RightPanel confirmed />
    </div>
  );
};

export default ContractFlow3;
