import React, { useState } from "react";
import RightPanel from "./RightPanel";
import { GoMilestone } from "react-icons/go";

const Manage = () => {
  const [selectedTab, setSelectedTab] = useState("관리 내역");

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

  const TabButton = ({ title }) => (
    <button
      onClick={() => setSelectedTab(title)}
      className={`${
        selectedTab === title ? "text-black" : "text-gray-400"
      } px-8 flex items-center justify-center h-full relative hover:bg-gray-100 transition`}
    >
      <p className="font-bold">{title}</p>
      {selectedTab === title && <div className="h-0.5 rounded-full w-full bg-green-600 absolute bottom-0" />}
    </button>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around pb-24 px-4 mt-8"
      >
        <div className="w-full flex space-x-4">
          <div className="w-full pb-12 bg-white h-full rounded-lg border shadow-lg">
            <div className="flex text-gray-600 tracking-tight border-b mb-8 h-14">
              <TabButton title={"관리 내역"} />
              <TabButton title={"업무일지"} />
            </div>

            <DateTag />
            <EventCell title="개발자의 마일스톤 급여가 지급되었습니다." />
            <div className="mt-8 space-y-6 px-12 mb-8"></div>
            <EventCell title="프로젝트가 승인되었습니다." />
            <div className="mt-8 space-y-6 px-12 mb-12"></div>

            <DateTag />
            <EventCell title="프로젝트가 제출되었습니다." />
            <div className="mt-8 space-y-6 px-12 mb-12"></div>

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
            <div className="mt-8 space-y-6 px-12 mb-12"></div>

            <DateTag />
            <EventCell title="개발자 승인 완료 / 프로젝트 시작" />
            <div className="mt-8 space-y-6 px-12 mb-12"></div>

            <DateTag />
            <EventCell title="개발자가 프로젝트를 제출했습니다. / 프로젝트 승인 대기중" />
            <div className="mt-8 space-y-6 px-12 mb-12"></div>

            <DateTag />
            <EventCell title="프로젝트 승인 완료 / 마일스톤 #2의 에스크로 결제 완료" />
          </div>
          <RightPanel confirmed />
        </div>
      </div>
    </div>
  );
};

export default Manage;
