import React from "react";
import RightPanel from "./RightPanel";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const ContractFlow3 = () => {
  return (
    <div className="w-full mt-8 flex space-x-4">
      <div className="w-full space-y-2">
        <div className="flex items-center w-full bg-green-600 rounded-lg space-x-3 p-1 shadow-lg">
          <AiFillCheckCircle className="w-6 h-6 text-white" />
          <p className="text-white text-sm">에스크로 결제가 완료되었습니다.</p>
        </div>
        <div className="w-full pb-12 bg-white rounded-lg border shadow-lg">
          <div className="w-full flex flex-col items-center text-gray-700 py-24">
            <p className="font-bold text-2xl">개발자 승인 대기중...</p>
            <p className="text-sm mt-4">3일 안에 개발자가 계약 승인을 하지 않으면 자동환불 처리됩니다.</p>
            <Link to="/manage">
              <button className="mt-8 w-full h-10 px-6 bg-gray-800 rounded text-white font-bold hover:brightness-125">
                관리 페이지로 이동
              </button>
            </Link>
          </div>
        </div>
      </div>
      <RightPanel confirmed />
    </div>
  );
};

export default ContractFlow3;
