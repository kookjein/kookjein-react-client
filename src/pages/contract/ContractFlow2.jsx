import React from "react";
import RightPanel from "./RightPanel";

const ContractFlow2 = () => {

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

  const EntireProject = () => (
    <div className="flex items-center space-x-4">
      <div className="w-full space-y-1">
        <p className="text-xs font-bold text-gray-600">프로젝트 제목</p>
        <p className="text-gray-600 font-bold text-sm h-9 flex items-center">
          020 커머스 서비스 플랫폼 개발 커머스 서비스 플랫폼 개발
        </p>
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

  const MonthlyPayment = () => (
    <div className="flex items-center space-x-4">
      <div className="w-full space-y-1">
        <p className="text-xs font-bold text-gray-600">프로젝트 제목</p>
        <p className="text-gray-600 font-bold text-sm h-9 flex items-center">
          020 커머스 서비스 플랫폼 개발 커머스 서비스 플랫폼 개발
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">계약 개월수</p>
        <div className="w-36 h-9 rounded outline-green-600 flex items-center">6개월</div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">월급 금액</p>
        <div className="w-36 h-9 rounded outline-green-600 flex items-center">330 만원</div>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-8 flex space-x-4">
      <div className="w-full px-6 pb-12 bg-white py-6 h-full rounded-lg border shadow-lg">
        <p className="text-lg font-bold font-gray-600">최종 정보 확인 및 에스크로 결제 진행</p>

        <div className="py-6">
          <p className="font-bold font-gray-600">마일스톤 설정 후 분할 지급</p>
          <p className="text-xs text-gray-600 mt-2">
            프로젝트 마일스톤을 추가하고 각 마일스톤이 만족스럽게 완료되면 분할 지불합니다.
          </p>
          <div className="mt-8 space-y-6">
            <MilestoneCell order={1} />
            <MilestoneCell order={2} />
          </div>
        </div>

        <div className="border-t mt-8 py-6">
          <p className="font-bold font-gray-600">프로젝트 완료 후 한번에 지급</p>
          <p className="text-xs text-gray-600 mt-2">모든 작업이 완료되었을 때 마지막에 전체 지불금을 지급합니다.</p>
          <div className="mt-8 space-y-6">
            <EntireProject />
          </div>
        </div>

        <div className="border-t mt-8 py-6">
          <p className="font-bold font-gray-600">월급으로 지급</p>
          <p className="text-xs text-gray-600 mt-2">월급의 형식으로 매월 고정된 비용이 지급됩니다.</p>
          <div className="mt-8 space-y-6">
            <MonthlyPayment />
          </div>
        </div>
      </div>
      <RightPanel confirmed />
    </div>
  );
};

export default ContractFlow2;
