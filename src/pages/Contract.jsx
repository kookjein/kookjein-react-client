import React, { useState } from "react";
import ProjectCellSimple from "../components/ProjectCellSimple";

const Contract = () => {
  const [paymentOption, setPaymentOption] = useState(0);

  const DirectoryCell = ({ highlighted, title, order }) => (
    <div className="flex space-x-2 items-center">
      <div
        className={`${
          highlighted ? "bg-blue-500" : "bg-gray-400"
        } rounded-full w-4 h-4 flex items-center justify-center text-white font-bold text-xs`}
      >
        {order}
      </div>
      <p className={`${highlighted ? "text-blue-500 font-bold" : "text-gray-600"}`}>{title}</p>
    </div>
  );

  const PaymentOption = ({ paymentOption, setPaymentOption, title, subtitle }) => (
    <button onClick={() => setPaymentOption(title)} className="space-y-1">
      <div className="flex items-center space-x-2">
        <div
          className={`${
            paymentOption === title ? "border-green-600 bg-green-600" : "border-gray-300"
          } w-4 h-4 bg-white rounded-full border p-0.5 flex items-center justify-center`}
        >
          {paymentOption === title && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
        </div>
        <p className="text-sm font-bold">{title}</p>
      </div>
      <p className="text-xs text-left ml-6 text-gray-600">{subtitle}</p>
    </button>
  );

  const MilestoneCell = ({ order }) => (
    <div className="flex items-center space-x-4">
      <p className="font-bold text-xs mt-3">{order}</p>
      <div className="w-full space-y-1">
        <p className="text-xs font-bold text-gray-600">마일스톤 제목</p>
        <input className="w-full h-9 rounded border border-gray-300 outline-green-600 p-3" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">마감일</p>
        <input
          className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3"
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">지급 금액</p>
        <input
          className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3"
          type="number"
          min={new Date().toISOString().split("T")[0]}
        />
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
        <input
          className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3"
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">지급 금액</p>
        <input
          className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3"
          type="number"
          min={new Date().toISOString().split("T")[0]}
        />
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
        <input className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3" type="number" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-gray-600">월급 금액</p>
        <input className="w-36 h-9 rounded border border-gray-300 outline-green-600 p-3" type="number" />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1240px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto pb-12"
      >
        <div className="w-full flex items-center mt-8 space-x-8 text-sm">
          <DirectoryCell title="최종 예산, 기간, 마일스톤 설정" highlighted order={1} />
          <DirectoryCell title="개발자 확인" order={2} />
          <DirectoryCell title="에스크로/계약서" order={3} />
          <DirectoryCell title="프로젝트 시작" order={4} />
        </div>
        <div className="w-full mt-8 flex space-x-4">
          <div className="w-full px-6 pb-12 bg-white py-6 h-full rounded-lg border shadow-lg">
            <p className="text-lg font-bold font-gray-600">최종 예산, 기간, 마일스톤 설정</p>

            <p className="font-bold text-sm mt-12">개발자 급여 지급 방식을 선택해 주세요</p>

            <div className="mt-4 space-y-4">
              <PaymentOption
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                title="프로젝트 완료 후 한번에 지급"
                subtitle="모든 작업이 완료되었을 때 마지막에 전체 지불금을 지급합니다."
              />
              <PaymentOption
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                title="마일스톤 설정 후 분할 지급"
                subtitle="프로젝트를 마일스톤이라고 불리는 더 작은 세그먼트로 분할합니다. 마일스톤이 완료되고 승인되면 마일스톤에 대한 비용이 지급됩니다."
              />
              <PaymentOption
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                title="월급으로 지급"
                subtitle="월급의 형식으로 매월 고정된 비용이 지급됩니다."
              />
            </div>
            <div className="border-t mt-8 py-6">
              <p className="text-lg font-bold font-gray-600">마일스톤 설정 후 분할 지급</p>
              <p className="text-sm text-gray-600 mt-2">
                프로젝트 마일스톤을 추가하고 각 마일스톤이 만족스럽게 완료되면 분할 지불합니다.
              </p>
              <div className="mt-8 space-y-6">
                <MilestoneCell order={1} />
                <MilestoneCell order={2} />
              </div>
            </div>

            <div className="border-t mt-8 py-6">
              <p className="text-lg font-bold font-gray-600">프로젝트 완료 후 한번에 지급</p>
              <p className="text-sm text-gray-600 mt-2">모든 작업이 완료되었을 때 마지막에 전체 지불금을 지급합니다.</p>
              <div className="mt-8 space-y-6">
                <EntireProject />
              </div>
            </div>

            <div className="border-t mt-8 py-6">
              <p className="text-lg font-bold font-gray-600">월급으로 지급</p>
              <p className="text-sm text-gray-600 mt-2">월급의 형식으로 매월 고정된 비용이 지급됩니다.</p>
              <div className="mt-8 space-y-6">
                <MonthlyPayment />
              </div>
            </div>
            <div className="w-full flex justify-end mt-8">
              <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm font-bold">제안서 보내기</button>
            </div>
          </div>

          <div className="w-96 border rounded-xl flex-shrink-0 flex flex-col py-6 bg-white shadow-lg h-full">
            <p className="text-lg font-bold font-gray-600 px-6">프로젝트</p>
            <ProjectCellSimple />

            <div className="w-full rounded flex flex-col overflow-hidden border-t p-4 space-y-2">
              <div className="w-full py-1 px-4 flex items-center text-sm justify-between">
                <p>Project by</p>
                <p className="font-bold">andrewdhjang</p>
              </div>
              <div className="w-full py-1 px-4 flex items-center text-sm justify-between">
                <p>Contract Receiver</p>
                <p className="font-bold">DEVELOPER_NAME</p>
              </div>
              <div className="w-full py-1 px-4 flex items-center text-sm justify-between">
                <p>Contract ID</p>
                <p className="font-bold">#CVX1238923</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
