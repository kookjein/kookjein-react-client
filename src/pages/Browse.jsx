import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "../utils/authAxios";
import CompanyCard from "../components/CompanyCard";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_item");
  const navigate = useNavigate();
  const { t } = useTranslation("browse");
  const [employeeArray, setEmployeeArray] = useState({});
  const [employerArray, setEmployerArray] = useState({});
  const [companyArray, setCompanyArray] = useState([]);

  useEffect(() => {
    axios
      .get(`/v1/user/employees`)
      .then((response) => {
        setEmployeeArray(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/EMPLOYEES ERROR : ", e);
      });

    axios
      .get(`/v1/user/employers`)
      .then((response) => {
        setEmployerArray(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/EMPLOYERS ERROR : ", e);
      });

    axios
      .get(`/v1/company/all`)
      .then((response) => {
        setCompanyArray(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("V1/COMPANY/ALL ERROR : ", e);
      });
    return () => {};
  }, []);

  const TagsArray = [
    "풀스택",
    "프론트엔드",
    "백엔드",
    "UI개발자&퍼블리셔",
    "데이터 전문",
    "DevOps",
    "게임 개발",
    "보안 개발",
  ];

  const clearSearch = () => {
    navigate("/browse");
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
      <div className="w-full h-12 flex justify-center border-b">
        <div
          style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
          className="w-screen sm:w-full h-full px-2 flex-shrink-0 bg-white flex space-x-1 sm:justify-around"
        >
          {TagsArray.map((item, index) => (
            <button
              key={index}
              className="px-4 rounded-lg transition flex-shrink-0 font-bold text-gray-500 h-full flex flex-col justify-center group items-center relative"
            >
              <p>{item}</p>
              <div
                style={{ height: "3px" }}
                className="w-full bg-green-600 group-hover:flex hidden absolute bottom-0 rounded"
              ></div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex-shrink-0 pb-32 mt-6">
        <div className="flex justify-between w-full my-4">
          <p className="text-2xl font-bold text-gray-800">{t("developers")}</p>
        </div>

        {searchQuery && (
          <div className="flex mt-4 items-center text-sm space-x-4 text-gray-600">
            <p>검색중:</p>
            <div className="px-3 h-7 bg-gray-100 rounded-full shadow flex items-center space-x-3">
              <p className="text-sm">{searchQuery}</p>
              <button onClick={clearSearch} className="text-gray-500 hover:text-red-500">
                <IoMdClose />
              </button>
            </div>
          </div>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-4 mb-12">
          {Object.entries(employeeArray)
            .filter((item, idx) => item[1].user_img)
            .map((item, index) => (
              <ProfileCard key={index} item={item} isEmployer={false} />
            ))}
        </div>

        <div className="mb-16 rounded">
          <p className="text-2xl font-bold text-gray-800 my-4">{t("companies")}</p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 h-full items-center flex-shrink-0 gap-x-3 gap-y-4 py-6">
            {Object.entries(companyArray).map((item, index) => (
              <CompanyCard key={index} item={item} />
            ))}
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-800 my-4">{t("employers")}</p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-6 mb-6">
          {Object.entries(employerArray).map((item, index) => (
            <ProfileCard key={index} item={item} isEmployer={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
