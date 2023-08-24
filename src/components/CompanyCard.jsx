import React from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default-company.png";
import { useTranslation } from "react-i18next";

const CompanyCard = ({ item }) => {
  const [, info] = item;
  const { i18n } = useTranslation();
  const lang = i18n.language.includes("en") ? "en" : "ko";

  return (
    <Link to={`/company/${info.company_id}`}>
      <div
        style={{ color: "#272D37" }}
        className="w-full ring-1 ring-gray-200 rounded-sm overflow-hidden hover:shadow filter transition h-44 items-center p-4 bg-white"
      >
        <div className="flex items-center">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={info.company_info[0].img || DefaultImage}
            alt={info.company_info[0].name}
            draggable={false}
            style={{ aspectRatio: 1 }}
            className="h-12 w-12 rounded border"
          />
          <div className="ml-4">
            <p className="font-bold text-lg">{info.company_info[0].name}</p>
            <p className="text-xs">{info.company_info[0].industry?.[lang]}</p>
          </div>
        </div>
        {info.company_info[0].type && (
          <div className="flex items-center mt-3">
            <div className="bg-purple-100 rounded-full py-0.5 px-2">
              <p style={{ fontSize: "10px" }} className="text-xs text-purple-600">
                {info.company_info[0].type?.[lang]}
              </p>
            </div>
          </div>
        )}

        <p style={{ fontSize: "11px" }} className="text-xs line-clamp-3 mt-3 text-gray-500">
          {info.company_info[0].intro?.[lang]} {info.company_info[0].service?.[lang]}
        </p>
      </div>
    </Link>
  );
};

export default CompanyCard;
