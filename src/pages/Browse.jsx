import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import axios from "../utils/authAxios";
import CompanyCard from "../components/CompanyCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";

const Browse = () => {
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

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div className="w-full h-12 flex justify-center border-b">
        <div
          style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
          className="w-screen sm:w-full h-full px-2 flex-shrink-0 bg-white flex space-x-1 sm:justify-around overflow-x-auto"
        >
          {TagsArray.map((item) => (
            <button className="px-4 rounded-lg transition flex-shrink-0 font-bold text-gray-500 h-full flex flex-col justify-center group items-center relative">
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
          <Link to="/developers" className="text-green-600 hover:text-green-500 hover:underline font-bold">
            <div className="flex items-center">
              <p>{t("viewMore")}</p>
              <FiChevronRight />
            </div>
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-4 mb-12">
          {Object.entries(employeeArray)
            .filter((item, idx) => item[1].user_img)
            .filter((item, idx) => item[1].user_id !== 3)
            .splice(0, 8)
            .map((item, index) => (
              <ProfileCard key={index} item={item} isEmployer={false} />
            ))}
        </div>

        <div className="p-6 bg-gray-100 mb-16 rounded">
          <p className="text-2xl font-bold text-gray-800 my-4">{t("companies")}</p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-3 gap-y-4 py-6">
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
      <Footer />
    </div>
  );
};

export default Browse;
