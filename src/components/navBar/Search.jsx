import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from "../../context/authContext";

const Search = () => {
  const { t } = useTranslation("navBar");
  const { userState } = useContext(AuthContext);
  const [searchType, setSearchType] = useState("employee");

  return (
    <div className="w-full flex items-center h-9 sm:h-10 justify-center relative max-w-md rounded-full border pl-11 pr-1">
      <input
        className="h-full w-full font-nanum text-xs sm:text-sm pr-3 outline-none rounded-r-full"
        placeholder={userState.user.userType === searchType ? t("placeholderEmployee") : t("placeholderEmployer")}
      />
      <button
        onClick={() => (searchType === "employee" ? setSearchType("employer") : setSearchType("employee"))}
        className="h-8 px-4 text-xs flex-shrink-0 flex items-center rounded-full border hover:bg-green-700 hover:text-white bg-gray-100 font-bold"
      >
        {userState.user.userType === searchType ? "프로젝트 검색" : "개발자 검색"}
      </button>
      <IoSearch className="text-gray-400 w-5 h-5 absolute left-4 cursor-pointer hover:text-green-700" />
    </div>
  );
};

export default Search;
