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
        className="w-full ring-1 ring-gray-200 rounded overflow-hidden hover:shadow filter hover:bg-gray-50 transition flex h-20 items-center px-4"
      >
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = DefaultImage;
          }}
          src={info.company_info[0].img || DefaultImage}
          alt=""
          draggable={false}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-3">
          <p className="text-lg font-bold">{info.company_info[0].name}</p>
          <p className="text-xs">member since {moment(info.company_created_at).year()}</p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
