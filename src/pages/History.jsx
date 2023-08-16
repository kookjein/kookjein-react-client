import React from "react";
import { Link } from "react-router-dom";

const History = () => {
  const Cell = ({ date, status, method, badge }) => (
    <div className="h-14 w-full flex space-x-2 tracking-tight text-sm">
      <div className="w-24 flex-shrink-0 flex items-center ml-8 text-xs">{date}</div>
      <div className="w-36 flex-shrink-0 flex items-center space-x-2 group cursor-pointer">
        <p className="group-hover:underline group-hover:text-green-700">장동해</p>
      </div>
      <div className="w-full flex items-center turncate space-x-2 group cursor-pointer">
        {badge && <div className="px-1 py-0.5 bg-purple-100 text-purple-500 font-bold text-xs rounded">{badge}</div>}
        <p className="group-hover:underline group-hover:text-green-700">커머스 서비스 플랫폼 개발</p>
      </div>
      <div className="w-40 flex-shrink-0 flex items-center">{method}</div>
      <div className="w-32 flex-shrink-0 flex items-center">₩3,300,000</div>
      <div className="w-36 flex-shrink-0 flex items-center">{status}</div>
      <div className="w-28 flex-shrink-0 flex items-center justify-center text-blue-500 hover:brightness-125 text-sm">
        <Link to="/manage">
          <button>자세히 보기</button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1260px", scrollbarWidth: 0, minHeight: "calc(100svh - 12rem)" }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-4 pb-24"
      >
        <p className="text-2xl font-bold text-gray-800 my-6">결제 내역</p>

        <div className="w-full border rounded-lg bg-white shadow-lg overflow-hidden">
          <div className="w-full h-10  border-b flex text-xs font-bold text-gray-600 space-x-2">
            <p className="w-24 flex-shrink-0 flex items-center ml-8">일시</p>
            <p className="w-36 flex-shrink-0 flex items-center">개발자 / 클라이언트</p>
            <p className="w-full flex items-center">프로젝트 제목</p>
            <p className="w-40 flex-shrink-0 flex items-center">프로젝트 방식</p>
            <p className="w-32 flex-shrink-0 flex items-center">결제 금액</p>
            <p className="w-36 flex-shrink-0 flex items-center pr-4">상태</p>
            <div className="w-28 flex-shrink-0 flex items-center pr-4"></div>
          </div>
          <div className="divide-y">
            <Cell date="5월 14일" badge={"마일스톤 2"} status={"에스크로 결제완료"} method="마일스톤 단위 결제" />
            <Cell date="5월 13일" badge={"마일스톤 1"} status={"개발자 지급완료"} method="마일스톤 단위 결제" />
            <Cell date="4월 14일" badge={"마일스톤 1"} status={"에스크로 결제완료"} method="마일스톤 단위 결제" />
            <Cell date="2월 11일" status={"결제 취소"} method="프로젝트 전체 결제" />
            <Cell date="2월 11일" status={"에스크로 결제완료"} method="프로젝트 전체 결제" />

            <Cell date="22' 5월 14일" badge={"5월 월급"} status={"에스크로 결제완료"} method="월급" />
            <Cell date="22' 5월 14일" badge={"4월 월급"} status={"개발자 지급완료"} method="월급" />
            <Cell date="22' 4월 14일" badge={"4월 월급"} status={"에스크로 결제완료"} method="월급" />
            <Cell date="22' 4월 14일" badge={"3월 월급"} status={"개발자 지급완료"} method="월급" />
            <Cell date="22' 3월 14일" badge={"3월 월급"} status={"에스크로 결제완료"} method="월급" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
