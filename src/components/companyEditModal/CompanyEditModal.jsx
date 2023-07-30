import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import BasicPanel from "./BasicPanel";
import SkillsetPanel from "./SkillsetPanel";

const CompanyEditModal = ({ initialTab = "Basic", closeModal, companyInfo }) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const { t } = useTranslation("companyEditModal");

  const LeftPanel = () => {
    const TabButton = ({ type, title }) => (
      <button
        onClick={() => setSelectedTab(type)}
        className={`${
          selectedTab === type ? "text-green-800 font-bold" : "text-gray-500 hover:bg-gray-200"
        } h-10 flex items-center text-sm relative w-full`}
      >
        {selectedTab === type && <div className="absoulte left-0 h-5 w-1 bg-green-700 rounded-r"></div>}
        <p className="px-6">{title}</p>
      </button>
    );
    return (
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="w-48 border-r bg-gray-50 py-2 flex-shrink-0">
        <div className="h-10 flex items-center px-4 text-sm font-bold">{t("company")}</div>
        <TabButton type="Basic" title={t("basic")} />
        <TabButton type="Detail" title={t("detail")} />
      </div>
    );
  };

  return (
    <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>{t("edit")}</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto">
        <LeftPanel />
        {selectedTab === "Basic" ? (
          <BasicPanel companyInfo={companyInfo} />
        ) : (
          selectedTab === "Detail" && <SkillsetPanel companyInfo={companyInfo} />
        )}
      </div>
    </div>
  );
};

export default CompanyEditModal;
