import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default-company.png";

const CompanyCard = ({ item }) => {
  const [, info] = item;

  return (
    <Link to={`/company/${info.company_id}`}>
      <div
        style={{ color: "#272D37" }}
        className="w-full ring-1 ring-gray-200 rounded overflow-hidden hover:shadow filter hover:bg-gray-50 transition flex h-20 items-center pr-4 bg-white"
      >
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = DefaultImage;
          }}
          src={info.company_info[0].img || DefaultImage}
          alt=""
          draggable={false}
          style={{ aspectRatio: 1 }}
          className="h-full"
        />
        <div className="ml-4">
          <p className="font-bold text-sm">{info.company_info[0].name}</p>
          <p className="text-xs mt-1">member since {moment(info.company_created_at).year()}</p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
