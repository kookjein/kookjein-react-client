import React from "react";
import ContractFlow1 from "./ContractFlow1";
import { useSearchParams } from "react-router-dom";
import { AiOutlineCheck, AiOutlineRight } from "react-icons/ai";
import ContractFlow2 from "./ContractFlow2";
import ContractFlow3 from "./ContractFlow3";

const Contract = () => {
  const [searchParams] = useSearchParams();
  const flowQuery = searchParams.get("flow");

  const DirectoryCell = ({ title, order }) => (
    <div className="flex space-x-2 items-center">
      {order > 1 && (
        <div className="flex items-center space-x-2 mr-2">
          <AiOutlineRight className={`text-gray-400`} />
        </div>
      )}
      <div
        className={`${
          order <= parseInt(flowQuery) ? "bg-blue-500" : "bg-gray-400"
        } rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xs`}
      >
        {order < parseInt(flowQuery) ? <AiOutlineCheck className={`text-white w-4 h-4`} /> : order}
      </div>
      <p className={`${order <= parseInt(flowQuery) ? "text-blue-500" : "text-gray-500"} font-bold`}>{title}</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0, minHeight: "calc(100svh - 10rem)" }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around pb-24 px-4"
      >
        <div className="w-full flex items-center mt-8 space-x-6 text-sm">
          <DirectoryCell title="최종 예산, 기간, 마일스톤 설정" order={1} />
          <DirectoryCell title="에스크로 결제 진행" order={2} />
          <DirectoryCell title="개발자 승인 후 프로젝트 시작" order={3} />
        </div>

        {flowQuery === "1" ? <ContractFlow1 /> : flowQuery === "2" ? <ContractFlow2 /> : <ContractFlow3 />}
      </div>
    </div>
  );
};

export default Contract;
