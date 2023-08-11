import React from "react";

const History = () => {
  const Cell = ({status}) => (
    <div className="h-14 w-full flex space-x-2 tracking-tight text-sm">
      <div className="w-48 flex-shrink-0 flex items-center ml-8 space-x-2 group cursor-pointer">
        <p className="group-hover:underline group-hover:text-green-700">장동해</p>
      </div>
      <div className="w-full flex items-center turncate space-x-2 group cursor-pointer">
        <div className="px-1 py-0.5 bg-purple-100 text-purple-500 font-bold text-xs rounded">마일스톤 1</div>
        <p className="group-hover:underline group-hover:text-green-700">커머스 서비스 플랫폼 개발</p>
      </div>
      <div className="w-32 flex-shrink-0 flex items-center">5월 12일</div>
      <div className="w-32 flex-shrink-0 flex items-center">4월 12일</div>
      <div className="w-32 flex-shrink-0 flex items-center">₩3,300,000</div>
      <div className="w-36 flex-shrink-0 flex items-center">{status}</div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1260px", scrollbarWidth: 0, minHeight: "calc(100svh - 12rem)" }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-4 pb-24"
      >
        <p className="text-2xl font-bold text-gray-800 my-6">결제 내역</p>

        <div className="w-full border rounded-xl bg-white shadow-lg overflow-hidden">
          <div className="w-full h-12 border-b flex text-xs font-bold text-gray-500 space-x-2">
            <p className="w-48 flex-shrink-0 flex items-center ml-8">개발자 / 클라이언트</p>
            <p className="w-full flex items-center">프로젝트 제목</p>
            <p className="w-32 flex-shrink-0 flex items-center">데드라인</p>
            <p className="w-32 flex-shrink-0 flex items-center">결제일</p>
            <p className="w-32 flex-shrink-0 flex items-center">결제 금액</p>
            <p className="w-36 flex-shrink-0 flex items-center">상태</p>
          </div>
          <div className="divide-y">
            <Cell status={"에스크로 결제완료"} />
            <Cell status={"개발자 지급완료"} />
            <Cell status={"결제 취소"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
