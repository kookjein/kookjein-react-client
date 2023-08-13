import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const RightPanel = () => {
  const [searchParams] = useSearchParams();
  const flowQuery = searchParams.get("flow");
  const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;

  return (
    <div className="w-96 border rounded-xl flex-shrink-0 flex flex-col py-6 bg-white shadow-lg h-full">
      <p className="text-lg font-bold font-gray-600 px-6">프로젝트</p>
      <div className={`w-full px-6 py-4 bg-white`}>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between">
            <Link to={`/jobs/1`}>
              <p className="text-md font-bold text-green-700 hover:underline cursor-pointer break-keep">
                020 커머스 서비스 플랫폼 개발 커머스 서비스 플랫폼 개발
              </p>
            </Link>
          </div>
          <div className="flex space-x-2 mt-2">
            <Tags title="React.js" />
            <Tags title="Javascript" />
            <Tags title="front-end" />
          </div>
        </div>

        <div className="w-full rounded flex flex-col overflow-hidden space-y-2 px-2 mt-6">
          <div className="w-full py-1 flex items-center text-sm justify-between">
            <p>프로젝트 오너</p>
            <p className="font-bold">andrewdhjang</p>
          </div>
          <div className="w-full py-1 flex items-center text-sm justify-between">
            <p>개발자</p>
            <p className="font-bold">DEVELOPER_NAME</p>
          </div>
          {flowQuery === "3" && (
            <>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>프로젝트 상태</p>
                <p className="font-bold">시작됨</p>
              </div>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>계약서 ID</p>
                <p className="font-bold">#CVX1238923</p>
              </div>
            </>
          )}
        </div>
        <div className="w-full rounded flex flex-col overflow-hidden space-y-2 mt-6 px-2 border-t pt-6">
          {flowQuery === "1" ? (
            <>
              <p className="text-sm font-bold text-gray-600 mb-2">프로젝트 최초 등록 정보</p>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>예상비용</p>
                <p className="font-bold">2,000 만원</p>
              </div>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>예상기간</p>
                <p className="font-bold">120일</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-gray-600 mb-2">프로젝트 최종 정보</p>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>지급방식</p>
                <p className="font-bold">마일스톤 분할 (6분할)</p>
              </div>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>마일스톤 #1 비용</p>
                <p className="font-bold">300만원</p>
              </div>
              <div className="w-full py-1 flex items-center text-sm justify-between">
                <p>마일스톤 #1 데드라인</p>
                <p className="font-bold">2023년 9월 12일</p>
              </div>
            </>
          )}
        </div>
        {flowQuery === "2" && (
          <div className="w-full rounded flex flex-col overflow-hidden space-y-2 mt-6 px-2 border-t pt-6">
            <p className="text-sm font-bold text-gray-600 mb-2">결제 정보</p>
            <div className="w-full py-1 flex items-center text-sm justify-between">
              <p>마일스톤 #1 (6분할 중 1)</p>
              <p className="font-bold">300 만원</p>
            </div>
            <div className="w-full py-1 flex items-center text-sm justify-between">
              <p>서비스 수수료 10%</p>
              <p className="font-bold">30 만원</p>
            </div>
          </div>
        )}

        {flowQuery === "2" && (
          <div className="w-full rounded flex flex-col overflow-hidden space-y-2 mt-6 px-2 border-t pt-6">
            <div className="w-full py-1 flex items-center justify-between">
              <p className="font-bold">최종 결제 금액</p>
              <p className="font-bold">330 만원</p>
            </div>
          </div>
        )}

        {flowQuery === "2" && (
          <Link to="/contract?flow=3">
            <button className="mt-8 w-full h-12 bg-gray-800 rounded text-white font-bold hover:brightness-125">
              에스크로 결제 진행
            </button>
          </Link>
        )}
        <button className="mt-8 w-full h-12 bg-gray-800 rounded text-white font-bold hover:brightness-125">
          프로젝트 제출
        </button>
        <button className="mt-8 w-full h-12 bg-gray-800 rounded text-white font-bold hover:brightness-125">
          프로젝트 승인 및 에스크로 결제
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
