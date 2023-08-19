import React, { useState } from "react";
import RightPanel from "./RightPanel";
import { useTranslation } from "react-i18next";
import CheckFill from "../../assets/assistant/check_fill.png";
import CheckEmpty from "../../assets/assistant/check_empty.png";

const ContractFlow2 = () => {
  const { t } = useTranslation("assistant");
  const [assistantPlan, setAssistantPlan] = useState(0);

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

  const PriceCard = ({ price, plan, text, includes, isYear, type }) => {
    return (
      <button
        onClick={() => setAssistantPlan(type)}
        style={{ height: "23rem" }}
        className={`${
          assistantPlan === type ? "ring-2 ring-green-700 bg-green-700 bg-opacity-10" : "ring-0"
        } w-full border max-w-sm rounded-md p-8 px-6 flex flex-col`}
      >
        <div className="flex items-end space-x-2 mb-2">
          <p style={{ color: "#272D37" }} className="text-xl font-bold">
            {price === 0
              ? t("second.card.free")
              : isYear
              ? `${price * 11}${t("second.card.currency")}`
              : `${price}${t("second.card.currency")}`}
          </p>
          {price !== 0 && (
            <p style={{ color: "#5F6D7E" }} className="text-xs mb-1">
              {isYear ? t("second.card.year") : t("second.card.month")}
            </p>
          )}
        </div>

        <p className="text-sm font-bold mb-3 text-green-800">{plan}</p>
        <p style={{ color: "#5F6D7E" }} className="text-xs break-keep mb-6 text-left">
          {text}
        </p>
        <div className="w-full h-px bg-gray-200 mb-6" />

        <div className="space-y-4">
          <div className="flex">
            <img className="w-4 object-contain" src={includes > 0 ? CheckFill : CheckEmpty} alt="" />
            <p className="text-sm ml-3">{t("second.card.menu1")}</p>
          </div>
          <div className="flex">
            <img className="w-4 object-contain" src={includes > 1 ? CheckFill : CheckEmpty} alt="" />
            <p className="text-sm ml-3">{t("second.card.menu2")}</p>
          </div>
          <div className="flex">
            <img className="w-4 object-contain" src={includes > 2 ? CheckFill : CheckEmpty} alt="" />
            <p className={`${includes > 3 && "font-bold"} text-sm ml-3`}>
              {includes > 3 ? t("second.card.menu3_diff") : t("second.card.menu3")}
            </p>
          </div>
          <div className="flex">
            <img className="w-4 object-contain" src={includes > 3 ? CheckFill : CheckEmpty} alt="" />
            <p className="text-sm ml-3">{t("second.card.menu4")}</p>
          </div>
        </div>
      </button>
    );
  };

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

        <div className="pt-12 border-t">
          <p className="font-bold font-gray-600">마일스톤 설정 후 분할 지급</p>
          <div className="flex space-x-2 w-full justify-center items-center mt-4">
            <PriceCard price={0} plan={t("second.1.title")} text={t("second.1.text")} includes={2} type={0} />
            <PriceCard price={40} plan={t("second.2.title")} text={t("second.2.text")} includes={3} type={1} />
            <PriceCard price={160} plan={t("second.3.title")} text={t("second.3.text")} includes={4} type={2} />
          </div>
        </div>
      </div>
      <RightPanel confirmed assistantPlan={assistantPlan} />
    </div>
  );
};

export default ContractFlow2;
