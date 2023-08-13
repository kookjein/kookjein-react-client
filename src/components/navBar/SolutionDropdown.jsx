import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePerson, MdWorkOutline } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const SolutionDropdown = () => {
  const { t } = useTranslation("navBar");
  return (
    <ul className="bg-white text-black rounded-lg p-5 w-72">
      <div className="flex">
        <p
          style={{ color: "#1FAD72", fontSize: "0.7rem" }}
          className="font-black text-xs font-nanum text-white py-1 rounded-full"
        >
          {t("service.for")}
        </p>
      </div>
      <Link
        to="/service/company"
        className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center space-x-4">
          <MdWorkOutline className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" size={24} />
          <div className="w-full flex flex-col items-start space-y-px">
            <p className="font-semibold">{t("service.title1")}</p>
            <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle1")}</p>
          </div>
        </div>
      </Link>
      <Link
        to="/service/developer"
        className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center space-x-4">
          <MdOutlinePerson className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={24} />
          <div className="w-full flex flex-col items-start space-y-px">
            <p className="font-semibold">{t("service.title2")}</p>
            <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle2")}</p>
          </div>
        </div>
      </Link>
      <div className="flex mt-4">
        <p
          style={{ color: "#1FAD72", fontSize: "0.7rem" }}
          className="font-black text-xs font-nanum text-white py-1 rounded-full"
        >
          {t("service.addition")}
        </p>
      </div>
      <Link
        to="/pricing"
        className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center space-x-4">
          <RiCustomerServiceLine className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={24} />
          <div className="w-full flex flex-col items-start space-y-px">
            <p className="font-semibold">{t("service.title3")}</p>
            <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle3")}</p>
          </div>
        </div>
      </Link>
    </ul>
  );
};

export default SolutionDropdown;
