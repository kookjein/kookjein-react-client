import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResourcesDropdown = () => {
  const { t } = useTranslation("navBar");
  return (
    <ul className="bg-white text-black rounded-lg p-5 w-56 text-sm">
      <Link
        to="https://candle-chemistry-608.notion.site/FAQ-9b9927f37295435dbe5114157a498e48"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.faq")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/e5ec81c45bd141f49b716ce8fc7b9b0e"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.community")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/08aae9cfc4bb4b1ea1dbcbdafd6a6b1a"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.customer")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/Legal-9faf14d01dd14883ab0096f1702e0824"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.legal")}</div>
      </Link>
    </ul>
  );
};

export default ResourcesDropdown;
