import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CompanyDropdown = () => {
  const { t } = useTranslation("navBar");
  const Divider = () => <div className="w-full h-px bg-gray-200 mb-6 mt-3" />;

  return (
    <ul className="bg-white text-black rounded-lg p-5 w-56 text-sm">
      <p className="font-semibold font-sans text-gray-600 mb-2">{t("company.internal")}</p>
      <Link
        to="https://candle-chemistry-608.notion.site/62a540c630b948e8817bdb36f262d5c8"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.partners")}</div>
      </Link>
      <Link
        to="https://www.namsancompany.com"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.team")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/Tech-65b1bae7371f461db0238f6cabe18484"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.blog")}</div>
      </Link>

      <Divider />
      <p className="font-semibold font-sans text-gray-600 mb-2">{t("company.external")}</p>
      <Link
        to="https://candle-chemistry-608.notion.site/7f34a912fa764803aa270f1f21754d5e"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.news")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/5bfc7fb3a6234942bf9ab43be65268f3?v=2e8c1d8335954f6a923bd196baaa2d1a"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.investor")}</div>
      </Link>
    </ul>
  );
};

export default CompanyDropdown;
