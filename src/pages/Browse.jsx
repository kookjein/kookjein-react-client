import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
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
        console.log(response.data);
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
    "React Native",
    "Node.js",
    "React.js",
    "Django",
    "C#",
    "Flutter",
    "AWS",
    "Angular.js",
    "Python",
    "Java",
    "HTML/CSS",
    "TailwindCSS",
    "Kubernetes",
    "Docker",
    "php",
    "ASP.net",
    "Wordpress",
    "Firebase",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "iOS Swift",
    "Kotlin",
    "TypeScript",
    "DevOps",
    "Cloud Computing",
    "Laravel",
    "AWS Cloud",
    "Cloud development",
    "Cloud DevOps",
    "Data Architecture",
  ];

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex-shrink-0 pb-32">
        <div className="w-full flex flex-wrap h-full items-center flex-shrink-0 gap-3 py-8">
          {TagsArray.map((item) => (
            <Tags key={item} item={item} />
          ))}
        </div>

        <div className="flex justify-between w-full my-4">
          <p className="text-2xl font-bold text-gray-800">
            {t("developers")} - {Object.entries(employeeArray)?.length}
          </p>
          <Link to="/developers" className="text-green-600 hover:text-green-500 hover:underline font-bold">
            <div className="flex items-center">
              <p>{t("viewMore")}</p>
              <FiChevronRight />
            </div>
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-4 mb-12">
          {Object.entries(employeeArray).map(
            (item, index) =>
              item[1].user_img && item[1].user_id !== 3 && <ProfileCard key={index} item={item} isEmployer={false} />
          )}
        </div>

        <div className="p-6 bg-gray-100 mb-16 rounded">
          <p className="text-2xl font-bold text-gray-800 my-4">
            {t("companies")} - {Object.entries(companyArray)?.length}
          </p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-6">
            {Object.entries(companyArray).map((item, index) => (
              <CompanyCard key={index} item={item} />
            ))}
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-800 my-4">
          {t("employers")} - {Object.entries(employerArray)?.length}
        </p>
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
